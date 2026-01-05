
import React, { useState, useEffect, useCallback } from 'react';
import { ParaphraseTone, ParaphraseHistoryItem } from './types';
import { paraphraseText } from './services/geminiService';
import Header from './components/Header';
import HistoryPanel from './components/HistoryPanel';
import ToneSelector from './components/ToneSelector';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ParaphraseTone>(ParaphraseTone.STANDARD);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ParaphraseHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizontal_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('quizontal_history', JSON.stringify(history));
  }, [history]);

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to paraphrase.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await paraphraseText(inputText, selectedTone);
      setOutputText(result);
      
      const newItem: ParaphraseHistoryItem = {
        id: Date.now().toString(),
        original: inputText,
        paraphrased: result,
        tone: selectedTone,
        timestamp: Date.now(),
      };
      
      setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleRestore = useCallback((item: ParaphraseHistoryItem) => {
    setInputText(item.original);
    setOutputText(item.paraphrased);
    setSelectedTone(item.tone);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pb-12">
      <Header />
      
      <main className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-morphism rounded-2xl p-6 shadow-xl border border-white/40">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <ToneSelector 
                  selected={selectedTone} 
                  onSelect={setSelectedTone} 
                />
              </div>
              <button
                onClick={handleParaphrase}
                disabled={isLoading || !inputText.trim()}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                  isLoading || !inputText.trim() 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Paraphrasing...
                  </>
                ) : "Paraphrase Now"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Area */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Original Text</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here to transform it..."
                  className="w-full h-80 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm transition-all text-slate-800 leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400">
                  {inputText.length} characters
                </div>
                {inputText && (
                  <button 
                    onClick={clearAll}
                    className="absolute top-9 right-4 text-slate-400 hover:text-red-500 text-xs flex items-center gap-1"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Output Area */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Paraphrased Result</label>
                <div className="w-full h-80 p-4 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-md overflow-y-auto text-slate-800 leading-relaxed relative">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Quizontal is rewriting...</p>
                    </div>
                  ) : outputText ? (
                    <p className="whitespace-pre-wrap">{outputText}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
                      <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Your paraphrased text will appear here.
                    </div>
                  )}
                </div>
                {outputText && !isLoading && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="px-4 py-2 bg-white/90 border border-slate-200 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2"
                    >
                      {copyStatus ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                      {copyStatus || "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Ultra Fast"
              desc="Powered by Gemini 3 Flash for instant high-quality results."
            />
            <FeatureCard 
              icon={<svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 20.944a11.955 11.955 0 01-8.618-3.04m17.236 0a11.955 11.955 0 01-8.618 3.04" /></svg>}
              title="Plagiarism-Free"
              desc="Ensures unique phrasing while preserving your original ideas."
            />
            <FeatureCard 
              icon={<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
              title="Tone Control"
              desc="Adjust your writing style from casual to academic in one click."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <HistoryPanel history={history} onRestore={handleRestore} />
        </div>

      </main>

      <footer className="mt-12 text-slate-500 text-sm font-medium">
        © {new Date().getFullYear()} Quizontal Paraphrase. All rights reserved.
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <div className="glass-morphism p-5 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105">
    <div className="mb-3">{icon}</div>
    <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default App;
