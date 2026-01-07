import React from 'react';
import { useTranslation } from 'react-i18next';

export const PassportOverBoardingPassCard = ({ details, showLeak, leakTarget, onInteract }) => {
  const { t } = useTranslation();
  const {
    flight = "BA 072",
    gate = "C57",
    passengerName = "LEOPOLD/EMR",
    date = "27 NOV",
    origin = "TPE",
    destination = "LHR",
    seat = "2F",
    pnr = "EZQ7O92",
    seq = "091",
    boardingGroup = "GROUP 1",
    departs = "13:20"
  } = details;

  const isLeakVisible = (target) => showLeak && leakTarget === target;

  return (
    <div className="relative w-[320px] h-[480px] flex items-center justify-center transform scale-90 sm:scale-100">
      <svg viewBox="0 0 320 480" className="w-full h-full">
        {/* Boarding Pass - Horizontal design rotated 90deg */}
        <g transform="translate(250, 20) rotate(90)">
          {/* Main Card Background */}
          <rect width="420" height="160" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" rx="4"/>

          <line x1="310" y1="0" x2="310" y2="160" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,4"/>

          {/* BARCODE SECTION (Image) */}
          <g
            onClick={() => onInteract && onInteract('barcode')}
            className={`transition-all duration-300 ${onInteract ? 'cursor-pointer' : ''}`}
          >
            {/* Clickable area & Highlight */}
            <rect
              x="5"
              y="10"
              width="50"
              height="140"
              fill={isLeakVisible('barcode') ? '#fecaca' : '#ffffff'}
              stroke={isLeakVisible('barcode') ? '#ef4444' : 'transparent'}
              strokeWidth={isLeakVisible('barcode') ? '2' : '0'}
              rx="2"
              className={onInteract ? 'hover:fill-red-50' : ''}
            />

            <image
              href="/barcode.jpg"
              x="0"
              y="0"
              width="135"
              height="33.75"
              transform="translate(50, 12) rotate(90)"
              preserveAspectRatio="none"
              className="mix-blend-multiply"
            />
          </g>


          {/* MAIN INFO SECTION */}
          <g transform="translate(60, 15)">
            <path d="M 130 0 L 160 -5 Q 165 -5 163 2 L 135 5 Z" fill="#003566" transform="translate(0, 5)"/>
            <text x="0" y="10" fontSize="10" fontWeight="bold" fill="#003566">QUIZY AIRWAYS</text>
            <text x="120" y="10" fontSize="8" fontWeight="bold" fill="#111827" textAnchor="middle">FASTTRACK</text>
            <text x="0" y="35" fontSize="11" fontWeight="bold" fill="#111827">{passengerName}</text>

            <line x1="0" y1="52" x2="230" y2="52" stroke="#d1d5db" strokeWidth="0.5"/>

            <text x="0" y="72" fontSize="18" fontWeight="900" fill="#111827">{flight}</text>
            <text x="120" y="72" fontSize="10" fontWeight="bold" fill="#111827" textAnchor="end">{date}</text>
            <text x="0" y="88" fontSize="10" fontWeight="600" fill="#111827">{origin} › {destination}</text>

            <line x1="0" y1="98" x2="230" y2="98" stroke="#d1d5db" strokeWidth="0.5"/>

            <g transform="translate(0, 110)">
              <text x="0" y="0" fontSize="6" fontWeight="bold" fill="#6b7280">GATE</text>
              <text x="0" y="18" fontSize="16" fontWeight="bold" fill="#111827">{gate}</text>
              <text x="60" y="0" fontSize="6" fontWeight="bold" fill="#6b7280">BOARD AT</text>
              <text x="60" y="18" fontSize="14" fontWeight="bold" fill="#111827">12:45</text>
              <text x="140" y="0" fontSize="6" fontWeight="bold" fill="#6b7280">SEAT</text>
              <text x="140" y="18" fontSize="16" fontWeight="bold" fill="#111827">{seat}</text>
              <text x="230" y="18" fontSize="12" fontWeight="bold" fill="#111827" textAnchor="end">{boardingGroup}</text>
            </g>
          </g>

          {/* STUB SECTION */}
          <g transform="translate(320, 15)">
            <text x="0" y="5" fontSize="8" fontWeight="bold" fill="#111827">{pnr}</text>
            <text x="85" y="5" fontSize="8" fontWeight="bold" fill="#111827" textAnchor="end">SEQ {seq}</text>
            <text x="0" y="30" fontSize="8" fontWeight="bold" fill="#111827">{passengerName}</text>
            <text x="0" y="55" fontSize="8" fontWeight="bold" fill="#111827">{flight}</text>
            <text x="85" y="55" fontSize="8" fontWeight="bold" fill="#111827" textAnchor="end">{date}</text>
            <text x="0" y="68" fontSize="8" fontWeight="600" fill="#111827">GVA › LHR</text>
            <g transform="translate(0, 110)">
              <text x="0" y="0" fontSize="6" fontWeight="bold" fill="#6b7280">SEAT</text>
              <text x="0" y="18" fontSize="14" fontWeight="bold" fill="#111827">{seat}</text>
              <text x="85" y="0" fontSize="6" fontWeight="bold" fill="#6b7280" textAnchor="end">DEPARTS</text>
              <text x="85" y="18" fontSize="14" fontWeight="bold" fill="#111827" textAnchor="end">{departs}</text>
            </g>
          </g>
        </g>

        {/* Philippine Passport covering most of the boarding pass */}
        <g transform="translate(40, 150)">
          {/* Passport cover - maroon color for Philippines */}
          <rect x="0" y="0" width="240" height="280" fill="#7c2d37" rx="6"/>

          {/* Gold emblem circle */}
          <circle cx="120" cy="70" r="35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          <circle cx="120" cy="70" r="25" fill="none" stroke="#d4af37" strokeWidth="1"/>

          {/* Stars (simplified Philippine symbols) */}
          <circle cx="120" cy="65" r="3" fill="#d4af37"/>
          <circle cx="110" cy="75" r="2" fill="#d4af37"/>
          <circle cx="130" cy="75" r="2" fill="#d4af37"/>
          <circle cx="115" cy="85" r="2" fill="#d4af37"/>
          <circle cx="125" cy="85" r="2" fill="#d4af37"/>

          {/* Philippine seal center */}
          <circle cx="120" cy="70" r="8" fill="#1e40af" opacity="0.5"/>

          {/* Text: PILIPINAS */}
          <text
            x="120"
            y="135"
            fontSize="24"
            fontWeight="900"
            fill="#d4af37"
            textAnchor="middle"
            letterSpacing="3"
          >
            PILIPINAS
          </text>

          {/* Stars decoration */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={60 + i * 30}
              cy="155"
              r="2"
              fill="#d4af37"
              opacity="0.6"
            />
          ))}

          {/* Text: PASSPORT */}
          <text
            x="120"
            y="175"
            fontSize="12"
            fontWeight="bold"
            fill="#d4af37"
            textAnchor="middle"
            letterSpacing="4"
          >
            PASSPORT
          </text>

          {/* Republic of the Philippines */}
          <text
            x="120"
            y="220"
            fontSize="8"
            fill="#d4af37"
            textAnchor="middle"
            opacity="0.8"
          >
            REPUBLIC OF THE
          </text>
          <text
            x="120"
            y="232"
            fontSize="8"
            fill="#d4af37"
            textAnchor="middle"
            opacity="0.8"
          >
            PHILIPPINES
          </text>

          {/* Border decoration */}
          <rect x="10" y="10" width="220" height="260" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.3" rx="4"/>
        </g>

        {/* Airport background blur effect */}
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          </filter>
        </defs>
      </svg>

      {/* Leak indicator */}
      {isLeakVisible('barcode') && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold shadow-lg animate-bounce">
            {t('card.secret_alert')}
          </span>
        </div>
      )}
    </div>
  );
};
