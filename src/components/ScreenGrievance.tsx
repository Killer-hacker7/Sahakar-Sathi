import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, GrievanceTicket } from '../types';

interface ScreenGrievanceProps {
  ticket: GrievanceTicket;
  onNavigate: (screen: ScreenType) => void;
  onOpenPrintSlip: () => void;
  onOpenSMSModal: () => void;
  onResetSession: () => void;
}

export const ScreenGrievance: React.FC<ScreenGrievanceProps> = ({
  ticket,
  onNavigate,
  onOpenPrintSlip,
  onOpenSMSModal,
  onResetSession
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resetCountdown, setResetCountdown] = useState(30);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-reset timer for public kiosk privacy (30 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setResetCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Safely trigger navigation when timer expires
  useEffect(() => {
    if (resetCountdown === 0) {
      onNavigate('home');
    }
  }, [resetCountdown, onNavigate]);

  // Reset timer on user interaction
  const touchActivity = () => {
    setResetCountdown(30);
  };

  const handleCopyTicket = () => {
    touchActivity();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ticket.ticketId);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    touchActivity();
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(ticket.transcription);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingAudio(false), 5000);
      }
    } else {
      setIsPlayingAudio(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  return (
    <div
      onClick={touchActivity}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-5 select-none pb-12"
    >
      {/* 1. Top Stepper & Breadcrumb Navigation Bar */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] font-bold text-sm transition-colors shadow-xs active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>मुख्य मेनू (Main Menu)</span>
          </button>
          <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
          <span className="text-lg md:text-xl font-extrabold text-[#005d42]">
            PACS डिजिटल शिकायत निवारण केंद्र
          </span>
        </div>

        {/* Kiosk Stepper Indicator */}
        <div className="flex items-center flex-wrap gap-2 text-xs md:text-sm font-semibold text-[#565e74]">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-[#005d42] px-3 py-1 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>1. वॉइस रिकॉर्डिंग</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-[#005d42] px-3 py-1 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>2. एआई वर्गीकरण</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
          <div className="flex items-center gap-1.5 bg-[#005d42] text-white px-3.5 py-1 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>3. टोकन व मोबाइल रसीद (वर्तमान)</span>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Ticket Summary & AI Processing Record (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Registration Confirmation Banner Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#047857]/5 pointer-events-none"></div>

            {/* Success Alert Pill */}
            <div className="flex items-center gap-3 bg-[#97f5cc]/40 text-[#002115] px-4 py-2 rounded-2xl mb-4 w-fit border border-emerald-300">
              <span className="material-symbols-outlined text-[#005d42] text-[28px]">task_alt</span>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-[#005d42]">शिकायत सफलतापूर्वक दर्ज हुई</span>
                <span className="text-xs text-[#565e74]">Complaint Registered &amp; Digitally Sealed</span>
              </div>
            </div>

            {/* Monospace Reference Token ID Box */}
            <div className="bg-[#f0f3ff] rounded-2xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 mb-4 border border-slate-200">
              <div>
                <span className="text-xs text-[#565e74] uppercase tracking-wider block font-semibold">
                  आधिकारिक टोकन संदर्भ सं. (Reference Token ID)
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-[#111c2d] tracking-tight font-mono">
                  #{ticket.ticketId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyTicket}
                  type="button"
                  className="h-12 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#111c2d] flex items-center gap-1.5 text-sm font-bold transition-all shadow-xs border border-slate-200 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#005d42]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                </button>
              </div>
            </div>

            {/* Semantic Auto-Classification Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <div className="bg-[#f0f3ff] p-3 rounded-xl flex flex-col border border-slate-200">
                <span className="text-xs text-[#565e74] font-medium">शासकीय विभाग</span>
                <span className="text-sm md:text-base font-bold text-[#111c2d] mt-0.5">{ticket.departmentHindi}</span>
                <span className="text-xs text-[#565e74]">{ticket.departmentEnglish}</span>
              </div>
              <div className="bg-[#f0f3ff] p-3 rounded-xl flex flex-col border border-slate-200">
                <span className="text-xs text-[#565e74] font-medium">शिकायत श्रेणी</span>
                <span className="text-sm md:text-base font-bold text-[#111c2d] mt-0.5">{ticket.categoryHindi}</span>
                <span className="text-xs text-[#565e74]">{ticket.categoryEnglish}</span>
              </div>
              <div className="bg-red-50 p-3 rounded-xl flex flex-col border border-red-200">
                <span className="text-xs text-red-700 font-semibold">निवारण प्राथमिकता</span>
                <span className="text-sm md:text-base font-bold text-red-700 mt-0.5">{ticket.priorityHindi}</span>
                <span className="text-xs text-red-600">{ticket.priorityEnglish}</span>
              </div>
            </div>

            {/* AI Transcribed Voice Note Audio Player */}
            <div className="bg-[#f0f3ff] rounded-2xl p-4 md:p-5 mb-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#005d42] text-[22px]">record_voice_over</span>
                  <span className="text-sm font-bold text-[#111c2d]">एआई वॉइस ट्रांसक्रिप्शन (AI Speech-to-Text)</span>
                </div>
                <span className="text-xs bg-white px-2.5 py-0.5 rounded-md text-[#111c2d] font-semibold border border-slate-200">
                  भाषा: {ticket.languageDetected}
                </span>
              </div>

              <p className="text-sm md:text-base text-[#111c2d] bg-white p-3.5 rounded-xl leading-relaxed shadow-xs border border-slate-200">
                {ticket.transcription}
              </p>

              {/* Audio Waveform & Player Trigger */}
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={toggleAudio}
                    type="button"
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#005d42] to-[#047857] text-white flex items-center justify-center shadow-md hover:brightness-110 transition-transform active:scale-95 flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-[26px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111c2d]">मूल ऑडियो सुनें (Original Note)</span>
                    <span className="text-xs text-[#565e74]">अवधि: {ticket.audioDuration} • PACS माइक इनपुट</span>
                  </div>
                </div>

                {/* Animated Audio Waves Vector */}
                <div className="flex items-center gap-1.5 h-9 px-3 bg-white rounded-xl shadow-xs border border-slate-200">
                  <span className={`w-1 bg-[#005d42] rounded-full transition-all ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-2'}`}></span>
                  <span className={`w-1 bg-[#047857] rounded-full transition-all ${isPlayingAudio ? 'h-6 animate-pulse' : 'h-3'}`} style={{ animationDelay: '0.15s' }}></span>
                  <span className={`w-1 bg-[#005d42] rounded-full transition-all ${isPlayingAudio ? 'h-4 animate-pulse' : 'h-2'}`} style={{ animationDelay: '0.3s' }}></span>
                  <span className={`w-1 bg-[#047857] rounded-full transition-all ${isPlayingAudio ? 'h-7 animate-pulse' : 'h-4'}`} style={{ animationDelay: '0.45s' }}></span>
                  <span className={`w-1 bg-[#005d42] rounded-full transition-all ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-2'}`} style={{ animationDelay: '0.2s' }}></span>
                  <span className={`w-1 bg-[#047857] rounded-full transition-all ${isPlayingAudio ? 'h-5 animate-pulse' : 'h-3'}`} style={{ animationDelay: '0.35s' }}></span>
                  <span className="w-1 h-2 bg-[#005d42] rounded-full"></span>
                  <span className="text-xs text-[#111c2d] font-mono ml-2 font-semibold">0:28</span>
                </div>
              </div>
            </div>

            {/* Designated Officer Dispatch Information */}
            <div className="flex items-center gap-3 bg-[#dee8ff]/50 p-3.5 rounded-2xl border border-slate-200">
              <div className="w-11 h-11 rounded-full bg-[#005d42] text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#565e74] font-medium">{ticket.officerTitle}</span>
                <span className="text-sm md:text-base font-bold text-[#111c2d]">{ticket.officerName}</span>
                <span className="text-xs text-[#565e74]">संपर्क: {ticket.officerContact} • {ticket.officerOffice}</span>
              </div>
            </div>
          </div>

          {/* Official Verification Stamp */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#005d42] text-[32px]">verified</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111c2d]">शासकीय डिजिटल मुहर एवं सुरक्षा हैश</span>
                <span className="text-xs text-[#565e74] font-mono">NIC-SHA256: {ticket.securityHash}</span>
              </div>
            </div>
            <span className="text-xs bg-[#f0f3ff] text-[#005d42] px-3 py-1.5 rounded-full font-bold border border-slate-200">
              PACS {ticket.societyCode}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: QR Handoff & Kiosk Action Center (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Mobile Handoff Interactive Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#005d42] mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">phone_android</span>
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-[#111c2d]">
              अपने मोबाइल पर ट्रैक करें
            </h3>
            <p className="text-xs md:text-sm text-[#565e74] mt-1 max-w-sm">
              बिना किसी ऐप डाउनलोड या पासवर्ड के सीधे अपने फोन पर लाइव स्टेटस और दैनिक सूचना प्राप्त करें।
            </p>

            {/* High-Contrast Crisp QR Code Container */}
            <div className="mt-4 relative p-4 bg-white rounded-2xl shadow-md border-4 border-[#f0f3ff] flex flex-col items-center justify-center">
              <div className="w-[210px] h-[210px] bg-white p-2 relative flex items-center justify-center">
                <svg className="w-full h-full text-[#111c2d]" fill="currentColor" viewBox="0 0 200 200">
                  {/* Outer Corner Finder 1 */}
                  <rect x="10" y="10" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="10" />
                  <rect x="25" y="25" width="20" height="20" fill="currentColor" />
                  {/* Outer Corner Finder 2 */}
                  <rect x="140" y="10" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="10" />
                  <rect x="155" y="25" width="20" height="20" fill="currentColor" />
                  {/* Outer Corner Finder 3 */}
                  <rect x="10" y="140" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="10" />
                  <rect x="25" y="155" width="20" height="20" fill="currentColor" />

                  {/* QR Grid Modules */}
                  <rect x="70" y="15" width="10" height="10" />
                  <rect x="90" y="15" width="10" height="10" />
                  <rect x="110" y="15" width="10" height="20" />
                  <rect x="70" y="35" width="20" height="10" />
                  <rect x="100" y="35" width="10" height="10" />
                  <rect x="120" y="35" width="10" height="10" />
                  <rect x="15" y="70" width="20" height="10" />
                  <rect x="45" y="70" width="15" height="10" />
                  <rect x="70" y="60" width="10" height="25" />
                  <rect x="90" y="65" width="20" height="10" />
                  <rect x="120" y="60" width="15" height="15" />
                  <rect x="150" y="70" width="10" height="10" />
                  <rect x="170" y="70" width="20" height="10" />

                  {/* Middle Pattern */}
                  <rect x="15" y="90" width="10" height="20" />
                  <rect x="35" y="95" width="15" height="10" />
                  <rect x="60" y="90" width="10" height="20" />
                  <rect x="130" y="90" width="20" height="10" />
                  <rect x="160" y="90" width="15" height="20" />
                  <rect x="15" y="120" width="20" height="10" />
                  <rect x="45" y="115" width="15" height="15" />
                  <rect x="70" y="120" width="15" height="10" />
                  <rect x="95" y="115" width="10" height="15" />
                  <rect x="115" y="120" width="25" height="10" />
                  <rect x="150" y="120" width="15" height="10" />
                  <rect x="175" y="120" width="15" height="10" />

                  {/* Bottom Modules */}
                  <rect x="70" y="145" width="20" height="10" />
                  <rect x="100" y="140" width="10" height="20" />
                  <rect x="120" y="145" width="15" height="10" />
                  <rect x="145" y="145" width="10" height="10" />
                  <rect x="165" y="145" width="25" height="10" />
                  <rect x="70" y="170" width="10" height="20" />
                  <rect x="90" y="165" width="20" height="10" />
                  <rect x="120" y="170" width="20" height="10" />
                  <rect x="150" y="165" width="10" height="25" />
                  <rect x="170" y="170" width="20" height="10" />
                </svg>

                {/* Central Emblem Shield Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#005d42] to-[#047857] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="material-symbols-outlined text-[24px]">shield</span>
                  </div>
                </div>
              </div>

              {/* Glowing Scan Target Pulse */}
              <div className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005d42] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#005d42]"></span>
              </div>
            </div>

            {/* URL Preview Tag */}
            <div className="mt-3 bg-[#f0f3ff] px-4 py-1.5 rounded-full text-[#111c2d] font-mono text-xs flex items-center gap-1.5 border border-slate-200">
              <span className="material-symbols-outlined text-[16px] text-[#005d42]">link</span>
              <span>{ticket.trackingUrl}</span>
            </div>

            {/* 2-Step Instructions */}
            <div className="w-full mt-4 grid grid-cols-1 gap-2 text-left bg-[#f0f3ff] p-3 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-[#005d42] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  १
                </span>
                <span className="text-xs md:text-sm text-[#111c2d] font-semibold">
                  अपने फोन का साधारण कैमरा खोलें और QR कोड की तरफ करें।
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-[#005d42] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  २
                </span>
                <span className="text-xs md:text-sm text-[#111c2d] font-semibold">
                  लिंक पर टैप करके लाइव स्टेटस और एसएमएस अलर्ट सीधे पाएं।
                </span>
              </div>
            </div>
          </div>

          {/* Large Action Buttons */}
          <div className="flex flex-col gap-2.5">
            {/* Print Physical Slip */}
            <button
              onClick={onOpenPrintSlip}
              type="button"
              className="w-full min-h-[58px] px-4 rounded-2xl bg-[#111c2d] hover:bg-black text-white flex items-center justify-center gap-2 text-base font-bold shadow-md active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">print</span>
              <span>रसीद प्रिंट करें (Print Physical Slip)</span>
            </button>

            {/* Send SMS Slip */}
            <button
              onClick={onOpenSMSModal}
              type="button"
              className="w-full min-h-[58px] px-4 rounded-2xl bg-white text-[#111c2d] flex items-center justify-center gap-2 text-base font-bold shadow-sm hover:bg-slate-50 border border-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[24px] text-[#005d42]">sms</span>
              <span>मोबाइल नंबर पर SMS भेजें (Send SMS Slip)</span>
            </button>

            {/* Finish & Clear Session */}
            <button
              onClick={onResetSession}
              type="button"
              className="w-full min-h-[58px] px-4 rounded-2xl bg-[#005d42] hover:bg-[#047857] text-white flex items-center justify-center gap-2 text-base font-bold shadow-md transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              <span>सत्र समाप्त करें (Finish &amp; Clear Session)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Kiosk Privacy & Auto-Reset Notice Banner */}
      <div className="w-full mt-2 bg-[#dee8ff]/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-slate-200">
        <div className="flex items-center gap-2 text-[#111c2d]">
          <span className="material-symbols-outlined text-[#005d42] text-[24px]">lock</span>
          <span className="text-xs md:text-sm">
            <strong>गोपनीयता सुरक्षा:</strong> आपकी व्यक्तिगत जानकारी पूर्णतः सुरक्षित है। आपके जाने के 30 सेकंड बाद यह स्क्रीन स्वतः साफ हो जाएगी।
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-xs border border-slate-200 flex-shrink-0">
          <span className="material-symbols-outlined text-red-600 text-[18px]">timer</span>
          <span className="text-xs text-[#111c2d] font-bold">
            स्वतः रीसेट: <span className="font-mono text-red-600">{resetCountdown < 10 ? `0${resetCountdown}` : resetCountdown}</span> सेकंड
          </span>
        </div>
      </div>
    </div>
  );
};
