import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    
    // Make Lenis available globally
    window.lenis = lenis;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // GSAP ticker for smooth animation loop
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Cleanup function
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  // Function to scroll to top (useful for route changes)
  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { immediate: false });
  };

  // Listen for route changes and scroll to top
  useEffect(() => {
    const handleRouteChange = () => {
      scrollToTop();
    };

    // Listen for popstate events (browser navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
