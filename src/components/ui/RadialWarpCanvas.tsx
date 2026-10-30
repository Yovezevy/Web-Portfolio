import React, { useEffect, useRef } from 'react';

interface RadialWarpCanvasProps {
  className?: string;
  speedMultiplier?: number;
}

interface Ray {
  angle: number;
  length: number;
  speed: number;
  width: number;
  opacity: number;
}

export const RadialWarpCanvas: React.FC<RadialWarpCanvasProps> = ({
  className = '',
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

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

    // Initialize 240 radiating rays
    const rayCount = 240;
    const rays: Ray[] = [];
    for (let i = 0; i < rayCount; i++) {
      rays.push({
        angle: (Math.PI * 2 * i) / rayCount + (Math.random() - 0.5) * 0.05,
        length: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        width: Math.random() < 0.15 ? 2.5 : Math.random() < 0.4 ? 1.5 : 0.8,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0.2, Math.min(0.8, nx));
      mouseRef.current.targetY = Math.max(0.2, Math.min(0.8, ny));
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerping
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      const centerX = width * m.x;
      const centerY = height * m.y;
      const maxRadius = Math.hypot(width, height) * 0.85;

      // 1. Draw subtle background grid
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
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

      // 2. Draw subtle concentric distance rings
      for (let r = 80; r < maxRadius; r += 90) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(242, 242, 238, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Draw radiating fiber-optic light rays
      offset += 0.01 * speedMultiplier;
      rays.forEach((ray) => {
        const currentAngle = ray.angle + Math.sin(offset + ray.angle) * 0.02;
        const innerRadius = 26;
        const outerRadius = innerRadius + ray.length * (maxRadius - innerRadius);

        const x1 = centerX + Math.cos(currentAngle) * innerRadius;
        const y1 = centerY + Math.sin(currentAngle) * innerRadius;
        const x2 = centerX + Math.cos(currentAngle) * outerRadius;
        const y2 = centerY + Math.sin(currentAngle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(242, 242, 238, ${ray.opacity})`;
        ctx.lineWidth = ray.width;
        ctx.stroke();
      });

      // 4. Central Node "O" (Glowing White Ring with Inner Hole, as in Screenshot 3)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#050505';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#f2f2ee';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#050505';
      ctx.fill();

      // Outer accent pulse ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block cursor-crosshair ${className}`}
    />
  );
};
