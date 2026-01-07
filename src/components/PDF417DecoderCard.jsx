import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PDF417DecoderCard = ({ details, onCorrect }) => {
  const { t } = useTranslation();
  const { raw } = details;
  
  // BCBP 60-char format:
  // M (0) 1 (1) 
  // NAME (2-22) 
  // E (22) 
  // PNR (23-30) 
  // ORIGIN (30-33) 
  // DEST (33-36) 
  // AIRLINE (36-38) 
  // FLIGHT (38-43) 
  // DATE (43-46) 
  // COMP (46-47) 
  // SEAT (47-51) 
  // SEQ (51-56) 
  // STATUS (56-57) 
  // END (57-59)

  const fields = [
    { id: 'passenger_name', label: t('decoder.passenger_name'), start: 2, end: 22, color: '#ef4444' },
    { id: 'pnr', label: t('decoder.pnr'), start: 23, end: 30, color: '#3b82f6' },
    { id: 'origin', label: t('decoder.origin'), start: 30, end: 33, color: '#10b981' },
    { id: 'destination', label: t('decoder.destination'), start: 33, end: 36, color: '#06b6d4' },
    { id: 'flight_no', label: t('decoder.flight_no'), start: 39, end: 44, color: '#f59e0b' },
    { id: 'date', label: t('decoder.date'), start: 44, end: 47, color: '#8b5cf6' },
    { id: 'seat', label: t('decoder.seat'), start: 48, end: 52, color: '#ec4899' },
    { id: 'sequence', label: t('decoder.sequence'), start: 52, end: 57, color: '#6366f1' },
  ];

  const [matches, setMatches] = useState({});
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldClick = (field) => {
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
        onCorrect && onCorrect();
      }
    }
  };

  const renderRawData = () => {
    const segments = [];
    let currentPos = 0;
    const sortedFields = [...fields].sort((a, b) => a.start - b.start);

    sortedFields.forEach((field) => {
      if (field.start > currentPos) {
        segments.push({ text: raw.substring(currentPos, field.start), fieldId: null });
      }
      segments.push({ text: raw.substring(field.start, field.end), fieldId: field.id, color: field.color });
      currentPos = field.end;
    });

    if (currentPos < raw.length) {
      segments.push({ text: raw.substring(currentPos), fieldId: null });
    }

    return (
      <div className="flex flex-wrap font-mono text-[10px] sm:text-[11px] tracking-[0.05em] whitespace-pre-wrap bg-gray-900 text-green-400 p-3 rounded-lg border-2 border-gray-800 shadow-xl overflow-hidden leading-relaxed break-all">
        {segments.map((seg, i) => (
          <span
            key={i}
            onClick={() => seg.fieldId && handleTargetClick(seg.fieldId)}
            className={`transition-all duration-300 py-0.5 ${
              seg.fieldId 
                ? 'cursor-pointer px-0.5 rounded ' + (matches[seg.fieldId] ? 'ring-2 ring-offset-1 ring-offset-gray-900' : 'hover:bg-gray-800')
                : ''
            }`}
            style={{
              backgroundColor: matches[seg.fieldId] ? seg.color : (seg.fieldId && selectedField ? '#475569' : 'transparent'),
              color: matches[seg.fieldId] ? 'white' : 'inherit',
            }}
          >
            {seg.text.replace(/ /g, '·')}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center space-y-1">
          <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">Boarding Pass Decoder</h3>
          <p className="text-xs text-gray-500 italic">Identify hidden data in the barcode string</p>
      </div>

      {/* Barcode Image Visual */}
      <div className="w-full flex justify-center py-2 bg-gray-50 rounded-lg border border-gray-100">
        <img 
          src="/barcode.jpg" 
          alt="Boarding Pass Barcode" 
          className="h-16 object-contain mix-blend-multiply opacity-80"
        />
      </div>

      <div className="space-y-4 select-none">
        <div className="flex justify-center mb-1">
            <div className="w-16 h-1 bg-gray-200 rounded-full" />
        </div>
        {renderRawData()}
        <p className="text-[9px] text-gray-400 text-center italic">Tip: · represents a space character</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        {fields.map(field => (
          <button
            key={field.id}
            onClick={() => handleFieldClick(field)}
            disabled={matches[field.id]}
            className={`py-2 px-3 rounded-xl text-[9px] font-black transition-all border-2 flex items-center justify-between uppercase tracking-wider ${
              matches[field.id]
                ? 'bg-gray-50 border-transparent text-gray-300'
                : selectedField?.id === field.id
                ? 'bg-white shadow-md scale-105 z-10'
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 shadow-sm'
            }`}
            style={{ 
              borderColor: selectedField?.id === field.id ? field.color : undefined,
              color: selectedField?.id === field.id ? field.color : undefined,
            }}
          >
            {field.label}
            {matches[field.id] && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: field.color }} />}
          </button>
        ))}
      </div>
    </div>
  );
};