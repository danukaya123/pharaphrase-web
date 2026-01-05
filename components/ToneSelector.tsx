
import React from 'react';
import { ParaphraseTone } from '../types';

interface ToneSelectorProps {
  selected: ParaphraseTone;
  onSelect: (tone: ParaphraseTone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selected, onSelect }) => {
  const tones = Object.values(ParaphraseTone);

  return (
    <div className="flex flex-wrap gap-2.5">
      {tones.map((tone) => (
        <button
          key={tone}
          onClick={() => onSelect(tone)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
            selected === tone
              ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100 -translate-y-0.5'
              : 'bg-white text-gray-600 border-gray-100 hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50/30'
          }`}
        >
          {tone}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;
