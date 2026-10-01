import React from 'react';

interface FooterProps {
  fontSizeScale: 'sm' | 'md' | 'lg';
  onChangeFontSize: (scale: 'sm' | 'md' | 'lg') => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  voiceAssist: boolean;
  onToggleVoiceAssist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  fontSizeScale,
  onChangeFontSize,
  highContrast,
  onToggleHighContrast,
  voiceAssist,
  onToggleVoiceAssist
}) => {
  return (
    <footer className="w-full bg-[#dee8ff] py-5 border-t border-[#bdc9c1]/30 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Accessibility toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-sm text-[#111c2d]">Accessibility Mode:</span>

          {/* A+ A A- Scaling Buttons */}
          <div className="flex items-center bg-white rounded-lg p-0.5 shadow-sm border border-slate-200">
            <button
              onClick={() => onChangeFontSize('lg')}
              type="button"
              className={`px-2.5 py-1 text-base font-bold rounded transition-colors ${
                fontSizeScale === 'lg' ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
              title="बड़ा अक्षर (Large Font)"
            >
              A+
            </button>
            <button
              onClick={() => onChangeFontSize('md')}
              type="button"
              className={`px-2.5 py-1 text-sm font-bold rounded transition-colors ${
                fontSizeScale === 'md' ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
              title="सामान्य अक्षर (Normal Font)"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('sm')}
              type="button"
              className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                fontSizeScale === 'sm' ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
              title="छोटा अक्षर (Compact Font)"
            >
              A-
            </button>
          </div>

          {/* High Contrast Toggle Button */}
          <button
            onClick={onToggleHighContrast}
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm border ${
              highContrast
                ? 'bg-black text-white border-black'
                : 'bg-white text-[#111c2d] border-slate-200 hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">contrast</span>
            <span>उच्च कंट्रास्ट (High Contrast)</span>
          </button>

          {/* Voice Assist Toggle Button */}
          <button
            onClick={onToggleVoiceAssist}
            type="button"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              voiceAssist
                ? 'bg-[#005d42] text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
            <span>
              {voiceAssist ? 'ध्वनि सहायता सक्रिय (Voice Assist ON)' : 'ध्वनि सहायता बंद (Voice Assist OFF)'}
            </span>
          </button>
        </div>

        {/* Right: Ministry Copyright notice */}
        <div className="text-center md:text-right text-[#565e74] text-xs">
          <p className="text-sm font-semibold text-[#111c2d]">
            सहकारिता मंत्रालय, भारत सरकार • Ministry of Cooperation, Government of India
          </p>
          <p className="mt-0.5">
            डिजिटल भारत एवं सहकार से समृद्धि के अंतर्गत विकसित • सर्वाधिकार सुरक्षित 2025
          </p>
        </div>
      </div>
    </footer>
  );
};
