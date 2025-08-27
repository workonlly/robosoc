import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import ThreeModel from './usethreemodel'
import SEO from './components/SEO'
import { organizationSchema, websiteSchema } from './utils/structuredData'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Home: React.FC = () => {
  const { scrollToTop } = useLenis();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const purposeSectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const foundersRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const purposeSection = purposeSectionRef.current;
    const stats = statsRef.current;
    const wrapper = wrapperRef.current;

    if (!hero || !wrapper) return;

    // Set initial states - only for hero and purpose title
    gsap.set(hero.children, { opacity: 0, y: 50 });
    if (purposeSection) {
      // Set initial state for the entire black div and the title
      gsap.set(purposeSection, { opacity: 0, y: 100 });
      gsap.set(purposeSection.querySelector('h2'), { opacity: 0, y: 40, scale: 0.9 });
    }
    if (stats) gsap.set(stats.children, { opacity: 0, y: 30 });

    // Hero animation
    gsap.to(hero.children, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      delay: 0.5
    });

    // ScrollTrigger to control fixed positioning
    if (purposeSection) {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // When we reach the end of the purpose section, remove fixed positioning
          if (self.progress > 0.7) { // Adjust this value to control when it stops being fixed
            hero.style.position = 'absolute';
            hero.style.top = '70%'; // Position it where it should be when no longer fixed
          } else {
            hero.style.position = 'fixed';
            hero.style.top = '0';
          }
        }
      });

      // Animate the black div coming upward (no pinning needed)
      gsap.to(purposeSection, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: purposeSection,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Then animate the "Our Purpose" title
      gsap.to(purposeSection.querySelector('h2'), {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: purposeSection,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Stats counter animation
    if (stats) {
      gsap.to(stats.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stats,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <SEO 
        title="RoboSoc NITH - Robotics Society of NIT Hamirpur"
        description="Official website of RoboSoc NITH, the premier robotics society of National Institute of Technology Hamirpur. Pioneering the future of robotics and innovation with cutting-edge projects and talented members."
        keywords="RoboSoc, NITH, NIT Hamirpur, Robotics Society, Technology, Innovation, Engineering, Automation, AI, Machine Learning, Projects, Students, Research, Dr. Kirti Mahajan, Kashish Verma"
        url="/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <div className="min-h-screen">
      <div ref={wrapperRef} className="relative">
        {/* Three.js Background */}
        <div className="fixed inset-0 z-0">
          <ThreeModel />
        </div>
        
        <div ref={heroRef} className='h-screen flex justify-center items-center flex-col fixed inset-0 z-10'>
          <div className="text-center space-y-4 max-w-4xl md:mx-auto ml-16 px-4">
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-white hover:to-blue-200 transition-all duration-300 cursor-pointer mb-3'>
              Welcome to RoboSoc
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Pioneering the Future of Robotics and Innovation
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-center mt-6">
              <Link 
                to="/projects" 
                onClick={scrollToTop}
                className="px-6 py-2.5 bg-gradient-to-r from-white/20 to-white/10 text-white rounded-xl border border-white/30 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm inline-block text-center"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Spacer to account for fixed hero */}
        <div className="h-screen mt-2"></div>

        <div ref={purposeSectionRef} className='relative z-20 py-16 px-4 bg-gradient-to-br from-black/90 to-black/70 m-4 rounded-2xl shadow-2xl shadow-white/20 backdrop-blur-md border border-white/10'>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Our Purpose
            </h2>
            
            <div className='grid md:grid-cols-2 gap-6 mb-16'>
              <div ref={el => { cardsRef.current[0] = el }} className='bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105'>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-white/15">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                    </svg>
                  </div>
                  <h3 className='text-xl font-bold text-white'>Mission</h3>
                </div>
                <p className='text-gray-300 leading-relaxed text-base'>
                  Build and sustain a culture to be self-reliant to accomplish our vision, by emphasizing the development of individual quality and fostering innovation in robotics technology.
                </p>
              </div>

              <div ref={el => { cardsRef.current[1] = el }} className='bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105'>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-white/15">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className='text-xl font-bold text-white'>Vision</h3>
                </div>
                <p className='text-gray-300 leading-relaxed text-base'>
                  To be a luminary of the Indian society in the field of Robotics, leading breakthrough innovations and inspiring the next generation of engineers.
                </p>
              </div>
            </div>

            <div>
              <div ref={foundersRef} className='flex flex-wrap justify-center gap-6'>
                <div className='group relative flex-1 min-w-56 max-w-64'>
                  <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col'>
                    <div className="w-full h-80 bg-black overflow-hidden">
                      <img src="/professor.jpg" alt="Dr. Sant Ram Chauhan" className="w-full h-full object-cover" />
                    </div>
                    <div className='bg-white p-2 mt-2 flex-1'>
                      <div className="flex justify-between items-start h-full">
                        <div className="flex-1">
                          <div className="font-bold text-lg text-black">Dr. Kirti Mahajan</div>
                          <div className="text-xs text-gray-600 mb-2"><div>Asst. Faculty Incharge, </div><div>Technical Activities, NIT Hamirpur</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='group relative flex-1 min-w-56 max-w-64'>
                  <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col'>
                    <div className="w-full h-80 bg-black overflow-hidden">
                      <img src="/kashish.webp" alt="Kashish Verma" className="w-full h-full object-cover" />
                    </div>
                    <div className='bg-white p-2 mt-2 flex-1'>
                      <div className="flex justify-between items-start h-full">
                        <div className="flex-1">
                          <div className="font-bold text-lg text-black">Kashish Verma</div>
                          <div className="text-xs text-gray-600 mb-2">Co-Founder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='group relative flex-1 min-w-56 max-w-64'>
                  <div className='bg-transparent shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col'>
                    <div className="w-full h-80 bg-black overflow-hidden">
                      <img src="/lamy.webp" alt="Late Lamyanba Heisnam" className="w-full h-full object-cover" />
                    </div>
                    <div className='bg-white p-2 mt-2 flex-1'>
                      <div className="flex justify-between items-start h-full">
                        <div className="flex-1">
                          <div className="font-bold text-lg text-black">Late Lamyanba Heisnam</div>
                          <div className="text-xs text-gray-600 mb-2">Co-Founder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 flex flex-row justify-center items-center relative z-20">
        <div ref={statsRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">50+</div>
              <div className="text-gray-400 text-xs md:text-sm">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">25+</div>
              <div className="text-gray-400 text-xs md:text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">10+</div>
              <div className="text-gray-400 text-xs md:text-sm">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Home