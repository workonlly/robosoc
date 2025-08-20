import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThreeModel from './usethreemodel'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Achievements: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const achievements = [
    {
      year: "2023",
      title: "Techkriti IIT Kanpur",
      description: "Rank 1 in Electromania (Tetris) Rank 3 in Embedded (Home Automation)"
    },
    {
      year: "2022",
      title: "Xpecto IIT Mandi",
      description: "Rank 1 in Sumo Bot and Line Follower"
    },
    {
      year: "2021",
      title: "Techfest IIT Bombay",
      description: "Ranked 6 out of 300+ teams"
    },
    {
      year: "2018",
      title: "Robocon 2k18",
      description: "Rank: 25"
    },
    {
      year: "2017",
      title: "Robocon 2k17",
      description: "Rank: 96"
    },
    {
      year: "2016",
      title: "Robocon 2k16",
      description: "Rank: 68"
    },
  ]

  useEffect(() => {
    const title = titleRef.current;
    const timeline = timelineRef.current;
    const achievementElements = achievementsRef.current.filter(Boolean);
    const firstAchievement = achievementElements[0];

    if (!title || !timeline) return;

    // Set initial states with scroll-triggered setup
    gsap.set(title, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(timeline, { opacity: 0, scaleY: 0, transformOrigin: "top" });
    
    // Only set initial state for first achievement
    if (firstAchievement) {
      gsap.set(firstAchievement, { 
        opacity: 0, 
        x: -100, 
        y: 50,
        scale: 0.95
      });
    }

    // Title animation with scroll trigger
    gsap.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Timeline animation with scroll trigger
    gsap.to(timeline, {
      opacity: 1,
      scaleY: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: timeline,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Only animate the first achievement card with enhanced animations
    if (firstAchievement) {
      // Main card fade-in animation
      gsap.to(firstAchievement, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: firstAchievement,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Additional fade-in for inner content
      const innerContent = firstAchievement.querySelector('.achievement-content');
      if (innerContent) {
        gsap.fromTo(innerContent, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: firstAchievement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Year badge fade-in animation
      const yearBadge = firstAchievement.querySelector('.year-badge');
      if (yearBadge) {
        gsap.fromTo(yearBadge,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.4,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
              trigger: firstAchievement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Timeline dot animation
      const timelineDot = firstAchievement.querySelector('.timeline-dot');
      if (timelineDot) {
        gsap.fromTo(timelineDot,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: firstAchievement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="achievements min-h-screen py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Three.js Background */}
      <div className="fixed inset-0 z-0">
        <ThreeModel />
      </div>
      
      <div className="relative z-10">
      <div ref={titleRef} className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white h-8 sm:h-12 lg:h-16 flex-1 rounded-sm shadow-lg'></div>
          <h1 className='text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-8'>
            ACHIEVEMENTS
          </h1>
          <div className='bg-white h-8 sm:h-12 lg:h-16 w-16 sm:w-24 lg:w-32 rounded-sm shadow-lg flex items-center justify-center'>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        
        <div className="space-y-8 sm:space-y-16 md:space-y-20 lg:space-y-24 relative">
          <div ref={timelineRef} className="absolute left-1/2 transform -translate-x-1/2 w-1 top-0 bottom-0 bg-gradient-to-b from-white/60 via-gray-400 to-white/60 rounded-full shadow-lg shadow-white/20 hidden sm:block"></div>
          
          {achievements.map((achievement, index) => (
            <div key={index} ref={el => { achievementsRef.current[index] = el }} className={`relative flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-col sm:flex-row group`}>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                <div className="timeline-dot w-6 h-6 bg-white rounded-full shadow-lg shadow-white/30 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
                </div>
              </div>

              <div className={`w-full sm:w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 sm:text-right' : 'lg:pl-16 sm:text-left'} text-center sm:text-left`}>
                <div className="achievement-content relative bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/10 shadow-2xl shadow-black/50 hover:bg-black/70 hover:border-white/30 hover:shadow-white/10 transition-all duration-500 hover:scale-105 group-hover:translate-y-2">
                  
                  <div className={`mb-4 sm:mb-6 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} text-center sm:text-left`}>
                    <div className="year-badge inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg sm:text-xl md:text-2xl px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg shadow-white/10 group-hover:scale-105 hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                      {achievement.year}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl sm:rounded-t-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-b-2xl sm:rounded-b-3xl"></div>
                  
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Achievements

