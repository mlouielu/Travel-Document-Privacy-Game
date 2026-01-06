import React from 'react';
import { MapPin, Phone, User } from 'lucide-react';

export const LuggageTagCard = ({ details, onInteract, showLeak, leakTarget }) => {
  const { name, phone, address, email } = details;

  const handleAreaClick = (area) => {
    if (onInteract) {
      onInteract(area);
    }
  };

  const isLeakVisible = (target) => showLeak && (leakTarget === target || leakTarget === 'all');

  return (
    <div className="relative w-80 h-48 bg-yellow-400 rounded-xl shadow-xl transform rotate-1 border-4 border-yellow-500 flex flex-col overflow-hidden scale-[0.85] sm:scale-100 origin-center">
      {/* Strap Hole */}
      <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 z-20"></div>
      
      {/* Header */}
      <div className="bg-gray-800 p-2 text-center">
        <h3 className="text-white font-bold uppercase tracking-widest text-xs">Priority Baggage</h3>
      </div>

      <div className="flex-1 p-4 bg-yellow-400 text-gray-900 font-sans relative">
         {/* Pattern overlay */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none"></div>

         <div className="space-y-2 relative z-10">
            {/* Name - Generally Safe-ish but context matters. Let's make it safe here. */}
            <div 
                onClick={() => handleAreaClick('name')}
                className="flex items-center gap-2 border-b border-gray-700/20 pb-1 cursor-pointer hover:bg-yellow-300/50 rounded px-1 transition-colors"
            >
                <User className="w-4 h-4 text-gray-700" />
                <span className="font-bold font-mono uppercase">{name}</span>
            </div>

            {/* Phone - Risky */}
            <div 
                onClick={() => handleAreaClick('phone')}
                className={`flex items-center gap-2 border-b border-gray-700/20 pb-1 cursor-pointer hover:bg-yellow-300/50 rounded px-1 transition-colors ${isLeakVisible('phone') ? 'ring-2 ring-red-500 bg-red-100/50 animate-pulse' : ''}`}
            >
                <Phone className="w-4 h-4 text-gray-700" />
                <span className="font-mono">{phone}</span>
            </div>

            {/* Address - Highly Risky */}
            <div 
                onClick={() => handleAreaClick('address')}
                className={`flex items-start gap-2 cursor-pointer hover:bg-yellow-300/50 rounded px-1 transition-colors ${isLeakVisible('address') ? 'ring-2 ring-red-500 bg-red-100/50 animate-pulse' : ''}`}
            >
                <MapPin className="w-4 h-4 text-gray-700 mt-1" />
                <span className="font-mono text-xs leading-tight">{address}</span>
            </div>
         </div>
      </div>
      
      {showLeak && (
        <div className="absolute bottom-2 right-2 z-20">
             <span className="inline-block bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-lg animate-bounce">
                {leakTarget === 'address' ? 'HOME ADDRESS!' : 'PERSONAL INFO!'}
             </span>
        </div>
      )}
    </div>
  );
};