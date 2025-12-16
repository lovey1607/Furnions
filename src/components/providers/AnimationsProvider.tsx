'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're running on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (!isClient) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isClient]);

  // Initialize scroll-triggered animations
  useEffect(() => {
    if (isReducedMotion || !isClient) return;

    const initScrollAnimations = async () => {
      try {
        // Dynamically import AOS for scroll animations
        const AOS = await import('aos');
        await import('aos/dist/aos.css');
        
        AOS.default.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
          offset: 100,
        });

        console.log('AOS initialized');
      } catch (error) {
        console.warn('Failed to initialize AOS:', error);
      }
    };

    initScrollAnimations();
  }, [isReducedMotion, isClient]);

  // Cleanup AOS on unmount
  useEffect(() => {
    return () => {
      if (!isReducedMotion && isClient) {
        const AOS = require('aos');
        if (AOS.refresh) {
          AOS.refresh();
        }
      }
    };
  }, [isReducedMotion, isClient]);

  // Add CSS keyframes for floating particles if not reduced motion
  useEffect(() => {
    if (isReducedMotion || !isClient) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes wood-texture-move {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .floating-particle {
        position: absolute;
        pointer-events: none;
        will-change: transform;
        animation: float 6s ease-in-out infinite;
      }
      
      .floating-particle:nth-child(2n) {
        animation-delay: -2s;
        animation-duration: 8s;
      }
      
      .floating-particle:nth-child(3n) {
        animation-delay: -4s;
        animation-duration: 10s;
      }
      
      .wood-texture {
        background: linear-gradient(45deg, #8B4513, #D2B48C, #8B4513);
        background-size: 200% 200%;
        animation: wood-texture-move 15s ease infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isReducedMotion, isClient]);

  // Create floating particles
  const createFloatingParticles = () => {
    if (isReducedMotion || !isClient || (typeof window !== 'undefined' && window.innerWidth < 768)) return null;

    return Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className={`floating-particle w-2 h-2 rounded-full ${
          ['bg-[#8B4513]/20', 'bg-[#F5F5DC]/20', 'bg-[#228B22]/20'][i % 3]
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          willChange: 'transform',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0.5, 1],
          scale: [0, 1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          delay: i * 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    ));
  };

  return (
    <>
      {/* Background floating particles */}
      {!isReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {createFloatingParticles()}
        </div>
      )}

      {/* Content with proper z-index and performance optimizations */}
      <div 
        className="relative z-10"
        style={{
          willChange: 'auto',
        }}
      >
        {children}
      </div>

      {/* Performance optimization classes */}
      <style jsx global>{`
        .will-change-transform {
          will-change: transform;
        }
        
        .will-change-opacity {
          will-change: opacity;
        }
        
        .gpu-acceleration {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default AnimationsProvider;