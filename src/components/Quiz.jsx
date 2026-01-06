import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { scenarios } from '../data/levels';
import { SocialPost } from './SocialPost';
import { PassportCard } from './PassportCard';
import { BoardingPassCard } from './BoardingPassCard';
import { AppScreenshotCard } from './AppScreenshotCard';
import { LuggageTagCard } from './LuggageTagCard';
import { EmailConfirmationCard } from './EmailConfirmationCard';
import { ShieldCheck, ShieldAlert, ChevronRight, RefreshCcw, Languages, Share2, AtSign, Download, Camera } from 'lucide-react';

export const Quiz = () => {
  const { t, i18n } = useTranslation();
  const resultRef = useRef(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(9);
  const [gameFinished, setGameFinished] = useState(true);

  const currentScenario = scenarios[currentLevelIndex];
  const isLastLevel = currentLevelIndex === scenarios.length - 1;

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const handleShareThreads = () => {
    const text = t('share_text', { score, total: scenarios.length });
    const url = "https://www.threads.net/intent/post?text=" + encodeURIComponent(text);
    window.open(url, '_blank');
  };

  const handleSharePhoto = async () => {
    if (!resultRef.current) return;

    try {
        const dataUrl = await toPng(resultRef.current, { backgroundColor: '#f9fafb', cacheBust: true });
        const blob = await fetch(dataUrl).then(res => res.blob());
        const file = new File([blob], 'privacy-pro-result.png', { type: 'image/png' });

        const text = t('share_text', { score, total: scenarios.length });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: t('app_name'),
                text: text,
            });
        } else {
            // Fallback: Download
            const link = document.createElement('a');
            link.download = 'privacy-pro-result.png';
            link.href = dataUrl;
            link.click();
            alert("Sharing photos is not supported on this browser. Image downloaded instead!");
        }
    } catch (err) {
        console.error("Photo sharing failed:", err);
    }
  };

  const handleShareGeneric = async () => {
    const text = t('share_text', { score, total: scenarios.length });
    const shareData = {
        title: t('app_name'),
        text: text,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(text + " " + window.location.href);
            alert("Result copied to clipboard!");
        }
    } catch (err) {
        console.error("Share failed:", err);
    }
  };

  const handleVote = (voteRisky) => {
    if (hasVoted) return;

    const correct = voteRisky === currentScenario.risky;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setHasVoted(true);
  };

  const handleObjectClick = (target) => {
    if (hasVoted) return;
    
    // In 'find-leak' mode, clicking the right target is "Correct"
    if (target === currentScenario.leak.target) {
        setIsCorrect(true);
        setScore(s => s + 1);
        setHasVoted(true);
    } else {
        // If they click something else that isn't the leak
        // Maybe we just shake or show a temporary "Not this" toast?
        // For simplicity, let's treat it as "Incorrect" choice immediately, or maybe allowed retries?
        // Let's stick to the current flow: One chance.
        setIsCorrect(false);
        setHasVoted(true);
    }
  };

  const handleNext = () => {
    if (isLastLevel) {
        setGameFinished(true);
    } else {
        setCurrentLevelIndex(prev => prev + 1);
        setHasVoted(false);
        setIsCorrect(false);
        // Scroll to top
        window.scrollTo(0, 0);
    }
  };

  const restartGame = () => {
      setCurrentLevelIndex(0);
      setHasVoted(false);
      setIsCorrect(false);
      setScore(0);
      setGameFinished(false);
      window.scrollTo(0, 0);
  };

  if (!currentScenario) return <div className="text-center p-10">Loading...</div>;

  // Render content based on type
  const renderDocument = () => {
    const commonProps = {
        details: currentScenario.details,
        showLeak: hasVoted && currentScenario.risky,
        isSafe: !currentScenario.risky,
        leakTarget: currentScenario.leak?.target,
        partialCover: currentScenario.partialCover,
        onInteract: currentScenario.gamemode === 'find-leak' ? handleObjectClick : undefined
    };

    if (currentScenario.type === 'passport') {
        return <PassportCard {...commonProps} country={currentScenario.country} />;
    } else if (currentScenario.type === 'app-screenshot') {
        return <AppScreenshotCard {...commonProps} />;
    } else if (currentScenario.type === 'luggage-tag') {
        return <LuggageTagCard {...commonProps} />;
    } else if (currentScenario.type === 'email') {
        return <EmailConfirmationCard {...commonProps} />;
    }
    return <BoardingPassCard {...commonProps} />;
  };

  if (gameFinished) {
      return (
          <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
              {/* Capture Area */}
              <div ref={resultRef} className="p-8 bg-white rounded-2xl shadow-xl text-center border border-gray-100 mb-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-black mb-2 text-gray-900">{t('training_complete')}</h2>
                  <p className="text-gray-500 mb-6">
                      {t('score_display', { score, total: scenarios.length })}
                  </p>
                  
                  <div className="bg-gray-50 p-5 rounded-xl text-left text-sm">
                      <h3 className="font-bold mb-3 text-indigo-900 uppercase tracking-wider text-xs">{t('takeaways')}</h3>
                      <ul className="space-y-3 text-gray-700">
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_1')}</li>
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_2')}</li>
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_3')}</li>
                      </ul>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1 rounded">
                            <ShieldCheck className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-bold text-sm tracking-tight">{t('app_name')}</span>
                      </div>
                  </div>
              </div>

              <div className="space-y-3 mb-8 px-2">
                  <button 
                      onClick={handleSharePhoto}
                      className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                      <Camera className="w-5 h-5" /> {t('share_generic')} & Photo
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                      <button 
                          onClick={handleShareThreads}
                          className="py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                          <AtSign className="w-4 h-4" /> Threads
                      </button>
                      <button 
                          onClick={handleShareGeneric}
                          className="py-3 bg-white text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 border border-gray-200 active:scale-[0.98]"
                      >
                          <Share2 className="w-4 h-4" /> Link
                      </button>
                  </div>
              </div>

              <button 
                  onClick={restartGame}
                  className="w-full py-3 text-gray-400 font-bold hover:text-indigo-600 transition flex items-center justify-center gap-2"
              >
                  <RefreshCcw className="w-4 h-4" /> {t('play_again')}
              </button>
          </div>
      );
  }

  return (
    <div className="w-full max-w-lg mx-auto pb-20">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4 px-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
          >
            <Languages className="w-3.5 h-3.5" />
            {i18n.language === 'en' ? '中文' : 'English'}
          </button>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1 mb-4 px-4">
        {scenarios.map((_, idx) => (
            <div 
                key={idx} 
                className={`h-1 flex-1 rounded-full transition-colors ${
                    idx < currentLevelIndex ? 'bg-indigo-500' : 
                    idx === currentLevelIndex ? 'bg-indigo-200' : 'bg-gray-200'
                }`}
            />
        ))}
      </div>

      <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">{t('is_safe')}</h1>
          <p className="text-sm text-gray-500">
              {currentScenario.gamemode === 'find-leak' ? t('tap_instruction') : t('analyze_desc')}
          </p>
      </div>

      <SocialPost 
        username={currentScenario.type === 'passport' ? 'travel_guru_99' : 'adventurer_jane'}
        description={t(`scenarios.${currentScenario.id}.desc`)}
      >
        {renderDocument()}
      </SocialPost>

      {/* Interaction Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-gray-200 shadow-lg-up z-50">
        <div className="max-w-lg mx-auto">
            {!hasVoted ? (
                currentScenario.gamemode === 'find-leak' ? (
                     <div className="text-center p-2 text-gray-500 font-medium italic animate-pulse">
                        {t('tap_instruction')}
                     </div>
                ) : (
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => handleVote(false)}
                        className="py-3 px-4 rounded-xl border-2 border-green-500 text-green-700 font-bold hover:bg-green-50 transition flex flex-col items-center gap-1"
                    >
                        <ShieldCheck className="w-6 h-6" />
                        {t('safe')}
                    </button>
                    <button 
                        onClick={() => handleVote(true)}
                        className="py-3 px-4 rounded-xl border-2 border-red-500 text-red-700 font-bold hover:bg-red-50 transition flex flex-col items-center gap-1"
                    >
                        <ShieldAlert className="w-6 h-6" />
                        {t('risky')}
                    </button>
                </div>
                )
            ) : (
                <div className="animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className={`p-4 rounded-lg mb-4 flex items-start gap-3 ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                        {isCorrect ? <ShieldCheck className="shrink-0" /> : <ShieldAlert className="shrink-0" />}
                        <div>
                            <h3 className="font-bold">{isCorrect ? t('correct') : t('incorrect')}</h3>
                            <p className="text-sm mt-1">
                                {currentScenario.risky 
                                    ? t(`scenarios.${currentScenario.id}.reason`)
                                    : t(`scenarios.${currentScenario.id}.safe_msg`)}
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                        {isLastLevel ? t('see_results') : t('next_level')} <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
