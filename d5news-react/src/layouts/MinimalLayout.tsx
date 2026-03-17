import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../components/shared/Logo';

export default function MinimalLayout() {
  const { toggle: toggleTheme } = useTheme();
  const { language, toggle: toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between flex-shrink-0">
        <Link to="/home" className="flex items-center gap-2.5">
          <Logo className="h-8" />
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">language</span>
            <span>{language}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>
          <Link
            to="/profile"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500">&copy; 2025 D5News Media Group. Tous droits reserves.</p>
      </footer>
    </div>
  );
}
