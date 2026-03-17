import { Link } from 'react-router-dom';
import Carousel from '../../components/shared/Carousel';
import ArticleCard from '../../components/shared/ArticleCard';
import type { ArticleCardData } from '../../components/shared/ArticleCard';

/* ==============================
   DATA
   ============================== */

const politiqueArticles: ArticleCardData[] = [
  { id: 101, title: 'Decentralisation : Le pouvoir local, remede aux crises de gouvernance ?', excerpt: 'Face aux defis de gouvernance, la decentralisation s\'impose comme une solution pour renforcer la democratie locale.', image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=250&fit=crop&q=80', category: 'Politique', categoryColor: 'bg-amber-500/10 text-amber-400', date: 'Il y a 5h', views: 6, likes: 0 },
  { id: 102, title: 'Diasporas africaines : Un poids politique et electoral de plus en plus influent', excerpt: 'Les communautes africaines de l\'etranger jouent un role croissant dans les elections de leurs pays d\'origine.', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop&q=80', category: 'Politique', categoryColor: 'bg-amber-500/10 text-amber-400', date: 'Il y a 8h', views: 2, likes: 0 },
  { id: 103, title: 'CEDEAO : Entre crises politiques et defis d\'integration, l\'organisation a la croisee des chemins', excerpt: 'L\'avenir de la CEDEAO se joue dans sa capacite a s\'adapter aux nouvelles realites geopolitiques du continent.', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&h=250&fit=crop&q=80', category: 'Politique', categoryColor: 'bg-amber-500/10 text-amber-400', date: 'Il y a 12h', views: 0, likes: 0 },
  { id: 104, title: 'Union Africaine : vers une monnaie unique pour le continent ?', excerpt: 'Le projet de monnaie unique refait surface avec de nouveaux soutiens economiques.', image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=250&fit=crop&q=80', category: 'Politique', categoryColor: 'bg-amber-500/10 text-amber-400', date: 'Hier', views: 3, likes: 1 },
];

const economieArticles: ArticleCardData[] = [
  { id: 201, title: 'Agriculture durable : le Ghana mise sur l\'agritech pour nourrir le continent', excerpt: 'L\'agritech ghaneen attire les investisseurs avec des solutions innovantes pour l\'agriculture durable.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop&q=80', category: 'Economie', categoryColor: 'bg-emerald-500/10 text-emerald-400', date: 'Il y a 3h', views: 11, likes: 0 },
  { id: 202, title: 'BRVM : Les valeurs technologiques tirent le marche vers le haut', excerpt: 'Le marche boursier regional enregistre une hausse portee par les valeurs tech.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&q=80', category: 'Economie', categoryColor: 'bg-emerald-500/10 text-emerald-400', date: 'Il y a 6h', views: 5, likes: 2 },
  { id: 203, title: 'Dette souveraine : L\'Afrique face au mur des remboursements', excerpt: 'Les pays africains cherchent des solutions innovantes face au poids croissant de la dette.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=80', category: 'Economie', categoryColor: 'bg-emerald-500/10 text-emerald-400', date: 'Il y a 10h', views: 3, likes: 0 },
];

const societeArticles: ArticleCardData[] = [
  { id: 301, title: 'Sante numerique : le Rwanda pionnier de la telemedecine en Afrique', excerpt: 'Le modele rwandais de telemedecine dessert plus de 3 millions de patients en zones rurales.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop&q=80', category: 'Societe', categoryColor: 'bg-rose-500/10 text-rose-400', date: 'Il y a 4h', views: 3, likes: 1 },
  { id: 302, title: 'Grande muraille verte : le Sahel reprend vie grace au reboisement', excerpt: 'Le projet panafricain de reforestation franchit une etape symbolique.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop&q=80', category: 'Societe', categoryColor: 'bg-rose-500/10 text-rose-400', date: 'Il y a 9h', views: 1, likes: 1 },
  { id: 303, title: 'Jeunes voix du Sahel : une nouvelle generation s\'exprime', excerpt: 'La jeunesse sahelienne prend la parole sur les enjeux qui la concerne.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop&q=80', category: 'Societe', categoryColor: 'bg-rose-500/10 text-rose-400', date: 'Hier', views: 0, likes: 0 },
];

const sportArticles: ArticleCardData[] = [
  { id: 401, title: 'Plongee dans la fabrique des champions kenyans', excerpt: 'Comment le Kenya forme ses athletes d\'elite dans les hauts plateaux de la Rift Valley.', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop&q=80', category: 'Sport', categoryColor: 'bg-sky-500/10 text-sky-400', date: 'Il y a 2h', views: 5, likes: 1 },
  { id: 402, title: 'Le dilemme du maillot, un choix du coeur et de la raison', excerpt: 'Entre selection nationale et clubs europeens, les joueurs africains font face a un dilemme.', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop&q=80', category: 'Sport', categoryColor: 'bg-sky-500/10 text-sky-400', date: 'Il y a 6h', views: 2, likes: 0 },
  { id: 403, title: 'Championnats locaux : Le difficile combat pour retenir les talents', excerpt: 'Les championnats africains peinent a garder leurs meilleurs joueurs face a l\'attrait europeen.', image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=250&fit=crop&q=80', category: 'Sport', categoryColor: 'bg-sky-500/10 text-sky-400', date: 'Il y a 10h', views: 1, likes: 0 },
];

const cultureArticles = [
  { id: 501, title: 'Patrimoine immateriel : La course pour sauver les langues et les traditions orales', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop&q=80' },
  { id: 502, title: 'Art contemporain : Le marche africain en pleine ebullition', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop&q=80' },
  { id: 503, title: 'Amapiano : Comment un son sud-africain est devenu mondial', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&q=80' },
];

const tendances = [
  { title: 'Le franc CFA bientot remplace ? Les dessous du projet Eco', reads: '3.2k lectures' },
  { title: 'Nouvelle usine Tesla a Casablanca : ce que l\'on sait', reads: '2.8k lectures' },
  { title: 'Les 10 villes africaines les plus connectees en 2025', reads: '2.1k lectures' },
  { title: 'CAN 2025 : le calendrier complet des quarts de finale', reads: '1.9k lectures' },
  { title: 'Telemedecine : la revolution silencieuse des campagnes', reads: '1.5k lectures' },
];

/* NEW DATA */

const tendancesBar = [
  { num: '01', title: 'Sommet de l\'Union Africaine : les decisions cles pour 2026', views: '4.5k', comments: 38 },
  { num: '02', title: 'Le boom des fintechs africaines : 3 milliards leves en 2025', views: '3.2k', comments: 24 },
  { num: '03', title: 'CAN 2026 : le Maroc devoile ses stades ultramodernes', views: '2.9k', comments: 15 },
  { num: '04', title: 'Diaspora : le nouveau programme de retour au pays du Senegal', views: '1.9k', comments: 42 },
  { num: '05', title: 'Intelligence artificielle : l\'Afrique forme ses talents de demain', views: '5.1k', comments: 67 },
  { num: '06', title: 'Festival panafricain du cinema a Ouagadougou', views: '3.8k', comments: 29 },
];

const meteoVilles = [
  { ville: 'Paris', pays: 'France', temp: 8, icon: 'cloud', condition: 'Nuageux', tz: 'CET' },
  { ville: 'Kinshasa', pays: 'RDC', temp: 31, icon: 'sunny', condition: 'Ensoleille', tz: 'WAT' },
  { ville: 'Dakar', pays: 'Senegal', temp: 27, icon: 'sunny', condition: 'Ensoleille', tz: 'GMT' },
  { ville: 'Bruxelles', pays: 'Belgique', temp: 6, icon: 'rainy', condition: 'Pluie', tz: 'CET' },
  { ville: 'Montreal', pays: 'Canada', temp: -5, icon: 'ac_unit', condition: 'Neige', tz: 'EST' },
  { ville: 'Abidjan', pays: 'Cote d\'Ivoire', temp: 30, icon: 'partly_cloudy_day', condition: 'Partiellement nuageux', tz: 'GMT' },
];

const tauxChange = [
  { devise: 'EUR/XOF', taux: '655.96', variation: '+0.00%', stable: true },
  { devise: 'USD/XOF', taux: '605.42', variation: '-0.12%', down: true },
  { devise: 'GBP/XOF', taux: '764.30', variation: '+0.25%', down: false },
  { devise: 'EUR/XAF', taux: '655.96', variation: '+0.00%', stable: true },
  { devise: 'USD/NGN', taux: '1,580.00', variation: '+1.2%', down: false },
  { devise: 'EUR/MAD', taux: '10.85', variation: '-0.08%', down: true },
];

const diasporaHashtags = [
  '#DiasporaAfricaine', '#AfriqueEnDirect', '#RetourAuPays',
  '#InvestirEnAfrique', '#CultureAfricaine', '#TechAfrique',
  '#PanAfricanisme', '#AfriqueAvenir',
];

/* ==============================
   CATEGORY SECTION COMPONENT
   ============================== */

function CategorySection({ title, articles }: { title: string; articles: ArticleCardData[] }) {
  const carouselName = title.toLowerCase().replace(/[^a-z]/g, '');

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
          <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/category/${carouselName}`} className="ml-2 px-4 py-1.5 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-lg hover:border-primary hover:text-primary transition-colors">
            VOIR PLUS
          </Link>
        </div>
      </div>
      <Carousel
        name={carouselName}
        items={articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      />
    </section>
  );
}

/* ==============================
   HOME PAGE
   ============================== */

export default function Home() {
  return (
    <>
      {/* ── HERO SECTION — Newsroom Style ── */}
      <section className="relative min-h-[520px] md:min-h-[580px] flex flex-col justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&h=900&fit=crop&q=80"
            alt="Newsroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/30"></div>
          {/* Scrolling breaking news text overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none select-none">
            <p className="absolute top-[10%] left-0 whitespace-nowrap text-white text-6xl font-black tracking-wider animate-ticker-slow">
              BREAKING NEWS: GLOBAL SUMMIT &nbsp;&nbsp; BREAKING NEWS: GLOBAL SUMMIT &nbsp;&nbsp; BREAKING NEWS: GLOBAL SUMMIT &nbsp;&nbsp; BREAKING NEWS: GLOBAL SUMMIT
            </p>
            <p className="absolute top-[35%] right-0 whitespace-nowrap text-white text-4xl font-black tracking-wider animate-ticker-reverse">
              MARKET CRASH &nbsp;&nbsp; BREAKING NEWS &nbsp;&nbsp; MARKET CRASH &nbsp;&nbsp; BREAKING NEWS &nbsp;&nbsp; MARKET CRASH &nbsp;&nbsp; BREAKING NEWS
            </p>
            <p className="absolute top-[60%] left-0 whitespace-nowrap text-white text-5xl font-black tracking-wider animate-ticker-slow">
              BREAKING NEWS: GLOBAL SUMMIT &nbsp;&nbsp; BREAKING NEWS: GLOBAL SUMMIT &nbsp;&nbsp; BREAKING NEWS: GLOBAL SUMMIT
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 md:px-20 lg:px-40 pb-0 pt-20">
          <div className="max-w-7xl mx-auto">
            {/* EN DIRECT Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded text-white text-xs font-black uppercase tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
                En Direct
              </span>
              <span className="text-sm text-slate-400">15:39 GMT+1</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-5 max-w-2xl">
              L'Information<br />
              <span className="text-red-500">Reinventee</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              TV en direct, radio, podcasts et actualites pour la diaspora africaine et mondiale.
              Restez connecte a l'essentiel, partout, tout le temps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                to="/live"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-black rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                REGARDER LE DIRECT
              </Link>
              <Link
                to="/radio"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white text-sm font-black rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-lg">cell_tower</span>
                ECOUTER LA RADIO
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-[#0a1628]/80 backdrop-blur-md border-t border-white/10">
          <div className="px-6 md:px-20 lg:px-40">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
              {[
                { icon: 'live_tv', label: 'TV 24/7', value: 'En Direct' },
                { icon: 'radio', label: 'RADIO', value: 'FM & Web' },
                { icon: 'podcasts', label: 'PODCASTS', value: '50+ Episodes' },
                { icon: 'public', label: 'COUVERTURE', value: '5 Continents' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-5 py-4 ${i < 3 ? 'border-r border-white/10' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/10' : i === 2 ? 'border-b md:border-b-0 border-white/10 border-r-0 md:border-r' : ''}`}
                >
                  <span className="material-symbols-outlined text-primary text-xl">{stat.icon}</span>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</p>
                    <p className="text-sm text-white font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TENDANCES HORIZONTALES ── */}
      <section className="px-6 md:px-20 lg:px-40 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#F6AD55]">trending_up</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#F6AD55]">Tendances</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {tendancesBar.map((t, i) => (
                <Link
                  key={i}
                  to="/article/1"
                  className="flex-shrink-0 flex items-start gap-3 group w-52 md:flex-1 md:w-auto md:min-w-0 border-r border-slate-200 dark:border-slate-700 last:border-r-0 pr-4 last:pr-0"
                >
                  <span className="text-3xl font-black leading-none text-[#1A365D]/20 dark:text-white/10 flex-shrink-0">{t.num}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-snug group-hover:text-[#1A365D] dark:group-hover:text-[#F6AD55] transition-colors line-clamp-2">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">visibility</span>
                        {t.views}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">comment</span>
                        {t.comments}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="flex-1 px-6 md:px-20 lg:px-40 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Category Sections Column */}
          <div className="xl:col-span-9 space-y-10">
            {/* POLITIQUE */}
            <CategorySection title="Politique" articles={politiqueArticles} />

            {/* ECONOMIE */}
            <CategorySection title="Economie" articles={economieArticles} />

            {/* Banniere Promo 1 */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-[#1565c0] to-[#0a3f8a] py-10 px-8 md:px-12 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full"></div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                  <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="D5News" loading="lazy" className="h-14 md:h-16" />
                  <div>
                    <p className="text-white font-extrabold text-xl md:text-2xl">Divertissement, actualite, series :</p>
                    <p className="text-white/70 text-sm md:text-base mt-1">tout ce que vous aimez, en un seul clic !</p>
                  </div>
                </div>
                <Link to="/subscription" className="px-8 py-3.5 bg-white text-primary font-bold text-base rounded-xl hover:bg-white/90 hover:scale-105 transition-all flex-shrink-0 shadow-lg">
                  Decouvrir
                </Link>
              </div>
            </div>

            {/* SOCIETE */}
            <CategorySection title="Societe" articles={societeArticles} />

            {/* SPORT */}
            <CategorySection title="Sport" articles={sportArticles} />

            {/* ── METEO MULTI-VILLES DIASPORA ── */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-8 bg-[#F6AD55] rounded-full"></div>
                <h2 className="text-xl font-black uppercase tracking-tight">Meteo Diaspora</h2>
                <span className="ml-auto text-xs text-slate-400">6 villes du monde</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {meteoVilles.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center text-center hover:border-[#F6AD55]/50 hover:shadow-md transition-all"
                  >
                    <span className="material-symbols-outlined text-3xl text-[#F6AD55] mb-2">{m.icon}</span>
                    <p className="text-3xl font-black text-[#1A365D] dark:text-white leading-none">
                      {m.temp}&deg;
                    </p>
                    <p className="text-sm font-bold mt-1">{m.ville}</p>
                    <p className="text-[10px] text-slate-400">{m.pays}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">{m.condition}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 font-mono">{m.tz}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Banniere Promo 2 */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-[#1565c0] to-[#0a3f8a] py-10 px-8 md:px-12 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full"></div>
              </div>
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                  <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="D5News" loading="lazy" className="h-14 md:h-16" />
                  <div>
                    <p className="text-white font-extrabold text-xl md:text-2xl">D5News Premium - Sans publicite</p>
                    <p className="text-white/70 text-sm md:text-base mt-1">Acces illimite a tout le contenu, newsletters exclusives.</p>
                  </div>
                </div>
                <Link to="/subscription" className="px-8 py-3.5 bg-white text-primary font-bold text-base rounded-xl hover:bg-white/90 hover:scale-105 transition-all flex-shrink-0 shadow-lg">
                  4.99&euro;/mois
                </Link>
              </div>
            </div>

            {/* CULTURE */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Culture</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/category/culture" className="ml-2 px-4 py-1.5 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-lg hover:border-primary hover:text-primary transition-colors">
                    VOIR PLUS
                  </Link>
                </div>
              </div>
              <Carousel
                name="culture"
                items={cultureArticles.map((a) => (
                  <Link
                    key={a.id}
                    to={`/article/${a.id}`}
                    className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={a.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white leading-snug group-hover:text-primary transition-colors">{a.title}</h3>
                      </div>
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">article</span>
                      </span>
                    </div>
                  </Link>
                ))}
              />
            </section>

            {/* EMISSIONS */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Emissions</h2>
                </div>
                <Link to="/live" className="px-4 py-1.5 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-lg hover:border-primary hover:text-primary transition-colors">
                  VOIR PLUS
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'Le Meilleur du Cinema Africain', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&h=280&fit=crop&q=80', link: '/live' },
                  { title: "Enquetes & Realites d'Afrique", image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&h=280&fit=crop&q=80', link: '/live' },
                  { title: 'Debat du Jour', image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500&h=280&fit=crop&q=80', link: '/podcast' },
                ].map((em, i) => (
                  <Link key={i} to={em.link} className="group block rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={em.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-white text-2xl">play_arrow</span>
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 w-7 h-7 rounded bg-black/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">tv</span>
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">{em.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="xl:col-span-3 space-y-6">
            {/* A la une */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-sm uppercase bg-red-500 text-white px-3 py-1 rounded">A la une</h3>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Intelligence artificielle : comment les startups africaines rivalisent', date: '16 Octobre 2025', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=60&fit=crop&q=80', id: 2 },
                  { title: "L'essor des technologies vertes en Afrique de l'Ouest", date: '15 Octobre 2025', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=80&h=60&fit=crop&q=80', id: 6 },
                  { title: "CAN 2025 : la Cote d'Ivoire confirme son statut de favori", date: '14 Octobre 2025', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=60&fit=crop&q=80', id: 3 },
                ].map((item) => (
                  <Link key={item.id} to={`/article/${item.id}`} className="flex gap-3 group">
                    <img src={item.image} alt="" loading="lazy" className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tendances */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                <h3 className="font-bold">Tendances</h3>
              </div>
              <div className="space-y-4">
                {tendances.map((t, i) => (
                  <Link key={i} to="/article/1" className="flex gap-3 group">
                    <span className="text-3xl font-black text-primary/20">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">{t.title}</p>
                      <span className="text-[10px] text-slate-400 mt-1">{t.reads}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Live Radio Widget */}
            <div className="bg-gradient-to-br from-primary/10 to-slate-900 dark:from-primary/20 dark:to-slate-900 rounded-xl border border-primary/20 p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">En direct</span>
                </div>
                <Link to="/live" className="text-xs text-primary font-bold hover:underline">Voir le studio</Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">radio</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Morning Chill &amp; News</p>
                  <p className="text-xs text-slate-400 truncate">Par Thomas Durant</p>
                </div>
                <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-primary/80 transition-colors">
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">headphones</span>
                <span>1.2k auditeurs</span>
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/50 relative">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-[9px] text-white/60 rounded uppercase tracking-wider z-10">Publicite</div>
              <a href="#" className="block">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&q=80" alt="" loading="lazy" className="w-full h-48 object-cover" />
                <div className="p-3 bg-amber-600">
                  <p className="text-white font-bold text-sm">MobiPay Africa</p>
                  <p className="text-white/80 text-xs">Paiements mobiles securises.</p>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </main>

      {/* ── TAUX DE CHANGE ── */}
      <section className="px-6 md:px-20 lg:px-40 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-emerald-500">currency_exchange</span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Taux de Change</span>
              <span className="ml-auto text-[10px] text-slate-400">Mis a jour il y a 15 min</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {tauxChange.map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.devise}</p>
                  <p className="text-lg font-black text-[#1A365D] dark:text-white">{t.taux}</p>
                  <p className={`text-[10px] font-bold mt-0.5 ${t.stable ? 'text-slate-400' : t.down ? 'text-red-500' : 'text-emerald-500'}`}>
                    {t.stable ? '=' : t.down ? '↓' : '↑'} {t.variation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESPACE DIASPORA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=600&fit=crop&q=80"
            alt="Communaute diaspora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A365D]/85"></div>
        </div>
        <div className="relative px-6 md:px-20 lg:px-40 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-block px-3 py-1 bg-[#F6AD55] text-[#1A365D] text-[10px] font-black rounded uppercase tracking-widest mb-4">
                  Communaute
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                  Espace Diaspora
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Rejoignez la plus grande communaute d'Africains de la diaspora. Restez connecte a l'Afrique, partagez vos experiences et participez aux evenements qui rassemblent notre communaute.
                </p>
                {/* Hashtag Filters */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                  {diasporaHashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white/80 text-xs font-semibold hover:bg-[#F6AD55]/20 hover:border-[#F6AD55]/40 hover:text-[#F6AD55] transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-8 mt-8 justify-center lg:justify-start">
                  {[
                    { icon: 'group', stat: '50K+', label: 'Membres' },
                    { icon: 'public', stat: '45', label: 'Pays' },
                    { icon: 'trending_up', stat: '200+', label: 'Evenements/an' },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[#F6AD55] text-xl">{s.icon}</span>
                        <span className="text-3xl font-black text-white">{s.stat}</span>
                      </div>
                      <span className="text-xs text-white/60 uppercase tracking-wider">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F6AD55] text-[#1A365D] font-black text-sm rounded-xl hover:bg-[#F6AD55]/90 hover:scale-105 transition-all shadow-xl"
                >
                  REJOINDRE LA COMMUNAUTE
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER PLEINE LARGEUR ── */}
      <section className="bg-gradient-to-r from-[#1A365D] via-[#2a4a7f] to-[#1A365D] px-6 md:px-20 lg:px-40 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white">Restez Informe</h2>
              <p className="text-white/70 text-sm md:text-base mt-1">
                Recevez chaque matin les actualites africaines les plus importantes directement dans votre boite mail.
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0 flex items-stretch gap-3 md:min-w-[420px]">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 min-w-0 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:ring-white/30 focus:border-white/30 outline-none"
              />
              <button className="px-6 py-3 bg-[#F6AD55] text-[#1A365D] font-black text-sm rounded-xl hover:bg-[#F6AD55]/90 transition-colors flex-shrink-0 whitespace-nowrap">
                S'ABONNER
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
