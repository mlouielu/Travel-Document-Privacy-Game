import React, { useState } from 'react';
import { Quiz } from './components/Quiz';
import { LandingPage } from './components/LandingPage';
import { Lock, Languages, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [gameStarted, setGameStarted] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setGameStarted(false)}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
               <Lock className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">{t('app_name')}</h1>
          </div>

          <div className="flex items-center gap-3">
             <a
                href="https://github.com/mlouielu/travel-document-privacy-game"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
                title="View on GitHub"
             >
                <Github className="w-5 h-5" />
             </a>
             <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span>{i18n.language === 'en' ? '中文' : 'EN'}</span>
              </button>
             <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Beta</div>
          </div>
        </div>
      </header>

      <main className="p-4">
        {!gameStarted ? (
            <LandingPage onStart={() => setGameStarted(true)} />
        ) : (
            <Quiz />
        )}
      </main>
    </div>
  );
}

export default App;
