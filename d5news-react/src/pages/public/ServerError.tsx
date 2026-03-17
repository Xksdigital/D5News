import { Link } from 'react-router-dom';
import MaterialIcon from '../../components/shared/MaterialIcon';
import Logo from '../../components/shared/Logo';

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Public Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center flex-shrink-0">
        <Link to="/home" className="flex items-center gap-3">
          <Logo className="h-7" />
        </Link>
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          {/* Large 500 */}
          <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-primary/10 dark:text-primary/15 select-none">500</h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight -mt-6 mb-2">Erreur Serveur</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Internal Server Error</p>

          {/* Subtitle */}
          <p className="text-slate-500 dark:text-slate-400 mt-4 mb-8 leading-relaxed">
            Une erreur inattendue s'est produite. Nos equipes travaillent a la resoudre.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <MaterialIcon name="refresh" className="text-lg" />
              Recharger la page
            </button>
            <Link to="/home" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
              <MaterialIcon name="home" className="text-lg" />
              Retour a l'accueil
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-8">
            <a href="mailto:support@d5news.com" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
              <MaterialIcon name="support_agent" className="text-lg" />
              Contacter le support technique
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
        <p className="text-xs text-slate-400 dark:text-slate-500">&copy; 2025 D5News. Tous droits reserves.</p>
      </footer>
    </div>
  );
}
