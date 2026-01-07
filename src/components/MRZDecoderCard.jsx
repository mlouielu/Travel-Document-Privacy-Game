import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const MRZDecoderCard = ({ details, onCorrect }) => {
  const { t } = useTranslation();
  const { mrz } = details;
  
  const line1 = mrz[0];
  const line2 = mrz[1];

  const fields = [
    { id: 'country_code', label: t('decoder.country_code'), line: 0, start: 2, end: 5, color: '#3b82f6' },
    { id: 'name', label: t('decoder.name'), line: 0, start: 5, end: 25, color: '#10b981' },
    { id: 'passport_no', label: t('decoder.passport_no'), line: 1, start: 0, end: 9, color: '#f59e0b' },
    { id: 'nationality', label: t('decoder.nationality'), line: 1, start: 10, end: 13, color: '#06b6d4' },
    { id: 'dob', label: t('decoder.dob'), line: 1, start: 13, end: 19, color: '#8b5cf6' },
    { id: 'sex', label: t('decoder.sex'), line: 1, start: 20, end: 21, color: '#f43f5e' },
    { id: 'expiry', label: t('decoder.expiry'), line: 1, start: 21, end: 27, color: '#ec4899' },
    { id: 'personal_id', label: t('decoder.personal_id'), line: 1, start: 28, end: 38, color: '#6366f1' },
  ];

  const [matches, setMatches] = useState({});
  const [selectedField, setSelectedField] = useState(null);

  const handleLabelClick = (field) => {
    if (matches[field.id]) return;
    setSelectedField(field === selectedField ? null : field);
  };

  const handleTargetClick = (fieldId) => {
    if (!selectedField) return;
    
    if (selectedField.id === fieldId) {
      const newMatches = { ...matches, [fieldId]: true };
      setMatches(newMatches);
      setSelectedField(null);
      
      if (Object.keys(newMatches).length === fields.length) {
        setTimeout(() => onCorrect && onCorrect(), 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[360px]">
      <div className="text-center mb-6">
          <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">Taiwan MRZ Decoder</h3>
          <p className="text-xs text-gray-500 italic">Link labels to the machine-readable zones</p>
      </div>

      <div className="relative w-full flex flex-col items-center gap-8 select-none">
        {/* Passport Data Page Simulation Block */}
        <div className="w-[310px] h-[90px] bg-blue-50/90 rounded border border-gray-200 shadow-lg overflow-hidden flex flex-col relative">
            {/* Binding Shadow at top */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-400/20 to-transparent"></div>
            
            {/* Passport Header Elements */}
            <div className="px-2 pt-2 flex justify-between items-start opacity-30 grayscale">
                <div className="text-[5px] text-blue-900 font-bold leading-none">
                    <div>護 照</div>
                    <div>PASSPORT</div>
                </div>
                <div className="text-center">
                    <div className="text-[7px] font-bold text-blue-900 tracking-widest leading-none">台灣</div>
                    <div className="text-[4px] font-bold text-blue-900 uppercase tracking-tighter leading-none">Taiwan</div>
                </div>
                <div className="w-4 h-4 rounded-full border border-blue-600 bg-white/50"></div>
            </div>

            {/* MRZ Lines inside the "passport" */}
            <div className="mt-auto p-2 font-mono text-[11.5px] tracking-[0.08em] whitespace-pre leading-none text-black/80">
                <div className="flex flex-col gap-1.5">
                    <div className="flex">
                        {line1.split('').map((char, i) => {
                            const field = fields.find(f => f.line === 0 && i >= f.start && i < f.end);
                            return (
                                <span 
                                    key={i} 
                                    onClick={() => field && handleTargetClick(field.id)}
                                    className={`w-[7.1px] h-[18px] flex items-center justify-center transition-all duration-200 ${field ? 'cursor-pointer hover:bg-black/20' : ''}`}
                                    style={{ 
                                        backgroundColor: matches[field?.id] ? field.color : (field && selectedField ? '#cbd5e1' : undefined),
                                        color: matches[field?.id] ? 'white' : undefined,
                                        fontWeight: matches[field?.id] ? 'bold' : undefined
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                    <div className="flex">
                        {line2.split('').map((char, i) => {
                            const field = fields.find(f => f.line === 1 && i >= f.start && i < f.end);
                            return (
                                <span 
                                    key={i} 
                                    onClick={() => field && handleTargetClick(field.id)}
                                    className={`w-[7.1px] h-[18px] flex items-center justify-center transition-all duration-200 ${field ? 'cursor-pointer hover:bg-black/10' : ''}`}
                                    style={{ 
                                        backgroundColor: matches[field?.id] ? field.color : (field && selectedField ? '#cbd5e1' : undefined),
                                        color: matches[field?.id] ? 'white' : undefined,
                                        fontWeight: matches[field?.id] ? 'bold' : undefined
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>

        {/* Labels Grid - Now below the MRZ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-[310px]">
          {fields.map(f => (
            <button
              key={f.id}
              onClick={() => handleLabelClick(f)}
              disabled={matches[f.id]}
              className={`px-2 py-2 rounded-lg text-[10px] font-black transition-all border-2 flex items-center justify-center text-center ${
                matches[f.id] 
                  ? 'bg-gray-100 border-transparent text-gray-400 opacity-50' 
                  : selectedField?.id === f.id
                  ? 'bg-white shadow-md scale-105 z-10'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
              }`}
              style={{ 
                borderColor: selectedField?.id === f.id ? f.color : undefined,
                color: selectedField?.id === f.id ? f.color : undefined,
                boxShadow: selectedField?.id === f.id ? `0 0 10px ${f.color}22` : 'none'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 px-6 py-3 bg-gray-50 rounded-lg w-full">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] text-center leading-relaxed">
            {selectedField 
              ? `Tap the correct part of the MRZ for ${selectedField.label}` 
              : 'Identify all sensitive data fields'}
          </p>
      </div>
    </div>
  );
};
