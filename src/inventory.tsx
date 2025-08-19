import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Inventory: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const content = contentRef.current;
    const spinner = spinnerRef.current;
    const text = textRef.current;

    if (!title || !content || !spinner || !text) return;

    // Set initial states (keeping animate-spin working by only animating opacity and scale)
    gsap.set(title, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(content, { opacity: 0, y: 30 });
    gsap.set(spinner, { opacity: 0, scale: 0 }); // Don't interfere with animate-spin rotation
    gsap.set(text, { opacity: 0, y: 20 });

    // Title animation
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

    // Content container fade-in
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Spinner animation (only opacity and scale to preserve animate-spin)
    gsap.to(spinner, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Text fade-in with bounce
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.6,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="inventory min-h-screen py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8 ">
      <div ref={titleRef} className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <div className='flex items-center w-full gap-2 sm:gap-4 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white h-8 sm:h-12 lg:h-16 flex-1 rounded-sm shadow-lg'></div>
          <h1 className='text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider text-center px-2 sm:px-4 lg:px-8'>
            Campaign's
          </h1>
          <div className='bg-white h-8 sm:h-12 lg:h-16 w-16 sm:w-24 lg:w-32 rounded-sm shadow-lg flex items-center justify-center'>
          </div>
        </div>
        <div ref={contentRef} className="flex flex-col items-center justify-center py-12 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
          <svg ref={spinnerRef} className="animate-spin h-16 w-16 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <div ref={textRef} className="text-white text-xl font-semibold tracking-wide animate-pulse">Work in Progress</div>
        </div>
      </div>
    </div>
  )
}

export default Inventory