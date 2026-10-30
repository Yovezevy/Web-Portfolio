import type { LabExperiment } from './types';

/**
 * FILE THE LAB (PLAYGROUND & COMPONENT EXPERIMENTS)
 */
export const labExperiments: LabExperiment[] = [
  {
    id: "dither-shader",
    title: "Dithered 3D WebGL Sphere",
    type: "Shader",
    description: "Custom Three.js particle sphere with retro Bayer matrix dithering aesthetics, rotating smoothly with mouse cursor raycasting.",
    verdict: "Runs at solid 60 FPS by keeping vertex count balanced and bypassing heavy post-processing libraries.",
    component: "DitheredSphere.tsx"
  },
  {
    id: "terminal-cli",
    title: "Interactive Network Terminal Emulator",
    type: "Network Tool",
    description: "A functional pseudo-terminal supporting commands like 'ping', 'traceroute', 'status', 'skills', and 'clear'.",
    verdict: "Bridges the gap between raw command-line engineering and browser interface interactivity.",
    component: "TerminalEmulator.tsx"
  },
  {
    id: "topology-canvas",
    title: "Mesh Node Topology Visualizer",
    type: "Interactive Canvas",
    description: "Canvas 2D generative network nodes with dynamic packet impulses hopping between adjacent peer routers.",
    verdict: "Demonstrates packet transmission mechanics with zero external physics dependencies.",
    component: "TopologyCanvas.tsx"
  },
  {
    id: "latency-monitor",
    title: "Live Edge Latency & Ping Monitor",
    type: "Network Tool",
    description: "Real-time jitter and round-trip time (RTT) monitor showing latency telemetry across global edge nodes.",
    verdict: "High-frequency telemetry simulation with smooth SVG sparklines.",
    component: "LatencyMonitor.tsx"
  }
];
