import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import NewsTicker from '../components/shared/NewsTicker';
import Footer from '../components/public/Footer';
import CookieConsent from '../components/shared/CookieConsent';
import Logo from '../components/shared/Logo';
import PremiumNavBar from '../components/shared/PremiumNavBar';

const categories = [
  { label: 'Politique', to: '/category/politique' },
  { label: 'Economie', to: '/category/economie' },
  { label: 'Culture', to: '/category/culture' },
  { label: 'Sport', to: '/category/sport' },
  { label: 'Technologie', to: '/category/technologie' },
  { label: 'Environnement', to: '/category/environnement' },
  { label: 'Sante', to: '/category/sante' },
];

const continents = [
  { label: 'Afrique', to: '/category/afrique' },
  { label: 'Europe', to: '/category/europe' },
  { label: 'Asie', to: '/category/asie' },
  { label: 'Amerique', to: '/category/amerique' },
  { label: 'Oceanie', to: '/category/oceanie' },
];

export default function PublicLayout() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const { language, toggle: toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breaking News Ticker */}
      <NewsTicker />

      {/* Public Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md">
        <div className="px-6 md:px-20 lg:px-40 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/home" className="flex items-center">
                <Logo className="h-8" />
              </Link>
              {/* Direct TV / Web Radio Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/live"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold hover:bg-red-500/20 transition-all"
                >
                  <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="material-symbols-outlined text-sm">live_tv</span>
                  Direct TV
                </Link>
                <Link
                  to="/live"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold hover:bg-primary/20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">radio</span>
                  Web Radio
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/search"
                aria-label="Rechercher"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">search</span>
              </Link>
              <button
                onClick={toggleLanguage}
                aria-label={`Changer la langue (actuellement ${language})`}
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors text-xs font-black"
              >
                {language}
              </button>
              <button
                onClick={toggleTheme}
                aria-label={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              {isLoggedIn ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" loading="lazy" className="w-5 h-5 rounded-full" />
                    ) : (
                      <span className="material-symbols-outlined text-sm">person</span>
                    )}
                    {user?.name?.split(' ')[0] || 'Profil'}
                    <span className="material-symbols-outlined text-sm">{userMenuOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">person</span>
                        Mon profil
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">bookmark</span>
                        Mes favoris
                      </Link>
                      <Link
                        to="/subscription"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800"
                      >
                        <span className="material-symbols-outlined text-lg">credit_card</span>
                        Abonnement
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); logout(); navigate('/home'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Se deconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary text-primary-dark text-sm font-bold rounded-lg hover:bg-secondary-light transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">person</span>
                  Se connecter
                </Link>
              )}
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[55] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-[#101822] z-[60] shadow-2xl md:hidden overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <Logo className="h-7" />
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
              <div className="p-5 space-y-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    to="/live"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold"
                  >
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Direct TV
                  </Link>
                  <Link
                    to="/live"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold"
                  >
                    Web Radio
                  </Link>
                </div>

                {/* Theme & Language */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-sm">translate</span>
                    {language}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                    {theme === 'dark' ? 'Clair' : 'Sombre'}
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Categories</p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <NavLink
                        key={cat.to}
                        to={cat.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            isActive
                              ? 'text-white bg-primary'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`
                        }
                      >
                        {cat.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Pages</p>
                  <div className="space-y-1">
                    {[
                      { label: 'Podcasts', to: '/podcast', icon: 'podcasts' },
                      { label: 'Favoris', to: '/favorites', icon: 'bookmark' },
                      { label: 'Contact', to: '/contact', icon: 'mail' },
                    ].map((p) => (
                      <NavLink
                        key={p.to}
                        to={p.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            isActive
                              ? 'text-white bg-primary'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`
                        }
                      >
                        <span className="material-symbols-outlined text-sm">{p.icon}</span>
                        {p.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Auth */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-primary text-white text-sm font-bold rounded-lg w-full justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">person</span>
                        Mon Profil
                      </Link>
                      <button
                        onClick={() => { setMobileMenuOpen(false); logout(); navigate('/home'); }}
                        className="flex items-center gap-2 px-4 py-3 border border-red-500/30 text-red-500 text-sm font-bold rounded-lg w-full justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Se deconnecter
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-primary text-white text-sm font-bold rounded-lg w-full justify-center"
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 border border-slate-300 dark:border-slate-700 text-sm font-bold rounded-lg w-full justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </header>

      {/* Premium Navigation Bar */}
      <PremiumNavBar />

      {/* Continent Navigation Bar */}
      <div className="bg-white/50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 lg:px-40">
        <div className="max-w-7xl mx-auto">
          <nav className="subnav-scroll flex items-center gap-6 overflow-x-auto py-2.5">
            <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">public</span>
            {continents.map((continent) => (
              <NavLink
                key={continent.to}
                to={continent.to}
                className={({ isActive }) =>
                  `flex-shrink-0 text-sm transition-colors ${
                    isActive
                      ? 'font-bold text-primary border-b-2 border-primary pb-0.5'
                      : 'font-semibold text-slate-500 dark:text-slate-400 hover:text-primary'
                  }`
                }
              >
                {continent.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}
