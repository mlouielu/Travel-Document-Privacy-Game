import React from 'react';
import { useTranslation } from 'react-i18next';

export const PassportOverBoardingPassCard = ({ details, showLeak, leakTarget, onInteract }) => {
  const { t } = useTranslation();
  const {
    flight = "BA 072",
    gate = "C54",
    passengerName = "LEOPOLD/EMR",
    date = "27 NOV",
    origin = "GENEVA",
    destination = "LONDON",
    seat = "2F",
    pnr = "EZQ7O92",
    seq = "091",
    boardingGroup = "GROUP 1",
    cabinClass = "CLUB EUROPE",
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

        {/* Taiwan Passport covering most of the boarding pass */}
        <g transform="translate(40, 150)">
          {/* Passport cover - Green for Taiwan */}
          <rect x="0" y="0" width="240" height="280" fill="#115e38" rx="6"/>

          {/* National Emblem (simplified as circle from icon) */}
          <circle cx="120" cy="80" r="30" fill="none" stroke="#fbbf24" strokeWidth="6"/>
		  <g transform="translate(110, 60),scale(0.15)"fill="#fbbf24">
		  <polygon points="138.849,24.063 133.389,14.317 124.214,12 119.199,9.905 112.913,2 101.611,4.19 91.103,13.111 75.103,18.508 68.881,25.968 61.706,41.524 49.58,52.127 43.706,63.619 16.246,110.508 7.326,134.794 6.468,150.286 2.151,163.016 9.484,179.968 14.214,201.016 26.246,214.762 37.389,223.302 46.151,243.429 46.532,253.556 56.278,258 59.96,224.254 69.865,202.762 78.5,195.682 97.262,164.921 112.914,102.373 112.659,93.651 129.294,62.762 128.373,34.095 "/>
			</g>

          {/* Text: TAIWAN */}
          <text
            x="120"
            y="170"
            fontSize="36"
            fontWeight="900"
            fill="#fbbf24"
            textAnchor="middle"
            letterSpacing="4"
          >
            TAIWAN
          </text>

          {/* Text: PASSPORT */}
          <text
            x="120"
            y="210"
            fontSize="18"
            fontWeight="bold"
            fill="#fbbf24"
            textAnchor="middle"
            letterSpacing="2"
          >
            PASSPORT
          </text>

          {/* Biometric Symbol */}
          <g transform="translate(108, 235)">
            <rect x="0" y="0" width="24" height="14" rx="2" fill="none" stroke="#fbbf24" strokeWidth="3"/>
            <circle cx="12" cy="7" r="3" fill="#fbbf24"/>
          </g>

          {/* Border decoration */}
          <rect x="10" y="10" width="220" height="260" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.3" rx="4"/>
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
