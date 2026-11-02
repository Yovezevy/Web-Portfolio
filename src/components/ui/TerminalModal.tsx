import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'sysinfo',
      output: (
        <div className="text-blue-400 space-y-1">
          <p>NET_DEV OS [Version 5.15.0-hardened]</p>
          <p>System Online. Type <span className="text-white font-bold">'help'</span> for a list of available network commands.</p>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    if (!trimmed) return;

    if (trimmed === 'help') {
      response = (
        <div className="space-y-1 text-[#8a8a86]">
          <p className="text-white font-semibold">AVAILABLE NETWORK COMMANDS:</p>
          <p><span className="text-blue-400 font-bold">status</span>       - Display system uptime, network status, and metrics</p>
          <p><span className="text-blue-400 font-bold">ping [host]</span>  - Send simulated ICMP echo packets</p>
          <p><span className="text-blue-400 font-bold">traceroute</span>   - Trace routing hops to target gateway</p>
          <p><span className="text-blue-400 font-bold">skills</span>       - List technical capabilities & networking protocols</p>
          <p><span className="text-blue-400 font-bold">projects</span>     - Show featured infrastructure and web projects</p>
          <p><span className="text-blue-400 font-bold">whoami</span>       - Display developer biography and role</p>
          <p><span className="text-blue-400 font-bold">contact</span>      - Get direct contact info</p>
          <p><span className="text-blue-400 font-bold">clear</span>        - Clear the terminal screen</p>
          <p><span className="text-blue-400 font-bold">exit</span>         - Close the terminal session</p>
        </div>
      );
    } else if (trimmed === 'clear') {
      setHistory([]);
      return;
    } else if (trimmed === 'exit') {
      onClose();
      return;
    } else if (trimmed === 'status') {
      response = (
        <div className="space-y-1 text-[#8a8a86]">
          <p className="text-white">--- SYSTEM INTERFACE TELEMETRY ---</p>
          <p>HOST: <span className="text-blue-400">{profileData.name}</span></p>
          <p>ROLE: <span className="text-blue-400">{profileData.role}</span></p>
          <p>AVAILABILITY: <span className="text-cyan-400">{profileData.availability}</span></p>
          <p>UPTIME: <span className="text-blue-400">99.99%</span> // ZERO OUTAGES</p>
          <p>LATENCY (EDGE): <span className="text-blue-400">11.4ms</span></p>
          <p>ACTIVE INTERFACES: eth0 (WAN/BGP), wg0 (WireGuard Mesh), br0 (LAN)</p>
        </div>
      );
    } else if (trimmed.startsWith('ping')) {
      const target = trimmed.split(' ')[1] || '8.8.8.8';
      response = (
        <div className="space-y-0.5 text-[#8a8a86]">
          <p>PING {target} (56 data bytes):</p>
          <p>64 bytes from {target}: icmp_seq=1 ttl=118 time=11.2 ms</p>
          <p>64 bytes from {target}: icmp_seq=2 ttl=118 time=10.8 ms</p>
          <p>64 bytes from {target}: icmp_seq=3 ttl=118 time=12.1 ms</p>
          <p>64 bytes from {target}: icmp_seq=4 ttl=118 time=11.5 ms</p>
          <p className="text-blue-400 font-bold pt-1">--- {target} ping statistics: 4 packets transmitted, 0% packet loss ---</p>
        </div>
      );
    } else if (trimmed === 'traceroute' || trimmed.startsWith('traceroute')) {
      response = (
        <div className="space-y-0.5 text-[#8a8a86]">
          <p>traceroute to 1.1.1.1, 30 hops max, 60 byte packets</p>
          <p> 1  192.168.1.1 (gateway.local)  0.642 ms</p>
          <p> 2  10.240.0.1 (isp-core.transit)  2.114 ms</p>
          <p> 3  172.16.8.4 (bgp-peer-ixp)  5.480 ms</p>
          <p> 4  1.1.1.1 (one.one.one.one)  9.812 ms</p>
          <p className="text-cyan-400 pt-1">Route optimal. All 4 transit hops verified.</p>
        </div>
      );
    } else if (trimmed === 'skills') {
      response = (
        <div className="space-y-2 text-[#8a8a86]">
          {skillsData.map((cat) => (
            <div key={cat.title}>
              <p className="text-white font-bold">{cat.title}:</p>
              <p className="text-xs pl-2">
                {cat.skills.map((s) => s.name).join(' • ')}
              </p>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'projects') {
      response = (
        <div className="space-y-1.5 text-[#8a8a86]">
          <p className="text-white font-bold">PORTFOLIO PROJECTS:</p>
          {projectsData.map((p) => (
            <p key={p.id}>
              <span className="text-blue-400 font-semibold">{p.year}</span> —{' '}
              <span className="text-white">{p.title}</span> ({p.category})
            </p>
          ))}
        </div>
      );
    } else if (trimmed === 'whoami') {
      response = (
        <div className="space-y-1 text-[#8a8a86]">
          <p className="text-white font-semibold">{profileData.name} — {profileData.role}</p>
          <p>{profileData.bio[0]}</p>
        </div>
      );
    } else if (trimmed === 'contact') {
      response = (
        <div className="space-y-1 text-[#8a8a86]">
          <p>EMAIL: <span className="text-blue-400">{profileData.email}</span></p>
          <p>STATUS: <span className="text-white">{profileData.availability}</span></p>
        </div>
      );
    } else {
      response = (
        <p className="text-rose-400">
          zsh: command not found: {trimmed}. Type <span className="text-white underline">'help'</span> for command list.
        </p>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`bg-[#0a0a0a] border border-[rgba(242,242,238,0.2)] rounded-lg shadow-2xl flex flex-col font-mono text-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-full h-full max-w-none max-h-none' : 'w-full max-w-3xl h-[560px]'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#141414] px-4 py-2.5 flex items-center justify-between border-b border-[rgba(242,242,238,0.1)] select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-[#f2f2ee] font-medium tracking-wide">
              terminal@net-dev-session: ~ (bash)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#8a8a86] hover:text-[#f2f2ee] p-1"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-[#8a8a86] hover:text-rose-400 p-1"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div
          className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 text-xs md:text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#8a8a86]">
                <span className="text-blue-400 font-bold">user@net-dev:~$</span>
                <span className="text-[#f2f2ee]">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Prompt Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 pt-1"
          >
            <span className="text-blue-400 font-bold shrink-0">user@net-dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#f2f2ee] font-mono focus:ring-0 p-0 text-xs md:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer Status Bar */}
        <div className="bg-[#111111] px-4 py-1.5 border-t border-[rgba(242,242,238,0.06)] flex justify-between text-[11px] text-[#52524e] font-mono">
          <span>PORT: 22 (SSH_TUNNEL)</span>
          <span>UTF-8 // LF // BASH</span>
        </div>
      </div>
    </div>
  );
};
