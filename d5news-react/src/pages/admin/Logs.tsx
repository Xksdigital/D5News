import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  userInitials: string;
  userBg: string;
  action: string;
  actionBg: string;
  details: string;
  ip: string;
}

const allLogEntries: LogEntry[] = [
  { id: 1, timestamp: '06 Mar 2024 14:32', user: 'Alex Chen', userInitials: 'AC', userBg: 'bg-primary/20 text-primary', action: 'Connexion', actionBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400', details: 'Connexion reussie depuis Chrome/Windows', ip: '192.168.1.1' },
  { id: 2, timestamp: '06 Mar 2024 14:28', user: 'Sophie Martin', userInitials: 'SM', userBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', action: 'Modification', actionBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', details: 'Article #4521 modifie - Section Tech', ip: '10.0.0.42' },
  { id: 3, timestamp: '06 Mar 2024 14:15', user: 'System', userInitials: 'SY', userBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', action: 'Alerte', actionBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400', details: 'Tentative de connexion echouee (3x) - user: unknown@test.com', ip: '85.214.12.8' },
  { id: 4, timestamp: '06 Mar 2024 13:55', user: 'Marc Durant', userInitials: 'MD', userBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600', action: 'Suppression', actionBg: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', details: 'Commentaire #8842 supprime - Raison: Spam', ip: '172.16.0.15' },
  { id: 5, timestamp: '06 Mar 2024 13:40', user: 'Admin', userInitials: 'AD', userBg: 'bg-slate-100 dark:bg-slate-700 text-slate-500', action: 'Systeme', actionBg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300', details: 'Backup automatique complete - 2.4GB', ip: 'System' },
  { id: 6, timestamp: '06 Mar 2024 12:30', user: 'Sophie Martin', userInitials: 'SM', userBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', action: 'Modification', actionBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', details: 'Article #4518 publie - Section Finance', ip: '10.0.0.42' },
  { id: 7, timestamp: '06 Mar 2024 11:15', user: 'Alex Chen', userInitials: 'AC', userBg: 'bg-primary/20 text-primary', action: 'Connexion', actionBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400', details: 'Connexion reussie depuis Safari/macOS', ip: '192.168.1.5' },
  { id: 8, timestamp: '06 Mar 2024 10:45', user: 'System', userInitials: 'SY', userBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', action: 'Systeme', actionBg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300', details: 'Mise a jour du cache CDN terminee', ip: 'System' },
  { id: 9, timestamp: '05 Mar 2024 23:00', user: 'Admin', userInitials: 'AD', userBg: 'bg-slate-100 dark:bg-slate-700 text-slate-500', action: 'Systeme', actionBg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300', details: 'Rotation des logs journaliers', ip: 'System' },
  { id: 10, timestamp: '05 Mar 2024 18:22', user: 'Marc Durant', userInitials: 'MD', userBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600', action: 'Modification', actionBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', details: 'Utilisateur #2841 role change: Editor -> Admin', ip: '172.16.0.15' },
];

const ITEMS_PER_PAGE = 5;

export default function Logs() {
  const { show } = useToast();
  const [userFilter, setUserFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = allLogEntries.filter((log) => {
    const matchUser = !userFilter || log.user === userFilter;
    const matchAction = !actionFilter || log.action === actionFilter;
    const matchSearch = !search || log.details.toLowerCase().includes(search.toLowerCase());
    return matchUser && matchAction && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / ITEMS_PER_PAGE));
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleExport = () => {
    const csv = [
      'Timestamp,Utilisateur,Action,Details,IP',
      ...filteredLogs.map((l) => `"${l.timestamp}","${l.user}","${l.action}","${l.details}","${l.ip}"`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs_d5news.csv';
    a.click();
    URL.revokeObjectURL(url);
    show('Export des logs telecharge', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Logs d'activite</h1>
          <p className="text-slate-500 dark:text-slate-400">Historique complet des actions et evenements systeme.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <MaterialIcon name="download" className="text-lg" />
          Exporter les logs
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <select
            value={userFilter}
            onChange={(e) => { setUserFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
          >
            <option value="">Tous les utilisateurs</option>
            <option value="Alex Chen">Alex Chen</option>
            <option value="Sophie Martin">Sophie Martin</option>
            <option value="Marc Durant">Marc Durant</option>
            <option value="System">System</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={actionFilter}
            onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
          >
            <option value="">Tous les types</option>
            <option value="Connexion">Connexion</option>
            <option value="Modification">Modification</option>
            <option value="Suppression">Suppression</option>
            <option value="Alerte">Alerte</option>
            <option value="Systeme">Systeme</option>
          </select>
          <div className="relative flex-1">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="Rechercher dans les logs..."
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Utilisateur</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Action</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Details</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Adresse IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${log.userBg}`}>{log.userInitials}</div>
                      <span className="text-sm font-semibold whitespace-nowrap">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${log.actionBg}`}>{log.action}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{log.details}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{log.ip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <MaterialIcon name="search_off" className="text-4xl text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Aucun log trouve avec ces filtres.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Affichage de <span className="font-bold text-slate-700 dark:text-slate-200">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredLogs.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)}</span> sur <span className="font-bold text-slate-700 dark:text-slate-200">{filteredLogs.length}</span> entrees
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
            >
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-bold ${
                  currentPage === page ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
            >
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
