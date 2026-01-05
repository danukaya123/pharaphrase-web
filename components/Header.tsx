
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full glass-morphism sticky top-0 z-50 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white brand-font font-bold text-2xl">Q</span>
          </div>
          <div>
            <h1 className="brand-font font-bold text-2xl text-slate-900 tracking-tight">
              Quizontal
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 -mt-1">
              Professional Paraphraser
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all active:scale-95">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
