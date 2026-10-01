import React from 'react';
import { ScreenType, LanguageCode } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onResetSession: () => void;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  currentLang,
  onSelectLang,
  onResetSession,
  activeNavTab,
  onSelectNavTab
}) => {
  const languages: { code: LanguageCode; label: string; activeLabel: string }[] = [
    { code: 'en', label: 'English', activeLabel: 'English (Active)' },
    { code: 'hi', label: 'हिंदी', activeLabel: 'हिंदी (सक्रिय)' },
    { code: 'bn', label: 'বাংলা', activeLabel: 'বাংলা (সক্রিয়)' },
    { code: 'mr', label: 'मराठी', activeLabel: 'मराठी (सक्रिय)' },
    { code: 'gu', label: 'ગુજરાતી', activeLabel: 'ગુજરાતી (સક્રિય)' }
  ];

  const navItems = [
    { id: 'kiosk-home', label: 'मुख्य पृष्ठ (Home)', screen: 'home' as ScreenType },
    { id: 'member-services', label: 'सदस्यता एवं ऋण सेवाएं (Member & Credit)', screen: 'answer' as ScreenType },
    { id: 'fertilizer-subsidy', label: 'खाद व बीज सब्सिडी (Fertilizers)', screen: 'answer' as ScreenType },
    { id: 'schemes-directory', label: 'सहकारी योजनाएं (Schemes)', screen: 'answer' as ScreenType },
    { id: 'grievance-voice-desk', label: 'शिकायत एवं सहायता (Grievance)', screen: 'grievance' as ScreenType }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      {/* Topmost live kiosk status strip */}
      <div className="bg-[#dee8ff]/60 px-4 md:px-8 py-1.5 border-b border-[#bdc9c1]/20">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#047857] animate-pulse"></span>
            <span className="font-bold text-[#005d42]">लाइव कियोस्क केंद्र:</span>
            <span className="text-[#111c2d] font-medium">ग्राम सेवा सहकारी समिति (PACS) - केंद्र सं. 402</span>
            <span className="text-[#565e74] hidden sm:inline">(सक्रिय सत्र • PACS Society Code: RJ-7734)</span>
          </div>
          <div className="flex items-center gap-4 text-[#111c2d] font-medium">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#005d42] text-[18px]">wifi</span>
              <span>नेटवर्क कनेक्टेड (Signal Strong)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#005d42] text-[18px]">verified_user</span>
              <span>शासकीय प्रमाणित कियोस्क</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 md:h-24 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4 bg-white">
        {/* Logo and Brand Title */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 text-left group transition-transform active:scale-98"
          title="मुख्य पृष्ठ पर जाएं"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#005d42] to-[#047857] flex items-center justify-center text-white shadow-md shadow-[#047857]/20 flex-shrink-0">
            <span className="material-symbols-outlined text-[32px]">diversity_3</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-[#005d42] leading-tight tracking-tight group-hover:text-[#047857] transition-colors">
              सहकार साथी | Sahakar Saathi
            </span>
            <span className="text-xs md:text-sm text-[#565e74] font-medium">
              PACS Digital Helpdesk • सहकारिता मंत्रालय, भारत सरकार
            </span>
          </div>
        </button>

        {/* Language Pills (Segmented Selector) */}
        <div className="hidden xl:flex items-center bg-[#f0f3ff] p-1.5 rounded-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                type="button"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#005d42] text-white shadow-sm scale-102'
                    : 'text-[#565e74] hover:text-[#111c2d] hover:bg-white/50'
                }`}
              >
                {isActive ? lang.activeLabel : lang.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Toll-Free & Reset */}
        <div className="flex items-center gap-3">
          <a
            href="tel:18001801551"
            className="flex items-center gap-2 bg-[#ffdad6] text-[#93000a] px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base font-bold hover:bg-[#ba1a1a] hover:text-white transition-all shadow-sm active:scale-95"
            title="टोल-फ्री किसान हेल्पलाइन"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            <span className="hidden sm:inline">टोल-फ्री: 1800-180-1551</span>
            <span className="sm:hidden">1800-180-1551</span>
          </a>

          <button
            onClick={onResetSession}
            type="button"
            className="flex items-center gap-1.5 bg-[#dae2fd] text-[#131b2e] px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base font-bold hover:bg-[#565e74] hover:text-white transition-all shadow-sm active:scale-95"
            title="सत्र रीसेट करें और आरंभ पर लौटें"
          >
            <span className="material-symbols-outlined text-[22px]">restart_alt</span>
            <span className="hidden sm:inline">नया सत्र (Reset)</span>
            <span className="sm:hidden">Reset</span>
          </button>

          <div className="w-9 h-9 rounded-full bg-[#005d42] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Strip */}
      <nav className="w-full bg-[#f0f3ff] border-t border-b border-[#bdc9c1]/20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-1.5 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {navItems.map((item) => {
              const isActive =
                (item.screen === 'home' && currentScreen === 'home') ||
                (item.screen === 'grievance' && currentScreen === 'grievance') ||
                (item.screen === 'answer' && currentScreen === 'answer' && activeNavTab === item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectNavTab(item.id);
                    onNavigate(item.screen);
                  }}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-lg text-sm md:text-base transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#005d42] text-white font-bold shadow-sm'
                      : 'text-[#565e74] font-medium hover:text-[#111c2d] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[#a05600] font-bold text-sm whitespace-nowrap flex-shrink-0 pl-2">
            <span className="material-symbols-outlined text-[20px] animate-pulse">hearing</span>
            <span className="hidden sm:inline">ध्वनि सहायता उपलब्ध</span>
            <span className="sm:hidden">Audio ON</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
