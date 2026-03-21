import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import NewsTicker from '../components/shared/NewsTicker';
import Footer from '../components/public/Footer';
import CookieConsent from '../components/shared/CookieConsent';
import Logo from '../components/shared/Logo';

const categories = [
  { label: 'Politique', to: '/category/politique' },
  { label: 'Economie', to: '/category/economie' },
  { label: 'Culture', to: '/category/culture' },
  { label: 'Sport', to: '/category/sport' },
  { label: 'Technologie', to: '/category/technologie' },
  { label: 'Environnement', to: '/category/environnement' },
  { label: 'Sante', to: '/category/sante' },
  { label: 'Podcasts', to: '/podcast', icon: 'podcasts' },
];

const continents = [
  { label: 'Afrique', to: '/category/afrique', emoji: '\u{1F30D}' },
  { label: 'Europe', to: '/category/europe', emoji: '\u{1F30D}' },
  { label: 'Asie', to: '/category/asie', emoji: '\u{1F30F}' },
  { label: 'Amerique', to: '/category/amerique', emoji: '\u{1F30E}' },
  { label: 'Oceanie', to: '/category/oceanie', emoji: '\u{1F30F}' },
];

export default function PublicLayout() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const { language, toggle: toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchRef.current?.value?.trim();
    if (q) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <div className="flex flex-col min-h-screen">
      <NewsTicker />

      {/* ═══════════════════════════════════════════════════════
          BAR 1 — Main Header: Logo + Actions + Live/Radio
      ═══════════════════════════════════════════════════════ */}
      <header className="unified-header sticky top-0 z-50">
        <div className="px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16">

            {/* Left: Logo + Live/Radio */}
            <div className="flex items-center gap-5">
              <Link to="/home" className="flex items-center group">
                <Logo className="h-8 transition-transform duration-300 group-hover:scale-105" />
              </Link>

              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/live"
                  className="header-live-btn flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider transition-all duration-300"
                >
                  <span className="header-live-dot" />
                  DIRECT
                </Link>
                <Link
                  to="/live"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-sm">radio</span>
                  Radio
                </Link>
              </div>
            </div>

            {/* Right: Search + Controls + Auth */}
            <div className="flex items-center gap-1.5">
              {/* Expandable Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Rechercher..."
                      className="w-44 md:w-64 pl-3 pr-8 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 outline-none focus:border-primary/60 focus:bg-white/15 transition-all"
                      onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    />
                    <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-2 text-white/40 hover:text-white">
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="header-icon-btn"
                    aria-label="Rechercher"
                  >
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </button>
                )}
              </div>

              <button onClick={toggleLanguage} className="header-icon-btn hidden sm:flex text-[11px] font-black">
                {language}
              </button>

              <button onClick={toggleTheme} className="header-icon-btn hidden sm:flex">
                <span className="material-symbols-outlined text-[20px]">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              {/* Auth */}
              {isLoggedIn ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="header-user-btn flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full transition-all duration-300"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold">
                      {initials}
                    </div>
                    <span className="text-white/80 text-sm font-semibold">{user?.name?.split(' ')[0]}</span>
                    <span className="material-symbols-outlined text-white/40 text-sm">{userMenuOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="header-dropdown absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-bold text-white">{user?.name}</p>
                        <p className="text-xs text-white/50">{user?.email}</p>
                      </div>
                      {[
                        { to: '/profile', icon: 'person', label: 'Mon profil' },
                        { to: '/favorites', icon: 'bookmark', label: 'Mes favoris' },
                        { to: '/subscription', icon: 'credit_card', label: 'Abonnement' },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors border-t border-white/10"
                        >
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Administration
                        </Link>
                      )}
                      <button
                        onClick={() => { setUserMenuOpen(false); logout(); navigate('/home'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
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
                  className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  Se connecter
                </Link>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="header-icon-btn md:hidden"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            BAR 2 — Categories + Continents (unified sub-bar)
        ═══════════════════════════════════════════════════════ */}
        <div className="unified-subbar">
          <div className="px-4 md:px-8 lg:px-16 xl:px-24">
            <div className="max-w-[1400px] mx-auto flex items-center">

              {/* Categories */}
              <nav aria-label="Categories" className="subnav-scroll flex items-center gap-0.5 overflow-x-auto flex-1 py-1.5">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.to}
                    to={cat.to}
                    className={({ isActive }) =>
                      `unified-nav-item flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'unified-nav-active'
                          : 'text-white/65 hover:text-white hover:bg-white/[0.07]'
                      }`
                    }
                  >
                    {cat.icon && <span className="material-symbols-outlined text-sm">{cat.icon}</span>}
                    {cat.label}
                  </NavLink>
                ))}

                {/* LIVE button inline */}
                <NavLink
                  to="/live"
                  className={({ isActive }) =>
                    `unified-live-pill flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-black tracking-wider transition-all duration-300 ml-1 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                        : 'bg-red-500/90 text-white hover:bg-red-500 hover:shadow-md hover:shadow-red-500/30'
                    }`
                  }
                >
                  <span className="premium-live-dot" />
                  LIVE
                </NavLink>
              </nav>

              {/* Divider */}
              <span className="hidden lg:block w-px h-5 bg-white/10 mx-4 flex-shrink-0" />

              {/* Continents */}
              <nav aria-label="Continents" className="hidden lg:flex items-center gap-1 flex-shrink-0">
                {continents.map((c) => (
                  <NavLink
                    key={c.to}
                    to={c.to}
                    className={({ isActive }) =>
                      `flex-shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-white/15 text-white font-bold'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
                      }`
                    }
                  >
                    {c.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 w-80 h-full z-[60] md:hidden overflow-y-auto mobile-drawer">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <Logo className="h-7" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Live/Radio */}
                <div className="flex gap-2">
                  <Link to="/live" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-red-500/15 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    DIRECT
                  </Link>
                  <Link to="/live" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-primary/15 border border-primary/20 rounded-xl text-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">radio</span>
                    Radio
                  </Link>
                </div>

                {/* Controls */}
                <div className="flex gap-2">
                  <button onClick={toggleLanguage}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 rounded-xl text-sm font-bold text-white/70">
                    <span className="material-symbols-outlined text-sm">translate</span>{language}
                  </button>
                  <button onClick={toggleTheme}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 rounded-xl text-sm font-bold text-white/70">
                    <span className="material-symbols-outlined text-sm">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                    {theme === 'dark' ? 'Clair' : 'Sombre'}
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Categories</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map((cat) => (
                      <NavLink key={cat.to} to={cat.to} onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            isActive ? 'text-white bg-primary' : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                          }`
                        }>
                        {cat.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Continents */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Continents</p>
                  <div className="flex flex-wrap gap-1.5">
                    {continents.map((c) => (
                      <NavLink key={c.to} to={c.to} onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            isActive ? 'text-white bg-primary' : 'text-white/50 bg-white/5 hover:text-white/70'
                          }`
                        }>
                        {c.emoji} {c.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Pages</p>
                  {[
                    { label: 'Favoris', to: '/favorites', icon: 'bookmark' },
                    { label: 'Contact', to: '/contact', icon: 'mail' },
                    { label: 'Recherche', to: '/search', icon: 'search' },
                  ].map((p) => (
                    <NavLink key={p.to} to={p.to} onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          isActive ? 'text-white bg-primary' : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                        }`
                      }>
                      <span className="material-symbols-outlined text-lg">{p.icon}</span>
                      {p.label}
                    </NavLink>
                  ))}
                </div>

                {/* Auth */}
                <div className="pt-3 border-t border-white/10">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user?.name}</p>
                          <p className="text-xs text-white/40">{user?.plan}</p>
                        </div>
                      </div>
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl w-full justify-center">
                        Mon Profil
                      </Link>
                      <button onClick={() => { setMobileMenuOpen(false); logout(); navigate('/home'); }}
                        className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 text-sm font-bold rounded-xl w-full justify-center hover:bg-red-500/10 transition-colors">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Se deconnecter
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-bold rounded-xl w-full justify-center">
                        Se connecter
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 border border-white/15 text-white/70 text-sm font-bold rounded-xl w-full justify-center hover:bg-white/5 transition-colors">
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

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
