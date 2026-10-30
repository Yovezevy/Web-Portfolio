import React, { useRef } from 'react';
import { useProximityWeight } from '../../hooks/useProximityWeight';

interface ProximityTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  minWeight?: number;
  maxWeight?: number;
  radius?: number;
}

export const ProximityText: React.FC<ProximityTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
  minWeight = 200,
  maxWeight = 850,
  radius = 260,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useProximityWeight(containerRef, {
    min: minWeight,
    max: maxWeight,
    radius: radius,
  });

  const words = children.split(' ');

  return (
    <Component
      // @ts-expect-error dynamic component ref
      ref={containerRef}
      className={`inline-block select-none cursor-default ${className}`}
      style={{ fontVariationSettings: `"wght" ${minWeight}` }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block transition-transform duration-75 hover:text-emerald-300"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Component>
  );
};
