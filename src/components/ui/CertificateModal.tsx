import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, ShieldCheck, FileText, Image as ImageIcon } from 'lucide-react';
import type { Certificate } from '../../data/certificates';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const isPdf = certificate.fileType === 'pdf';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050505]/92 backdrop-blur-xl animate-fade-in font-mono"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0a0a0a] border border-[rgba(242,242,238,0.18)] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(242,242,238,0.1)] bg-[#0e0e0e]/90 select-none">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[rgba(242,242,238,0.05)] border border-[rgba(242,242,238,0.1)] rounded text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-400">
                  {certificate.badgeCode}
                </span>
                <span className="text-[#52524e]">•</span>
                <span className="text-[10px] text-[#8a8a86] tracking-wider uppercase">
                  {certificate.issuer}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl text-[#f2f2ee] tracking-tight leading-snug">
                {certificate.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-[#8a8a86] hover:text-[#f2f2ee] hover:bg-[rgba(242,242,238,0.08)] border border-[rgba(242,242,238,0.1)] rounded transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Preview Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-[#070707] min-h-[380px] max-h-[68vh]">
          {isPdf ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <iframe
                src={`${certificate.filePath}#toolbar=0&navpanes=0&scrollbar=0`}
                title={certificate.title}
                className="w-full h-[58vh] rounded border border-[rgba(242,242,238,0.1)] bg-white"
              />
              <div className="mt-3 flex items-center justify-between w-full text-xs text-[#8a8a86]">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>OFFICIAL PDF DOCUMENT SIGNED BY MIKROTIK SIA</span>
                </div>
                <a
                  href={certificate.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Raw PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="relative w-full flex flex-col items-center justify-center">
              <div className="max-w-full max-h-[58vh] overflow-hidden rounded border border-[rgba(242,242,238,0.12)] shadow-2xl bg-[#000000]">
                <img
                  src={certificate.filePath}
                  alt={certificate.title}
                  className="w-auto h-auto max-h-[56vh] object-contain select-none"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between w-full text-xs text-[#8a8a86]">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HIGH-RESOLUTION CERTIFICATE IMAGE (3300 × 2550 PX)</span>
                </div>
                <a
                  href={certificate.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Metadata & Action Bar */}
        <div className="px-6 py-4 bg-[#0c0c0c] border-t border-[rgba(242,242,238,0.1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs select-none">
          {/* Credential ID and Status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.1)]">
              <span className="text-[#52524e] text-[10px] uppercase">ID:</span>
              <span className="font-bold text-[#f2f2ee] tracking-wider">{certificate.credentialId}</span>
              <button
                onClick={handleCopyId}
                className="ml-1.5 p-1 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                title="Copy Credential ID"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] tracking-widest font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
              <span>STATUS: {certificate.status}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={certificate.filePath}
              download
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#f2f2ee] hover:bg-emerald-400 text-[#050505] font-bold text-xs rounded transition-colors tracking-wider"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD OFFICIAL FILE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
