import { useCallback } from 'react';

// Custom hook for Lenis smooth scroll utilities
export const useLenis = () => {
  
  // Scroll to top smoothly
  const scrollToTop = useCallback(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Scroll to specific element
  const scrollToElement = useCallback((selector: string, offset: number = 0) => {
    const element = document.querySelector(selector);
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll to specific Y position
  const scrollTo = useCallback((target: number, options?: { immediate?: boolean; duration?: number }) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, options);
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  // Stop scrolling
  const stopScroll = useCallback(() => {
    if (window.lenis) {
      window.lenis.stop();
    }
  }, []);

  // Start scrolling
  const startScroll = useCallback(() => {
    if (window.lenis) {
      window.lenis.start();
    }
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollTo,
    stopScroll,
    startScroll,
  };
};

// Declare global Lenis instance
declare global {
  interface Window {
    lenis?: any;
  }
}

export default useLenis;
