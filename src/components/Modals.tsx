import React, { useState } from 'react';
import { GrievanceTicket } from '../types';

interface VoiceListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  samplePrompt?: string;
}

export const VoiceListeningModal: React.FC<VoiceListeningModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  samplePrompt
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#111c2d]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center relative border border-[#bdc9c1]/30">
        {/* Pulsing Mic Circle */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#005d42] to-[#047857] text-white flex items-center justify-center mb-6 shadow-xl shadow-[#047857]/30">
          <span className="material-symbols-outlined text-[54px] animate-pulse">mic</span>
          <div className="absolute inset-0 rounded-full border-4 border-[#97f5cc] animate-ping opacity-75"></div>
          <div className="absolute -inset-3 rounded-full border-2 border-[#047857]/40 animate-pulse"></div>
        </div>

        <span className="text-2xl font-extrabold text-[#111c2d] tracking-tight">
          बोलिए, हम सुन रहे हैं...
        </span>
        <p className="text-base md:text-lg text-[#565e74] mt-2 font-medium">
          {samplePrompt ? (
            <span className="text-[#005d42] font-semibold">"{samplePrompt}"</span>
          ) : (
            'कृपया अपना प्रश्न या समस्या स्पष्ट बोलें (Listening in Hindi/English)...'
          )}
        </p>

        {/* Dynamic soundwave bouncing bars */}
        <div className="w-full h-12 bg-[#f0f3ff] rounded-2xl my-6 flex items-center justify-center gap-2 px-6 shadow-inner">
          <span className="w-2 bg-[#005d42] rounded-full animate-bounce [animation-delay:-0.3s] h-5"></span>
          <span className="w-2 bg-[#047857] rounded-full animate-bounce [animation-delay:-0.15s] h-8"></span>
          <span className="w-2 bg-[#005d42] rounded-full animate-bounce [animation-delay:0s] h-10"></span>
          <span className="w-2 bg-[#047857] rounded-full animate-bounce [animation-delay:0.15s] h-7"></span>
          <span className="w-2 bg-[#005d42] rounded-full animate-bounce [animation-delay:0.3s] h-9"></span>
          <span className="w-2 bg-[#047857] rounded-full animate-bounce [animation-delay:0.45s] h-4"></span>
          <span className="w-2 bg-[#005d42] rounded-full animate-bounce [animation-delay:0.2s] h-6"></span>
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 py-3.5 rounded-xl bg-[#f0f3ff] text-[#111c2d] font-bold text-base hover:bg-[#dee8ff] transition-colors"
          >
            रद्द करें (Cancel)
          </button>
          <button
            onClick={onSubmit}
            type="button"
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#005d42] to-[#047857] text-white font-bold text-base hover:brightness-110 transition-all shadow-md active:scale-98"
          >
            पूरा हुआ (Submit)
          </button>
        </div>
      </div>
    </div>
  );
};

interface ClaimFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimFormModal: React.FC<ClaimFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#111c2d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-200 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005d42] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111c2d]">PMFBY फसल नुकसान सूचना प्रपत्र</h3>
              <p className="text-xs text-[#565e74]">Form No. PMFBY-CL/2025 • सहकारिता एवं कृषि मंत्रालय</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-[#111c2d]">
          <div className="bg-[#f0f3ff] p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-[#565e74] block">आवेदन संदर्भ कोड:</span>
              <span className="text-base font-bold font-mono text-[#005d42]">#CLM-PMFBY-RJ7734-2025</span>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
              सत्यापित पात्र आवेदन
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 p-3 rounded-lg">
              <span className="text-xs text-slate-500 block">कृषक का नाम</span>
              <span className="font-semibold">रामलाल पुत्र श्री शिवकरण जाट</span>
            </div>
            <div className="border border-slate-200 p-3 rounded-lg">
              <span className="text-xs text-slate-500 block">सोसायटी खाता / KCC सं.</span>
              <span className="font-semibold font-mono">PACS-ACC-9821-44</span>
            </div>
            <div className="border border-slate-200 p-3 rounded-lg">
              <span className="text-xs text-slate-500 block">बीमित फसल एवं रकबा</span>
              <span className="font-semibold">गेहूं (Wheat) - 2.50 हैक्टेयर</span>
            </div>
            <div className="border border-slate-200 p-3 rounded-lg">
              <span className="text-xs text-slate-500 block">आपदा का प्रकार</span>
              <span className="font-semibold text-red-600">असमय ओलावृष्टि / जलभराव</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong>महत्वपूर्ण निर्देश:</strong> आपदा घटित होने के 72 घंटे के भीतर यह प्रपत्र भर कर समिति व्यवस्थापक अथवा कृषि पर्यवेक्षक के समक्ष प्रस्तुत किया जाना आवश्यक है।
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 text-sm"
          >
            बंद करें
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#005d42] text-white font-bold hover:bg-[#047857] text-sm flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
            <span>प्रपत्र प्रिंट करें (Print Form)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface SMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId?: string;
}

