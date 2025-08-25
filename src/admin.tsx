import React, { useState, useEffect, useRef } from 'react';
import { databases, DB_ID } from '../appwrite';
import type { Models } from 'appwrite';
import { ID } from 'appwrite';

interface Member extends Models.Document {
  name: string;
  post: string;
  profilepic: string;
  linkedin?: string;
  insta?: string;  // Changed from instagram to insta to match Appwrite
  github?: string;
  techstack?: string[];
  year?: number; // Added year property
}

interface MembersByYear {
  year4: Member[];
  year3: Member[];
  year2: Member[];
  year1: Member[];
}

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const DEMO_USER = { username: 'admin', password: 'robosoc2025' };

const AdminPanel: React.FC = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('robosoc_admin_logged_in') === 'true';
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const sessionTimeoutRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());
  // Session timeout logic
  useEffect(() => {
    if (!isLoggedIn) return;
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    // Timer to check for timeout
    const checkTimeout = () => {
      if (Date.now() - lastActivityRef.current > SESSION_TIMEOUT) {
        handleLogout();
      } else {
        sessionTimeoutRef.current = setTimeout(checkTimeout, 1000 * 10);
      }
    };
    sessionTimeoutRef.current = setTimeout(checkTimeout, 1000 * 10);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    };
  }, [isLoggedIn]);

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === DEMO_USER.username &&
      loginForm.password === DEMO_USER.password
    ) {
      setIsLoggedIn(true);
      localStorage.setItem('robosoc_admin_logged_in', 'true');
      setLoginError('');
      lastActivityRef.current = Date.now();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('robosoc_admin_logged_in');
  };
  const [membersByYear, setMembersByYear] = useState<MembersByYear>({
    year4: [],
    year3: [],
    year2: [],
    year1: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for adding/editing members
  const [formData, setFormData] = useState({
    name: '',
    post: '',
    profilepic: '',
    linkedin: '',
    insta: '',  // Changed from instagram to insta
    github: '',
    techstack: [] as string[],
    year: 1 // Default to 1st year
  });

  useEffect(() => {
    fetchAllMembers();
  }, []);

  // Collection IDs mapped to years
  const getCollectionId = (year: number): string => {
    switch (year) {
      case 4: return '689cefca0001449d5204';
      case 3: return '689cef0d003da89eebea';
      case 2: return '689cef3200167375be28';
      case 1: return '689cef460005804b0484';
      default: return '689cef460005804b0484'; // Default to year 1
    }
  };

  const fetchAllMembers = async () => {
    setLoading(true);
    try {
      // Fetch all member collections
      const [res4, res3, res2, res1] = await Promise.all([
        databases.listDocuments<Member>(DB_ID, '689cefca0001449d5204'), // Year 4
        databases.listDocuments<Member>(DB_ID, '689cef0d003da89eebea'), // Year 3
        databases.listDocuments<Member>(DB_ID, '689cef3200167375be28'), // Year 2
        databases.listDocuments<Member>(DB_ID, '689cef460005804b0484')  // Year 1
      ]);

      // Add year property to each member and organize by year
      const year4Members = res4.documents.map(member => ({ ...member, year: 4 }));
      const year3Members = res3.documents.map(member => ({ ...member, year: 3 }));
      const year2Members = res2.documents.map(member => ({ ...member, year: 2 }));
      const year1Members = res1.documents.map(member => ({ ...member, year: 1 }));

      setMembersByYear({
        year4: year4Members,
        year3: year3Members,
        year2: year2Members,
        year1: year1Members
      });
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value, 10) : value
    }));
  };

  const handleTechStackChange = (techStack: string) => {
    console.log('Tech stack input:', techStack); // Debug log
    const techArray = techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({
      ...prev,
      techstack: techArray
    }));
  };

  // Handle tech stack input with better comma support
  const handleTechStackInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Raw tech stack input:', value); // Debug log
    handleTechStackChange(value);
  };

  // Handle Enter key to add tech stack items
  const handleTechStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Add current input as a tech stack item
      const currentInput = (e.target as HTMLInputElement).value;
      const lastCommaIndex = currentInput.lastIndexOf(',');
      const newTech = currentInput.substring(lastCommaIndex + 1).trim();
      
      if (newTech) {
        const updatedValue = currentInput + ', ';
        handleTechStackChange(updatedValue);
      }
    }
  };

  // Alternative method: Add individual tech stack items
  const [tempTech, setTempTech] = useState('');
  
  const addTechStackItem = () => {
    if (tempTech.trim() && !formData.techstack.includes(tempTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techstack: [...prev.techstack, tempTech.trim()]
      }));
      setTempTech('');
    }
  };

  const handleTempTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechStackItem();
    }
  };

  // Prepare member data for Appwrite
  const prepareMemberData = (formData: any) => {
    const memberData: any = {
      name: formData.name,
      post: formData.post,
      profilepic: formData.profilepic,
    };

    // Only add optional fields if they have values
    if (formData.linkedin && formData.linkedin.trim()) {
      memberData.linkedin = formData.linkedin;
    }
    if (formData.insta && formData.insta.trim()) {  // Changed from instagram to insta
      memberData.insta = formData.insta;
    }
    if (formData.github && formData.github.trim()) {
      memberData.github = formData.github;
    }
    
    // Handle tech stack array properly for Appwrite
    if (formData.techstack && formData.techstack.length > 0) {
      // Ensure all tech stack items are strings and not empty
      const cleanTechStack = formData.techstack
        .filter((tech: string) => tech && tech.trim())
        .map((tech: string) => tech.trim());
      
      if (cleanTechStack.length > 0) {
        memberData.techstack = cleanTechStack;
      }
    }

    return memberData;
  };

  // Create new member
  const createMember = async () => {
    setIsSubmitting(true);
    try {
      const collectionId = getCollectionId(formData.year);
      const memberData = prepareMemberData(formData);

      console.log('Creating member with data:', memberData);
      
      await databases.createDocument(DB_ID, collectionId, ID.unique(), memberData);
      await fetchAllMembers(); // Refresh the list
      closeModal();
      alert('Member added successfully!');
    } catch (error) {
      console.error('Error creating member:', error);
      alert(`Failed to add member. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing member
  const updateMember = async () => {
    if (!selectedMember) {
      alert('No member selected for update');
      return;
    }
    
    console.log('Updating member:', selectedMember.$id);
    console.log('Form data:', formData);
    
    setIsSubmitting(true);
    try {
      const currentCollectionId = getCollectionId(selectedMember.year || 1);
      const newCollectionId = getCollectionId(formData.year);
      
      console.log('Collection IDs:', { currentCollectionId, newCollectionId });
      
      const memberData = prepareMemberData(formData);

      console.log('Prepared member data for update:', memberData);

      // If year changed, we need to delete from old collection and create in new one
      if (currentCollectionId !== newCollectionId) {
        console.log('Year changed - moving between collections');
        await databases.deleteDocument(DB_ID, currentCollectionId, selectedMember.$id);
        await databases.createDocument(DB_ID, newCollectionId, ID.unique(), memberData);
      } else {
        // Same year, just update
        console.log('Same year - updating in place');
        await databases.updateDocument(DB_ID, currentCollectionId, selectedMember.$id, memberData);
      }
      
      await fetchAllMembers(); // Refresh the list
      closeModal();
      alert('Member updated successfully!');
    } catch (error) {
      console.error('Error updating member:', error);
      console.error('Error details:', error);
      alert(`Failed to update member. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete member
  const deleteMember = async (member: Member) => {
    try {
      const collectionId = getCollectionId(member.year || 1);
      await databases.deleteDocument(DB_ID, collectionId, member.$id);
      await fetchAllMembers(); // Refresh the list
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member. Please try again.');
    }
  };

  const handleSubmit = () => {
    console.log('Handle submit called');
    console.log('Selected member:', selectedMember);
    console.log('Form data:', formData);
    
    if (!formData.name.trim() || !formData.post.trim()) {
      alert('Please fill in all required fields (Name and Position)');
      return;
    }

    if (selectedMember) {
      console.log('Calling updateMember');
      updateMember();
    } else {
      console.log('Calling createMember');
      createMember();
    }
  };

  const openModal = (member?: Member, year?: number) => {
    console.log('Opening modal with:', { member, year }); // Debug log
    
    if (member) {
      console.log('Member data received:', {
        name: member.name,
        post: member.post,
        profilepic: member.profilepic,
        linkedin: member.linkedin,
        insta: member.insta,  // Changed from instagram to insta
        github: member.github,
        techstack: member.techstack,
        year: member.year
      });
      
      setSelectedMember(member);
      const formDataToSet = {
        name: member.name || '',
        post: member.post || '',
        profilepic: member.profilepic || '',
        linkedin: member.linkedin || '',
        insta: member.insta || '',  // Changed from instagram to insta
        github: member.github || '',
        techstack: member.techstack || [],
        year: member.year || 1
      };
      
      console.log('Setting form data to:', formDataToSet);
      setFormData(formDataToSet);
      
      // Also reset tempTech when opening modal
      setTempTech('');
      
    } else {
      setSelectedMember(null);
      setFormData({
        name: '',
        post: '',
        profilepic: '',
        linkedin: '',
        insta: '',  // Changed from instagram to insta
        github: '',
        techstack: [],
        year: year || 1 // Use the passed year or default to 1
      });
      setTempTech(''); // Reset temp tech for new member
      console.log('Add mode - Form data set with year:', year || 1); // Debug log
    }
    setIsModalOpen(true);
  };

  const getTotalMembers = () => {
    return membersByYear.year4.length + membersByYear.year3.length + 
           membersByYear.year2.length + membersByYear.year1.length;
  };

  const getYearLabel = (year: number) => {
    switch (year) {
      case 4: return '4th Year (Final Year)';
      case 3: return '3rd Year (Pre-Final)';
      case 2: return '2nd Year (Intermediate)';
      case 1: return '1st Year (Freshers)';
      default: return `Year ${year}`;
    }
  };

  const getYearColor = (year: number) => {
    switch (year) {
      case 4: return 'from-red-500 to-red-600';
      case 3: return 'from-orange-500 to-orange-600';
      case 2: return 'from-blue-500 to-blue-600';
      case 1: return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderMemberCard = (member: Member) => (
    <div key={member.$id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 relative">
      {/* Year Badge */}
      <div className={`absolute top-3 right-3 bg-gradient-to-r ${getYearColor(member.year || 0)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
        Year {member.year}
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={member.profilepic}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-white font-semibold">{member.name}</h3>
          <p className="text-slate-400 text-sm">{member.post}</p>
        </div>
      </div>
      
      {member.techstack && member.techstack.length > 0 && (
        <div className="mb-4">
          <p className="text-slate-300 text-xs mb-2">Tech Stack:</p>
          <div className="flex flex-wrap gap-1">
            {member.techstack.slice(0, 3).map((tech: string, index: number) => (
              <span key={index} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                {tech}
              </span>
            ))}
            {member.techstack.length > 3 && (
              <span className="text-slate-400 text-xs">+{member.techstack.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {member.linkedin && (
            <span className="text-blue-400 text-xs">LinkedIn</span>
          )}
          {member.github && (
            <span className="text-purple-400 text-xs">GitHub</span>
          )}
          {member.insta && (  
            <span className="text-pink-400 text-xs">Instagram</span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              console.log('Edit button clicked for member:', member.name, member.$id);
              openModal(member);
            }}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => {
              console.log('Delete button clicked for member:', member.name);
              setMemberToDelete(member);
              setShowDeleteConfirm(true);
            }}
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-xs">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleLoginInput}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginInput}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              autoComplete="current-password"
              required
            />
          </div>
          {loginError && <div className="text-red-400 text-sm mb-4 text-center">{loginError}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
   
      

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>
      {/* Members Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Members Management</h2>
            <p className="text-slate-400 mt-1">Total Members: {getTotalMembers()}</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add New Member
          </button>
        </div>

        {/* Year-wise Members Sections */}
        {[4, 3, 2, 1].map((year) => {
          const yearKey = `year${year}` as keyof MembersByYear;
          const yearMembers = membersByYear[yearKey];
          
          if (yearMembers.length === 0) return null;
          
          return (
            <div key={year} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${getYearColor(year)}`}></span>
                  {getYearLabel(year)}
                  <span className="text-slate-400 text-sm font-normal">({yearMembers.length} members)</span>
                </h3>
                <button
                  onClick={() => openModal(undefined, year)}
                  className={`bg-gradient-to-r ${getYearColor(year)} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90`}
                >
                  Add {getYearLabel(year).split(' ')[0]} Year Member
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yearMembers.map((member) => renderMemberCard(member))}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {getTotalMembers() === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-4">No members found</div>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add First Member
            </button>
          </div>
        )}
      </div>
    </div>      {/* Modal for Add/Edit Member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              {selectedMember ? 'Edit Member' : 'Add New Member'}
            </h3>
            
            {/* Debug Info - Remove this after fixing */}
            {selectedMember && (
              <div className="bg-slate-900 p-3 rounded mb-4 text-xs">
                <p className="text-slate-400 mb-2">Debug Info (will be removed):</p>
                <p className="text-slate-300">LinkedIn: "{formData.linkedin}"</p>
                <p className="text-slate-300">Instagram: "{formData.insta}"</p>
                <p className="text-slate-300">GitHub: "{formData.github}"</p>
                <p className="text-slate-300">Original member data:</p>
                <p className="text-slate-300">- LinkedIn: "{selectedMember.linkedin}"</p>
                <p className="text-slate-300">- Instagram: "{selectedMember.insta}"</p>
                <p className="text-slate-300">- GitHub: "{selectedMember.github}"</p>
              </div>
            )}
            
            <form className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Year *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value={1}>1st Year (Freshers)</option>
                  <option value={2}>2nd Year (Intermediate)</option>
                  <option value={3}>3rd Year (Pre-Final)</option>
                  <option value={4}>4th Year (Final Year)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Position *</label>
                <input
                  type="text"
                  name="post"
                  value={formData.post}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Profile Picture URL</label>
                <input
                  type="url"
                  name="profilepic"
                  value={formData.profilepic}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  onFocus={() => console.log('LinkedIn field focused, current value:', formData.linkedin)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
                {formData.linkedin && (
                  <p className="text-xs text-green-400 mt-1">✓ LinkedIn URL set</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  onFocus={() => console.log('GitHub field focused, current value:', formData.github)}
                  placeholder="https://github.com/username"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
                {formData.github && (
                  <p className="text-xs text-green-400 mt-1">✓ GitHub URL set</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Instagram URL</label>
                <input
                  type="url"
                  name="insta"
                  value={formData.insta}
                  onChange={handleInputChange}
                  onFocus={() => console.log('Instagram field focused, current value:', formData.insta)}
                  placeholder="https://instagram.com/username"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
                {formData.insta && (
                  <p className="text-xs text-green-400 mt-1">✓ Instagram URL set</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Tech Stack
                </label>
                
                {/* Method 1: Comma-separated input */}
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 text-xs">Method 1: Comma-separated (React, Node.js, etc.)</label>
                    <input
                      type="text"
                      value={formData.techstack.join(', ')}
                      onChange={handleTechStackInput}
                      onKeyDown={handleTechStackKeyDown}
                      placeholder="React, TypeScript, Node.js, MongoDB"
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none mt-1"
                      autoComplete="off"
                    />
                  </div>

                  {/* Method 2: Individual addition */}
                  <div>
                    <label className="text-slate-400 text-xs">Method 2: Add one at a time</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={tempTech}
                        onChange={(e) => setTempTech(e.target.value)}
                        onKeyDown={handleTempTechKeyDown}
                        placeholder="Type one technology..."
                        className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={addTechStackItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {formData.techstack.length > 0 && (
                  <div className="mt-3">
                    <p className="text-slate-400 text-xs mb-2">Tech Stack ({formData.techstack.length} items):</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.techstack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => {
                              const newTechStack = formData.techstack.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, techstack: newTechStack }));
                            }}
                            className="hover:bg-blue-700 rounded px-1"
                            title="Remove this technology"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{selectedMember ? 'Update' : 'Create'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <strong>{memberToDelete.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMemberToDelete(null);
                }}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMember(memberToDelete)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;