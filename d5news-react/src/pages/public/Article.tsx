import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Article() {
  const [fontSize, setFontSize] = useState(17);
  const [readProgress, setReadProgress] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('d5news-saved') || '[]');
      setIsSaved(saved.includes(1));
    } catch {}
  }, []);

  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.max(14, Math.min(24, prev + delta)));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setReadProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-200/30 dark:bg-slate-800/30" role="progressbar" aria-valuenow={Math.round(readProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progression de lecture">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 animate-fade-in">
        <ol className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <li><Link to="/home" className="hover:text-primary transition-colors">Accueil</Link></li>
          <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
          <li><Link to="/category/afrique" className="hover:text-primary transition-colors">Afrique</Link></li>
          <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
          <li className="text-slate-600 dark:text-slate-300 font-medium">Economie</li>
        </ol>
      </nav>

      {/* Article + Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Article Column */}
        <article ref={articleRef} className="flex-1 max-w-3xl animate-fade-in">
          {/* Hero Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&h=500&fit=crop&q=80"
              alt="Panneaux solaires en Afrique - Technologies vertes"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
            Photo: Reuters / Amadou Keita - Panneaux solaires a Dakar, Senegal
          </p>

          {/* Reading Controls Bar */}
          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Ajuster la lecture:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => adjustFontSize(-1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  A-
                </button>
                <button
                  onClick={() => adjustFontSize(1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  A+
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="https://api.whatsapp.com/send?text=L%27essor%20des%20technologies%20vertes%20en%20Afrique%20de%20l%27Ouest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-green-500/10 text-green-600 transition-colors"
                aria-label="Partager sur WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.638-1.476A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.813a9.768 9.768 0 01-5.202-1.497l-.373-.222-2.75.876.875-2.69-.244-.387A9.776 9.776 0 012.188 12 9.813 9.813 0 0112 2.188 9.813 9.813 0 0121.813 12 9.813 9.813 0 0112 21.813z"/></svg>
                <span className="text-[10px] font-bold hidden sm:inline">142</span>
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=Technologies%20vertes%20en%20Afrique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Partager sur X/Twitter"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="text-[10px] font-bold hidden sm:inline">89</span>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-blue-500/10 text-blue-600 transition-colors"
                aria-label="Partager sur Facebook"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-[10px] font-bold hidden sm:inline">56</span>
              </a>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Copier le lien"
              >
                <span className="material-symbols-outlined text-base">{copied ? 'check' : 'link'}</span>
                {copied && <span className="text-[10px] font-bold text-green-500">Copie !</span>}
              </button>
              <button
                onClick={() => {
                  try {
                    const saved = JSON.parse(localStorage.getItem('d5news-saved') || '[]');
                    const next = isSaved ? saved.filter((id: number) => id !== 1) : [...saved, 1];
                    localStorage.setItem('d5news-saved', JSON.stringify(next));
                    setIsSaved(!isSaved);
                  } catch {}
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors ${isSaved ? 'bg-secondary/10 text-secondary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                aria-label={isSaved ? 'Retirer des favoris' : 'Sauvegarder pour plus tard'}
              >
                <span className={`material-symbols-outlined text-base ${isSaved ? 'filled-icon' : ''}`}>bookmark</span>
                <span className="text-[10px] font-bold hidden sm:inline">{isSaved ? 'Sauvegarde' : 'Sauvegarder'}</span>
              </button>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-5">
            L'essor des technologies vertes en Afrique de l'Ouest
          </h1>

          {/* Article Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold text-sm">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold">Amadou Diallo</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Correspondant Afrique de l'Ouest</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                15 Janvier 2025
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                8 min de lecture
              </span>
            </div>
          </div>

          {/* AI Summary - 3 Key Points */}
          <div className="mb-8 p-5 bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 rounded-2xl border border-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary text-lg" aria-hidden="true">auto_awesome</span>
              <h4 className="text-sm font-bold text-secondary uppercase tracking-wider">Resume IA — 3 points cles</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black flex items-center justify-center mt-0.5">1</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Les investissements dans les technologies vertes ont triple en Afrique de l'Ouest en 5 ans, avec le Senegal, le Ghana et le Nigeria en tete.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black flex items-center justify-center mt-0.5">2</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Plus de 150 000 emplois directs ont ete crees dans le secteur des energies renouvelables ces 3 dernieres annees.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 text-secondary text-[10px] font-black flex items-center justify-center mt-0.5">3</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Les micro-reseaux solaires apportent l'electricite aux communautes rurales longtemps privees d'acces a l'energie.</p>
              </li>
            </ul>
          </div>

          {/* Focus Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${focusMode ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10'}`}
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">{focusMode ? 'visibility_off' : 'visibility'}</span>
              {focusMode ? 'Quitter le mode Focus' : 'Mode Focus'}
            </button>
          </div>

          {/* Article Body */}
          <div className={`article-content text-slate-700 dark:text-slate-300 ${focusMode ? 'max-w-2xl mx-auto text-lg leading-[2]' : ''}`}>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
              L'Afrique de l'Ouest connait une transformation energetique sans precedent. Des startups innovantes aux investissements massifs des gouvernements, la region se positionne comme un futur leader mondial des energies renouvelables.
            </p>

            <h3>Une revolution energetique en marche</h3>
            <p style={{ fontSize: `${fontSize}px` }}>
              Depuis cinq ans, les investissements dans les technologies vertes ont triple en Afrique de l'Ouest. Le Senegal, le Ghana et le Nigeria menent cette transition avec des projets solaires et eoliens d'envergure qui transforment le paysage energetique du continent.
            </p>
            <p style={{ fontSize: `${fontSize}px` }}>
              Les gouvernements de la region ont adopte des politiques ambitieuses pour attirer les investisseurs internationaux. Des zones economiques speciales dediees aux technologies propres ont ete creees, offrant des avantages fiscaux et un cadre reglementaire favorable.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-primary pl-6 py-3 my-8 bg-primary/5 rounded-r-xl">
              <p className="text-base italic font-medium text-slate-600 dark:text-slate-300 !mb-2">
                "L'Afrique de l'Ouest ne se contente plus de suivre les tendances mondiales - elle les definit. Notre potentiel solaire est le plus eleve au monde, et nous allons l'exploiter pleinement."
              </p>
              <cite className="text-sm text-slate-500 dark:text-slate-400 not-italic font-semibold">
                - Dr. Fatima Ndiaye, Directrice de l'Agence Regionale pour les Energies Renouvelables
              </cite>
            </blockquote>

            <h3>L'impact sur l'economie locale</h3>
            <p style={{ fontSize: `${fontSize}px` }}>
              Les retombees economiques sont considerables. Plus de 150 000 emplois directs ont ete crees dans le secteur des energies renouvelables au cours des trois dernieres annees. Les communautes rurales, longtemps privees d'electricite, beneficient desormais d'un acces fiable a l'energie grace aux micro-reseaux solaires.
            </p>

            {/* In-article Ad */}
            <div className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/50 relative not-prose">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-[9px] text-white/60 rounded uppercase tracking-wider z-10">
                Publicite
              </div>
              <a href="#" className="block">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop&q=80"
                  alt="Publicite"
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 bg-gradient-to-r from-[#0a3f8a] to-[#0f58bd]">
                  <p className="text-white font-bold text-sm">AfriTech Solutions - Transformez votre entreprise</p>
                  <p className="text-white/70 text-xs">Decouvrez nos solutions cloud adaptees au marche africain.</p>
                </div>
              </a>
            </div>

            {/* Info Box */}
            <div className="my-8 p-6 bg-primary/10 dark:bg-primary/20 rounded-2xl border border-primary/20">
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">bar_chart</span>
                Chiffres cles
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-extrabold text-primary">3.2 GW</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Capacite solaire installee</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary">150K+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Emplois crees</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary">$4.8B</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Investissements 2024</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: `${fontSize}px` }}>
              Le secteur prive joue egalement un role crucial. Des entreprises locales comme SolarGen Africa et WindPower West se sont imposees comme des acteurs incontournables, rivalisant avec les multinationales sur les appels d'offres regionaux.
            </p>
            <p style={{ fontSize: `${fontSize}px` }}>
              Les experts prevoient que d'ici 2030, l'Afrique de l'Ouest pourrait generer plus de 40% de son electricite a partir de sources renouvelables, contre 12% aujourd'hui. Un objectif ambitieux mais realiste, soutenu par une volonte politique forte et un ecosysteme d'innovation florissant.
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">forum</span>
                Commentaires
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500">(24)</span>
              </h3>
            </div>

            {/* Premium Lock Notice */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center mb-6">
              <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 mb-2">lock</span>
              <h4 className="text-sm font-bold mb-1">Commentaires Premium</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Rejoignez D5News Premium pour participer aux discussions et acceder a tous les commentaires.
              </p>
              <Link
                to="/subscription"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">star</span>
                Devenir Premium
              </Link>
            </div>

            {/* Sample Comments */}
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 font-bold text-xs flex-shrink-0">
                  MK
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">Marie Konate</span>
                    <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">PREMIUM</span>
                    <span className="text-xs text-slate-400">il y a 3h</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Excellent article ! Il est encourageant de voir que l'Afrique de l'Ouest prend les devants sur ces questions essentielles.
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">thumb_up</span> 12
                    </button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">reply</span> Repondre
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 font-bold text-xs flex-shrink-0">
                  OT
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">Ousmane Traore</span>
                    <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">PREMIUM</span>
                    <span className="text-xs text-slate-400">il y a 5h</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Les chiffres sur les emplois crees sont impressionnants. J'aimerais voir une analyse plus detaillee par pays.
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">thumb_up</span> 8
                    </button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-sm">reply</span> Repondre
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
          {/* Related Articles */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Articles Connexes
            </h3>
            <div className="space-y-4">
              <Link to="/article/6" className="flex gap-3 group">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&q=80" alt="Energie verte" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    Le Ghana investit $2B dans les infrastructures solaires
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">12 Jan 2025</p>
                </div>
              </Link>
              <Link to="/article/2" className="flex gap-3 group">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=100&h=100&fit=crop&q=80" alt="Nigeria tech" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    Startups vertes : le Nigeria en pointe
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">10 Jan 2025</p>
                </div>
              </Link>
              <Link to="/article/4" className="flex gap-3 group">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=100&h=100&fit=crop&q=80" alt="COP29 climat" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    COP29 : les engagements de l'Afrique de l'Ouest
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">8 Jan 2025</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Most Read */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Plus lus</h3>
            <div className="space-y-4">
              <Link to="/article/1" className="flex items-start gap-3 group">
                <span className="text-2xl font-extrabold text-primary/30">01</span>
                <div>
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    Elections au Senegal : les enjeux du second tour
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">2.4K vues</p>
                </div>
              </Link>
              <Link to="/article/2" className="flex items-start gap-3 group">
                <span className="text-2xl font-extrabold text-primary/30">02</span>
                <div>
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    La montee de l'intelligence artificielle en Afrique
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">1.8K vues</p>
                </div>
              </Link>
              <Link to="/article/4" className="flex items-start gap-3 group">
                <span className="text-2xl font-extrabold text-primary/30">03</span>
                <div>
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    Reforme economique : impact sur les marches financiers
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">1.5K vues</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-primary rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Newsletter D5News</h3>
            <p className="text-sm text-white/70 mb-5">
              Recevez chaque matin les informations essentielles directement dans votre boite mail.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-xl text-sm placeholder:text-white/50 focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all outline-none"
              />
              <button className="w-full py-3 bg-white text-primary font-bold text-sm rounded-xl hover:bg-white/90 transition-colors">
                S'abonner gratuitement
              </button>
            </div>
            <p className="text-[10px] text-white/50 mt-3">
              En vous inscrivant, vous acceptez notre politique de confidentialite.
            </p>
          </div>
          {/* Impact Dashboard */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-5 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">volunteer_activism</span>
              <h3 className="font-bold text-sm">Votre impact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Articles lus ce mois</span>
                <span className="text-sm font-bold text-primary">12</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '40%' }} />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Votre lecture a soutenu <span className="font-bold text-secondary">3 journalistes locaux</span> ce mois-ci. Merci pour votre engagement !
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="text-center">
                  <p className="text-lg font-black text-primary">247</p>
                  <p className="text-[9px] text-slate-400 uppercase">Articles</p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-lg font-black text-secondary">18h</p>
                  <p className="text-[9px] text-slate-400 uppercase">Lecture</p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-lg font-black text-emerald-500">5</p>
                  <p className="text-[9px] text-slate-400 uppercase">Partages</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
