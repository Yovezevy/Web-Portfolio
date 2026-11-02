import React, { useEffect, useRef } from 'react';

interface ContinentalGlobeCanvasProps {
  className?: string;
  progress?: number; // 0 to 1 progress of the journey arc
}

interface Point3D {
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
  isLand: boolean;
  baseRadius: number;
}

// Generate points distributed across sphere once statically so it is completely stable
const generateSpherePoints = (): Point3D[] => {
  const points: Point3D[] = [];
  const totalPoints = 1400;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  const isLandmass = (lat: number, lon: number): boolean => {
    // Indonesia & SE Asia
    if (lat >= -11 && lat <= 20 && lon >= 95 && lon <= 142) return true;
    // East Asia
    if (lat >= 20 && lat <= 55 && lon >= 100 && lon <= 145) return true;
    // Australia
    if (lat >= -40 && lat <= -11 && lon >= 113 && lon <= 154) return true;
    // India / South Asia
    if (lat >= 6 && lat <= 35 && lon >= 68 && lon <= 92) return true;
    // Europe
    if (lat >= 36 && lat <= 65 && lon >= -10 && lon <= 45) return true;
    // Africa
    if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 51) return true;
    // North America
    if (lat >= 15 && lat <= 70 && lon >= -168 && lon <= -52) return true;
    // South America
    if (lat >= -56 && lat <= 12 && lon >= -81 && lon <= -34) return true;
    return false;
  };

  for (let i = 0; i < totalPoints; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / totalPoints);
    const lat = (Math.PI / 2 - phi) * (180 / Math.PI);
    const lon = ((theta % (2 * Math.PI)) - Math.PI) * (180 / Math.PI);

    const isLand = isLandmass(lat, lon);
    const randCheck = ((i * 9301 + 49297) % 233280) / 233280; // pseudo-random deterministic

    if (isLand || randCheck < 0.22) {
      const x = Math.cos(phi - Math.PI / 2) * Math.sin(theta);
      const y = Math.sin(phi - Math.PI / 2);
      const z = Math.cos(phi - Math.PI / 2) * Math.cos(theta);
      points.push({
        lat,
        lon,
        x,
        y,
        z,
        isLand,
        baseRadius: isLand ? 1.4 : 0.75,
      });
    }
  }

  return points;
};

const STATIC_POINTS = generateSpherePoints();

