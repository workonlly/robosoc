import React, { useRef, useEffect } from 'react';
// @ts-expect-error: No type definitions for three.js custom init
import { initThree } from './assets/three';

const ThreeModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | void;
    if (mountRef.current) {
      cleanup = initThree(mountRef.current);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        pointerEvents: 'all'
      }}
    />
  );
};

export default ThreeModel;