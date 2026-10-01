/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, LanguageCode, AnswerData, GrievanceTicket } from './types';
import { PMFBY_ANSWER, DEFAULT_GRIEVANCE } from './data/mockData';
import { Header } from './components/Header';
import { ScreenHome } from './components/ScreenHome';
import { ScreenAnswer } from './components/ScreenAnswer';
import { ScreenGrievance } from './components/ScreenGrievance';
import { Footer } from './components/Footer';
import {
  VoiceListeningModal,
  ClaimFormModal,
  SMSModal,
  GazetteModal,
  PrintSlipModal
} from './components/Modals';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');
  const [activeNavTab, setActiveNavTab] = useState<string>('kiosk-home');
  const [activeAnswer, setActiveAnswer] = useState<AnswerData>(PMFBY_ANSWER);
  const [ticket] = useState<GrievanceTicket>(DEFAULT_GRIEVANCE);

  // Modals state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceSamplePrompt, setVoiceSamplePrompt] = useState<string | undefined>();
  const [isClaimFormOpen, setIsClaimFormOpen] = useState(false);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [isGazetteOpen, setIsGazetteOpen] = useState(false);
  const [isPrintSlipOpen, setIsPrintSlipOpen] = useState(false);

  // Accessibility state
  const [fontSizeScale, setFontSizeScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceAssist, setVoiceAssist] = useState(true);

  // Audio speech announcements for accessibility
  const announceAccessibility = (text: string) => {
    if (voiceAssist && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNavigate = (screen: ScreenType) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (screen === 'home') {
      setActiveNavTab('kiosk-home');
      announceAccessibility('मुख्य पृष्ठ पर स्वागत है');
    } else if (screen === 'answer') {
      announceAccessibility('उत्तर पृष्ठ खोला गया');
    } else if (screen === 'grievance') {
      setActiveNavTab('grievance-voice-desk');
      announceAccessibility('डिजिटल शिकायत निवारण केंद्र');
    }
  };

  const handleResetSession = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveAnswer(PMFBY_ANSWER);
    setCurrentScreen('home');
    setActiveNavTab('kiosk-home');
    setIsVoiceModalOpen(false);
    setIsClaimFormOpen(false);
    setIsSMSModalOpen(false);
    setIsGazetteOpen(false);
    setIsPrintSlipOpen(false);
    announceAccessibility('नया सत्र प्रारंभ हुआ');
  };

  const voiceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleOpenVoiceModal = (samplePrompt?: string) => {
    setVoiceSamplePrompt(samplePrompt);
    setIsVoiceModalOpen(true);
    announceAccessibility('माइक सक्रिय है, कृपया अपना प्रश्न बोलें');

    if (voiceTimerRef.current) {
      clearTimeout(voiceTimerRef.current);
    }

    // Auto-transition after 2.5s for authentic voice-first prototype demonstration
    voiceTimerRef.current = setTimeout(() => {
      handleVoiceSubmit();
    }, 2500);
  };

  const handleVoiceSubmit = () => {
    if (voiceTimerRef.current) {
      clearTimeout(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    setIsVoiceModalOpen(false);
    setCurrentScreen('answer');
    setActiveNavTab('member-services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    announceAccessibility('आपके प्रश्न का अधिकृत उत्तर प्रस्तुत है');
  };

  const handleCloseVoiceModal = () => {
    if (voiceTimerRef.current) {
      clearTimeout(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    setIsVoiceModalOpen(false);
  };

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    const langNames: Record<LanguageCode, string> = {
      hi: 'हिंदी भाषा चुनी गई',
      en: 'English language selected',
      bn: 'বাংলা ভাষা নির্বাচন করা হয়েছে',
      mr: 'मराठी भाषा निवडली आहे',
      gu: 'ગુજરાતી ભાષા પસંદ કરવામાં આવી'
    };
    announceAccessibility(langNames[lang]);
  };

  const handlePrintRateCard = () => {
    window.print();
  };

  // Font size scale class mapping
  const scaleClass =
    fontSizeScale === 'lg'
      ? 'text-lg'
      : fontSizeScale === 'sm'
      ? 'text-sm'
      : 'text-base';

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d] transition-all duration-200 ${scaleClass} ${
        highContrast ? 'high-contrast-mode' : ''
      }`}
    >
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onResetSession={handleResetSession}
        activeNavTab={activeNavTab}
        onSelectNavTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'grievance-voice-desk') {
            setCurrentScreen('grievance');
          } else if (tab === 'kiosk-home') {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('answer');
          }
        }}
      />

      {/* Main Content Viewport with top padding matching header */}
      <main className="w-full flex-1 pt-36 md:pt-40">
        {currentScreen === 'home' && (
          <ScreenHome
            onNavigate={handleNavigate}
            onOpenVoiceModal={handleOpenVoiceModal}
            onSelectAnswer={(ans) => setActiveAnswer(ans)}
            onPrintRateCard={handlePrintRateCard}
          />
        )}

        {currentScreen === 'answer' && (
          <ScreenAnswer
            answer={activeAnswer}
            onNavigate={handleNavigate}
            onOpenVoiceModal={() => handleOpenVoiceModal('PMFBY में क्लेम करने की समय सीमा क्या है?')}
            onOpenClaimForm={() => setIsClaimFormOpen(true)}
            onOpenSMSModal={() => setIsSMSModalOpen(true)}
            onOpenGazetteModal={() => setIsGazetteOpen(true)}
            voiceAssist={voiceAssist}
          />
        )}

        {currentScreen === 'grievance' && (
          <ScreenGrievance
            ticket={ticket}
            onNavigate={handleNavigate}
            onOpenPrintSlip={() => setIsPrintSlipOpen(true)}
            onOpenSMSModal={() => setIsSMSModalOpen(true)}
            onResetSession={handleResetSession}
          />
        )}
      </main>

      {/* Modals */}
      <VoiceListeningModal
        isOpen={isVoiceModalOpen}
        onClose={handleCloseVoiceModal}
        onSubmit={handleVoiceSubmit}
        samplePrompt={voiceSamplePrompt}
      />

      <ClaimFormModal
        isOpen={isClaimFormOpen}
        onClose={() => setIsClaimFormOpen(false)}
      />

      <SMSModal
        isOpen={isSMSModalOpen}
        onClose={() => setIsSMSModalOpen(false)}
        ticketId={currentScreen === 'grievance' ? ticket.ticketId : undefined}
      />

      <GazetteModal
        isOpen={isGazetteOpen}
        onClose={() => setIsGazetteOpen(false)}
      />

      <PrintSlipModal
        isOpen={isPrintSlipOpen}
        onClose={() => setIsPrintSlipOpen(false)}
        ticket={ticket}
      />

      {/* Accessibility & Ministry Footer */}
      <Footer
        fontSizeScale={fontSizeScale}
        onChangeFontSize={(scale) => setFontSizeScale(scale)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        voiceAssist={voiceAssist}
        onToggleVoiceAssist={() => setVoiceAssist(!voiceAssist)}
      />
    </div>
  );
}
