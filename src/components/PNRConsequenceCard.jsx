import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Edit3, Briefcase, CreditCard, User, Plane, CheckCircle2, Lock } from 'lucide-react';

export const PNRConsequenceCard = ({ onCorrect }) => {
  const { t } = useTranslation();
  
  const [hackedActions, setHackedActions] = useState({});
  const totalActions = 5;

  const actions = [
    { 
        id: 'cancel', 
        label: t('consequences.cancel_label'), 
        icon: <Trash2 className="w-4 h-4" />, 
        color: 'bg-red-600',
        fields: [
            { label: t('consequences.field_status'), value: t('consequences.status_confirmed') },
            { label: t('consequences.field_action'), value: t('consequences.action_cancel') }
        ],
        description: t('consequences.cancel_text') 
    },
    { 
        id: 'data', 
        label: t('consequences.data_label'), 
        icon: <User className="w-4 h-4" />, 
        color: 'bg-orange-600',
        fields: [
            { label: t('consequences.field_passport'), value: '710003421' },
            { label: t('consequences.field_dob'), value: '12 JAN 1990' }
        ],
        description: t('consequences.data_text') 
    },
    { 
        id: 'modify', 
        label: t('consequences.modify_label'), 
        icon: <Edit3 className="w-4 h-4" />, 
        color: 'bg-blue-600',
        fields: [
            { label: t('consequences.field_depart'), value: '27 NOV 2025' },
            { label: t('consequences.field_new_date'), value: '27 DEC 2025' }
        ],
        description: t('consequences.modify_text') 
    },
    { 
        id: 'baggage', 
        label: t('consequences.baggage_label'), 
        icon: <Briefcase className="w-4 h-4" />, 
        color: 'bg-indigo-600',
        fields: [
            { label: t('consequences.field_allowance'), value: '1 PC (23KG)' },
            { label: t('consequences.field_charges'), value: '$450.00' }
        ],
        description: t('consequences.baggage_text') 
    },
    { 
        id: 'payment', 
        label: t('consequences.payment_label'), 
        icon: <CreditCard className="w-4 h-4" />, 
        color: 'bg-purple-600',
        fields: [
            { label: t('consequences.field_cardholder'), value: 'LEOPOLD/EMR' },
            { label: t('consequences.field_card'), value: '**** **** **** 4242' }
        ],
        description: t('consequences.payment_text') 
    },
  ];

  const shuffledActions = React.useMemo(() => [...actions].sort(() => Math.random() - 0.5), []);

  const handleAction = (id) => {
    if (hackedActions[id]) return;
    const newActions = { ...hackedActions, [id]: true };
    setHackedActions(newActions);
    
    if (Object.keys(newActions).length === totalActions) {
      setTimeout(() => onCorrect && onCorrect(), 2500);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md mx-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Official Airline Header */}
      <div className="bg-[#003566] -mx-4 -mt-4 p-4 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="text-white w-5 h-5" />
            <span className="text-white font-bold tracking-tight">SKYPORT AIRLINES</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/80 font-medium">
            <Lock className="w-3 h-3" />
            SECURE PORTAL
          </div>
      </div>

      <div className="text-center space-y-1 mb-2">
          <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">{t('consequences.portal_title')}</h3>
          <div className="flex justify-center gap-4 text-[10px] text-gray-500 font-bold uppercase">
            <span>{t('card.pnr_label')}: <span className="text-blue-600">EZQ7O92</span></span>
            <span>{t('card.passenger')}: <span className="text-blue-600">LEOPOLD</span></span>
          </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-2">
          <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
            {t('consequences.portal_instruction')}
          </p>
      </div>

      <div className="space-y-3">
        {shuffledActions.map(action => (
          <div key={action.id} className="flex flex-col">
            <button
              onClick={() => handleAction(action.id)}
              disabled={hackedActions[action.id]}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
                hackedActions[action.id] 
                ? 'bg-gray-50 border-gray-100 text-gray-400' 
                : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50 shadow-sm'
              }`}
            >
              <div className={`p-2 rounded-lg ${hackedActions[action.id] ? 'bg-gray-200' : 'bg-blue-50'}`}>
                {React.cloneElement(action.icon, { className: `w-4 h-4 ${hackedActions[action.id] ? 'text-gray-400' : 'text-blue-600'}` })}
              </div>
              <div className="flex-1">
                <div className="text-xs font-black uppercase tracking-wide">{action.label}</div>
              </div>
              {hackedActions[action.id] && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </button>

            {hackedActions[action.id] && (
                <div className="mx-2 p-3 bg-white border-x-2 border-b-2 border-gray-100 rounded-b-xl animate-in slide-in-from-top-2 duration-300 shadow-inner">
                    <div className="space-y-1 mb-3">
                        {action.fields.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] font-mono">
                                <span className="text-gray-400 font-medium uppercase text-[9px]">{f.label}:</span>
                                <span className="font-bold text-gray-900 tracking-tight">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-[10px] text-red-600 font-medium leading-tight bg-red-50 p-2 rounded border border-red-100 italic">
                        {action.description}
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex gap-1">
            {[...Array(totalActions)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-1 rounded-full transition-all duration-500 ${i < Object.keys(hackedActions).length ? 'bg-blue-600 w-6' : 'bg-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] font-black text-blue-600 animate-pulse uppercase tracking-tighter">
            {Object.keys(hackedActions).length}/{totalActions} Risks Identified
          </span>
      </div>
    </div>
  );
};