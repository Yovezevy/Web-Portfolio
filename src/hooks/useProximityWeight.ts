import { useEffect } from 'react';
import type { RefObject } from 'react';

interface ProximityWeightOptions {
  min?: number;
  max?: number;
  radius?: number;
  lerp?: number;
}

export const useProximityWeight = (
  containerRef: RefObject<HTMLElement | null>,
  {
    min = 150,
    max = 850,
    radius = 280,
    lerp = 0.18,
  }: ProximityWeightOptions = {}
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(hover: none)').matches) return;

    const chars = Array.from(container.querySelectorAll<HTMLElement>('.char'));
    if (chars.length === 0) return;

    let centers: { x: number; y: number }[] = [];
    const weights = chars.map(() => min);
    let cursorX = -9999;
    let cursorY = -9999;
    let rafId = 0;
    let isHovering = false;

    const updateCenters = () => {
      centers = chars.map((char) => {
        const rect = char.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
    };

    const animate = () => {
      let isAnimating = false;

      chars.forEach((char, idx) => {
        const center = centers[idx];
        if (!center) return;

        const dist = Math.hypot(cursorX - center.x, cursorY - center.y);
        const factor = Math.max(0, 1 - dist / radius);

        // Cubic smoothstep easing: factor * factor * (3 - 2 * factor)
        const targetWeight = min + (max - min) * factor * factor * (3 - 2 * factor);

        // Smooth lerping
        weights[idx] += lerp * (targetWeight - weights[idx]);

        if (Math.abs(targetWeight - weights[idx]) > 0.6) {
          isAnimating = true;
        }

        char.style.fontVariationSettings = `"wght" ${weights[idx].toFixed(0)}`;
      });

      rafId = isAnimating || isHovering ? requestAnimationFrame(animate) : 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      if (!rafId) {
        updateCenters();
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerEnter = () => {
      isHovering = true;
      updateCenters();
    };

    const handlePointerLeave = () => {
      isHovering = false;
      cursorX = -9999;
      cursorY = -9999;
    };

    const parent = container.parentElement ?? container;

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerenter', handlePointerEnter);
    parent.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('scroll', updateCenters, { passive: true });
    window.addEventListener('resize', updateCenters);

    // Initial centers calculation
    updateCenters();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerenter', handlePointerEnter);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', updateCenters);
      window.removeEventListener('resize', updateCenters);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef, min, max, radius, lerp]);
};
