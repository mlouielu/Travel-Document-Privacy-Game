import React from 'react';
import { Quiz } from './components/Quiz';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
               <Lock className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">{t('app_name')}</h1>
          </div>
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Beta</div>
        </div>
      </header>

      <main className="p-4">
        <Quiz />
      </main>
    </div>
  );
}

export default App;