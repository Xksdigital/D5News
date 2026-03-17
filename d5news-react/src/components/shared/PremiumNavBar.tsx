import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Politique', to: '/category/politique' },
  { label: 'Economie', to: '/category/economie' },
  { label: 'Culture', to: '/category/culture' },
  { label: 'Sport', to: '/category/sport' },
  { label: 'Technologie', to: '/category/technologie' },
  { label: 'Environnement', to: '/category/environnement' },
  { label: 'Sante', to: '/category/sante' },
  { label: 'Podcasts', to: '/podcast' },
];

export default function PremiumNavBar() {
  return (
    <div className="premium-navbar-wrapper">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Navigation principale"
            className="subnav-scroll flex items-center gap-0.5 overflow-x-auto py-2"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `premium-nav-item flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 relative ${
                    isActive
                      ? 'premium-nav-active bg-primary text-white'
                      : 'text-white/75 hover:text-white hover:bg-white/[0.08]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="premium-nav-glow" />}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}

            {/* Separator */}
            <span className="flex-shrink-0 w-px h-5 bg-white/15 mx-1.5" />

            {/* Live - right after Podcasts */}
            <NavLink
              to="/live"
              className={({ isActive }) =>
                `premium-live-btn flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-black tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                    : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30'
                }`
              }
            >
              <span className="premium-live-dot" />
              LIVE
            </NavLink>

            {/* Search */}
            <Link
              to="/search"
              aria-label="Rechercher"
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 ml-1"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
