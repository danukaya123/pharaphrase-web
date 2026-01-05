
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ParaphraseTone, ParaphraseHistoryItem } from './types';
import { paraphraseText } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [selectedTone, setSelectedTone] = useState<ParaphraseTone>(ParaphraseTone.STANDARD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to transform.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await paraphraseText(inputText, selectedTone);
      setOutputText(result);
      setIsEditing(false);
      
      const history = JSON.parse(localStorage.getItem('quizontal_history') || '[]');
      const newItem = { id: Date.now().toString(), original: inputText, paraphrased: result, tone: selectedTone, timestamp: Date.now() };
      localStorage.setItem('quizontal_history', JSON.stringify([newItem, ...history].slice(0, 10)));
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const reset = () => {
    setIsEditing(true);
    setOutputText('');
    setError(null);
  };

  const highlightedResult = useMemo(() => {
    if (!outputText || !inputText) return null;
    const inputWords = new Set(inputText.toLowerCase().split(/\s+/));
    return outputText.split(/(\s+)/).map((part, i) => {
      const isWord = /\w+/.test(part);
      const isNew = isWord && !inputWords.has(part.toLowerCase().replace(/[.,!?;:]/g, ''));
      return (
        <span key={i} className={isNew ? "bg-purple-50 text-purple-700 font-bold underline decoration-purple-300 decoration-2 underline-offset-4" : ""}>
          {part}
        </span>
      );
    });
  }, [outputText, inputText]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      <Header />
      
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]"></div>
      </div>

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16">
        
        {/* Hero Section - Stacked and Centered */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-purple-100 shadow-sm mb-4 md:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">AI Content Engine</span>
          </div>
          
          <h1 className="brand-font text-2xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-6">
            Refine Your Voice with <span className="text-purple-600">AI Excellence.</span>
          </h1>
          
          <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto px-4">
            The world's most intuitive paraphrasing tool. Instantly rewrite text to improve clarity, change tone, and ensure originality.
          </p>
        </div>

        {/* Unified Tool Container - Below Hero */}
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-[20px] md:rounded-[40px] shadow-[0_24px_64px_rgba(0,0,0,0.06)] md:shadow-[0_32px_80px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
            
            {/* Tone Selector / Tabs */}
            <div className="px-4 md:px-6 py-2 md:py-3 border-b border-gray-50 bg-gray-50/30 flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {Object.values(ParaphraseTone).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`whitespace-nowrap px-3.5 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-2xl text-[11px] md:text-[13px] font-bold transition-all ${
                    selectedTone === tone
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-500 hover:text-purple-600 hover:bg-white bg-white/50 border border-gray-100'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>

            {/* Input & Output Area */}
            <div className="relative">
              <div className="min-h-[250px] md:min-h-[500px] flex flex-col">
                {isEditing ? (
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your content here..."
                    className="flex-grow w-full p-6 md:p-12 text-base md:text-2xl text-gray-800 placeholder-gray-300 outline-none resize-none leading-relaxed bg-transparent font-medium"
                    autoFocus
                  />
                ) : (
                  <div className="flex-grow w-full p-6 md:p-12 text-base md:text-2xl text-gray-800 leading-relaxed animate-fade-in whitespace-pre-wrap font-medium">
                    {highlightedResult}
                  </div>
                )}
              </div>

              {/* Processing Overlay - FIXED FOR MOBILE */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-[50] flex flex-col items-center justify-center space-y-4 md:space-y-6">
                  <div className="relative">
                    <div className="w-12 h-12 md:w-20 md:h-20 border-4 md:border-8 border-purple-50 rounded-full"></div>
                    <div className="absolute inset-0 w-12 h-12 md:w-20 md:h-20 border-4 md:border-8 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-purple-600 font-black uppercase tracking-[0.2em] text-[10px] md:text-sm mb-1">Processing Text</p>
                    <p className="text-gray-400 font-bold text-[10px] md:text-xs">Using {selectedTone} model...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar Footer */}
            <div className="p-4 md:p-8 border-t border-gray-50 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${isEditing ? 'bg-amber-400' : 'bg-green-500'}`}></div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {isEditing ? 'Ready for input' : 'Success'}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {isEditing ? (
                  <button
                    onClick={handleParaphrase}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full sm:w-auto bg-purple-600 text-white px-6 md:px-12 py-3 md:py-4.5 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:bg-purple-700 transition-all shadow-lg md:shadow-xl shadow-purple-100 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    PARAPHRASE
                  </button>
                ) : (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-none bg-gray-900 text-white px-4 md:px-10 py-3 md:py-4.5 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                      {copyStatus ? "COPIED" : "COPY"}
                    </button>
                    <button 
                      onClick={reset}
                      className="px-4 md:px-8 py-3 md:py-4.5 rounded-lg md:rounded-2xl border-2 border-gray-100 font-black text-gray-400 hover:text-purple-600 hover:border-purple-100 transition-all text-xs md:text-lg"
                    >
                      NEW
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] md:text-sm font-bold flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .brand-font { font-family: 'Lexend', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 640px) {
          .md\\:py-4.5 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        }
      `}</style>
    </div>
  );
};

export default App;
