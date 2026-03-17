import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const scheduleData = [
  {
    time: '08:00 AM',
    monday: { name: 'Early Bird News', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    tuesday: { name: 'Early Bird News', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    wednesday: { name: 'Le Cafe Politique', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  },
  {
    time: '10:00 AM',
    monday: { name: 'Jazz Mornings', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
    tuesday: { name: 'Le Cafe Politique', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
    wednesday: { name: 'Jazz Mornings', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
  },
];

interface MediaFile {
  id: number;
  name: string;
  duration: string;
  type: string;
  size: string;
}

const initialMediaFiles: MediaFile[] = [
  { id: 1, name: 'D5News_Morning_Jingle_v2.mp3', duration: '0:15', type: 'Jingles', size: '12.4 MB' },
  { id: 2, name: 'Breaking_News_Intro_Orchestral.wav', duration: '0:08', type: 'News Bumpers', size: '4.2 MB' },
  { id: 3, name: 'Ad_Space_Automotive_Client_30s.mp3', duration: '0:30', type: 'Commercials', size: '1.5 MB' },
  { id: 4, name: 'Station_ID_Top_Of_Hour_FR.mp3', duration: '0:12', type: 'Station IDs', size: '2.8 MB' },
];

const mediaTabs = ['All Files', 'Jingles', 'Advertisements', 'Auto-Playlists'];

const bottomStats = [
  { icon: 'folder', label: 'Library Size', value: '142.8 GB', iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-primary' },
  { icon: 'cloud_upload', label: 'Bandwidth Used', value: '1.2 TB/mo', iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { icon: 'timer', label: 'Station Uptime', value: '99.98%', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: 'backup', label: 'Auto-Backup', value: 'Enabled', iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
];

export default function Radio() {
  const { show } = useToast();
  const [activeMediaTab, setActiveMediaTab] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playingFileId, setPlayingFileId] = useState<number | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMediaFiles);

  const handleToggleStream = () => {
    setIsStreaming((prev) => !prev);
    show(isStreaming ? 'Stream arrete' : 'Stream demarre', isStreaming ? 'error' : 'success');
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePlayFile = (id: number) => {
    setPlayingFileId(playingFileId === id ? null : id);
    const file = mediaFiles.find((f) => f.id === id);
    if (playingFileId !== id) {
      show(`Lecture: ${file?.name}`, 'info');
    }
  };

  const handleDeleteFile = (id: number) => {
    const file = mediaFiles.find((f) => f.id === id);
    setMediaFiles((prev) => prev.filter((f) => f.id !== id));
    show(`"${file?.name}" supprime`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Web Radio</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerez les flux en direct, la programmation et la mediatheque.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => show('Historique des diffusions (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
            <MaterialIcon name="history" className="text-lg" />
            Historique
          </button>
          <button onClick={() => show('Nouveau programme (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <MaterialIcon name="add" className="text-lg" />
            Nouveau Programme
          </button>
        </div>
      </div>

      {/* Top Section: Live Stream Status + Now Playing */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 stagger-children">
        {/* Live Stream Status */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                {isStreaming ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-slate-400"></span>
                )}
              </span>
              <div>
                <h3 className="font-bold text-lg">Live Stream Status</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isStreaming ? 'Streaming active on EN and FR channels' : 'Stream hors ligne'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleToggleStream} className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                isStreaming
                  ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  : 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
              }`}>
                <MaterialIcon name={isStreaming ? 'stop_circle' : 'play_circle'} className="text-lg" />
                {isStreaming ? 'Stop Stream' : 'Start Stream'}
              </button>
              <button onClick={() => show('Configuration encodeur (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
                <MaterialIcon name="settings" className="text-lg" />
                Configure Encoder
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Listeners</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">{isStreaming ? '1,248' : '0'}</p>
                {isStreaming && <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full mb-1">+12%</span>}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Peak Listeners (Today)</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">3,892</p>
                <span className="text-xs text-slate-500 mb-1">at 14:32</span>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Session Duration</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">42m</p>
                <span className="text-xs text-emerald-500 font-semibold mb-1">High Retention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Now Playing */}
        <div className="xl:col-span-2 bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-900/20 pointer-events-none"></div>
          <div className="relative p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                {isPlaying ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500"></span>
                )}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">{isPlaying ? 'Now Playing' : 'Paused'}</span>
            </div>
            <div className="flex gap-4 flex-1">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex-shrink-0 flex items-center justify-center">
                <MaterialIcon name="radio" className="text-white/80 text-3xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-sm truncate">Morning News Report - Daily Deep Dive</h4>
                <p className="text-slate-400 text-xs mt-1">Jean-Pierre - 128kbps AAC</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: isPlaying ? '65%' : '65%' }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-slate-400 font-medium">12:45</span>
                <span className="text-[11px] text-slate-400 font-medium">18:30</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <button onClick={() => show('Piste precedente', 'info')} className="text-slate-400 hover:text-white transition-colors">
                <MaterialIcon name="skip_previous" className="text-2xl" />
              </button>
              <button onClick={handleTogglePlay} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                <MaterialIcon name={isPlaying ? 'pause' : 'play_arrow'} className="text-slate-900 text-2xl" filled />
              </button>
              <button onClick={() => show('Piste suivante', 'info')} className="text-slate-400 hover:text-white transition-colors">
                <MaterialIcon name="skip_next" className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Schedule + Media Library */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Weekly Schedule</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Programming overview for the week</p>
            </div>
            <button onClick={() => show('Editeur de grille (bientot disponible)', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <MaterialIcon name="edit_calendar" className="text-base" />
              Edit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monday</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tuesday</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wednesday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scheduleData.map((row) => (
                  <tr key={row.time} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">{row.time}</td>
                    {[row.monday, row.tuesday, row.wednesday].map((slot, i) => (
                      <td key={i} className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${slot.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${slot.dot}`}></span>
                          {slot.name}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button onClick={() => show('Calendrier complet (bientot disponible)', 'info')} className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
              <MaterialIcon name="calendar_month" className="text-base" />
              View Full Weekly Calendar
            </button>
          </div>
        </div>

        {/* Media Library */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Media Library</h3>
              <button onClick={() => show('Upload de fichier media (bientot disponible)', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all">
                <MaterialIcon name="upload_file" className="text-base" />
                Upload
              </button>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              {mediaTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveMediaTab(i)}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeMediaTab === i
                      ? 'bg-white dark:bg-slate-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-800">
            {mediaFiles.length === 0 ? (
              <div className="p-12 text-center">
                <MaterialIcon name="audio_file" className="text-4xl text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">Aucun fichier media.</p>
              </div>
            ) : (
              mediaFiles.map((file) => (
                <div key={file.id} className="group p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <button onClick={() => handlePlayFile(file.id)} className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    playingFileId === file.id
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white'
                  }`}>
                    <MaterialIcon name={playingFileId === file.id ? 'pause' : 'play_arrow'} className="text-lg" filled />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${playingFileId === file.id ? 'text-primary' : ''}`}>{file.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{file.duration} &middot; {file.type} &middot; {file.size}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button onClick={() => show(`Edition de "${file.name}" (bientot disponible)`, 'info')} className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
                      <MaterialIcon name="edit" className="text-lg" />
                    </button>
                    <button onClick={() => handleDeleteFile(file.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                      <MaterialIcon name="delete" className="text-lg" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {bottomStats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                <MaterialIcon name={stat.icon} />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
