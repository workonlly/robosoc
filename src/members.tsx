
import React, { useEffect, useState } from 'react';
import { databases, DB_ID  } from '../appwrite';
import type { Models } from 'appwrite';

interface Member extends Models.Document {
  name: string;
  post: string;
  profilepic: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  techstack?: string[];
}

const Members: React.FC = () => {
  const [members4, setMembers4] = useState<Member[]>([]);
  const [members3, setMembers3] = useState<Member[]>([]);
  const [members2, setMembers2] = useState<Member[]>([]);
  const [members1, setMembers1] = useState<Member[]>([]);
  
  // Combine all members into a single array
  const allMembers = [...members4, ...members3, ...members2, ...members1];
  

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res4 = await databases.listDocuments<Member>(
          DB_ID,
          '689cefca0001449d5204'
        );
        const res3 = await databases.listDocuments<Member>(
          DB_ID,
          "689cef0d003da89eebea"
        );
        const res2 = await databases.listDocuments<Member>(
          DB_ID,
          "689cef3200167375be28"
        );
        const res1 = await databases.listDocuments<Member>(
          DB_ID,
          "689cef460005804b0484"
        );
        setMembers4(res4.documents);
        setMembers3(res3.documents);
        setMembers2(res2.documents);
        setMembers1(res1.documents);
      } catch (err) {
        console.error('Error fetching members', err);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
       <div className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white h-8 sm:h-12 lg:h-16 flex-1 rounded-sm shadow-lg'></div>
          <h1 className='text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-8'>
            MEMBERS
          </h1>
          <div className='bg-white h-8 sm:h-12 lg:h-16 w-16 sm:w-24 lg:w-32 rounded-sm shadow-lg flex items-center justify-center'>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {allMembers.length === 0 ? (
            <div className="w-full text-center">
              <p className="text-white text-center">Loading members...</p>
            </div>
          ) : (
            allMembers.map((member) => (
              <div key={member.$id} className="group relative">
                <div className="bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="w-56 h-72 bg-black overflow-hidden">
                    <img src={member.profilepic || '/placeholder.webp'} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white p-2 mt-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-black">{member.name}</div>
                        <div className="text-xs text-gray-600 mb-2">{member.post}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;