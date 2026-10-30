import React, { useState, useRef, useEffect } from 'react';

interface ScrambleTextProps {
  children: string;
  className?: string;
  scrambleOnMount?: boolean;
}

const GLYPHS = '!@#$%^&*()_+-=~[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  children,
  className = '',
  scrambleOnMount = false,
}) => {
  const [displayText, setDisplayText] = useState(children);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    let iteration = 0;
    const original = children;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        original
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return original[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= original.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 25);
  };

  useEffect(() => {
    setDisplayText(children);
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [children, scrambleOnMount]);

  return (
    <span
      onMouseEnter={startScramble}
      className={`inline-block font-mono transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};