export const ContinentalGlobeCanvas: React.FC<ContinentalGlobeCanvasProps> = ({
  className = '',
  progress = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });
  const rotRef = useRef({ y: -1.9, x: 0.25 }); // Start facing Indonesia / SE Asia
  const progressRef = useRef(progress);

  // Keep progress updated in ref without causing useEffect teardown
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 450;
    let height = 450;
    let isVisible = true;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(280, canvas.parentElement.clientWidth);
      height = Math.max(280, canvas.parentElement.clientHeight || width);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (typeof ctx.resetTransform === 'function') {
        ctx.resetTransform();
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Coordinates:
    // Balikpapan (Origin)
    const BPN = { lat: -1.2675, lon: 116.8289, label: 'BPN · 1.26°S' };
    // Surabaya / ITS (Destination)
    const SUB = { lat: -7.2797, lon: 112.7974, label: 'SUB/ITS · 7.28°S' };

    const to3D = (lat: number, lon: number, altitude = 1.0) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -altitude * Math.sin(phi) * Math.cos(theta),
        y: altitude * Math.cos(phi),
        z: altitude * Math.sin(phi) * Math.sin(theta),
      };
    };

    // Mouse & Touch Drag Handlers
    const startDrag = (clientX: number, clientY: number) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    };

    const moveDrag = (clientX: number, clientY: number) => {
      if (!mouseRef.current.isDragging) return;
      const dx = clientX - mouseRef.current.lastX;
      const dy = clientY - mouseRef.current.lastY;

      if (!isNaN(dx) && !isNaN(dy)) {
        rotRef.current.y += dx * 0.006;
        rotRef.current.x = Math.max(-0.6, Math.min(0.6, rotRef.current.x + dy * 0.006));
      }

      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    };

    const endDrag = () => {
      mouseRef.current.isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
    const onMouseUp = () => endDrag();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => endDrag();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Pause loop when off-screen to save battery and prevent context dropping
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let animationId: number;
    let t = 0;

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Auto rotation when not dragging
      if (!mouseRef.current.isDragging) {
        rotRef.current.y += 0.003;
      }

      // Safeguard against NaN
      if (isNaN(rotRef.current.y)) rotRef.current.y = -1.9;
      if (isNaN(rotRef.current.x)) rotRef.current.x = 0.25;

      t += 0.03;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);
      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);

      const project = (p3: { x: number; y: number; z: number }) => {
        const x1 = p3.x * cosY - p3.z * sinY;
        const z1 = p3.z * cosY + p3.x * sinY;
        const y2 = p3.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p3.y * sinX;

        return {
          x: centerX + x1 * radius,
          y: centerY - y2 * radius,
          z: z2,
        };
      };

      // 1. Draw boundary circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Draw dashed equator
      const eqY = Math.abs(Math.sin(rotRef.current.x));
      if (!isNaN(eqY)) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius * eqY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(242, 242, 238, 0.05)';
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Render spherical land points
      for (let i = 0; i < STATIC_POINTS.length; i++) {
        const p = STATIC_POINTS[i];
        const pt = project(p);

        if (pt.z <= -0.05 || isNaN(pt.x) || isNaN(pt.y)) continue;
        const alpha = Math.max(0.12, (pt.z + 0.1) * (p.isLand ? 0.95 : 0.35));
        const dotSize = p.baseRadius * (p.isLand ? 1.3 : 0.85);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = p.isLand
          ? `rgba(242, 242, 238, ${alpha})`
          : `rgba(242, 242, 238, ${alpha * 0.4})`;
        ctx.fill();
      }

      // 4. Draw Journey Arc between Balikpapan and Surabaya
      const bpn3D = to3D(BPN.lat, BPN.lon, 1.0);
      const sub3D = to3D(SUB.lat, SUB.lon, 1.0);

      const numArcPoints = 40;
      const arcPoints = [];

      for (let i = 0; i <= numArcPoints; i++) {
        const f = i / numArcPoints;
        const alt = 1.0 + Math.sin(f * Math.PI) * 0.14;
        const ix = bpn3D.x + (sub3D.x - bpn3D.x) * f;
        const iy = bpn3D.y + (sub3D.y - bpn3D.y) * f;
        const iz = bpn3D.z + (sub3D.z - bpn3D.z) * f;
        const len = Math.hypot(ix, iy, iz);
        if (len > 0) {
          const normX = (ix / len) * alt;
          const normY = (iy / len) * alt;
          const normZ = (iz / len) * alt;
          arcPoints.push(project({ x: normX, y: normY, z: normZ }));
        }
      }

      // Render dashed emerald trajectory arc
      const curProgress = Math.max(0, Math.min(1, progressRef.current));
      const visibleArcCount = Math.floor(numArcPoints * curProgress);

      if (arcPoints.length > 0 && visibleArcCount > 0) {
        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= visibleArcCount && i < arcPoints.length; i++) {
          const pt = arcPoints[i];
          if (pt.z > -0.1 && !isNaN(pt.x) && !isNaN(pt.y)) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -t * 12;
        ctx.stroke();
        ctx.setLineDash([]);

        // Traveling data light packet along arc
        if (visibleArcCount > 2) {
          const packetIdx = Math.floor((t * 8) % visibleArcCount);
          const packetPt = arcPoints[packetIdx];
          if (packetPt && packetPt.z > 0 && !isNaN(packetPt.x) && !isNaN(packetPt.y)) {
            ctx.beginPath();
            ctx.arc(packetPt.x, packetPt.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f2f2ee';
            ctx.shadowColor = '#3b82f6';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 5. Draw Marker Function
      const drawMarker = (
        p3D: { x: number; y: number; z: number },
        label: string,
        isOrigin: boolean
      ) => {
        const pt = project(p3D);
        if (pt.z <= 0.05 || isNaN(pt.x) || isNaN(pt.y)) return;

        const pulseSize = 4 + (Math.sin(t * 3) + 1) * 3;

        // Target Box
        ctx.strokeStyle = isOrigin ? 'rgba(242, 242, 238, 0.9)' : '#3b82f6';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(pt.x - 5, pt.y - 5, 10, 10);

        // Outer pulse square
        ctx.strokeStyle = isOrigin ? 'rgba(242, 242, 238, 0.3)' : 'rgba(59, 130, 246, 0.4)';
        ctx.strokeRect(pt.x - pulseSize, pt.y - pulseSize, pulseSize * 2, pulseSize * 2);

        // Center dot
        ctx.fillStyle = isOrigin ? '#f2f2ee' : '#3b82f6';
        ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);

        // Technical Label
        ctx.font = '500 10px Geist Mono, monospace';
        ctx.fillStyle = '#f2f2ee';
        const isRight = pt.x > centerX;
        ctx.textAlign = isRight ? 'left' : 'right';
        ctx.fillText(label, pt.x + (isRight ? 12 : -12), pt.y + 3);
      };

      drawMarker(bpn3D, BPN.label, true);
      drawMarker(sub3D, SUB.label, false);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full aspect-square block cursor-grab active:cursor-grabbing ${className}`}
    />
  );
};
