import React, { useState, useEffect, useRef } from 'react';

const SectionReveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const transforms = {
    up: 'translate-y-20',
    down: '-translate-y-20',
    left: '-translate-x-20',
    right: 'translate-x-20',
    scale: 'scale-75',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : `opacity-0 ${transforms[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
