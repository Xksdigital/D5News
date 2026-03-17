import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'FR' | 'EN';

interface LanguageContextType {
  language: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem('d5news-lang');
    if (stored === 'FR' || stored === 'EN') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'FR';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggle = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'FR' ? 'EN' : 'FR';
      try {
        localStorage.setItem('d5news-lang', next);
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
