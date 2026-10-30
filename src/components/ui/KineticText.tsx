import React, { useEffect, useRef, useState } from 'react';

interface KineticTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.04,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <Component
      // @ts-expect-error dynamic component ref
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden py-1">
          <span
            className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(115%)',
              transitionDelay: `${delay + wordIndex * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
