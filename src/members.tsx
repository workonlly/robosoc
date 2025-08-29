
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { databases, DB_ID  } from '../appwrite';
import type { Models } from 'appwrite';

import SEO from './components/SEO';
import { breadcrumbSchema } from './utils/structuredData';


gsap.registerPlugin(ScrollTrigger);

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
  
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  

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

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!title || !cards) return;


    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(cards.children, { opacity: 0, y: 50, scale: 0.9 });

   
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });


    const animateCards = () => {
      if (cards.children.length > 0) {
        gsap.to(cards.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cards,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        });
      }
    };

 
    const checkAndAnimate = () => {
      if (allMembers.length > 0) {
        setTimeout(animateCards, 100);
      } else {
        setTimeout(checkAndAnimate, 100);
      }
    };

    checkAndAnimate();


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [allMembers]);

  return (
    <>
      <SEO 
        title="Members - RoboSoc NITH | Our Talented Team"
        description="Meet the brilliant minds behind RoboSoc NITH. Our diverse team of engineers, programmers, and innovators from National Institute of Technology Hamirpur driving robotics excellence."
        keywords="RoboSoc members, NIT Hamirpur students, robotics team, engineering students, technology enthusiasts, student developers, innovation team"
        url="/members"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://robosoc-nith.com/" },
          { name: "Members", url: "https://robosoc-nith.com/members" }
        ])}
      />
      <div className="min-h-screen py-10 px-4 relative">
      <div className="relative z-10">
       <div ref={titleRef} className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white h-8 sm:h-12 lg:h-16 flex-1 rounded-sm shadow-lg'></div>
          <h1 className='text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-8'>
            MEMBERS
          </h1>
          <div className='bg-white h-8 sm:h-12 lg:h-16 w-16 sm:w-24 lg:w-32 rounded-sm shadow-lg flex items-center justify-center'>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {allMembers.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-white text-center">Loading members...</p>
            </div>
          ) : (
            allMembers.map((member) => (
              <div key={member.$id} className="group relative w-72">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl shadow-black/50 hover:shadow-white/20 transition-all duration-500 hover:scale-105 overflow-hidden h-[26rem] w-full flex flex-col rounded-2xl border border-gray-700/50 hover:border-white/30">
          
                  <div className="relative w-full h-72 bg-gradient-to-br from-gray-800 to-black overflow-hidden flex-shrink-0 rounded-t-2xl group/image">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    
                 
                    <img 
                      src={member.profilepic || '/placeholder.webp'} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top relative z-0 filter brightness-90 contrast-110 group-hover/image:brightness-100 transition-all duration-500" 
                    />
                    
                 
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm z-20 opacity-0 group-hover/image:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-4">
                      <h3 className="text-white font-bold text-lg mb-3 text-center">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.techstack && member.techstack.length > 0 ? (
                          member.techstack.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-300 text-sm">No tech stack available</span>
                        )}
                      </div>
                    </div>
                    
              
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/30 rounded-tl-md z-30"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/30 rounded-tr-md z-30"></div>
                  </div>
                  
                
                  <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-3 flex-1 flex flex-col rounded-b-2xl relative">
                
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 rounded-b-full"></div>
                    
                    <div className="flex justify-between items-start flex-1 mt-2">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-black transition-colors duration-300">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-600 mb-2 px-2 py-1 bg-gray-200/70 rounded-full inline-block font-medium">
                          {member.post}
                        </div>
                      </div>
                      
                   
                      <div className="flex flex-row gap-2 ml-2">
                        <a href={member.github} className="group/icon">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-black rounded-lg flex items-center justify-center hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg">
                        
                            <svg className="w-5 h-5 fill-white group-hover/icon:scale-110 transition-all duration-300" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                        </a>
                        <a href={member.linkedin} className="group/icon">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                   
                            <svg className="w-5 h-5 fill-white group-hover/icon:scale-110 transition-all duration-300" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                        </a>
                        <a href={member.insta} className="group/icon">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-pink-400 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg">
                      
                            <svg className="w-5 h-5 fill-white group-hover/icon:scale-110 transition-all duration-300" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                    
                    
                    <div className="mt-2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Members;