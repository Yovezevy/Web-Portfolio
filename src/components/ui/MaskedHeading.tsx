import React, { useEffect, useRef, useState } from 'react';

interface MaskedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  children: string;
  className?: string;
  stagger?: number; // Delay between words in seconds (e.g. 0.04)
  delay?: number; // Initial delay in seconds
  triggerOnce?: boolean;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  as: Component = 'h2',
  children,
  className = '',
  stagger = 0.035,
  delay = 0,
  triggerOnce = true,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  // Split text by space into words
  const words = children.trim().split(/\s+/);

  const Tag = Component as 'h2';

  return (
    <Tag
      ref={containerRef}
      className={`inline-block select-none ${className}`}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="flex flex-wrap items-baseline gap-x-[0.28em]">
        {words.map((word, wordIdx) => {
          const wordDelay = delay + wordIdx * stagger;
          return (
            <span
              key={`${word}-${wordIdx}`}
              className="inline-block overflow-hidden align-top py-1 -my-1"
            >
              <span
                className="inline-block will-change-transform transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isRevealed
                    ? 'translate3d(0, 0%, 0)'
                    : 'translate3d(0, 115%, 0)',
                  transitionDelay: `${wordDelay.toFixed(3)}s`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
};
