import React, { useEffect, useRef } from 'react';

interface RidgeLinesCanvasProps {
  className?: string;
}

export const RidgeLinesCanvas: React.FC<RidgeLinesCanvasProps> = ({ className = '' }) => {
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

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let animationId: number;
    let t = 0;

    const lineCount = 20;

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

      t += 0.015;
      const mx = (mouseRef.current.x - 0.5) * 40;

      // Render stacked topological telemetry ridge lines
      const startY = height * 0.22;
      const endY = height * 0.88;
      const stepY = (endY - startY) / lineCount;

      for (let i = 0; i < lineCount; i++) {
        const baseY = startY + i * stepY;
        const progress = i / lineCount;

        ctx.beginPath();
        const numPoints = 80;
        const stepX = width / numPoints;

        // Mask out the area under the curve with deep black so lines occlude realistically
        ctx.fillStyle = '#090909';

        for (let j = 0; j <= numPoints; j++) {
          const x = j * stepX;
          const nx = (j / numPoints - 0.5) * 2; // -1 to 1

          // Bell curve envelope: higher in center, flat at margins
          const envelope = Math.exp(-nx * nx * 3.5);

          // Harmonic noise oscillation
          const wave1 = Math.sin(nx * 6 + t + i * 0.4) * 25;
          const wave2 = Math.cos(nx * 14 - t * 1.5 + i * 0.2) * 12;
          const wave3 = Math.sin(nx * 22 + t * 2) * 6;

          const mouseMod = Math.sin((x / width) * Math.PI) * mx * 0.3;
          const elevation = (wave1 + wave2 + wave3 + mouseMod) * envelope * (0.4 + progress * 0.9);

          const y = baseY - elevation;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Close path downwards to fill occlusion
        ctx.lineTo(width, height + 50);
        ctx.lineTo(0, height + 50);
        ctx.closePath();
        ctx.fill();

        // Stroke line
        ctx.beginPath();
        for (let j = 0; j <= numPoints; j++) {
          const x = j * stepX;
          const nx = (j / numPoints - 0.5) * 2;
          const envelope = Math.exp(-nx * nx * 3.5);
          const wave1 = Math.sin(nx * 6 + t + i * 0.4) * 25;
          const wave2 = Math.cos(nx * 14 - t * 1.5 + i * 0.2) * 12;
          const wave3 = Math.sin(nx * 22 + t * 2) * 6;
          const mouseMod = Math.sin((x / width) * Math.PI) * mx * 0.3;
          const elevation = (wave1 + wave2 + wave3 + mouseMod) * envelope * (0.4 + progress * 0.9);
          const y = baseY - elevation;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.25 + progress * 0.65;
        ctx.strokeStyle = i % 5 === 0 ? `rgba(34, 197, 94, ${alpha * 0.9})` : `rgba(242, 242, 238, ${alpha})`;
        ctx.lineWidth = i % 5 === 0 ? 1.5 : 1;
        ctx.stroke();

        // Pulsing security telemetry node at key peaks
        if (i % 6 === 2) {
          const peakX = width * 0.5 + Math.sin(t + i) * 60;
          const peakY = baseY - 28;
          ctx.beginPath();
          ctx.arc(peakX, peakY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

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
