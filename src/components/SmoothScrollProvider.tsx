import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    

    window.lenis = lenis;

   
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

  
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

  
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);


  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { immediate: false });
  };


  useEffect(() => {
    const handleRouteChange = () => {
      scrollToTop();
    };

 
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
