import React from 'react';
import { useTranslation } from 'react-i18next';

export const PassportCard = ({ details, showLeak, country = 'USA', leakTarget = 'mrz', onInteract, partialCover = false, isSafe = false, maskMRZ = false }) => {

  const { t, i18n } = useTranslation();

  const {

    surname, givenNames, chineseName, nationality, dob, sex,

    expiration, passportNumber, personalIdNumber, birthPlace, authority

  } = details;
  // Mock MRZ generation
  const monthMap = { 'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12' };
  const getYYMMDD = (dateStr) => {
    const parts = dateStr.split(' '); // e.g., "05 MAY 1995"
    const day = parts[0];
    const month = monthMap[parts[1].toUpperCase()];
    const year = parts[2].substring(2, 4);
    return `${year}${month}${day}`;
  };

  let mrzLine1 = '';
  let mrzLine2 = '';

  if (country === 'TWN') {
    const sName = surname.replace(/[\s-]/g, '<');
    const gName = givenNames.replace(/[\s-]/g, '<');
    mrzLine1 = `P<TWN${sName}<<${gName}`.padEnd(44, '<').toUpperCase().slice(0, 44);

    const dobYYMMDD = getYYMMDD(dob);
    const expYYMMDD = getYYMMDD(expiration);

    // Simplified check digits (using '0' for example)
    mrzLine2 = `${passportNumber}3TWN${dobYYMMDD}0${sex}${expYYMMDD}0${personalIdNumber}0`.padEnd(44, '<').toUpperCase().slice(0, 44);

  } else { // Default USA
    mrzLine1 = `P<${nationality}${surname}<<${givenNames}${'<'.repeat(20)}`.toUpperCase().slice(0, 44);
    mrzLine2 = `${passportNumber}<${nationality}${dob.replace(/\s/g, '').substring(0,6)}...<<<<<<<<<<<<<<`.toUpperCase().slice(0, 44);
  }

  const isLeakVisible = (target) => showLeak && (leakTarget === target || leakTarget === 'mrz'); // Default to mrz if generic

  if (country === 'TWN') {
    return (
      <div className="flex flex-col shadow-2xl rounded-xl overflow-hidden transform scale-75 sm:scale-90 origin-center transition-all duration-300">

        {/* UPPER PAGE - Signature */}
        <div className="w-[320px] h-[220px] bg-[#fdfbf7] relative border-b-2 border-gray-300 p-4 flex flex-col shadow-inner shrink-0">
             {/* Binding Shadow */}
             <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-300/50 to-transparent pointer-events-none"></div>

             <div className="mt-auto mb-4 border-b border-gray-400 w-full relative">
                <span className="absolute -bottom-4 left-0 text-[7px] text-gray-500 uppercase tracking-widest">
                  {i18n.language === 'zh-TW' ? '持照人簽名' : 'Signature of Bearer'}
                </span>
             </div>
             <div className="text-[9px] text-gray-400 text-center leading-tight opacity-50">
                {i18n.language === 'zh-TW'
                  ? '本護照屬台灣政府所有，非經主管機關許可，不得扣留。'
                  : 'This passport is the property of Taiwan. It must be surrendered upon request.'
                }
             </div>
        </div>

        {/* BOTTOM PAGE - Data Page */}
        <div className="relative w-[320px] h-[220px] bg-blue-50/90 p-4 flex flex-col font-sans shadow-inner shrink-0">
            {/* Binding Shadow */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-400/30 to-transparent pointer-events-none z-10"></div>

            {/* Privacy Fail Overlays */}
            {partialCover && (
                <>
                    {/* Cover Photo */}
                    <div className="absolute top-12 left-4 w-24 h-28 bg-gray-900/95 z-30 rounded-sm flex items-center justify-center border-2 border-dashed border-white/20 rotate-1 shadow-xl">
                        <span className="text-[10px] text-white/40 font-bold uppercase rotate-12">HIDDEN</span>
                    </div>
                    {/* Cover Passport No */}
                    <div className="absolute top-13 left-45 w-20 h-5 bg-gray-900/95 z-30 rounded flex items-center justify-center -rotate-1 shadow-lg">
                        <span className="text-[8px] text-white/40 font-bold uppercase">REDACTED</span>
                    </div>
                    {/* Cover Name */}
                    <div className="absolute top-20 left-32 w-40 h-8 bg-gray-900/95 z-30 rounded flex items-center justify-center -rotate-1 shadow-lg">
                        <span className="text-[8px] text-white/40 font-bold uppercase">REDACTED</span>
                    </div>
                </>
            )}

            {/* Cover MRZ */}
            {maskMRZ && (
                <div className="absolute bottom-2 left-2 right-2 h-10 bg-gray-900/98 z-30 rounded flex items-center justify-center border border-white/10 shadow-lg">
                    <span className="text-[8px] text-white/30 font-bold tracking-[0.5em]">REDACTED DATA</span>
                </div>
            )}

            {showLeak && (
                <div className="absolute top-4 left-0 right-0 text-center pointer-events-none z-20">
                    <span className="inline-block bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-lg animate-bounce">
                        {leakTarget === 'personal-id' ? (i18n.language === 'zh-TW' ? '身分證字號洩露！' : 'ID NUMBER LEAK!') : (i18n.language === 'zh-TW' ? '資料洩露！' : 'DATA LEAK!')}
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-1 relative z-0">
                <div className="text-blue-900 font-bold leading-none">
                    <div className="text-[10px] tracking-widest">護 照</div>
                    <div className="text-[6px]">PASSPORT</div>
                </div>
                <div className="text-center absolute left-0 right-0 top-0">
                    <h1 className="text-sm font-bold text-blue-900 tracking-[0.2em] mb-0 leading-none">台灣</h1>
                    <h2 className="text-[6px] font-bold text-blue-900 tracking-widest mt-0.5 uppercase">Taiwan</h2>
                </div>
                <div className="w-6 h-6 rounded-full border border-blue-600 bg-white/50 flex items-center justify-center opacity-50">
                    <div className="w-3 h-3 rounded-full bg-blue-900/20"></div>
                </div>
            </div>

            <div className="flex flex-1 gap-3 z-0">
                {/* Photo */}
                <div className="w-24 h-28 bg-gray-200 border border-gray-300 relative shrink-0 rounded-sm overflow-hidden shadow-sm">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-2xl">👤</div>
                </div>

                {/* Fields - Landscape Layout */}
                <div className="flex-1 flex flex-col justify-start text-[8px] text-black font-bold leading-none pt-0.5">

                    {/* Row 1 */}
                    <div className="flex gap-2 mb-1">
                        <div
                            onClick={() => onInteract && onInteract('type')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.type')}</span>
                            <span>P</span>
                        </div>
                        <div
                            onClick={() => onInteract && onInteract('code')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.code')}</span>
                            <span>TWN</span>
                        </div>
                        <div
                            onClick={() => onInteract && onInteract('passport_no')}
                            className={`flex-1 transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.passport_no')}</span>
                            <span className="font-mono text-[7px]">{passportNumber}</span>
                        </div>
                    </div>

                    {/* Name */}
                    <div
                        onClick={() => onInteract && onInteract('name')}
                        className={`mb-1 transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                    >
                        <span className="block text-blue-700 text-[5px] uppercase">{t('passport.name')}</span>
                        <div className="text-xs font-black tracking-wide font-serif">{chineseName}</div>
                        <div className="text-[8px] uppercase">{surname}, {givenNames}</div>
                    </div>

                    {/* Nationality & ID */}
                    <div className="flex gap-2 mb-1">
                        <div
                            onClick={() => onInteract && onInteract('nationality')}
                            className={`flex-1 transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.nationality')}</span>
                            <span className="text-[7px]">{nationality}</span>
                        </div>
                        <div
                             onClick={() => onInteract && onInteract('personal-id')}
                             className={`flex-1 transition-colors duration-300 rounded px-0.5 -mx-0.5
                             ${onInteract ? 'cursor-pointer hover:bg-red-50 ring-1 ring-transparent hover:ring-red-200' : ''}
                             ${isLeakVisible('personal-id') ? 'bg-red-500/20 ring-1 ring-red-500' : ''}
                             ${isSafe ? 'opacity-20 blur-sm' : ''}
                             `}>
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.personal_id')}</span>
                            <span className="font-mono text-[8px]">{personalIdNumber}</span>
                        </div>
                    </div>

                    {/* Sex / DOB / Place */}
                    <div className="flex gap-2 mb-1">
                        <div
                            onClick={() => onInteract && onInteract('sex')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.sex')}</span>
                            <span>{sex === 'F' ? (i18n.language === 'zh-TW' ? '女' : 'F') : (i18n.language === 'zh-TW' ? '男' : 'M')}</span>
                        </div>
                        <div
                            onClick={() => onInteract && onInteract('dob')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.dob')}</span>
                            <span>{dob}</span>
                        </div>
                         <div
                            onClick={() => onInteract && onInteract('place_birth')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                         >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.place_birth')}</span>
                            <span className="text-[7px]">{birthPlace}</span>
                        </div>
                    </div>

                    {/* Dates & Authority */}
                     <div className="flex gap-2">
                        <div
                            onClick={() => onInteract && onInteract('expiry')}
                            className={`transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                        >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.expiry')}</span>
                            <span>{expiration}</span>
                        </div>
                         <div
                            onClick={() => onInteract && onInteract('authority')}
                            className={`flex-1 transition-colors rounded px-0.5 -mx-0.5 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
                         >
                            <span className="block text-blue-700 text-[5px] uppercase">{t('passport.authority')}</span>
                            <span className="text-[6px]">{authority}</span>
                        </div>
                    </div>

                </div>
            </div>

                        {/* MRZ Area */}
                        <div
                        onClick={() => onInteract && onInteract('mrz')}
                        className={`mt-auto font-mono text-[9px] text-black leading-none tracking-widest p-0.5 -mx-0.5 rounded transition-all duration-300 overflow-hidden whitespace-nowrap
                            ${onInteract ? 'cursor-pointer hover:bg-red-50 ring-1 ring-transparent hover:ring-red-200' : ''}
                            ${isLeakVisible('mrz') || isLeakVisible('personal-id') ? 'bg-red-500/20 ring-1 ring-red-500 animate-pulse' : ''}
                            ${isSafe ? 'opacity-20 blur-sm' : ''}
                        `}
                        >
                        <p>{mrzLine1}</p>
                        <p>{mrzLine2}</p>
                        </div>        </div>
      </div>
    );
  }

  // DEFAULT USA THEME
  return (
    <div className="relative w-[320px] h-[440px] bg-blue-50 rounded-lg shadow-md p-4 flex flex-col border border-gray-300 transform scale-[0.85] sm:scale-100 origin-center">
      {/* Privacy Fail Overlays */}
      {partialCover && (
        <>
            <div className="absolute top-16 left-4 w-28 h-36 bg-gray-900 z-30 rounded flex items-center justify-center border-2 border-white/10 rotate-2 shadow-2xl">
                <span className="text-xs text-white/30 font-bold uppercase rotate-45 tracking-widest italic">Censored</span>
            </div>
            <div className="absolute top-20 right-4 w-32 h-20 bg-gray-900 z-30 rounded-lg flex items-center justify-center -rotate-2 shadow-xl border border-white/5">
                <span className="text-[10px] text-white/20 font-bold">PRIVATE</span>
            </div>
        </>
      )}

      {/* Cover MRZ */}
      {maskMRZ && (
        <div className="absolute bottom-4 left-4 right-4 h-12 bg-gray-900/98 z-30 rounded flex items-center justify-center border border-white/10 shadow-lg">
            <span className="text-[10px] text-white/30 font-bold tracking-[0.5em]">HIDDEN</span>
        </div>
      )}

      {showLeak && (
        <div className="absolute top-2 left-0 right-0 text-center pointer-events-none z-10">
             <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg animate-bounce">
                DATA LEAK!
             </span>
        </div>
      )}
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-900">United States of America</h3>
        <div className="w-8 h-8 mx-auto mt-1 rounded-full border-2 border-yellow-500 bg-blue-900 opacity-80"></div>
      </div>

      <div className="flex flex-1">
        {/* Photo Area */}
        <div className="w-28 h-36 bg-gray-200 border border-gray-400 mr-3 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                👤
             </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-[10px] space-y-2 font-serif text-blue-900">
           <div
             onClick={() => onInteract && onInteract('surname')}
             className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
           >
             <span className="block text-gray-500 uppercase text-[8px]">Surname</span>
             <span className="font-bold">{surname}</span>
           </div>
           <div
             onClick={() => onInteract && onInteract('given_names')}
             className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
           >
             <span className="block text-gray-500 uppercase text-[8px]">Given Names</span>
             <span className="font-bold">{givenNames}</span>
           </div>
           <div className="flex justify-between">
              <div
                onClick={() => onInteract && onInteract('nationality')}
                className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
              >
                <span className="block text-gray-500 uppercase text-[8px]">Nationality</span>
                <span className="font-bold">{nationality}</span>
              </div>
              <div
                onClick={() => onInteract && onInteract('sex')}
                className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
              >
                 <span className="block text-gray-500 uppercase text-[8px]">Sex</span>
                 <span className="font-bold">{sex}</span>
              </div>
           </div>
           <div
             onClick={() => onInteract && onInteract('dob')}
             className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
           >
              <span className="block text-gray-500 uppercase text-[8px]">Date of Birth</span>
              <span className="font-bold">{dob}</span>
           </div>
           <div
             onClick={() => onInteract && onInteract('passport_no')}
             className={`transition-colors rounded px-1 -mx-1 ${onInteract ? 'cursor-pointer hover:bg-blue-100/50' : ''}`}
           >
             <span className="block text-gray-500 uppercase text-[8px]">Passport No</span>
             <span className="font-bold">{passportNumber}</span>
           </div>
        </div>
      </div>

            {/* MRZ Area - The Risk! */}
            <div
              onClick={() => onInteract && onInteract('mrz')}
              className={`mt-auto font-mono text-[11px] leading-tight tracking-widest p-1 rounded transition-all duration-300
                ${onInteract ? 'cursor-pointer hover:bg-red-50 ring-1 ring-transparent hover:ring-red-200' : ''}
                ${isLeakVisible('mrz') ? 'bg-red-500/20 ring-4 ring-red-500 animate-pulse' : ''}
                ${isSafe ? 'opacity-20 blur-sm' : ''}
              `}
            >
              <p>{mrzLine1}</p>
              <p>{mrzLine2}</p>
            </div>
      {showLeak && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
             <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg animate-bounce">
                DATA LEAK!
             </span>
        </div>
      )}
    </div>
  );
};
