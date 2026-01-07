import React from 'react';
import { Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BoardingPassCard = ({ details, showLeak, isSafe, leakTarget, onInteract }) => {
  const { t } = useTranslation();
  const { passengerName, flight, origin, destination, date, seat, pnr, ticketNumber } = details;

  const isLeakVisible = (target) => {
      if (!showLeak) return false;
      if (Array.isArray(leakTarget)) {
          return leakTarget.includes(target);
      }
      // Legacy support or single string target:
      // If target matches, or if we are checking PNR and the leak is 'qr-code' (implied association)
      return leakTarget === target || (target === 'pnr' && leakTarget === 'qr-code');
  };

  return (
    <div className="relative w-[340px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform scale-[0.8] xs:scale-90 sm:scale-100 origin-center">
      {/* Top Strip */}
      <div className="bg-indigo-600 h-4"></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
            <div className="text-indigo-900 font-bold text-lg">{t('card.airline_label')}</div>
            <div className="text-xs text-gray-500 font-mono">{t('card.economy')}</div>
        </div>

        <div className="flex justify-between items-center mb-6">
            <div 
                className={`text-center transition-all duration-300 rounded px-2 -mx-2 
                ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${isLeakVisible('origin') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse' : ''}
                `}
                onClick={() => onInteract && onInteract('origin')}
            >
                <div className="text-3xl font-bold text-gray-800">{origin}</div>
                <div className="text-xs text-gray-400">{t('card.departure')}</div>
            </div>
            <Plane className="text-indigo-400 w-6 h-6 transform rotate-90" />
            <div 
                className={`text-center transition-all duration-300 rounded px-2 -mx-2 
                ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${isLeakVisible('destination') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse' : ''}
                `}
                onClick={() => onInteract && onInteract('destination')}
            >
                <div className="text-3xl font-bold text-gray-800">{destination}</div>
                <div className="text-xs text-gray-400">{t('card.arrival')}</div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div 
                className={`transition-all duration-300 rounded px-1 -mx-1 
                ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${isLeakVisible('flight') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse' : ''}
                `}
                onClick={() => onInteract && onInteract('flight')}
            >
                <div className="text-gray-400 text-xs uppercase">{t('card.flight')}</div>
                <div className="font-bold">{flight}</div>
            </div>
            <div 
                className={`transition-all duration-300 rounded px-1 -mx-1 
                ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${isLeakVisible('date') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse' : ''}
                `}
                onClick={() => onInteract && onInteract('date')}
            >
                <div className="text-gray-400 text-xs uppercase">{t('card.date')}</div>
                <div className="font-bold">{date}</div>
            </div>
            <div 
                className={`transition-all duration-300 rounded px-1 -mx-1 
                ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}
                ${isLeakVisible('seat') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse' : ''}
                `}
                onClick={() => onInteract && onInteract('seat')}
            >
                <div className="text-gray-400 text-xs uppercase">{t('card.seat')}</div>
                <div className="font-bold text-indigo-600 text-lg">{seat}</div>
            </div>
        </div>
        
        <div className="mb-4">
             <div 
                className={`transition-colors rounded px-1 -mx-1 inline-block w-full ${onInteract ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={() => onInteract && onInteract('passenger')}
             >
                <div className="text-gray-400 text-xs uppercase">{t('card.passenger')}</div>
                <div className="font-bold">{passengerName}</div>
             </div>
        </div>

        {/* Barcode / PNR Section */}
        <div className="border-t border-dashed border-gray-300 pt-4 relative">
             <div className="flex justify-between items-end">
                <div className="flex flex-col gap-0.5">
                    <div 
                        onClick={() => onInteract && onInteract('pnr')}
                        className={`text-xs text-gray-400 transition-all duration-300 px-1 rounded -ml-1
                        ${onInteract ? 'cursor-pointer hover:bg-red-50 hover:text-gray-600 ring-1 ring-transparent hover:ring-red-200' : ''}
                        ${isLeakVisible('pnr') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse text-gray-800' : ''}
                        `}
                    >
                        {t('card.pnr_label')}: <span className="font-bold">{pnr}</span>
                    </div>
                    <div 
                        onClick={() => onInteract && onInteract('etkt')}
                        className={`text-xs text-gray-400 transition-all duration-300 px-1 rounded -ml-1
                        ${onInteract ? 'cursor-pointer hover:bg-red-50 hover:text-gray-600 ring-1 ring-transparent hover:ring-red-200' : ''}
                        ${isLeakVisible('etkt') ? 'bg-red-500/10 ring-2 ring-red-500 animate-pulse text-gray-800' : ''}
                        `}
                    >
                        {t('card.etkt_label')}: <span className="font-bold">{ticketNumber}</span>
                    </div>
                </div>
                
                {/* Fake QR Code */}
                <div 
                    onClick={() => onInteract && onInteract('qr-code')}
                    className={`w-16 h-16 bg-gray-900 pattern-dots relative
                        ${onInteract ? 'cursor-pointer hover:ring-2 hover:ring-red-200' : ''}
                        ${isLeakVisible('qr-code') ? 'ring-4 ring-red-500 animate-pulse' : ''}
                        ${isSafe ? 'opacity-20 blur-sm' : ''}
                    `}
                >
                    {/* Visual pattern to look like QR */}
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white border-2 border-black"></div>
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white border-2 border-black"></div>
                    <div className="absolute bottom-1 left-1 w-4 h-4 bg-white border-2 border-black"></div>
                </div>
             </div>

            {showLeak && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                     <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg animate-bounce">
                        {t('card.sensitive_data_leak')}
                     </span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};