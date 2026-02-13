
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, UserRole } from './types';
import { COLORS, BRAND_ASSETS } from './constants';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Marketplace from './pages/Marketplace';
import CreateListing from './pages/CreateListing';
import ListingDetail from './pages/ListingDetail';
import TransporterDashboard from './pages/TransporterDashboard';
import Messaging from './pages/Messaging';
import NewDrivers from './pages/NewDrivers';
import TrustSafety from './pages/TrustSafety';
import AuthModal from './components/AuthModal';
import { Menu, X, LogIn, Heart, Facebook, Instagram, Youtube, Twitter, Globe, ArrowUpRight, UserPlus, LogOut } from 'lucide-react';

// Wrapper component to handle route-based modal triggers
const AuthRouteHandler = ({ setAuthModal }: { setAuthModal: (state: { open: boolean, mode: 'login' | 'signup' }) => void }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/login') {
      setAuthModal({ open: true, mode: 'login' });
    } else if (location.pathname === '/signup') {
      setAuthModal({ open: true, mode: 'signup' });
    }
  }, [location.pathname, setAuthModal]);

  return null;
};

const Navigation = ({ 
  user, 
  favoritesCount, 
  onOpenAuth,
  onLogout 
}: { 
  user: User | null, 
  favoritesCount: number, 
  onOpenAuth: (mode: 'login' | 'signup') => void,
  onLogout: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Drivers', path: '/new-drivers' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Trust & Safety', path: '/trust-safety' },
  ];

  const isDarkPage = location.pathname === '/new-drivers' && !scrolled;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] pointer-events-auto transition-all duration-500 ${scrolled ? 'glass py-1 shadow-sm' : 'bg-transparent py-4'} ${isOpen ? 'bg-[#F7F1E8]' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                {BRAND_ASSETS.logo(isDarkPage ? 'text-white' : 'text-[#0B1020]')}
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all relative group ${
                    location.pathname === link.path 
                      ? 'text-[#C86B4A]' 
                      : isDarkPage ? 'text-white/70 hover:text-white' : 'text-[#2A3346] opacity-70 hover:opacity-100 hover:text-[#C86B4A]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C86B4A] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 xl:gap-6">
              {!user ? (
                <div className="flex items-center gap-4 xl:gap-6">
                  <button 
                    onClick={() => onOpenAuth('login')}
                    className={`text-[12px] font-extrabold uppercase tracking-widest transition-colors flex items-center gap-2 hover:text-[#C86B4A] ${isDarkPage ? 'text-white' : 'text-[#0B1020]'}`}
                  >
                    <LogIn className="w-4 h-4" /> Log in
                  </button>
                  <Link 
                    to="/signup"
                    className={`btn-primary px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg transform hover:-translate-y-0.5 transition-all ${isDarkPage ? 'shadow-black/20' : 'shadow-[#C86B4A]/10'}`}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4 xl:gap-6">
                  <Link to="/dashboard" className={`${isDarkPage ? 'text-white' : 'text-[#2A3346]'} hover:text-[#C86B4A] relative p-1 transition-colors`} title="Favorites">
                     <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#C86B4A] text-[#C86B4A]' : ''}`} />
                     {favoritesCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C86B4A] text-[#F7F1E8] text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-[#F7F1E8]">{favoritesCount}</span>
                     )}
                  </Link>
                  <div className="h-6 w-px bg-[#E6E0D8]/30"></div>
                  <div className="flex items-center gap-3">
                    <Link to={user.role === UserRole.TRANSPORTER ? "/dashboard" : "/marketplace"} className="w-9 h-9 rounded-xl bg-[#E6E0D8] flex items-center justify-center border-2 border-white shadow-sm overflow-hidden transform hover:scale-105 transition-all">
                       <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Link>
                    <button 
                      onClick={onLogout}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold uppercase tracking-wider ${isDarkPage ? 'text-white bg-white/10 hover:bg-white/20' : 'text-[#2A3346] bg-slate-100 hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2.5 rounded-xl transition-all duration-300 ${isOpen ? 'bg-[#0B1020] text-white' : isDarkPage ? 'text-white hover:bg-white/10' : 'text-[#0B1020] hover:bg-[#E6E0D8]'}`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[64px] md:top-[80px] bg-[#F7F1E8] z-[90] p-6 flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto">
            {user && (
              <div className="flex items-center gap-4 mb-8 p-5 bg-white rounded-3xl border border-[#E6E0D8] shadow-sm">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#F7F1E8]">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#C86B4A]">Logged in as</p>
                  <p className="text-lg font-serif font-bold text-[#0B1020]">{user.name}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Link 
                to="/new-drivers" 
                onClick={() => setIsOpen(false)}
                className="block bg-[#C86B4A] text-[#F7F1E8] p-5 rounded-2xl text-center text-lg font-serif font-bold shadow-xl transform active:scale-95 transition-all"
              >
                Become a Driver
              </Link>
              
              <div className="py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 text-xl font-serif font-bold border-b border-[#E6E0D8]/50 last:border-0 ${location.pathname === link.path ? 'text-[#C86B4A]' : 'text-[#0B1020]'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-[#E6E0D8] flex flex-col gap-4">
              {!user ? (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); onOpenAuth('login'); }} 
                    className="text-left text-base font-bold text-[#2A3346] flex items-center gap-3 py-2"
                  >
                    <LogIn className="w-5 h-5 text-[#C86B4A]" /> Log in
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); onOpenAuth('signup'); }} 
                    className="text-left text-base font-bold text-[#2A3346] flex items-center gap-3 py-2"
                  >
                    <UserPlus className="w-5 h-5 text-[#C86B4A]" /> Create Account
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="text-left text-base font-bold text-[#2A3346] flex items-center gap-3 py-2"
                  >
                    <UserPlus className="w-5 h-5 text-[#C86B4A]" /> My Dashboard
                  </Link>
                  <button 
                    onClick={() => { setIsOpen(false); onLogout(); }} 
                    className="text-left text-base font-bold text-red-500 flex items-center gap-3 py-2"
                  >
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </>
              )}
              <Link to="/marketplace" onClick={() => setIsOpen(false)} className="btn-primary py-4 rounded-2xl text-center text-base shadow-xl shadow-[#C86B4A]/10">
                Post a Shipment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#0B1020] text-[#F7F1E8] pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
        <div className="lg:col-span-2 space-y-6">
          {BRAND_ASSETS.logo("text-[#F7F1E8] scale-100 origin-left")}
          <p className="text-[#E6E0D8] text-sm opacity-70 leading-relaxed max-w-sm font-medium">
            Nationwide premium pet transport. We facilitate safe, direct journeys for those who matter most since 2008.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#E6E0D8] hover:bg-[#C86B4A] hover:text-[#F7F1E8] transition-all transform hover:-translate-y-1">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A]">Shipping</h4>
          <ul className="space-y-3 text-[#E6E0D8] opacity-70 text-sm font-medium">
            <li><Link to="/marketplace" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Pet transport <ArrowUpRight className="w-3 h-3" /></Link></li>
            <li><Link to="/marketplace" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Dog transport <ArrowUpRight className="w-3 h-3" /></Link></li>
            <li><Link to="/marketplace" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Cat transport <ArrowUpRight className="w-3 h-3" /></Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A]">Transporters</h4>
          <ul className="space-y-3 text-[#E6E0D8] opacity-70 text-sm font-medium">
            <li><Link to="/new-drivers" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Become a driver <ArrowUpRight className="w-3 h-3" /></Link></li>
            <li><Link to="/pricing" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Pricing <ArrowUpRight className="w-3 h-3" /></Link></li>
            <li><Link to="/trust-safety" className="hover:text-[#C86B4A] transition-colors flex items-center gap-2">Safety resources <ArrowUpRight className="w-3 h-3" /></Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A]">Company</h4>
          <ul className="space-y-3 text-[#E6E0D8] opacity-70 text-sm font-medium">
            <li><Link to="/how-it-works" className="hover:text-[#C86B4A] transition-colors">How it works</Link></li>
            <li><Link to="/trust-safety" className="hover:text-[#C86B4A] transition-colors">Trust & Safety</Link></li>
            <li><a href="#" className="hover:text-[#C86B4A] transition-colors">FAQ & Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-[11px] font-medium text-white opacity-40">
          <Globe className="w-3.5 h-3.5" />
          <span>© 2024 PawsPath Marketplace. Guiding family home.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-medium text-white opacity-40">
          <a href="#" className="hover:text-cream transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-cream transition-colors">Terms of service</a>
          <a href="#" className="hover:text-cream transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean, mode: 'login' | 'signup' }>({ open: false, mode: 'login' });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pawspath_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pawspath_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthModal({ open: false, mode: 'login' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <AuthRouteHandler setAuthModal={setAuthModal} />
      <div className="min-h-screen flex flex-col">
        <Navigation 
          user={currentUser} 
          favoritesCount={favorites.length} 
          onOpenAuth={(mode) => setAuthModal({ open: true, mode })} 
          onLogout={handleLogout}
        />
        <main className="flex-grow pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-drivers" element={<NewDrivers />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/trust-safety" element={<TrustSafety />} />
            <Route path="/marketplace" element={<Marketplace favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/create" element={<CreateListing user={currentUser} />} />
            <Route path="/listing/:id" element={<ListingDetail user={currentUser} isFavorited={(id) => favorites.includes(id || '')} toggleFavorite={toggleFavorite} />} />
            <Route path="/dashboard" element={<TransporterDashboard user={currentUser} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/messages/:id" element={<Messaging user={currentUser} />} />
            
            <Route path="/login" element={<Home />} />
            <Route path="/signup" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })} 
        initialMode={authModal.mode} 
        onLoginSuccess={handleLoginSuccess}
      />
    </Router>
  );
}
