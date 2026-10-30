import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'router' | 'switch' | 'server' | 'edge';
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export const TopologyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [packetCount, setPacketCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Initial Network Topology Nodes
    const nodes: Node[] = [
      { id: '1', label: 'BGP_CORE_01', x: width * 0.2, y: height * 0.35, vx: 0.2, vy: 0.1, type: 'router' },
      { id: '2', label: 'EDGE_TRANSIT', x: width * 0.45, y: height * 0.2, vx: -0.1, vy: 0.2, type: 'edge' },
      { id: '3', label: 'WG_VPN_MESH', x: width * 0.45, y: height * 0.65, vx: 0.15, vy: -0.15, type: 'switch' },
      { id: '4', label: 'WEB_CLUSTER', x: width * 0.75, y: height * 0.3, vx: -0.2, vy: -0.1, type: 'server' },
      { id: '5', label: 'DATACENTER_DB', x: width * 0.8, y: height * 0.7, vx: 0.1, vy: 0.15, type: 'server' },
    ];

    // Links between nodes (pairs of node indices)
    const links: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [3, 4],
    ];

    // Packets traveling along links
    const packets: Packet[] = [];
    for (let i = 0; i < 8; i++) {
      const link = links[Math.floor(Math.random() * links.length)];
      packets.push({
        fromNode: link[0],
        toNode: link[1],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    let animationId: number;
    let totalPacketsRouted = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connection Links (Network Cables/Fibers)
      links.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(242, 242, 238, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 2. Draw & Update Packets (Data impulses)
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          const newLink = links[Math.floor(Math.random() * links.length)];
          p.fromNode = newLink[0];
          p.toNode = newLink[1];
          totalPacketsRouted++;
          if (totalPacketsRouted % 5 === 0) {
            setPacketCount(totalPacketsRouted);
          }
        }

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#22c55e';
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Draw & Update Nodes
      nodes.forEach((node) => {
        // Subtle drift movement within bounds
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'router' ? '#38bdf8' : node.type === 'edge' ? '#22c55e' : '#f2f2ee';
        ctx.fill();

        // Outer pulse ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, 11, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(242, 242, 238, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node label
        ctx.font = '10px "Geist Mono", monospace';
        ctx.fillStyle = '#8a8a86';
        ctx.fillText(node.label, node.x - 28, node.y + 22);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="border border-[rgba(242,242,238,0.12)] bg-[#0d0d0d] p-5 rounded-lg flex flex-col font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(242,242,238,0.08)] mb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-[#f2f2ee] font-semibold tracking-wider uppercase">
            LIVE MESH TOPOLOGY VISUALIZER
          </span>
        </div>
        <div className="text-[11px] text-[#8a8a86] flex items-center gap-3">
          <span className="text-emerald-400">PACKETS ROUTED: {packetCount}</span>
          <span className="text-[#52524e]">•</span>
          <span>PROTOCOL: MESH_OVERLAY</span>
        </div>
      </div>

      <div className="relative w-full h-[360px] bg-[#050505]/70 rounded border border-[rgba(242,242,238,0.05)] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="mt-3 flex justify-between text-[11px] text-[#52524e]">
        <span>NODES: 5 ACTIVE (BGP, VPN, SERVERS)</span>
        <span>LATENCY JITTER: ±0.4ms</span>
      </div>
    </div>
  );
};
