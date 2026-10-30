import React, { useState, useMemo } from 'react';
import { Network, Sliders, CheckCircle2, Copy, Check } from 'lucide-react';

export const SubnetCalculator: React.FC = () => {
  const [ipInput, setIpInput] = useState<string>('192.168.10.1');
  const [cidr, setCidr] = useState<number>(24);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Helper conversions
  const intToIp = (val: number): string => {
    return [
      (val >>> 24) & 255,
      (val >>> 16) & 255,
      (val >>> 8) & 255,
      val & 255,
    ].join('.');
  };

  const ipToInt = (ip: string): number | null => {
    const parts = ip.trim().split('.');
    if (parts.length !== 4) return null;
    let res = 0;
    for (let i = 0; i < 4; i++) {
      const n = parseInt(parts[i], 10);
      if (isNaN(n) || n < 0 || n > 255) return null;
      res = (res << 8) + n;
    }
    return res >>> 0;
  };

  const calculation = useMemo(() => {
    const ipInt = ipToInt(ipInput);
    if (ipInt === null || cidr < 1 || cidr > 32) return null;

    const maskInt = cidr === 0 ? 0 : ((~0 << (32 - cidr)) >>> 0);
    const wildcardInt = (~maskInt) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | wildcardInt) >>> 0;

    const totalIps = Math.pow(2, 32 - cidr);
    let usableHosts = 0;
    let firstUsable = '';
    let lastUsable = '';

    if (cidr === 32) {
      usableHosts = 1;
      firstUsable = intToIp(netInt);
      lastUsable = intToIp(netInt);
    } else if (cidr === 31) {
      usableHosts = 2; // RFC 3021
      firstUsable = intToIp(netInt);
      lastUsable = intToIp(bcastInt);
    } else {
      usableHosts = totalIps - 2;
      firstUsable = intToIp(netInt + 1);
      lastUsable = intToIp(bcastInt - 1);
    }

    // Determine RFC 1918 Scope
    const o1 = (ipInt >>> 24) & 255;
    const o2 = (ipInt >>> 16) & 255;
    let scope = 'PUBLIC INTERNET IP';
    if (o1 === 10) scope = 'PRIVATE (RFC 1918 - CLASS A)';
    else if (o1 === 172 && o2 >= 16 && o2 <= 31) scope = 'PRIVATE (RFC 1918 - CLASS B)';
    else if (o1 === 192 && o2 === 168) scope = 'PRIVATE (RFC 1918 - CLASS C)';
    else if (o1 === 127) scope = 'LOOPBACK / LOCALHOST';
    else if (o1 === 169 && o2 === 254) scope = 'LINK-LOCAL (APIPA)';

    // Binary bitstream (32-bit string)
    const binaryIp = (ipInt >>> 0).toString(2).padStart(32, '0');
    const binaryMask = (maskInt >>> 0).toString(2).padStart(32, '0');

    return {
      networkAddress: intToIp(netInt),
      broadcastAddress: intToIp(bcastInt),
      subnetMask: intToIp(maskInt),
      wildcardMask: intToIp(wildcardInt),
      firstUsable,
      lastUsable,
      usableHosts: usableHosts.toLocaleString(),
      totalIps: totalIps.toLocaleString(),
      scope,
      binaryIp,
      binaryMask,
    };
  }, [ipInput, cidr]);

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const presets = [
    { label: '/24 Standard LAN', cidr: 24, ip: '192.168.10.1' },
    { label: '/27 Branch Subnet', cidr: 27, ip: '172.16.20.1' },
    { label: '/29 HA Gateway', cidr: 29, ip: '10.0.50.1' },
    { label: '/30 Point-to-Point', cidr: 30, ip: '10.255.0.1' },
    { label: '/16 Enterprise Backbone', cidr: 16, ip: '10.10.0.1' },
  ];

  return (
    <div className="p-6 md:p-8 bg-[#090909] border border-[rgba(242,242,238,0.12)] rounded-lg font-mono">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[rgba(242,242,238,0.08)] gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base text-[#f2f2ee] font-bold uppercase tracking-wider">
              INTERACTIVE CIDR &amp; SUBNETTING CALCULATOR
            </h3>
            <p className="text-xs text-[#8a8a86]">
              32-BIT BINARY OCTET BREAKDOWN • RFC 1918 &amp; VLSM ROUTING ENGINE
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CISCO CCNA / MIKROTIK MTCRE STANDARD</span>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* IPv4 Address Input */}
        <div className="md:col-span-6">
          <label className="block text-xs uppercase tracking-widest text-[#8a8a86] mb-2">
            IPv4 Host Address:
          </label>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="e.g. 192.168.10.1"
            className="w-full bg-[#050505] border border-[rgba(242,242,238,0.18)] focus:border-emerald-400 px-4 py-2.5 rounded text-sm text-[#f2f2ee] outline-none transition-colors"
          />
        </div>

        {/* CIDR Prefix Slider & Value */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2 text-xs uppercase tracking-widest text-[#8a8a86]">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>CIDR Prefix:</span>
            </div>
            <span className="text-sm text-emerald-400 font-bold tabular-nums">
              /{cidr} ({calculation?.subnetMask || '255.255.255.0'})
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="30"
            step="1"
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-[rgba(242,242,238,0.15)] rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-[11px] text-[#52524e] uppercase mr-1">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setCidr(p.cidr);
              setIpInput(p.ip);
            }}
            className="px-2.5 py-1 text-[11px] bg-[rgba(242,242,238,0.04)] hover:bg-[#f2f2ee] hover:text-[#050505] text-[#8a8a86] border border-[rgba(242,242,238,0.1)] rounded transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Calculated Results Bento Grid */}
      {calculation ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Network Address */}
            <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#8a8a86] uppercase tracking-widest">NETWORK ID</span>
                <button
                  onClick={() => copyToClipboard('net', calculation.networkAddress)}
                  className="text-[#52524e] hover:text-emerald-400 transition-colors"
                >
                  {copiedKey === 'net' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-base text-emerald-400 font-bold tabular-nums">
                {calculation.networkAddress}
              </span>
            </div>

            {/* Broadcast Address */}
            <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#8a8a86] uppercase tracking-widest">BROADCAST ID</span>
                <button
                  onClick={() => copyToClipboard('bcast', calculation.broadcastAddress)}
                  className="text-[#52524e] hover:text-emerald-400 transition-colors"
                >
                  {copiedKey === 'bcast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-base text-[#f2f2ee] font-bold tabular-nums">
                {calculation.broadcastAddress}
              </span>
            </div>

            {/* Usable Hosts */}
            <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded flex flex-col justify-between">
              <span className="text-[10px] text-[#8a8a86] uppercase tracking-widest mb-2">USABLE HOSTS</span>
              <span className="text-base text-[#f2f2ee] font-bold tabular-nums">
                {calculation.usableHosts} <span className="text-xs font-normal text-[#8a8a86]">/ {calculation.totalIps} total</span>
              </span>
            </div>

            {/* Wildcard Mask */}
            <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded flex flex-col justify-between">
              <span className="text-[10px] text-[#8a8a86] uppercase tracking-widest mb-2">WILDCARD (OSPF/ACL)</span>
              <span className="text-base text-cyan-400 font-bold tabular-nums">
                {calculation.wildcardMask}
              </span>
            </div>
          </div>

          {/* Usable Host Range & Scope */}
          <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div>
              <span className="text-[#8a8a86] block text-[10px] uppercase tracking-widest mb-1">
                USABLE HOST ADDRESS RANGE
              </span>
              <span className="text-[#f2f2ee] font-bold text-sm tracking-wide">
                {calculation.firstUsable} <span className="text-[#52524e]">➔</span> {calculation.lastUsable}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[#8a8a86] block text-[10px] uppercase tracking-widest mb-1">
                ROUTING SCOPE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>{calculation.scope}</span>
              </span>
            </div>
          </div>

          {/* 32-Bit Binary Bitstream Breakdown */}
          <div className="p-4 bg-[#050505] border border-[rgba(242,242,238,0.08)] rounded">
            <span className="text-[10px] text-[#8a8a86] uppercase tracking-widest block mb-2">
              32-BIT BINARY OCTET BREAKDOWN (NETWORK BITS IN GREEN // HOST BITS IN GRAY)
            </span>
            <div className="space-y-1.5 font-mono text-xs overflow-x-auto pb-1">
              {/* Binary Mask */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#8a8a86] text-[10px]">MASK:</span>
                <span className="tracking-widest">
                  {[0, 1, 2, 3].map((oct) => {
                    const slice = calculation.binaryMask.slice(oct * 8, oct * 8 + 8);
                    return (
                      <span key={oct} className="mr-3">
                        {slice.split('').map((bit, bitIdx) => {
                          const globalIdx = oct * 8 + bitIdx;
                          return (
                            <span
                              key={bitIdx}
                              className={globalIdx < cidr ? 'text-emerald-400 font-bold' : 'text-[#52524e]'}
                            >
                              {bit}
                            </span>
                          );
                        })}
                      </span>
                    );
                  })}
                </span>
              </div>

              {/* Binary IP */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-[#8a8a86] text-[10px]">HOST IP:</span>
                <span className="tracking-widest">
                  {[0, 1, 2, 3].map((oct) => {
                    const slice = calculation.binaryIp.slice(oct * 8, oct * 8 + 8);
                    return (
                      <span key={oct} className="mr-3">
                        {slice.split('').map((bit, bitIdx) => {
                          const globalIdx = oct * 8 + bitIdx;
                          return (
                            <span
                              key={bitIdx}
                              className={globalIdx < cidr ? 'text-emerald-400' : 'text-[#8a8a86]'}
                            >
                              {bit}
                            </span>
                          );
                        })}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-[#050505] border border-red-500/20 text-red-400 text-xs rounded">
          INVALID IPV4 FORMAT. PLEASE ENTER A VALID 4-OCTET IP ADDRESS (e.g. 192.168.1.1).
        </div>
      )}
    </div>
  );
};
