
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Stay Updated with Creative Insights</h3>
              <p className="text-blue-100 text-sm md:text-base">
                Subscribe to our newsletter for the latest design trends and AI tips.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-md"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-blue-200 mt-3 opacity-70">By subscribing, you agree to our Privacy Policy.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <img 
                src="https://github.com/danukaya123/quizontal-pro/blob/main/download%20(3).png?raw=true" 
                alt="Quizontal" 
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Quizontal is a free and easy-to-use platform that provides high-quality stock photos and HD videos for both personal and commercial use. Suitable for blogs, websites, and creative projects.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialIcon platform="facebook" />
              <SocialIcon platform="youtube" />
              <SocialIcon platform="linkedin" />
              <a href="https://wa.me/1234567890" target="_blank" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.671.149s-.768.966-.941 1.164c-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.297-.496.099-.198.05-.371-.025-.52-.074-.149-.671-1.611-.918-2.205-.242-.579-.487-.5-.671-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347zM12.004 2C6.478 2 2 6.477 2 12c0 2.12.666 4.09 1.822 5.722L2 22l4.358-1.114C7.902 21.338 9.912 22 12 22c5.523 0 10-4.477 10-10S17.527 2 12.004 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Lists */}
          <div>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Images</a></li>
              <li><a href="#" className="hover:text-white">Wallpapers</a></li>
              <li><a href="#" className="hover:text-white">Videos</a></li>
              <li><a href="#" className="hover:text-white">AI Tools</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2025 Quizontal. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ platform: string }> = ({ platform }) => (
  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all">
    <img src={`https://cdn.simpleicons.org/${platform}/white`} className="w-4 h-4" alt={platform} />
  </a>
);

export default Footer;
