import { useState } from 'react';

const chatMessages = [
  { id: 1, user: 'Jean_Dupont', color: 'text-primary', time: '19:42', text: "C'est impressionnant cette analyse !", admin: false },
  { id: 2, user: 'Sarah_M', color: 'text-amber-500', time: '19:43', text: "Est-ce que l'invite sera dispo en replay ?", admin: false },
  { id: 3, user: 'Admin_D5', color: 'text-emerald-500', time: '19:44', text: 'Oui @Sarah_M, des demain 8h sur le site !', admin: true },
  { id: 4, user: 'Marc_O', color: 'text-slate-500 dark:text-slate-400', time: '19:45', text: "Superbe qualite d'image ce soir", admin: false },
  { id: 5, user: 'Aminata_K', color: 'text-rose-500', time: '19:46', text: 'Excellente emission, merci D5News !', admin: false },
  { id: 6, user: 'Pierre_L', color: 'text-cyan-500', time: '19:47', text: 'Quel est le sujet du prochain debat ?', admin: false },
];

const schedule = [
  { time: '20:00', title: "Direct : L'Invite du Soir", category: 'Politique & Societe', active: true },
  { time: '21:30', title: 'Documentaire : IA & Futur', category: 'Science', active: false },
  { time: '23:00', title: 'Night Beats (Radio)', category: 'Musique', active: false },
];

export default function Live() {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content: 12-column grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Video & Content (9/12) */}
        <div className="lg:col-span-9 p-4 lg:p-6 space-y-6">
          {/* Live Video Player */}
          <div className="relative group aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=450&fit=crop&q=80"
              alt="Studio de diffusion en direct"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
              <button className="size-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-lg">
                <span className="material-symbols-outlined text-5xl">play_arrow</span>
              </button>
            </div>
            {/* Top left: Live badge & viewers */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">En Direct</span>
              <span className="bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">14.2k Spectateurs</span>
            </div>
            {/* Bottom: Title, controls, progress */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">Le Grand Journal du Soir</h2>
                  <p className="text-slate-300 text-sm">Edition Speciale : Analyse des marches mondiaux</p>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-white cursor-pointer hover:text-primary transition-colors">volume_up</span>
                  <span className="material-symbols-outlined text-white cursor-pointer hover:text-primary transition-colors">subtitles</span>
                  <span className="material-symbols-outlined text-white cursor-pointer hover:text-primary transition-colors">settings</span>
                  <span className="material-symbols-outlined text-white cursor-pointer hover:text-primary transition-colors">fullscreen</span>
                </div>
              </div>
              <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Publicite Leaderboard */}
          <div className="rounded-xl overflow-hidden border border-slate-700/50 relative">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-[9px] text-white/60 rounded uppercase tracking-wider z-10">Publicite</div>
            <a href="#" className="block">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=150&fit=crop&q=80" alt="Publicite - Casque audio" loading="lazy" className="w-full h-24 object-cover" />
              <div className="p-3 bg-violet-600 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">SoundWave Pro</p>
                  <p className="text-white/80 text-xs">Casques premium pour une experience audio immersive. -30%</p>
                </div>
                <span className="text-white/80 text-xs font-bold border border-white/40 rounded-lg px-3 py-1">Decouvrir</span>
              </div>
            </a>
          </div>

          {/* Web Radio & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Web Radio Player */}
            <div className="bg-white/5 dark:bg-slate-900/40 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-1">Web Radio Live</h3>
                  <p className="text-lg font-semibold">Morning Chill &amp; News</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm italic">Par Thomas Durant</p>
                </div>
                <div className="audio-wave">
                  <div className="wave-bar" style={{ height: '12px' }}></div>
                  <div className="wave-bar" style={{ height: '24px' }}></div>
                  <div className="wave-bar" style={{ height: '18px' }}></div>
                  <div className="wave-bar" style={{ height: '28px' }}></div>
                  <div className="wave-bar" style={{ height: '14px' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="size-20 rounded-lg overflow-hidden border border-primary/30 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop&q=80" alt="Radio studio" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <button className="material-symbols-outlined text-slate-400 hover:text-white transition-colors">skip_previous</button>
                    <button className="size-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                      <span className="material-symbols-outlined">pause</span>
                    </button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-white transition-colors">skip_next</button>
                  </div>
                  <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white/5 dark:bg-slate-900/40 rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">A venir aujourd'hui</h3>
                <button className="text-primary text-xs font-bold hover:underline">Tout voir</button>
              </div>
              <div className="space-y-4 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {schedule.map((item, i) => (
                  <div
                    key={i}
                    className={
                      item.active
                        ? 'flex items-center gap-4 border-l-2 border-primary pl-4 bg-primary/5 py-2 rounded-r'
                        : 'flex items-center gap-4 pl-4 py-1'
                    }
                  >
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.time}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${!item.active ? 'text-slate-600 dark:text-slate-300' : ''}`}>{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.category}</p>
                    </div>
                    {!item.active && (
                      <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 group" title="Me rappeler">
                        <span className="material-symbols-outlined text-lg group-active:fill-1">notifications</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Live Chat (3/12) */}
        <aside className="lg:col-span-3 border-l border-slate-200 dark:border-primary/10 bg-slate-50/50 dark:bg-slate-900/20 flex flex-col h-[calc(100vh-64px)] lg:sticky lg:top-16">
          {/* Chat header */}
          <div className="p-4 border-b border-slate-200 dark:border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary text-lg">chat_bubble</span>
              Chat Live
            </h3>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-green-500 rounded-full"></span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">342 Actifs</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold ${msg.color}`}>{msg.user}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600">{msg.time}</span>
                </div>
                <p
                  className={
                    msg.admin
                      ? 'text-sm text-slate-900 dark:text-slate-100 font-medium bg-primary/10 dark:bg-primary/20 p-2 rounded-lg rounded-tl-none border border-primary/20 dark:border-primary/30'
                      : 'text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg rounded-tl-none border border-slate-200 dark:border-slate-700/50'
                  }
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-primary/10">
            <div className="relative">
              <input
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                placeholder="Envoyer un message..."
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="absolute right-2 top-1.5 p-1 text-primary hover:text-primary/70 transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1">
              <div className="flex gap-2">
                <button className="material-symbols-outlined text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-lg">mood</button>
                <button className="material-symbols-outlined text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-lg">gif</button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Veuillez respecter la charte.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer / News Ticker */}
      <footer className="bg-white dark:bg-[#101822] border-t border-slate-200 dark:border-primary/10 py-2 overflow-hidden whitespace-nowrap">
        <div className="flex items-center">
          <div className="bg-primary text-white text-[10px] font-black px-4 py-1 skew-x-[-15deg] mx-4 uppercase tracking-widest flex-shrink-0">FLASH INFO</div>
          <div className="animate-scroll text-sm font-medium text-slate-500 dark:text-slate-400 flex gap-12">
            <span>&#8226; BOURSE : Le CAC 40 progresse de 1.2% en ouverture &#8226;</span>
            <span>&#8226; TECH : D5News lance sa nouvelle application mobile sur iOS et Android &#8226;</span>
            <span>&#8226; METEO : Alerte orange sur le littoral Atlantique ce week-end &#8226;</span>
            <span>&#8226; CULTURE : Exposition inedite au Louvre a partir de demain &#8226;</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