export const SMSModal: React.FC<SMSModalProps> = ({ isOpen, onClose, ticketId }) => {
  const [mobile, setMobile] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (mobile.length >= 10) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMobile('');
        onClose();
      }, 2200);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111c2d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[32px]">sms</span>
        </div>

        <h3 className="text-xl font-bold text-[#111c2d]">मोबाइल पर विवरण प्राप्त करें</h3>
        <p className="text-xs md:text-sm text-[#565e74] mt-1">
          अपना 10 अंकों का मोबाइल नंबर दर्ज करें। सरकारी सर्वर से तुरंत एसएमएस रसीद व लिंक भेजा जाएगा।
        </p>

        {sent ? (
          <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
            <span className="material-symbols-outlined text-[36px] text-emerald-600 block mb-1">check_circle</span>
            <p className="font-bold text-sm">सफलतापूर्वक एसएमएस भेज दिया गया!</p>
            <p className="text-xs text-emerald-700 mt-1">
              संख्या <strong>+91 {mobile}</strong> पर संदेश पहुंच गया है।
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500 font-bold text-sm">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="10 अंकों का मोबाइल नंबर"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#005d42] text-lg font-mono font-semibold"
                autoFocus
              />
            </div>

            {ticketId && (
              <p className="text-xs text-slate-500 text-left font-mono">
                टोकन संलग्न: <strong>#{ticketId}</strong>
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                type="button"
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 text-sm"
              >
                रद्द करें
              </button>
              <button
                onClick={handleSend}
                disabled={mobile.length < 10}
                type="button"
                className={`flex-1 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md ${
                  mobile.length >= 10
                    ? 'bg-[#005d42] hover:bg-[#047857]'
                    : 'bg-slate-300 cursor-not-allowed text-slate-500'
                }`}
              >
                एसएमएस भेजें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface GazetteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GazetteModal: React.FC<GazetteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#111c2d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005d42] text-[26px]">policy</span>
            <h3 className="text-lg font-bold text-[#111c2d]">शासकीय नियम एवं गजट उद्धरण</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-[#111c2d] leading-relaxed">
          <div className="bg-[#f0f3ff] p-3 rounded-lg text-xs font-mono text-[#005d42] font-semibold">
            The Gazette of India: Extraordinary, Part II—Section 3—Sub-section (ii)
          </div>
          <h4 className="font-bold text-base text-[#005d42]">Section 14.2: Post-Harvest Loss Assessment Procedure</h4>
          <p className="text-xs text-[#565e74]">
            "In case of localized post-harvest losses caused by unseasonal rainfall, hailstorm, cyclone, or cloudburst, the insured beneficiary must intimate the concerned General Insurance Company, PACS representative, or State Agricultural Nodal Officer within <strong>72 hours</strong> of the calamity through designated digital kiosk, helpline number, or official portal."
          </p>
          <p className="text-xs text-[#565e74]">
            "The joint survey assessment squad comprising the Block Agricultural Officer and Insurance Representative shall inspect the damaged field within 48 hours of notification."
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#005d42] text-white rounded-lg font-bold text-sm hover:bg-[#047857]"
          >
            समझ गया (OK)
          </button>
        </div>
      </div>
    </div>
  );
};

interface PrintSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: GrievanceTicket;
}

export const PrintSlipModal: React.FC<PrintSlipModalProps> = ({ isOpen, onClose, ticket }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#111c2d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-300">
        <div className="border-b-2 border-dashed border-slate-300 pb-3 text-center">
          <div className="w-10 h-10 rounded-full bg-[#005d42] text-white flex items-center justify-center mx-auto mb-1">
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
          </div>
          <h3 className="font-extrabold text-lg text-[#111c2d]">सहकार साथी कियोस्क पावती</h3>
          <p className="text-xs text-slate-500">ग्राम सेवा सहकारी समिति (PACS) RJ-7734</p>
        </div>

        <div className="py-4 space-y-2.5 text-xs text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">टोकन संख्या:</span>
            <span className="font-mono font-bold text-sm text-[#005d42]">#{ticket.ticketId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">दिनांक व समय:</span>
            <span className="font-semibold">{ticket.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">विभाग:</span>
            <span className="font-semibold">{ticket.departmentHindi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">श्रेणी:</span>
            <span className="font-semibold">{ticket.categoryHindi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">प्राथमिकता:</span>
            <span className="font-bold text-red-600">{ticket.priorityHindi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">जांच अधिकारी:</span>
            <span className="font-semibold">{ticket.officerName}</span>
          </div>
          <div className="p-2 bg-slate-50 rounded text-slate-600 text-[11px] leading-tight mt-2">
            <strong>विवरण:</strong> {ticket.transcription}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-slate-300 pt-3 text-center">
          <p className="text-[10px] text-slate-500 font-mono">NIC-SHA256: {ticket.securityHash}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200"
            >
              बंद करें
            </button>
            <button
              onClick={() => window.print()}
              type="button"
              className="flex-1 py-2 bg-[#005d42] text-white rounded-lg text-xs font-bold hover:bg-[#047857] flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>प्रिंट करें (Print)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
