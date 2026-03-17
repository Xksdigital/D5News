import { useState, useEffect, useCallback } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('d5news-cookies')) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAction = useCallback((action: string) => {
    try {
      localStorage.setItem('d5news-cookies', action);
    } catch {}
    setAnimatingOut(true);
    setTimeout(() => setVisible(false), 300);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 transition-all duration-300 ${animatingOut ? 'translate-y-full opacity-0' : 'cookie-popup-animate'}`}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Icon + Text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="material-symbols-outlined text-secondary text-xl mt-0.5 shrink-0">cookie</span>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Nous utilisons des cookies pour ameliorer votre experience.{' '}
            <button
              onClick={() => handleAction('manage')}
              className="text-primary font-semibold hover:underline"
            >
              En savoir plus
            </button>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => handleAction('refused')}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={() => handleAction('accepted')}
            className="flex-1 sm:flex-none px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-light transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
