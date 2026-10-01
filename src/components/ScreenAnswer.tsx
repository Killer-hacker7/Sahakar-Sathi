import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, AnswerData } from '../types';

interface ScreenAnswerProps {
  answer: AnswerData;
  onNavigate: (screen: ScreenType) => void;
  onOpenVoiceModal: () => void;
  onOpenClaimForm: () => void;
  onOpenSMSModal: () => void;
  onOpenGazetteModal: () => void;
  voiceAssist: boolean;
}

export const ScreenAnswer: React.FC<ScreenAnswerProps> = ({
  answer,
  onNavigate,
  onOpenVoiceModal,
  onOpenClaimForm,
  onOpenSMSModal,
  onOpenGazetteModal,
  voiceAssist
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [playedSeconds, setPlayedSeconds] = useState(12);
  const [totalSeconds] = useState(45);
  const [idleSeconds, setIdleSeconds] = useState(48);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Idle Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Safely trigger auto-reset on timeout
  useEffect(() => {
    if (idleSeconds === 0) {
      onNavigate('home');
    }
  }, [idleSeconds, onNavigate]);

  // Audio Playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayedSeconds((prev) => {
          if (prev >= totalSeconds) {
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalSeconds]);

  // Handle completion when reaching total seconds
  useEffect(() => {
    if (playedSeconds >= totalSeconds && isPlaying) {
      setIsPlaying(false);
      setPlayedSeconds(0);
    }
  }, [playedSeconds, totalSeconds, isPlaying]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if ('speechSynthesis' in window && !isMuted) {
        window.speechSynthesis.cancel();
        const textToSpeak = answer.summaryText;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'hi-IN';
        utterance.rate = playbackSpeed;
        utterance.onend = () => {
          setIsPlaying(false);
        };
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(answer.summaryText);
      utterance.lang = 'hi-IN';
      utterance.rate = speed;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const addTime = () => {
    setIdleSeconds((prev) => Math.min(prev + 60, 99));
  };

  const progressPercent = Math.min(Math.round((playedSeconds / totalSeconds) * 100), 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-6 select-none pb-12">
      {/* 1. Top Session & Kiosk Status Bar */}
      <div className="w-full bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            type="button"
            className="min-h-[52px] px-5 bg-[#f0f3ff] hover:bg-[#dee8ff] rounded-xl flex items-center gap-2 text-base font-bold text-[#111c2d] transition-all shadow-xs active:scale-98"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            <span>मुख्य पृष्ठ (Back to Home)</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 pl-2 text-sm">
            <span className="text-[#565e74]">PACS सत्र ID:</span>
            <span className="font-mono font-bold text-[#005d42]">#KSK-88219</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular Countdown Gauge */}
          <div className="flex items-center gap-3 bg-[#f0f3ff] px-4 py-1.5 rounded-xl border border-slate-200/60 shadow-inner">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-[#047857] transition-all duration-1000 ease-linear"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="100, 100"
                  strokeDashoffset={100 - (idleSeconds / 60) * 100}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-[#111c2d]">
                {idleSeconds}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-bold text-[#111c2d] leading-tight">
                सक्रिय सत्र (Active Session)
              </span>
              <span className="text-xs text-[#565e74]">
                ऑटो-रीसेट: <span className="font-bold text-red-600">{idleSeconds} सेकंड शेष</span> (Idle safety)
              </span>
            </div>
          </div>

          <button
            onClick={addTime}
            type="button"
            className="h-[48px] px-4 bg-[#dae2fd] hover:bg-[#bec6e0] text-[#131b2e] rounded-xl flex items-center gap-1.5 text-sm font-bold transition-all shadow-xs active:scale-95"
            title="सत्र समय 60 सेकंड बढ़ाएं"
          >
            <span className="material-symbols-outlined text-[20px]">update</span>
            <span>समय बढ़ाएं (+60s)</span>
          </button>
        </div>
      </div>

      {/* 2. Central Conversational View */}
      <div className="w-full flex flex-col gap-6">
        {/* User Voiced Query Bubble (Right-aligned) */}
        <div className="w-full flex justify-end">
          <div className="w-full lg:w-4/5 xl:w-3/4 bg-[#dee8ff]/80 rounded-2xl p-5 shadow-sm border border-[#bdc9c1]/30 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#047857] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                </span>
                <span className="text-sm md:text-base font-bold text-[#111c2d]">
                  किसान सदस्य द्वारा पूछा गया प्रश्न (You asked via Voice)
                </span>
              </div>
              {/* Transcribed Audio Badge */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-[#005d42] text-xs font-semibold shadow-xs border border-slate-200">
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2.5 bg-[#005d42] animate-pulse"></span>
                  <span className="w-0.5 h-1.5 bg-[#005d42]"></span>
                  <span className="w-0.5 h-3 bg-[#005d42] animate-pulse"></span>
                  <span className="w-0.5 h-1 bg-[#005d42]"></span>
                </span>
                <span>{answer.transcriptionBadge}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200">
              <p className="text-xl md:text-2xl font-bold text-[#111c2d] leading-snug">
                “{answer.queryHindi}”
              </p>
              <p className="text-xs md:text-sm text-[#565e74] mt-1 font-medium">
                ({answer.queryEnglish})
              </p>
            </div>
          </div>
        </div>

        {/* 3. Assistant AI Grounded Response Card (Left-aligned) */}
        <div className="w-full flex justify-start">
          <div className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden border border-slate-200">
            {/* Left Accent Header Bar */}
            <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-[#047857]"></div>

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pl-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#005d42] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[28px]">smart_toy</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-[#005d42]">सहकार साथी अधिकृत उत्तर</span>
                    <span className="bg-[#97f5cc] text-[#002115] text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {answer.badgeLabel}
                    </span>
                  </div>
                  <span className="text-xs text-[#565e74] font-medium">
                    PACS सहायता केंद्र • वास्तविक समय वैधानिक सत्यापन
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#565e74] bg-[#f0f3ff] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-semibold border border-slate-200">
                  <span className="material-symbols-outlined text-[#005d42] text-[18px]">verified</span>
                  100% शासकीय नियमों से संरेखित
                </span>
              </div>
            </div>

            {/* Audio Voice Playback Bar (AI Bulbul Hindi Voice) */}
            <div className="w-full bg-[#f0f3ff] rounded-2xl p-4 shadow-inner border border-slate-200 flex flex-col gap-3 ml-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#005d42] text-[24px]">volume_up</span>
                  <span className="text-sm md:text-base font-bold text-[#111c2d]">
                    उत्तर सुनें (Listen to Answer - AI Bulbul Hindi Voice)
                  </span>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs border border-slate-200">
                  <span className="text-xs text-[#565e74] px-1.5 font-semibold">गति:</span>
                  <button
                    onClick={() => handleSpeedChange(0.8)}
                    type="button"
                    className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                      playbackSpeed === 0.8 ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#565e74] hover:bg-slate-100'
                    }`}
                  >
                    0.8x
                  </button>
                  <button
                    onClick={() => handleSpeedChange(1.0)}
                    type="button"
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                      playbackSpeed === 1.0 ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#565e74] hover:bg-slate-100'
                    }`}
                  >
                    1.0x (सामान्य)
                  </button>
                  <button
                    onClick={() => handleSpeedChange(1.2)}
                    type="button"
                    className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${
                      playbackSpeed === 1.2 ? 'bg-[#005d42] text-white shadow-xs' : 'text-[#565e74] hover:bg-slate-100'
                    }`}
                  >
                    1.2x
                  </button>
                </div>
              </div>

              {/* Waveform & Play Seeker Control */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={togglePlay}
                  type="button"
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#005d42] to-[#047857] hover:brightness-110 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 flex-shrink-0"
                  title={isPlaying ? 'रोकें (Pause)' : 'सुने (Play)'}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                {/* Progress Bar */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPct = clickX / rect.width;
                      setPlayedSeconds(Math.round(newPct * totalSeconds));
                    }}
                    className="w-full bg-slate-200 rounded-full h-3 overflow-hidden relative cursor-pointer"
                  >
                    <div
                      className="bg-gradient-to-r from-[#005d42] to-[#047857] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  <div className="w-full flex justify-between text-xs text-[#565e74] font-medium">
                    <span>
                      0:{playedSeconds < 10 ? `0${playedSeconds}` : playedSeconds} चला (Played)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block w-2 h-2 rounded-full ${isPlaying ? 'bg-[#005d42] animate-pulse' : 'bg-slate-400'}`}></span>
                      <span>{isPlaying ? 'AI वाचन सक्रिय' : 'वाचन विराम'}</span>
                    </div>
                    <span>कुल समय: 0:{totalSeconds} सेकंड</span>
                  </div>
                </div>

                {/* Speaker Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  type="button"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 text-[#111c2d] flex items-center justify-center shadow-xs border border-slate-200"
                  title={isMuted ? 'ध्वनि चालू करें' : 'ध्वनि म्यूट करें'}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
              </div>
            </div>

            {/* Main High-Contrast Text Summary */}
            <div className="pl-1 pt-1">
              <div className="bg-[#f0f3ff]/70 p-5 rounded-2xl border border-slate-200">
                <p className="text-xl md:text-2xl text-[#111c2d] font-bold leading-relaxed">
                  {answer.summaryText}
                </p>
              </div>
            </div>

            {/* Key Takeaways Section Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-1">
              <div className="bg-[#f0f3ff] rounded-2xl p-4 flex flex-col justify-between shadow-xs border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[24px]">schedule</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111c2d]">समय सीमा (Timeline)</span>
                    <span className="text-xs text-red-600 font-bold">अत्यंत महत्वपूर्ण</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-red-600">{answer.timeline}</p>
                <p className="text-xs text-[#565e74] mt-1 font-medium">आपदा के तुरंत बाद PACS या हेल्पलाइन पर दर्ज कराएं।</p>
              </div>

              <div className="bg-[#f0f3ff] rounded-2xl p-4 flex flex-col justify-between shadow-xs border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#005d42] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111c2d]">तुरंत संपर्क (Helpline)</span>
                    <span className="text-xs text-[#005d42] font-bold">24×7 निःशुल्क सेवा</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-[#005d42] font-mono">{answer.helpline}</p>
                <p className="text-xs text-[#565e74] mt-1 font-medium">कृषि रक्षक हेल्पलाइन / किसान कॉल सेंटर</p>
              </div>

              <div className="bg-[#f0f3ff] rounded-2xl p-4 flex flex-col justify-between shadow-xs border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#dae2fd] text-[#131b2e] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111c2d]">आवश्यक दस्तावेज</span>
                    <span className="text-xs text-[#565e74]">सत्यापन हेतु जरूरी</span>
                  </div>
                </div>
                <p className="text-base font-bold text-[#111c2d]">{answer.documents}</p>
                <p className="text-xs text-[#565e74] mt-1 font-medium">PACS सोसाइटी खाता संख्या साथ रखें।</p>
              </div>
            </div>

            {/* Official Source Citation Badge (Statutory Compliance) */}
            <div className="bg-[#dee8ff]/70 rounded-2xl p-4 ml-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#bdc9c1]/40 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#005d42] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">policy</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-bold text-[#111c2d]">
                      ✓ प्रमाणित सरकारी स्रोत (Official Validated Citation)
                    </span>
                    <span className="bg-[#047857] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {answer.citationSection}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#565e74] mt-0.5">
                    {answer.citationTitle}
                  </p>
                  <p className="text-xs text-[#565e74] mt-1">
                    {answer.citationDetail}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <button
                  onClick={onOpenGazetteModal}
                  type="button"
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-[#005d42] font-bold text-xs md:text-sm rounded-xl flex items-center gap-1.5 shadow-xs border border-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>नियम गजट देखें</span>
                </button>
              </div>
            </div>

            {/* Field Officer and Survey Squad Photos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-1 pt-1">
              <div className="bg-[#f0f3ff] rounded-2xl p-4 flex items-center gap-4 border border-slate-200">
                <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN71rLHEVCzDP854ClcfNWMQSxAjPNw7LTl2AM3K7OWhjOxmKeFC0TKEF57QjjkIa0fsUtpsRSieUgN5Mmfpno9VHKbpcUmn6fKlY8ORSfnBlNzVztaItswk1DWOsdpc40d8IkeuilgTNt4o1V1MJOHRDNo94yPpiM6Rgb5URHrqV6cJ2xXYOdK1uBZMUFTiokw8FF-kP64wJ-YZczxHACZWWOCpQ0uyc3qfMPzJ0fGxsWWdIgrdAS8Q"
                    alt="Field Officer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="material-symbols-outlined text-[#005d42] text-[28px] absolute">badge</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#111c2d] truncate">{answer.officerRole}</span>
                  <span className="text-sm text-[#565e74] truncate">{answer.officerName}</span>
                  <span className="text-xs text-[#005d42] font-semibold">{answer.officerLocation}</span>
                </div>
              </div>

              <div className="bg-[#f0f3ff] rounded-2xl p-4 flex items-center gap-4 border border-slate-200">
                <div className="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqldQYaq5qOU6MTdeILX5d8kAk2JC05OUwdQ7NA3r5latX__BePS5duUodo3kv5qj6qa4LiCzrUEkzq_z-YF9j9lx3J98nL2h3LKkFclsaI6oN4eISAhgZ1IABe1Ke2-UHzIGVJyj0-IJTLVhpY1sw8zQab7u-UXp9CQKGZRpz77_Vj7UDy9UUvM37xLzcTLrh9LAliKfyq0Ni6SzOAaarZKVGl6ZHvVuomMstOmL6JAIs7PcQOsnerA"
                    alt="Survey Squad"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="material-symbols-outlined text-[#a05600] text-[28px] absolute">groups</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#111c2d] truncate">फसल सर्वेक्षण दल (Survey Squad)</span>
                  <span className="text-sm text-[#565e74] truncate">{answer.surveyTime}</span>
                  <span className="text-xs text-[#a05600] font-semibold">{answer.surveyOfficer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom High-Affordance Action Touch Buttons (Min Height 64px) */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-lg border border-slate-200 flex flex-col md:flex-row items-stretch justify-between gap-4">
          {/* Button 1: Claim Form / Print */}
          <button
            onClick={onOpenClaimForm}
            type="button"
            className="min-h-[64px] flex-1 bg-gradient-to-r from-[#005d42] to-[#047857] hover:brightness-110 text-white rounded-2xl px-4 py-2 flex items-center justify-center gap-3 text-base md:text-lg font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[28px]">print</span>
            <span className="text-center leading-snug">
              📋 दावा आवेदन पत्र देखें व प्रिंट करें<br />
              <span className="text-xs font-normal opacity-90">(View &amp; Print PMFBY Claim Form)</span>
            </span>
          </button>

          {/* Button 2: Ask Another Voice Query */}
          <button
            onClick={onOpenVoiceModal}
            type="button"
            className="min-h-[64px] flex-1 bg-[#565e74] hover:bg-[#111c2d] text-white rounded-2xl px-4 py-2 flex items-center justify-center gap-3 text-base md:text-lg font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[28px]">mic_none</span>
            <span className="text-center leading-snug">
              🔄 दूसरा प्रश्न पूछें<br />
              <span className="text-xs font-normal opacity-90">(Ask Another Voice Query)</span>
            </span>
          </button>

          {/* Button 3: Send SMS / WhatsApp */}
          <button
            onClick={onOpenSMSModal}
            type="button"
            className="min-h-[64px] flex-1 bg-[#a05600] hover:bg-[#7d4200] text-white rounded-2xl px-4 py-2 flex items-center justify-center gap-3 text-base md:text-lg font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[28px]">send_to_mobile</span>
            <span className="text-center leading-snug">
              📲 विवरण मोबाइल पर भेजें<br />
              <span className="text-xs font-normal opacity-90">(Send SMS / WhatsApp Receipt)</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
