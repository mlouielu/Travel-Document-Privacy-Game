import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Globe, Plane, Camera, AlertTriangle } from 'lucide-react';

export const LandingPage = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-in fade-in duration-700 pb-20">
      
      {/* Icon Cluster */}
      <div className="relative mb-10 mt-10">
        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
        <div className="relative w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center rotate-3 border-4 border-indigo-50 z-10">
           <ShieldCheck className="w-16 h-16 text-indigo-600" />
        </div>
        
        {/* Floating Icons */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-100">
            <Plane className="w-6 h-6 text-blue-600" />
        </div>
        <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
            <Camera className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="absolute top-1/2 -right-10 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
            <Globe className="w-4 h-4 text-green-600" />
        </div>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
        {t('landing_title')}
      </h1>
      
      <p className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed">
        {t('landing_subtitle')}
      </p>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 text-lg rounded-full hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 active:scale-95 mb-16"
      >
        <span>{t('start_game')}</span>
      </button>

      {/* Horror Stories / Why it matters */}
      <div className="w-full max-w-md bg-red-50 border border-red-100 rounded-2xl p-6 text-left">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">{t('horror_title')}</h3>
          </div>
          
          <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                  <p className="text-sm text-red-900/80 text-pretty">{t('horror_1')}</p>
              </li>
              <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                  <p className="text-sm text-red-900/80 text-pretty">{t('horror_2')}</p>
              </li>
              <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                  <p className="text-sm text-red-900/80 text-pretty">{t('horror_3')}</p>
              </li>
          </ul>
      </div>

    </div>
  );
};

