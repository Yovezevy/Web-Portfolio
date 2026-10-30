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

export const ContinentalGlobeCanvas: React.FC<ContinentalGlobeCanvasProps> = ({
  className = '',
  progress = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });
  const rotRef = useRef({ y: -1.9, x: 0.25 }); // Start facing Indonesia / SE Asia

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Approximate continent shapes with spherical point clusters
    const points: Point3D[] = [];
    const totalPoints = 1400;

    // Helper to determine if a lat/lon is landmass
    const isLandmass = (lat: number, lon: number): boolean => {
      // Indonesia & SE Asia (Lat: -11 to 25, Lon: 95 to 142)
      if (lat >= -11 && lat <= 20 && lon >= 95 && lon <= 142) return true;
      // East Asia (Lat: 20 to 55, Lon: 100 to 145)
      if (lat >= 20 && lat <= 55 && lon >= 100 && lon <= 145) return true;
      // Australia (Lat: -40 to -11, Lon: 113 to 154)
      if (lat >= -40 && lat <= -11 && lon >= 113 && lon <= 154) return true;
      // India / South Asia (Lat: 6 to 35, Lon: 68 to 92)
      if (lat >= 6 && lat <= 35 && lon >= 68 && lon <= 92) return true;
      // Europe (Lat: 36 to 65, Lon: -10 to 45)
      if (lat >= 36 && lat <= 65 && lon >= -10 && lon <= 45) return true;
      // Africa (Lat: -35 to 37, Lon: -18 to 51)
      if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 51) return true;
      // North America (Lat: 15 to 70, Lon: -168 to -52)
      if (lat >= 15 && lat <= 70 && lon >= -168 && lon <= -52) return true;
      // South America (Lat: -56 to 12, Lon: -81 to -34)
      if (lat >= -56 && lat <= 12 && lon >= -81 && lon <= -34) return true;
      return false;
    };

    // Generate points distributed across sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < totalPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / totalPoints);
      const lat = (Math.PI / 2 - phi) * (180 / Math.PI);
      const lon = ((theta % (2 * Math.PI)) - Math.PI) * (180 / Math.PI);

      const isLand = isLandmass(lat, lon);

      // Only keep points with high probability if land, or low probability if ocean grid
      if (isLand || Math.random() < 0.22) {
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

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current.isDragging) return;
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      rotRef.current.y += dx * 0.006;
      rotRef.current.x = Math.max(-0.6, Math.min(0.6, rotRef.current.x + dy * 0.006));
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Slow gentle auto-rotation when not dragging
      if (!mouseRef.current.isDragging) {
        rotRef.current.y += 0.003;
      }

      t += 0.03;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;

      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);
      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);

      const project = (p3: { x: number; y: number; z: number }) => {
        // Rotate Y
        const x1 = p3.x * cosY - p3.z * sinY;
        const z1 = p3.z * cosY + p3.x * sinY;
        // Rotate X
        const y2 = p3.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p3.y * sinX;

        return {
          x: centerX + x1 * radius,
          y: centerY - y2 * radius,
          z: z2,
        };
      };

      // Draw faint outer boundary circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw dashed equator
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * Math.sin(rotRef.current.x), 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 242, 238, 0.04)';
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Project all points
      const projected = points.map((p) => {
        const pt = project(p);
        return {
          ...pt,
          isLand: p.isLand,
          baseRadius: p.baseRadius,
        };
      });

      // Render points (only visible on hemisphere z > 0)
      for (const p of projected) {
        if (p.z <= -0.05) continue;
        const alpha = Math.max(0.1, (p.z + 0.1) * (p.isLand ? 0.95 : 0.35));
        const dotSize = p.baseRadius * (p.isLand ? 1.3 : 0.85);

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = p.isLand
          ? `rgba(242, 242, 238, ${alpha})`
          : `rgba(242, 242, 238, ${alpha * 0.4})`;
        ctx.fill();
      }

      // Draw Journey Arc between Balikpapan and Surabaya
      const bpn3D = to3D(BPN.lat, BPN.lon, 1.0);
      const sub3D = to3D(SUB.lat, SUB.lon, 1.0);

      const numArcPoints = 40;
      const arcPoints = [];

      for (let i = 0; i <= numArcPoints; i++) {
        const f = i / numArcPoints;
        // Spherical linear interpolation with parabolic altitude hump
        const alt = 1.0 + Math.sin(f * Math.PI) * 0.14; // altitude arc
        const ix = bpn3D.x + (sub3D.x - bpn3D.x) * f;
        const iy = bpn3D.y + (sub3D.y - bpn3D.y) * f;
        const iz = bpn3D.z + (sub3D.z - bpn3D.z) * f;
        const len = Math.hypot(ix, iy, iz);
        const normX = (ix / len) * alt;
        const normY = (iy / len) * alt;
        const normZ = (iz / len) * alt;

        arcPoints.push(project({ x: normX, y: normY, z: normZ }));
      }

      // Render dashed arc
      ctx.beginPath();
      let started = false;
      const visibleArcCount = Math.floor(numArcPoints * progress);

      for (let i = 0; i <= visibleArcCount; i++) {
        const pt = arcPoints[i];
        if (pt.z > -0.1) {
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

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -t * 12;
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling data packet along arc
      if (visibleArcCount > 2) {
        const packetIdx = Math.floor((t * 8) % visibleArcCount);
        const packetPt = arcPoints[packetIdx];
        if (packetPt && packetPt.z > 0) {
          ctx.beginPath();
          ctx.arc(packetPt.x, packetPt.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#f2f2ee';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Marker Function (Target square radar box with coordinates)
      const drawMarker = (
        p3D: { x: number; y: number; z: number },
        label: string,
        isOrigin: boolean
      ) => {
        const pt = project(p3D);
        if (pt.z <= 0.05) return;

        const pulseSize = 4 + (Math.sin(t * 3) + 1) * 3;

        // Target Box
        ctx.strokeStyle = isOrigin ? 'rgba(242, 242, 238, 0.9)' : '#22c55e';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(pt.x - 5, pt.y - 5, 10, 10);

        // Outer pulse square
        ctx.strokeStyle = isOrigin ? 'rgba(242, 242, 238, 0.3)' : 'rgba(34, 197, 94, 0.4)';
        ctx.strokeRect(pt.x - pulseSize, pt.y - pulseSize, pulseSize * 2, pulseSize * 2);

        // Center dot
        ctx.fillStyle = isOrigin ? '#f2f2ee' : '#22c55e';
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
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full aspect-square block cursor-grab active:cursor-grabbing ${className}`}
    />
  );
};
