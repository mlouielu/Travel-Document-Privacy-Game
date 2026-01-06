import React from 'react';
import { Plane } from 'lucide-react';

export const BoardingPassCard = ({ details, showLeak, isSafe, leakTarget, onInteract }) => {
  const { passengerName, flight, origin, destination, date, seat, pnr, ticketNumber } = details;

  const isLeakVisible = (target) => showLeak && (leakTarget === target || leakTarget === 'qr-code');

  return (
    <div className="relative w-[340px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform scale-[0.8] xs:scale-90 sm:scale-100 origin-center">
      {/* Top Strip */}
      <div className="bg-indigo-600 h-4"></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
            <div className="text-indigo-900 font-bold text-lg">AIRLINE</div>
            <div className="text-xs text-gray-500 font-mono">ECONOMY</div>
        </div>

        <div className="flex justify-between items-center mb-6">
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{origin}</div>
                <div className="text-xs text-gray-400">Departure</div>
            </div>
            <Plane className="text-indigo-400 w-6 h-6 transform rotate-90" />
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{destination}</div>
                <div className="text-xs text-gray-400">Arrival</div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
                <div className="text-gray-400 text-xs uppercase">Flight</div>
                <div className="font-bold">{flight}</div>
            </div>
            <div>
                <div className="text-gray-400 text-xs uppercase">Date</div>
                <div className="font-bold">{date}</div>
            </div>
            <div>
                <div className="text-gray-400 text-xs uppercase">Seat</div>
                <div className="font-bold text-indigo-600 text-lg">{seat}</div>
            </div>
        </div>
        
        <div className="mb-4">
             <div className="text-gray-400 text-xs uppercase">Passenger</div>
             <div className="font-bold">{passengerName}</div>
        </div>

        {/* Barcode / PNR Section */}
        <div className="border-t border-dashed border-gray-300 pt-4 relative">
             <div className="flex justify-between items-end">
                <div 
                    onClick={() => onInteract && onInteract('pnr')}
                    className={`text-xs text-gray-400 transition-all duration-300 
                    ${onInteract ? 'cursor-pointer hover:bg-red-50 ring-1 ring-transparent hover:ring-red-200 p-1 -ml-1 -mb-1 rounded' : ''}
                    ${isLeakVisible('pnr') ? 'bg-red-500/10 ring-2 ring-red-500 rounded p-1 -ml-1 -mb-1 animate-pulse' : ''}
                    `}
                >
                    <div>PNR: <span className="font-bold">{pnr}</span></div>
                    <div>ETKT: <span className="font-bold">{ticketNumber}</span></div>
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
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg animate-bounce">
                        PNR & ETKT LEAK!
                     </span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
