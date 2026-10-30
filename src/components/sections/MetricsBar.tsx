import React from 'react';
import { profileData } from '../../data/profile';
import { RevealWrapper } from '../ui/RevealWrapper';

export const MetricsBar: React.FC = () => {
  return (
    <div className="border-b border-[rgba(242,242,238,0.1)] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {profileData.metrics.map((metric, idx) => (
          <RevealWrapper key={metric.label} delay={idx * 0.1}>
            <div
              className={`flex flex-col ${
                idx !== 0 ? 'md:border-l md:border-[rgba(242,242,238,0.08)] md:pl-8' : ''
              }`}
            >
              <span className="font-mono text-[11px] tracking-widest text-[#8a8a86] uppercase mb-2">
                {metric.label}
              </span>
              <span className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#f2f2ee] tracking-tight leading-none tabular-nums hover:text-emerald-400 transition-colors cursor-default">
                {metric.value}
              </span>
              <span className="font-mono text-xs text-[#52524e] mt-2">
                {metric.detail}
              </span>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </div>
  );
};
