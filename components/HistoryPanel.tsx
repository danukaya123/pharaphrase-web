
import React from 'react';
import { ParaphraseHistoryItem } from '../types';

interface HistoryPanelProps {
  history: ParaphraseHistoryItem[];
  onRestore: (item: ParaphraseHistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore }) => {
  if (history.length === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-6 border border-white/40 h-full min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-slate-700 font-bold mb-1">No History Yet</h4>
        <p className="text-xs text-slate-400">Your recent paraphrases will be saved here automatically.</p>
      </div>
    );
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-white/40 h-full shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-slate-800 font-bold flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Activity
        </h4>
        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold">
          {history.length} ITEMS
        </span>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((item) => (
          <div 
            key={item.id}
            onClick={() => onRestore(item)}
            className="group p-4 bg-white/50 rounded-xl border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                {item.tone}
              </span>
              <span className="text-[10px] text-slate-400">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 italic mb-1">
              "{item.original.slice(0, 80)}..."
            </p>
            <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold text-indigo-600">Restore →</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default HistoryPanel;
