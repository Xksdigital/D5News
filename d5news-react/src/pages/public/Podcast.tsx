import { useState } from 'react';

const filters = ['Tous', 'Actualite', 'Culture', 'Sport', 'Economie', 'Debat'];

const podcastSeries = [
  { id: 1, title: 'Echoes of Science', desc: "L'actualite scientifique decryptee en 15 minutes chrono.", episodes: 24, image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&h=300&fit=crop&q=80' },
  { id: 2, title: 'Cultures & Mondes', desc: 'Histoires et traditions des quatre coins de la planete.', episodes: 18, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&q=80' },
  { id: 3, title: 'Le Talk Politique', desc: "Les debats qui agitent l'hemicycle et la societe.", episodes: 32, image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&h=300&fit=crop&q=80' },
  { id: 4, title: 'Stade Numerique', desc: "L'innovation au service de la performance sportive.", episodes: 15, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop&q=80' },
];

const episodes = [
  { id: 1, series: 'Echoes of Science', ep: 24, title: 'Le Grand Decryptage : Les enjeux de demain', duration: '35:45', date: 'Hier', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=100&h=100&fit=crop&q=80', playing: true },
  { id: 2, series: 'Cultures & Mondes', ep: 18, title: "Traditions orales : quand l'Afrique raconte le monde", duration: '42:10', date: 'Il y a 2j', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop&q=80', playing: false },
  { id: 3, series: 'Le Talk Politique', ep: 32, title: 'Presidentielle 2025 : les candidats face aux enjeux climatiques', duration: '28:30', date: 'Il y a 3j', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=100&h=100&fit=crop&q=80', playing: false },
  { id: 4, series: 'Stade Numerique', ep: 15, title: 'CAN 2025 : la data au service des selectioneurs africains', duration: '19:55', date: 'Il y a 4j', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop&q=80', playing: false },
];

const videoCards = [
  { id: 1, title: 'Le Journal des Entreprises : Special Tech', category: 'Economie', duration: '24:15', date: 'Diffuse hier a 20h00', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop&q=80', live: false },
  { id: 2, title: "Immersion : La jeunesse et l'engagement", category: 'Societe', duration: '52:40', date: 'Diffuse le 12 Oct.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop&q=80', live: false },
  { id: 3, title: 'Debrief Hebdo : Le week-end de Ligue 1', category: 'Sport', duration: '18:05', date: 'Direct a 18h30', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop&q=80', live: true },
];

export default function Podcast() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 lg:px-20 py-8 space-y-12 pb-32">
        {/* Hero Header */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Podcasts &amp; Emissions</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium">
                L'essentiel de l'info et de la culture a ecouter et regarder ou vous voulez.
              </p>
            </div>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 py-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={
                  f === activeFilter
                    ? 'px-5 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20'
                    : 'px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors'
                }
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section>
          <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            A la une
          </h3>
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9] group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&h=400&fit=crop&q=80" alt="Studio podcast" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4 max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-md bg-primary text-white text-xs font-bold uppercase tracking-wider">Serie Exclusive</span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Le Grand Decryptage : Les enjeux de demain</h2>
              <p className="text-slate-200 text-lg hidden md:block">Un voyage sonore au coeur des transformations technologiques avec nos experts invites.</p>
              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-xl">
                  <span className="material-symbols-outlined filled-icon">play_arrow</span> Ecouter le dernier episode
                </button>
                <button className="p-3 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Series Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Series de Podcasts
            </h3>
            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
              Tout voir <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {podcastSeries.map((podcast) => (
              <div key={podcast.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl mb-3 shadow-lg">
                  <img src={podcast.image} alt={podcast.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="bg-primary p-3 rounded-full text-white shadow-2xl">
                      <span className="material-symbols-outlined filled-icon text-3xl">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md">
                    <span className="material-symbols-outlined text-primary text-xs">headphones</span>
                    <span className="text-[10px] text-white font-bold">{podcast.episodes} episodes</span>
                  </div>
                </div>
                <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-1">{podcast.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mt-1">{podcast.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Episodes recents */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Derniers episodes
            </h3>
            <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
              Tout voir <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="space-y-3">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className={
                  ep.playing
                    ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-5'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-5 hover:border-primary/30 transition-all group cursor-pointer'
                }
              >
                <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                  <img src={ep.image} alt={ep.series} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{ep.series}</span>
                    <span className="text-[10px] text-slate-400">&#x2022; Ep. {ep.ep}</span>
                  </div>
                  <h4 className={`font-bold text-sm leading-snug line-clamp-1 ${!ep.playing ? 'group-hover:text-primary transition-colors' : ''}`}>
                    {ep.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{ep.duration}</span>
                    <span className="text-xs text-slate-400">&#x2022; {ep.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {ep.playing && (
                    <div className="wave-eq">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                  )}
                  <button
                    className={
                      ep.playing
                        ? 'w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 flex-shrink-0'
                        : 'w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all flex-shrink-0'
                    }
                  >
                    <span className="material-symbols-outlined{ep.playing ? ' filled-icon' : ''}">
                      {ep.playing ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emissions & Replays */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Emissions &amp; Replays
            </h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoCards.map((v) => (
              <div key={v.id} className="space-y-3 group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                  <img src={v.image} alt={v.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded">{v.duration}</div>
                  {v.live && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded-md">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                      <span className="text-[10px] text-white font-bold uppercase">Direct a 18h30</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-2xl">
                      <span className="material-symbols-outlined filled-icon text-2xl">play_arrow</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-primary text-xs font-bold uppercase">{v.category}</span>
                  <h4 className="font-bold text-lg leading-tight mt-1 group-hover:text-primary transition-colors">{v.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{v.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publicite SoundWave Pro */}
        <div className="rounded-2xl overflow-hidden border border-slate-700/50 relative max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-[10px] text-white/70 rounded-md uppercase tracking-wider z-10 font-medium">Publicite</div>
          <a href="#" className="block group">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop&q=80" alt="Publicite - Casque audio" loading="lazy" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-5 md:p-6 bg-gradient-to-r from-violet-600 to-violet-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white font-extrabold text-lg md:text-xl">SoundWave Pro</p>
                  <p className="text-white/80 text-sm mt-1">Casques premium pour une experience audio immersive.</p>
                </div>
                <span className="px-5 py-2.5 bg-white text-violet-700 font-bold text-sm rounded-xl hover:bg-white/90 transition-colors flex-shrink-0 shadow-md">-30% Decouvrir</span>
              </div>
            </div>
          </a>
        </div>
      </main>

      {/* Audio Player (Fixed Bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4">
        <div className="max-w-[1000px] mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-4 flex items-center gap-6">
          {/* Track Info */}
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=100&h=100&fit=crop&q=80" alt="Echoes of Science" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h5 className="text-sm font-bold line-clamp-1">Le Grand Decryptage</h5>
              <p className="text-xs text-slate-500 line-clamp-1">Les enjeux de demain</p>
            </div>
          </div>
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-1 items-center">
            <div className="flex items-center gap-6">
              <button className="text-slate-500 hover:text-primary transition-colors hidden sm:block">
                <span className="material-symbols-outlined text-xl">shuffle</span>
              </button>
              <button className="text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                <span className="material-symbols-outlined filled-icon">skip_previous</span>
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined filled-icon text-2xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>
              <button className="text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                <span className="material-symbols-outlined filled-icon">skip_next</span>
              </button>
              <button className="text-slate-500 hover:text-primary transition-colors hidden sm:block">
                <span className="material-symbols-outlined text-xl">repeat</span>
              </button>
            </div>
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] text-slate-500 font-medium">12:30</span>
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative group">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">35:45</span>
            </div>
          </div>
          {/* Volume */}
          <div className="hidden md:flex items-center gap-4 min-w-[150px] justify-end">
            <button className="text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">playlist_play</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-500 text-lg">volume_up</span>
              <div className="w-20 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-slate-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
