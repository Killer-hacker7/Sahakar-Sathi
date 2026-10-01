import React, { useState } from 'react';
import { ScreenType, AnswerData } from '../types';
import { PMFBY_ANSWER, FERTILIZER_ANSWER, BYLAWS_ANSWER, SCHEMES_ANSWER } from '../data/mockData';

interface ScreenHomeProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenVoiceModal: (samplePrompt?: string) => void;
  onSelectAnswer: (answer: AnswerData) => void;
  onPrintRateCard: () => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  onNavigate,
  onOpenVoiceModal,
  onSelectAnswer,
  onPrintRateCard
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmitInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputText.trim();
    if (!query) {
      onOpenVoiceModal('PMFBY में क्लेम करने की समय सीमा क्या है?');
      return;
    }

    if (query.includes('खाद') || query.includes('यूरिया') || query.includes('डीएपी') || query.includes('रेट')) {
      onSelectAnswer(FERTILIZER_ANSWER);
    } else if (query.includes('नियम') || query.includes('सदस्य') || query.includes('शेयर') || query.includes('वोट')) {
      onSelectAnswer(BYLAWS_ANSWER);
    } else if (query.includes('ऋण') || query.includes('सब्सिडी') || query.includes('योजना') || query.includes('केसीसी')) {
      onSelectAnswer(SCHEMES_ANSWER);
    } else {
      // Custom query mapping to PMFBY template with custom query string
      onSelectAnswer({
        ...PMFBY_ANSWER,
        queryHindi: query,
        queryEnglish: `User query: "${query}"`
      });
    }

    onOpenVoiceModal(query);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">
      {/* 1. Kiosk Status Sub-Bar & Live Announcements */}
      <section className="w-full px-4 md:px-8 py-3 bg-[#f0f3ff] shadow-xs rounded-2xl border border-[#bdc9c1]/20">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#047857] text-white shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#005d42]">
                नमस्ते किसान भाई / Welcome Member!
              </span>
              <span className="text-sm text-[#111c2d]">
                आप अपनी भाषा में बोलकर जानकारी प्राप्त कर सकते हैं • Speak freely in your local dialect
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-end">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#047857] animate-ping"></span>
              <span className="text-xs md:text-sm font-semibold text-[#111c2d]">PACS सदस्य डिजिटल सहायता केंद्र</span>
              <span className="text-xs font-bold text-[#005d42] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                AI Voice Kiosk Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#a05600] bg-white px-3 py-1 rounded-lg border border-amber-200 text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
              <span>ध्वनि तैयार (Audio 100%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Center Voice Hero Section */}
      <section className="relative w-full px-4 md:px-8 py-8 md:py-12 overflow-hidden bg-gradient-to-b from-[#f9f9ff] via-[#f0f3ff]/70 to-[#f9f9ff] rounded-3xl border border-[#bdc9c1]/20 shadow-xs">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[#97f5cc]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Authority Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs md:text-sm font-semibold mb-3 shadow-xs">
            <span className="material-symbols-outlined text-[18px] text-[#005d42]">record_voice_over</span>
            <span>ग्राम पंचायत सहकारी एआई सहायक • PACS 24×7 Voice Helpdesk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111c2d] tracking-tight leading-tight mt-1 mb-2">
            बोलिए, हम सुन रहे हैं
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#565e74] max-w-2xl font-medium">
            सहकारी समिति नियम, फसल बीमा, खाद कोटा या सब्सिडी के बारे में कोई भी प्रश्न सीधे बोलकर पूछें।
          </p>

          {/* Center Voice Interactive Hub */}
          <div className="mt-8 mb-4 flex flex-col items-center">
            {/* Giant Pulsating Mic Button */}
            <div
              onClick={() => onOpenVoiceModal('PMFBY में क्लेम करने की समय सीमा क्या है?')}
              className="relative flex items-center justify-center p-6 cursor-pointer group active:scale-95 transition-transform"
              role="button"
              tabIndex={0}
              title="माइक दबाकर बोलें"
            >
              {/* Pulsing Concentric Rings */}
              <div className="absolute inset-0 rounded-full bg-[#005d42]/10 animate-ping opacity-60"></div>
              <div className="absolute inset-3 rounded-full bg-[#047857]/20 animate-pulse"></div>
              <div className="absolute inset-6 rounded-full bg-[#97f5cc]/40"></div>

              {/* Solid Action Button Surface */}
              <div
                className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#005d42] to-[#047857] flex flex-col items-center justify-center text-white shadow-2xl transition-all group-hover:scale-105"
                style={{ boxShadow: '0 20px 35px -5px rgba(4, 120, 87, 0.45)' }}
              >
                <span className="material-symbols-outlined text-[54px] transition-transform group-hover:rotate-6">mic</span>
                <span className="text-xs uppercase tracking-wider font-extrabold mt-1 text-[#9ffdd3]">बोलें</span>
              </div>
            </div>

            {/* Prompt Label Below Mic */}
            <div className="flex flex-col items-center gap-1.5 mt-2">
              <div
                onClick={() => onOpenVoiceModal('PMFBY में क्लेम करने की समय सीमा क्या है?')}
                className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full shadow-md border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[#005d42] text-[26px] animate-bounce">touch_app</span>
                <span className="text-lg md:text-xl text-[#005d42] font-extrabold">
                  माइक दबाकर बोलें (Tap to Speak)
                </span>
              </div>
              <span className="text-xs md:text-sm text-[#565e74] font-medium mt-1">
                हिंदी, English, मराठी, বাংলা एवं स्थानीय बोलियों में उपलब्ध
              </span>
            </div>

            {/* Voice Waveform Animation Display */}
            <div className="w-72 h-10 mt-5 bg-[#dee8ff]/70 rounded-full flex items-center justify-center gap-1.5 px-6 shadow-inner border border-slate-200/50">
              <span className="w-1.5 h-3 bg-[#005d42] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
              <span className="w-1.5 h-6 bg-[#047857] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.1s]"></span>
              <span className="w-1.5 h-8 bg-[#005d42] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s]"></span>
              <span className="w-1.5 h-5 bg-[#047857] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.3s]"></span>
              <span className="w-1.5 h-7 bg-[#005d42] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.15s]"></span>
              <span className="w-1.5 h-4 bg-[#047857] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.25s]"></span>
              <span className="w-1.5 h-2 bg-[#005d42] rounded-full animate-[pulse_1s_ease-in-out_infinite_0.05s]"></span>
            </div>
          </div>

          {/* Search Input Bar with Mic & Send */}
          <form onSubmit={handleSubmitInput} className="w-full max-w-2xl mt-4">
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-lg border border-slate-200">
              <div className="pl-4 text-[#565e74] flex items-center">
                <span className="material-symbols-outlined text-[26px]">search</span>
              </div>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="या यहाँ टाइप करें / Or type your question here... (उदा. 'खाद कब मिलेगी?')"
                className="w-full bg-transparent px-3 py-3 text-base text-[#111c2d] placeholder:text-[#565e74]/70 focus:outline-none"
              />
              <div className="flex items-center gap-2 pr-1">
                <button
                  type="button"
                  onClick={() => onOpenVoiceModal(inputText || 'PMFBY में क्लेम करने की समय सीमा क्या है?')}
                  className="w-11 h-11 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#005d42] flex items-center justify-center transition-colors shadow-xs"
                  title="माइक्रोफोन से इनपुट करें"
                >
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                </button>
                <button
                  type="submit"
                  className="h-11 px-6 rounded-full bg-gradient-to-r from-[#005d42] to-[#047857] text-white font-bold text-base flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md active:scale-95"
                >
                  <span>पूछें</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Visual PACS Feature Mosaic / Photo Banner */}
      <section className="w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Media Card 1: Kiosk Member Services */}
          <div
            onClick={() => {
              onSelectAnswer(BYLAWS_ANSWER);
              onNavigate('answer');
            }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xs hover:shadow-md p-4 flex items-center gap-4 border border-slate-200 cursor-pointer transition-all"
          >
            <div className="w-24 h-24 rounded-xl bg-emerald-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcDWYCDiT2ZZisUqdeoEJAfLpFlKbmQIlFqnOBcfeKAVbH88JAUQps6ocG_6KWVsegfefGizhkuP1Ip1qrTJx4vwPJ8QZx7uaklTdHdXmkdn4NvR5E3de205LspcMBl0vIztpO7yUUnGsTCXcGw4SOjAGPbOyDFTp3_ElUGJiXxKj6EKSPhUakpVNiTg6M5gr9nJ7Z9QlLdHqJ1oowjoZo49KXdWF-HDdUWxG7wex2h99UNzoJRvefPA"
                alt="e-PACS Digitization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-[#005d42] text-[36px] absolute">devices</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#005d42] font-bold uppercase tracking-wider">पारदर्शी सहकारिता</span>
              <span className="text-lg font-bold text-[#111c2d] leading-snug group-hover:text-[#005d42] transition-colors">
                ई-PACS डिजिटलीकरण
              </span>
              <span className="text-xs text-[#565e74] mt-0.5">सभी 63,000 प्राथमिक समितियों का एकीकृत कम्प्यूटरीकरण</span>
            </div>
          </div>

          {/* Media Card 2: DBT Subsidy */}
          <div
            onClick={() => {
              onSelectAnswer(FERTILIZER_ANSWER);
              onNavigate('answer');
            }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xs hover:shadow-md p-4 flex items-center gap-4 border border-slate-200 cursor-pointer transition-all"
          >
            <div className="w-24 h-24 rounded-xl bg-amber-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs3hoQFv6QqtSJcHvdBWgxIKMKXym7yM5nyFWr0uDOTyIa4tq7mm_0B4b20aI2kosCJIGnS1NRPW350ucdZgodS6u7gJvx6-GnNBk6zI9rTuTiUBmfZyDkIwNYoC0kSDEg1QFkgFGikJQdc4f7DvHktLIjGQRfdARE96v5xKUqLM467HK8JrNQnnUs9FgK_9Bk9cDL-IV7WukUxKmQuhkuImU6Uaqgo408V9aVPOVDK8Up84Je-EyR9g"
                alt="Fertilizer DBT Subsidy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-[#a05600] text-[36px] absolute">eco</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#a05600] font-bold uppercase tracking-wider">सीधा बैंक खाता लाभ</span>
              <span className="text-lg font-bold text-[#111c2d] leading-snug group-hover:text-[#a05600] transition-colors">
                खाद व उर्वरक डीबीटी
              </span>
              <span className="text-xs text-[#565e74] mt-0.5">आधार आधारित बायोमेट्रिक द्वारा रियायती यूरिया व डीएपी</span>
            </div>
          </div>

          {/* Media Card 3: Grievance Resolution */}
          <div
            onClick={() => onNavigate('grievance')}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xs hover:shadow-md p-4 flex items-center gap-4 border border-slate-200 cursor-pointer transition-all"
          >
            <div className="w-24 h-24 rounded-xl bg-indigo-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAq00DJeN_D46aRlhy7ah7UmxcKVouWyJT91y-csVUaRHQdn6J-j6UWvesU7p3Nao0gjPD50sqy7Bfiy7LN_83s28SPdqZKBqtg3vqgtc8picg38XbdI5bPj4bl9eXBCxRzWUXcYEbMKBmADzeOmDwRUm2iGU1uUIikWtogC-jbycpfjoB7JIg3ksn9tjuJZtRyU0oA45TYS_Jg8mx2Jk4dGd8fo9NTdpWrpwM_gQR3DEdidIpBWuYkg"
                alt="7-day Grievance Redressal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-[#565e74] text-[36px] absolute">support</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#565e74] font-bold uppercase tracking-wider">समाधान गारंटी</span>
              <span className="text-lg font-bold text-[#111c2d] leading-snug group-hover:text-[#005d42] transition-colors">
                7-दिवसीय निवारण
              </span>
              <span className="text-xs text-[#565e74] mt-0.5">वॉइस-रिकॉर्डेड टोकन से सीधे जिला नोडल अधिकारी को शिकायत</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick-Access Action Cards (4-Column Rugged Touch Grid) */}
      <section className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#005d42]"></span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#111c2d]">
                त्वरित सेवाएं एवं सूचना पट (Quick Services)
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#565e74] mt-1">
              बड़ी स्क्रीन हेतु विशेष रूप से अनुकूलित बड़े टच बटन • किसी भी कार्ड पर टैप करें
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[#565e74] text-sm font-semibold">
            <span className="material-symbols-outlined text-[20px] text-[#005d42]">touch_app</span>
            <span>टच करें या ध्वनि से खोलें</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: PMFBY */}
          <div
            onClick={() => {
              onSelectAnswer(PMFBY_ANSWER);
              onNavigate('answer');
            }}
            className="group relative bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer min-h-[210px] border border-slate-200 active:scale-[0.98]"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdcc3] flex items-center justify-center text-[#7d4200] shadow-xs">
                <span className="material-symbols-outlined text-[32px]">agriculture</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffb77d]/40 text-[#2f1500] text-xs font-bold">
                रबी 2024-25
              </span>
            </div>
            <div className="my-3">
              <h3 className="text-xl font-bold text-[#111c2d] group-hover:text-[#005d42] transition-colors">
                फसल बीमा (PMFBY)
              </h3>
              <p className="text-xs md:text-sm text-[#565e74] mt-1 leading-snug">
                Check cut-off dates, claim status &amp; eligibility | क्लेम प्रक्रिया व समय सीमा
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 text-[#005d42] font-bold text-sm">
              <span>जानकारी देखें</span>
              <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 2: PACS By-Laws & Rights */}
          <div
            onClick={() => {
              onSelectAnswer(BYLAWS_ANSWER);
              onNavigate('answer');
            }}
            className="group relative bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer min-h-[210px] border border-slate-200 active:scale-[0.98]"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#dae2fd] flex items-center justify-center text-[#131b2e] shadow-xs">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#bec6e0]/40 text-[#131b2e] text-xs font-bold">
                MSCS एक्ट 2023
              </span>
            </div>
            <div className="my-3">
              <h3 className="text-xl font-bold text-[#111c2d] group-hover:text-[#005d42] transition-colors">
                PACS नियम व अधिकार
              </h3>
              <p className="text-xs md:text-sm text-[#565e74] mt-1 leading-snug">
                Voting rights, AGM guidelines, loan eligibility | समिति उपनियम व किसान अधिकार
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 text-[#005d42] font-bold text-sm">
              <span>नियम पढ़ें व सुनें</span>
              <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 3: Schemes & Subsidies */}
          <div
            onClick={() => {
              onSelectAnswer(SCHEMES_ANSWER);
              onNavigate('answer');
            }}
            className="group relative bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer min-h-[210px] border border-slate-200 active:scale-[0.98]"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#97f5cc] flex items-center justify-center text-[#005d42] shadow-xs">
                <span className="material-symbols-outlined text-[32px]">payments</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#7bd8b1]/40 text-[#002115] text-xs font-bold">
                0% ब्याज ऋण
              </span>
            </div>
            <div className="my-3">
              <h3 className="text-xl font-bold text-[#111c2d] group-hover:text-[#005d42] transition-colors">
                सरकारी योजनाएं व सब्सिडी
              </h3>
              <p className="text-xs md:text-sm text-[#565e74] mt-1 leading-snug">
                Seed, fertilizer &amp; credit subsidy eligibility | बीज, यूरिया व केसीसी ऋण सहायता
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 text-[#005d42] font-bold text-sm">
              <span>सब्सिडी विवरण</span>
              <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 4: Lodge Grievance */}
          <div
            onClick={() => onNavigate('grievance')}
            className="group relative bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer min-h-[210px] border border-red-200 active:scale-[0.98]"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center text-[#93000a] shadow-xs">
                <span className="material-symbols-outlined text-[32px]">record_voice_over</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                सीधा समाधान
              </span>
            </div>
            <div className="my-3">
              <h3 className="text-xl font-bold text-[#111c2d] group-hover:text-[#ba1a1a] transition-colors">
                शिकायत दर्ज करें (Grievance)
              </h3>
              <p className="text-xs md:text-sm text-[#565e74] mt-1 leading-snug">
                Voice-record a complaint &amp; get instant token | बोलकर सीधे शिकायत दर्ज कराएं
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 text-[#ba1a1a] font-bold text-sm">
              <span>शिकायत बोलें</span>
              <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live PACS Stats & Stock Availability Bar */}
      <section className="w-full max-w-[1440px] mx-auto">
        <div className="w-full bg-[#f0f3ff] rounded-2xl p-5 shadow-xs border border-[#bdc9c1]/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#005d42]">
                <span className="material-symbols-outlined text-[32px]">inventory</span>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-[#111c2d]">
                  ग्राम समिति खाद गोदाम स्थिति (Stock Availability)
                </h4>
                <p className="text-xs text-[#565e74]">
                  आज का सत्यापित स्टॉक: 15 जनवरी 2025 • केंद्र सं. 402
                </p>
              </div>
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="bg-white px-4 py-2.5 rounded-xl shadow-xs border border-slate-200 text-center">
                <span className="text-xs text-[#565e74] block font-medium">यूरिया (Urea 45kg)</span>
                <span className="text-lg md:text-xl font-extrabold text-[#005d42]">420 बोरी</span>
                <span className="text-xs text-[#005d42] font-semibold block">₹266.50 / बोरी</span>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl shadow-xs border border-slate-200 text-center">
                <span className="text-xs text-[#565e74] block font-medium">डीएपी (DAP 50kg)</span>
                <span className="text-lg md:text-xl font-extrabold text-[#005d42]">185 बोरी</span>
                <span className="text-xs text-[#005d42] font-semibold block">₹1,350 / बोरी</span>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl shadow-xs border border-slate-200 text-center">
                <span className="text-xs text-[#565e74] block font-medium">नैनो यूरिया (Liquid)</span>
                <span className="text-lg md:text-xl font-extrabold text-[#005d42]">310 बोतल</span>
                <span className="text-xs text-[#005d42] font-semibold block">₹225 / 500ml</span>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl shadow-xs border border-slate-200 text-center">
                <span className="text-xs text-[#565e74] block font-medium">KCC ऋण वितरण</span>
                <span className="text-lg md:text-xl font-extrabold text-[#005d42]">सक्रिय (Active)</span>
                <span className="text-xs text-[#005d42] font-semibold block">ब्याज सहायता 3%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Popular Voice Prompts & Secretary Notice */}
      <section className="w-full max-w-[1440px] mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#a05600] text-[26px]">lightbulb</span>
            <h3 className="text-xl font-bold text-[#111c2d]">
              लोकप्रिय प्रश्न (Tap to Ask Directly)
            </h3>
            <span className="text-xs text-[#565e74] font-medium hidden sm:inline">
              • एक टैप में आवाज से उत्तर प्राप्त करें
            </span>
          </div>

          {/* Quick Action Question Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => {
                onSelectAnswer(FERTILIZER_ANSWER);
                onOpenVoiceModal('खाद का नया मूल्य क्या है?');
              }}
              type="button"
              className="h-16 px-4 rounded-2xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-left flex items-center justify-between gap-2 shadow-xs active:scale-[0.99] transition-all group border border-slate-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#005d42] text-[24px] flex-shrink-0 group-hover:scale-110 transition-transform">
                  volume_up
                </span>
                <span className="text-sm md:text-base font-semibold truncate text-[#111c2d]">
                  "खाद का नया मूल्य क्या है?"
                </span>
              </div>
              <span className="text-xs text-[#005d42] font-bold px-2 py-1 rounded bg-white flex-shrink-0 shadow-xs">
                पूछें
              </span>
            </button>

            <button
              onClick={() => {
                onSelectAnswer(BYLAWS_ANSWER);
                onOpenVoiceModal('PACS सदस्यता प्रमाण पत्र कैसे मिलेगा?');
              }}
              type="button"
              className="h-16 px-4 rounded-2xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-left flex items-center justify-between gap-2 shadow-xs active:scale-[0.99] transition-all group border border-slate-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#005d42] text-[24px] flex-shrink-0 group-hover:scale-110 transition-transform">
                  volume_up
                </span>
                <span className="text-sm md:text-base font-semibold truncate text-[#111c2d]">
                  "PACS सदस्यता प्रमाण पत्र कैसे मिलेगा?"
                </span>
              </div>
              <span className="text-xs text-[#005d42] font-bold px-2 py-1 rounded bg-white flex-shrink-0 shadow-xs">
                पूछें
              </span>
            </button>

            <button
              onClick={() => {
                onSelectAnswer(PMFBY_ANSWER);
                onOpenVoiceModal('फसल नुकसान मुआवजा कितने दिन में?');
              }}
              type="button"
              className="h-16 px-4 rounded-2xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-left flex items-center justify-between gap-2 shadow-xs active:scale-[0.99] transition-all group border border-slate-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#005d42] text-[24px] flex-shrink-0 group-hover:scale-110 transition-transform">
                  volume_up
                </span>
                <span className="text-sm md:text-base font-semibold truncate text-[#111c2d]">
                  "फसल नुकसान मुआवजा कितने दिन में?"
                </span>
              </div>
              <span className="text-xs text-[#005d42] font-bold px-2 py-1 rounded bg-white flex-shrink-0 shadow-xs">
                पूछें
              </span>
            </button>
          </div>

          {/* Secretary Notice & Print Button */}
          <div className="mt-5 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 bg-[#f0f3ff]/70 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#005d42] text-[28px]">badge</span>
              <div>
                <span className="text-sm font-bold text-[#111c2d]">समिति व्यवस्थापक (PACS Secretary):</span>
                <span className="text-sm text-[#111c2d]"> श्री रामेश्वर लाल जाट (उपलब्ध कक्ष सं. 02)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#565e74] font-medium hidden sm:inline">
                टोकन सहायता हेतु काउंटर सं. 1 पर जाएं
              </span>
              <button
                onClick={onPrintRateCard}
                type="button"
                className="px-4 py-2 rounded-xl bg-white text-[#111c2d] text-sm font-bold shadow-xs flex items-center gap-1.5 hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#005d42]">print</span>
                <span>दैनिक दर सूची प्रिंट करें</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
