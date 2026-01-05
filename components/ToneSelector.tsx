
import React from 'react';
import { ParaphraseTone } from '../types';

interface ToneSelectorProps {
  selected: ParaphraseTone;
  onSelect: (tone: ParaphraseTone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selected, onSelect }) => {
  const tones = Object.values(ParaphraseTone);

  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <button
          key={tone}
          onClick={() => onSelect(tone)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
            selected === tone
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
              : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
        >
          {tone}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;
