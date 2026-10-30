import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Send, MessageCircle } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { RevealWrapper } from '../ui/RevealWrapper';
import { ProximityText } from '../ui/ProximityText';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { t } = useLanguage();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3 block">
            {t('contactTag')}
          </span>
          <h2 className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-[#f2f2ee] tracking-tight leading-[0.88]">
            <ProximityText minWeight={150} maxWeight={900} radius={320}>
              {t('contactTitle1')}
            </ProximityText> <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#f2f2ee] to-[#8a8a86]">
              <ProximityText minWeight={350} maxWeight={900} radius={320}>
                {t('contactTitle2')}
              </ProximityText>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Email Copy & Links */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 font-mono">
            <RevealWrapper delay={0.1}>
              <p className="font-sans text-base md:text-lg text-[#8a8a86] leading-relaxed mb-8">
                Whether you need enterprise BGP routing designed, a WireGuard mesh deployed, or a modern high-performance web platform built, my inbox is open.
              </p>

              {/* Email One-Click Copy Card */}
              <div className="p-6 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#52524e] uppercase tracking-widest block mb-1">
                    PRIMARY CONTACT CHANNEL
                  </span>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-base sm:text-lg text-[#f2f2ee] hover:text-emerald-400 transition-colors font-medium"
                  >
                    {profileData.email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="https://wa.me/6282255176697?text=Halo%20Muhammad%20Ihsan,%20saya%20melihat%20portofolio%20Anda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-400 hover:text-[#050505] text-xs text-emerald-400 transition-all rounded uppercase tracking-wider font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WHATSAPP</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 px-4 py-2 border border-[rgba(242,242,238,0.15)] hover:border-[#f2f2ee] text-xs text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded uppercase tracking-wider"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{t('contactCopied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t('contactCopy')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-4">
                {profileData.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0a0a0a] border border-[rgba(242,242,238,0.08)] hover:border-emerald-400/50 rounded flex items-center justify-between text-xs text-[#8a8a86] hover:text-[#f2f2ee] transition-all group"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                  </a>
                ))}
              </div>
            </RevealWrapper>

            {/* Status & Availability */}
            <div className="pt-6 border-t border-[rgba(242,242,238,0.06)] text-xs text-[#52524e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CURRENT STATUS: {profileData.availability}</span>
            </div>
          </div>

          {/* Right: Message Dispatch Form */}
          <div className="lg:col-span-6">
            <RevealWrapper delay={0.25}>
              <form
                onSubmit={handleSubmit}
                className="p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(242,242,238,0.06)] text-xs text-[#8a8a86]">
                  <span>DISPATCH MESSAGE</span>
                  <span>DIRECT TO INBOX</span>
                </div>

                <div>
                  <label className="text-[11px] text-[#8a8a86] uppercase tracking-wider block mb-2">
                    YOUR NAME / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Carter (Lead Architect)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111111] border border-[rgba(242,242,238,0.1)] focus:border-emerald-400 px-4 py-3 text-xs text-[#f2f2ee] rounded outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#8a8a86] uppercase tracking-wider block mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111111] border border-[rgba(242,242,238,0.1)] focus:border-emerald-400 px-4 py-3 text-xs text-[#f2f2ee] rounded outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#8a8a86] uppercase tracking-wider block mb-2">
                    PROJECT SPECIFICATIONS / MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your network architecture requirements or web application goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111111] border border-[rgba(242,242,238,0.1)] focus:border-emerald-400 px-4 py-3 text-xs text-[#f2f2ee] rounded outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSent}
                  className="w-full py-3.5 bg-[#f2f2ee] text-[#050505] hover:bg-emerald-400 font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
                >
                  {formSent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>{t('contactSent')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contactSend')}</span>
                    </>
                  )}
                </button>
              </form>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};
