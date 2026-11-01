import React, { useEffect, useRef } from 'react';

interface HalftoneGlobeCanvasProps {
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
}

export const HalftoneGlobeCanvas: React.FC<HalftoneGlobeCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Generate Halftone Fibonacci Sphere Points
    const numPoints = 550;
    const points: Point3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);

      // Halftone dot sizing varies by latitude
      const baseRadius = 0.8 + Math.sin(phi * 3) * 0.4 + (i % 7 === 0 ? 0.8 : 0);
      points.push({ x, y, z, baseRadius });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let animationId: number;
    let angleY = 0;
    let angleX = 0.3;

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.38;

      angleY += 0.006;
      const targetAngleX = 0.3 + (mouseRef.current.y - 0.5) * 0.5;
      angleX += (targetAngleX - angleX) * 0.05;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Render outer equator orbit ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius + 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Transform and sort points by Z-depth
      const projected = points.map((p) => {
        // Rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const scale = 2.2 / (2.2 + z2);
        const projX = centerX + x1 * globeRadius * scale;
        const projY = centerY + y2 * globeRadius * scale;

        return {
          x: projX,
          y: projY,
          z: z2,
          radius: p.baseRadius * scale * (1.2 + z2 * 0.8),
          alpha: Math.max(0.08, (z2 + 1) / 2),
        };
      });

      // Sort points back to front
      projected.sort((a, b) => a.z - b.z);

      // Render points
      projected.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.radius), 0, Math.PI * 2);

        if (idx % 14 === 0 && p.z > 0.2) {
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(242, 242, 238, ${Math.min(0.9, p.alpha * 0.95)})`;
          ctx.fill();
        }
      });

      // Central core crosshair indicator
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.lineWidth = 1;
      const chSize = 8;
      ctx.beginPath();
      ctx.moveTo(centerX - chSize, centerY);
      ctx.lineTo(centerX + chSize, centerY);
      ctx.moveTo(centerX, centerY - chSize);
      ctx.lineTo(centerX, centerY + chSize);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block cursor-crosshair ${className}`}
    />
  );
};
