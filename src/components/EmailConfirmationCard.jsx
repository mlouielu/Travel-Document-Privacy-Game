import React from 'react';
import { Mail, Calendar, MapPin } from 'lucide-react';

export const EmailConfirmationCard = ({ details, onInteract, showLeak, leakTarget }) => {
  const { airline, pnr, passenger, date, flight, price } = details;

  const handleAreaClick = (area) => {
    if (onInteract) {
      onInteract(area);
    }
  };

  const isLeakVisible = (target) => showLeak && (leakTarget === target);

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 text-left font-sans">
      {/* Email Header */}
      <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <Mail className="w-4 h-4" />
        </div>
        <div>
            <div className="text-xs font-bold text-gray-800">{airline} Booking Confirmed</div>
            <div className="text-[10px] text-gray-500">To: {passenger}</div>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your trip is confirmed!</h3>
        
        <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Booking Reference</div>
            <div 
                onClick={() => handleAreaClick('pnr')}
                className={`text-2xl font-mono font-bold text-blue-600 inline-block px-1 rounded cursor-pointer transition-colors hover:bg-blue-50
                    ${isLeakVisible('pnr') ? 'ring-2 ring-red-500 bg-red-100 animate-pulse' : ''}
                `}
            >
                {pnr}
            </div>
        </div>

        <div className="border-t border-b border-gray-100 py-3 space-y-3">
            <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                    <div className="text-xs font-bold text-gray-700">{date}</div>
                    <div className="text-xs text-gray-500">{flight}</div>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                    <div className="text-xs font-bold text-gray-700">London (LHR) → New York (JFK)</div>
                </div>
            </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
             <div className="text-xs text-gray-500">Total Paid</div>
             <div className="font-bold text-gray-800">{price}</div>
        </div>

        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded text-xs font-bold">
            Manage Booking
        </button>
      </div>

       {showLeak && (
        <div className="absolute top-1/2 left-0 right-0 text-center pointer-events-none z-20">
             <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg animate-bounce">
                PNR EXPOSED!
             </span>
        </div>
      )}
    </div>
  );
};