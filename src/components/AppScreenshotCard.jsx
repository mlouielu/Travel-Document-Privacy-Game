import React from 'react';
import { Wifi, Battery, Signal, ChevronLeft, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AppScreenshotCard = ({ details, showLeak, onInteract, isSafe }) => {
  const { t } = useTranslation();
  const { airline, flight, route, date, passenger, pnr } = details;

  return (
    <div className="relative w-[280px] h-[500px] bg-white rounded-[30px] border-[8px] border-gray-800 overflow-hidden shadow-xl transform scale-90 sm:scale-100 origin-center">
      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center text-[10px]">
        <span>9:41</span>
        <div className="flex gap-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
        </div>
      </div>

      {/* App Header */}
      <div className="bg-blue-600 text-white p-4 pb-8 rounded-b-[2rem] mb-4">
        <div className="flex items-center gap-2 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold text-lg">{airline}</span>
        </div>
        <div className="flex flex-col items-center">
             <CheckCircle className="w-10 h-10 mb-2 opacity-90" />
             <h2 className="text-xl font-bold">{t('card.booking_confirmed')}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {/* Flight Card */}
        <div 
            onClick={() => showLeak ? null : (onInteract && onInteract('flight_card'))} // Disable click if showing result to prevent confusion? Or just keep it.
            className={`bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm transition-colors 
                ${!showLeak && onInteract ? 'cursor-pointer hover:bg-blue-50/50' : ''}`}
        >
             <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">{route}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{flight}</span>
             </div>
             <div className="text-sm text-gray-500">{date}</div>
        </div>

        {/* Passenger Info - The Risk! */}
        <div className="space-y-3">
             <div 
                onClick={() => showLeak ? null : (onInteract && onInteract('passenger'))}
                className={`border-b border-gray-100 pb-2 transition-colors rounded px-1 -mx-1
                    ${!showLeak && onInteract ? 'cursor-pointer hover:bg-blue-50/50' : ''}`}
             >
                <div className="text-xs text-gray-400 uppercase">{t('card.passenger')}</div>
                <div className="font-medium">{passenger}</div>
             </div>
             
             <div 
                onClick={() => showLeak ? null : (onInteract && onInteract('pnr'))}
                className={`relative border-b border-gray-100 pb-2 transition-all duration-300 rounded px-1 -mx-1
                    ${!showLeak && onInteract ? 'cursor-pointer hover:bg-blue-50/50' : ''}
                    ${showLeak ? 'bg-red-500/10 p-1 rounded ring-2 ring-red-500' : ''}
                `}
             >
                <div className="text-xs text-gray-400 uppercase">{t('card.pnr_full_label')}</div>
                <div className={`font-mono font-bold text-sm tracking-widest ${isSafe ? 'blur-sm' : ''}`}>{pnr}</div>
                
                {showLeak && (
                    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                        <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold shadow animate-bounce">
                            {t('card.secret_alert')}
                        </span>
                    </div>
                )}
             </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
             <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-bold text-sm">
                {t('card.manage_booking')}
             </button>
        </div>
      </div>
    </div>
  );
};