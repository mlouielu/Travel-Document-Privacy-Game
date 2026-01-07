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
import { PassportOverBoardingPassCard } from './PassportOverBoardingPassCard';
import { MRZDecoderCard } from './MRZDecoderCard';
import { PDF417DecoderCard } from './PDF417DecoderCard';
import { ShieldCheck, ShieldAlert, ChevronRight, RefreshCcw, Languages, Share2, AtSign, Download, Camera, Ticket, Book } from 'lucide-react';

export const Quiz = () => {
  const { t, i18n } = useTranslation();
  const resultRef = useRef(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [levelResults, setLevelResults] = useState({});
  const [gameFinished, setGameFinished] = useState(false);

  const currentScenario = scenarios[currentLevelIndex];
  const isLastLevel = currentLevelIndex === scenarios.length - 1;

  const handleShareThreads = () => {
    const text = t('share_text', { score, total: scenarios.length }) + " " + window.location.href;
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
                text: text + " " + window.location.href,
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
    setLevelResults(prev => ({ ...prev, [currentLevelIndex]: correct }));
    setHasVoted(true);
  };

  const handleObjectClick = (target) => {
    if (hasVoted) return;

    // In 'find-leak' mode, clicking the right target is "Correct"
    const isTargetCorrect = Array.isArray(currentScenario.leak.target)
        ? currentScenario.leak.target.includes(target)
        : target === currentScenario.leak.target;

    if (isTargetCorrect) {
        setIsCorrect(true);
        setScore(s => s + 1);
        setLevelResults(prev => ({ ...prev, [currentLevelIndex]: true }));
        setHasVoted(true);
    } else {
        // If they click something else that isn't the leak
        // Maybe we just shake or show a temporary "Not this" toast?
        // For simplicity, let's treat it as "Incorrect" choice immediately, or maybe allowed retries?
        // Let's stick to the current flow: One chance.
        setIsCorrect(false);
        setLevelResults(prev => ({ ...prev, [currentLevelIndex]: false }));
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
      setLevelResults({});
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
        return <PassportCard {...commonProps} country={currentScenario.country} maskMRZ={currentScenario.maskMRZ} partialMRZMask={currentScenario.partialMRZMask} />;
    } else if (currentScenario.type === 'app-screenshot') {
        return <AppScreenshotCard {...commonProps} onInteract={handleObjectClick} />;
    } else if (currentScenario.type === 'luggage-tag') {
        return <LuggageTagCard {...commonProps} onInteract={handleObjectClick} />;
    } else if (currentScenario.type === 'email') {
        return <EmailConfirmationCard {...commonProps} onInteract={handleObjectClick} />;
    } else if (currentScenario.type === 'passport-over-boarding-pass') {
        return <PassportOverBoardingPassCard {...commonProps} onInteract={handleObjectClick} />;
    } else if (currentScenario.type === 'mrz-decode') {
        return <MRZDecoderCard details={currentScenario.details} onCorrect={() => {
            setIsCorrect(true);
            setScore(s => s + 1);
            setLevelResults(prev => ({ ...prev, [currentLevelIndex]: true }));
            setHasVoted(true);
        }} />;
    } else if (currentScenario.type === 'pdf417-decode') {
        return <PDF417DecoderCard details={currentScenario.details} onCorrect={() => {
            setIsCorrect(true);
            setScore(s => s + 1);
            setLevelResults(prev => ({ ...prev, [currentLevelIndex]: true }));
            setHasVoted(true);
        }} />;
    }
    return <BoardingPassCard {...commonProps} onInteract={handleObjectClick} />;
  };

  if (gameFinished) {
      const failedLevels = scenarios.filter((_, idx) => levelResults[idx] === false);

      return (
          <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
              {/* Capture Area */}
              <div ref={resultRef} className="p-8 bg-white rounded-2xl shadow-xl text-center border border-gray-100 mb-6 relative overflow-hidden">

                  {/* Redacted Document Collage */}
                  <div className="relative w-48 h-32 mx-auto mb-10 mt-6 flex items-center justify-center">
                      {/* Mini Ticket - Now Background (z-10) */}
                      <div className="absolute right-2 w-32 h-14 bg-white rounded-lg shadow-xl rotate-6 border-2 border-gray-200 flex items-center px-3 gap-3 overflow-hidden z-10">
                          <div className="w-6 h-6 bg-gray-100 rounded-sm"></div>
                          <div className="flex-1 space-y-1">
                              <div className="flex gap-1"><div className="w-1/2 h-1 bg-gray-300 rounded-full"></div><div className="w-1/4 h-1 bg-gray-300 rounded-full"></div></div>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                              <div className="w-2/3 h-1 bg-gray-200 rounded-full"></div>
                          </div>
                          <div className="w-0.5 h-full border-l border-dashed border-gray-300"></div>
                          <div className="w-4 h-4 bg-gray-800 opacity-10"></div>
                      </div>

                      {/* Mini Passport (Taiwan Green - Vertical) - Now Foreground (z-20) */}
                      <div className="absolute left-4 w-20 h-28 bg-green-800 rounded-lg shadow-2xl -rotate-12 border-2 border-green-700 flex flex-col items-center justify-start py-6 px-1 z-20 overflow-hidden">
                          <div className="w-10 h-10 rounded-full border border-yellow-500/30 mb-2 flex items-center justify-center">
                             <div className="w-6 h-6 rounded-full bg-blue-900/30"></div>
                          </div>
                          <div className="mt-auto flex flex-col items-center">
                            <div className="text-[8px] text-yellow-500 font-black tracking-[0.2em] leading-none mb-1">TAIWAN</div>
                            <div className="text-[5px] text-yellow-500 tracking-wider font-bold">PASSPORT</div>
                          </div>
                      </div>

                      {/* Top Secret Stamp (Moved from background to top) */}
                      <div className="absolute inset-0 flex items-center justify-center z-[50] pointer-events-none">
                          <div className="border-[6px] border-red-600/80 p-3 rounded-lg -rotate-12 bg-white/10 backdrop-blur-[1px]">
                              <span className="text-xl font-black text-red-600/90 uppercase tracking-widest block leading-none">TOP<br/>SECRET</span>
                          </div>
                      </div>
                  </div>

                  <h2 className="text-2xl font-black mb-2 text-gray-900 tracking-tight">{t('training_complete')}</h2>
                  <p className="text-gray-500 mb-6">
                      {t('score_display', { score, total: scenarios.length })}
                  </p>

                  <div className="bg-gray-50 p-5 rounded-xl text-left text-sm mb-6">
                      <h3 className="font-bold mb-3 text-indigo-900 uppercase tracking-wider text-xs">{t('takeaways')}</h3>
                      <ul className="space-y-3 text-gray-700">
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_1')}</li>
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_2')}</li>
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_3')}</li>
                          <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{t('takeaway_4')}</li>
                      </ul>
                  </div>

                  {failedLevels.length > 0 && (
                      <div className="bg-red-50 p-5 rounded-xl text-left text-sm">
                          <h3 className="font-bold mb-3 text-red-900 uppercase tracking-wider text-xs flex items-center gap-2">
                              <ShieldAlert className="w-4 h-4" /> {t('review_mistakes')}
                          </h3>
                          <ul className="space-y-2">
                              {failedLevels.map(level => (
                                  <li key={level.id} className="text-red-700 flex flex-col gap-0.5">
                                      <span className="font-bold">Level {scenarios.indexOf(level) + 1}: {t(`scenarios.${level.id}.title`)}</span>
                                      <span className="text-[11px] opacity-80 leading-snug">
                                          {level.risky ? t(`scenarios.${level.id}.reason`) : t(`scenarios.${level.id}.safe_msg`)}
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

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
              {currentScenario.gamemode === 'find-leak' ? t('tap_instruction') :
               currentScenario.gamemode === 'decode' ? t('decode_instruction') : t('analyze_desc')}
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
        <div className="max-lg mx-auto">
            {!hasVoted ? (
                currentScenario.gamemode === 'find-leak' || currentScenario.gamemode === 'decode' ? (
                     <div className="text-center p-2 text-gray-500 font-medium italic animate-pulse">
                        {currentScenario.gamemode === 'find-leak' ? t('tap_instruction') : t('decode_instruction')}
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
