import { useState, useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, delay = 0, once = true } = options;
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return { ref, visible };
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '', threshold = 0.1 }) {
  const { ref, visible } = useScrollReveal({ threshold, delay });

  const baseTransforms = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
    'up-left': 'translate-x-[-20px] translate-y-[20px]',
    'up-right': 'translate-x-[20px] translate-y-[20px]',
    scale: 'scale-95',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'opacity-100 !translate-y-0 !translate-x-0 !scale-100'
          : `opacity-0 ${baseTransforms[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
