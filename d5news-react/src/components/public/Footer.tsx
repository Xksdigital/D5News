import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';

const subBrands = [
  { name: 'D5 News',    dot: 'bg-blue-500'   },
  { name: 'D5 Digital', dot: 'bg-emerald-500' },
  { name: 'D5 Music',   dot: 'bg-pink-500'    },
  { name: 'D5 Sports',  dot: 'bg-orange-500'  },
  { name: 'D5 Culture', dot: 'bg-purple-500'  },
];

const navLinks = [
  { label: 'TV en Direct',  to: '/live'      },
  { label: 'Radio',         to: '/radio'     },
  { label: 'Podcasts',      to: '/podcast'   },
  { label: 'Emissions',     to: '/category/emissions' },
  { label: 'Actualites',    to: '/'          },
  { label: 'Meteo',         to: '/category/meteo' },
  { label: 'Diaspora',      to: '/category/diaspora' },
];

const infoLinks = [
  { label: 'A Propos',                    to: '/contact' },
  { label: 'Qui sommes-nous ?',           to: '/contact' },
  { label: 'Nos Partenaires',             to: '/partners' },
  { label: 'Mentions Legales',            to: '/legal'   },
  { label: 'Politique de Confidentialite', to: '/legal'  },
  { label: 'CGU',                         to: '/legal'   },
  { label: 'Publicite & Regie',           to: '/contact' },
];

const legalLinks = [
  { label: 'Confidentialite', to: '/legal' },
  { label: 'CGU',             to: '/legal' },
  { label: 'Cookies',         to: '/legal' },
];

export default function Footer() {
  return (
    <footer>
      {/* ── Sites du Groupe bar ─────────────────────────────────────── */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mr-2 shrink-0">
            Les Sites du Groupe
          </span>
          {subBrands.map((brand) => (
            <a
              key={brand.name}
              href="#"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300 hover:text-secondary hover:border-slate-600 transition-colors"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${brand.dot}`} />
              {brand.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main Footer ─────────────────────────────────────────────── */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Column 1 — Logo & Description */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Logo className="h-8" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                Plateforme d'information digitale pour la diaspora africaine et mondiale.
                TV en direct, radio, podcasts et actualites 24h/24.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 — Navigation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Informations */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                Informations
              </h4>
              <ul className="space-y-2.5">
                {infoLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                Contact
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-base text-slate-500 mt-0.5 shrink-0">location_on</span>
                  Paris, France
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-base text-slate-500 mt-0.5 shrink-0">mail</span>
                  <a href="mailto:contact@d5newstv.com" className="hover:text-secondary transition-colors break-all">
                    contact@d5newstv.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="material-symbols-outlined text-base text-slate-500 mt-0.5 shrink-0">phone</span>
                  <a href="tel:+33123456789" className="hover:text-secondary transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </li>
              </ul>

              {/* Download App */}
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-2">
                Telecharger l'App
              </p>
              <div className="flex gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors">
                  <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-[9px] text-slate-500 leading-none">Disponible sur</div>
                    <div className="text-xs text-slate-200 font-medium leading-tight">App Store</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors">
                  <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.18 23.76c.3.17.64.24.99.18l12.45-7.2-2.67-2.67-10.77 9.69zM.38 1.5C.14 1.83 0 2.28 0 2.85v18.3c0 .57.14 1.02.39 1.35l.07.07 10.25-10.25v-.24L.45 1.43.38 1.5zM20.41 10.38l-2.89-1.67-2.99 2.99 2.99 2.99 2.9-1.68c.83-.48.83-1.26-.01-1.63zM4.17.24L16.62 7.44l-2.67 2.67L3.18.42C3.48.25 3.88.22 4.17.24z"/>
                  </svg>
                  <div>
                    <div className="text-[9px] text-slate-500 leading-none">Disponible sur</div>
                    <div className="text-xs text-slate-200 font-medium leading-tight">Google Play</div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-2">
                Newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 min-w-0 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-l-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                />
                <button className="px-4 py-2 bg-secondary text-slate-900 text-sm font-bold rounded-r-lg hover:bg-secondary-light transition-colors shrink-0">
                  OK
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              &copy; 2025 D5News Media Group. Tous droits reserves.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  {i > 0 && <span className="text-slate-700 select-none">&bull;</span>}
                  <Link
                    to={link.to}
                    className="text-xs text-slate-500 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
