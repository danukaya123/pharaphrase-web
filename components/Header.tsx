
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (id: string) => {
    setActiveMobileDropdown(activeMobileDropdown === id ? null : id);
  };

  return (
    <header className="sticky top-0 z-[1000] w-full bg-white border-b border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img 
            src="https://github.com/danukaya123/quizontal-pro/blob/main/download%20(3).png?raw=true" 
            alt="Quizontal Logo" 
            className="h-[40px] w-auto max-w-[180px] object-contain"
          />
        </a>

        {/* Desktop Search */}
        <div className="hidden lg:block relative min-w-[240px] mx-8">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search images, wallpapers..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Images Mega Menu */}
          <NavItem label="Images">
            <div className="w-[800px] p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Browse Images by Category</h4>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MenuThumb src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" label="Nature" stats="2,500+ images" />
                <MenuThumb src="https://github.com/danukaya123/quizontal-pro/blob/main/assets/abstract-nav-bar.jpg?raw=true" label="Abstract" stats="1,800+ images" />
                <MenuThumb src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400" label="Business" stats="3,200+ images" />
                <MenuThumb src="https://github.com/danukaya123/quizontal-pro/blob/main/assets/technology-nav-bar.png?raw=true" label="Technology" stats="2,100+ images" />
              </div>
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-8">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Popular Searches</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Wallpapers', 'Stock Photos', 'AI Generated'].map(s => (
                      <a key={s} href="#" className="text-sm text-purple-600 hover:text-purple-800">{s}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Quick Links</h5>
                  <div className="space-y-1">
                    <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">Trending Images</a>
                    <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">New Arrivals</a>
                  </div>
                </div>
              </div>
            </div>
          </NavItem>

          {/* Videos Mega Menu */}
          <NavItem label="Videos">
            <div className="w-[450px] p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Video Collections</h4>
              <div className="grid grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <h5 className="font-medium text-gray-900 mb-1">Categories</h5>
                  <MenuLink icon="video" label="Stock Videos" />
                  <MenuLink icon="film" label="Motion Graphics" />
                  <MenuLink icon="tv" label="4K Videos" />
                </ul>
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900">Featured</h5>
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=100" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Travel & Adventure</p>
                      <p className="text-xs text-gray-500">850+ videos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavItem>

          <NavItem label="Wallpapers">
             <div className="w-[450px] p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Wallpaper Collections</h4>
              <div className="grid grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <MenuLink icon="image" label="HD Wallpapers" />
                  <MenuLink icon="tv" label="4K Wallpapers" />
                  <MenuLink icon="smartphone" label="Mobile Wallpapers" />
                </ul>
                <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Nature & Landscape</p>
                      <p className="text-xs text-gray-500">1,200+ walls</p>
                    </div>
                </div>
              </div>
            </div>
          </NavItem>

          <NavItem label="AI Tools">
             <div className="w-[450px] p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Advanced Tools</h4>
              <div className="grid grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <MenuLink icon="sparkles" label="Image Generator" />
                  <MenuLink icon="scissors" label="Background Remover" />
                </ul>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-purple-600 mb-1 uppercase">New</p>
                  <p className="text-sm font-bold text-gray-900">Professional Paraphraser</p>
                </div>
              </div>
            </div>
          </NavItem>

          <a href="#" className="nav-link px-4 py-2 font-medium text-gray-700 hover:text-purple-600">Pricing</a>
          
          <button className="ml-4 bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95">
            Get Started Free
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
        >
          {isMobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-16 6h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[70px] bg-white z-[999] transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto pb-24`}>
        <div className="p-4 space-y-2">
           <MobileNavToggle label="Images" active={activeMobileDropdown === 'images'} onClick={() => toggleMobileDropdown('images')} />
           {activeMobileDropdown === 'images' && (
             <div className="p-4 bg-gray-50 rounded-2xl grid grid-cols-2 gap-3 mb-2">
                <MobileThumb src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200" label="Nature" />
                <MobileThumb src="https://github.com/danukaya123/quizontal-pro/blob/main/assets/abstract-nav-bar.jpg?raw=true" label="Abstract" />
             </div>
           )}
           <MobileNavToggle label="Videos" active={activeMobileDropdown === 'videos'} onClick={() => toggleMobileDropdown('videos')} />
           <MobileNavToggle label="AI Tools" active={activeMobileDropdown === 'ai'} onClick={() => toggleMobileDropdown('ai')} />
           <a href="#" className="block py-4 px-2 text-lg font-bold text-gray-900 border-b border-gray-100">Pricing</a>
           
           <div className="pt-6">
              <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg">Get Started Free</button>
           </div>
        </div>
      </div>
    </header>
  );
};

const NavItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="relative group">
    <button className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-purple-600 flex items-center gap-1 group-hover:bg-gray-50 rounded-lg transition-all">
      {label}
      <svg className="w-4 h-4 opacity-40 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
        {children}
      </div>
    </div>
  </div>
);

const MobileNavToggle: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between py-4 px-2 text-lg font-bold border-b border-gray-100"
  >
    {label}
    <svg className={`w-5 h-5 transition-transform ${active ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
  </button>
);

const MenuThumb: React.FC<{ src: string; label: string; stats?: string }> = ({ src, label, stats }) => (
  <div className="rounded-xl overflow-hidden hover:scale-[1.02] transition-transform shadow-sm cursor-pointer border border-gray-100">
    <img src={src} className="w-full h-32 object-cover" />
    <div className="p-3 bg-gray-50">
      <h5 className="font-medium text-gray-900 text-sm">{label}</h5>
      {stats && <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stats}</p>}
    </div>
  </div>
);

const MobileThumb: React.FC<{ src: string; label: string }> = ({ src, label }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
    <img src={src} className="w-full h-20 object-cover" />
    <p className="p-2 text-center text-xs font-bold text-gray-700">{label}</p>
  </div>
);

const MenuLink: React.FC<{ icon: string; label: string }> = ({ label }) => (
  <li>
    <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
      <div className="w-1.5 h-1.5 bg-purple-200 rounded-full"></div>
      {label}
    </a>
  </li>
);

export default Header;
