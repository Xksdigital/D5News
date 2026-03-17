import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const kpiCards = [
  { icon: 'groups', label: 'Total Utilisateurs', value: '12,840', change: '+5.2%', positive: true, iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-primary' },
  { icon: 'person_add', label: 'Nouveaux (24h)', value: '+142', change: '+12.4%', positive: true, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: 'star', label: 'Abonnes Premium', value: '3,120', change: '+3.1%', positive: true, iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { icon: 'pending_actions', label: 'Approbations en attente', value: '24', change: '-2.5%', positive: false, iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
];

interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  roleBg: string;
  status: string;
  statusColor: string;
  statusDot: string;
  date: string;
  avatarBg: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'Marc Durant', initials: 'MD', email: 'm.durant@example.com', role: 'Super Admin', roleBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '12 Oct 2023', avatarBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { id: 2, name: 'Sophie Martin', initials: 'SM', email: 's.martin@press.fr', role: 'Editor', roleBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '05 Jan 2024', avatarBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { id: 3, name: 'Jean Roche', initials: 'JR', email: 'j.roche@partner.com', role: 'Partner', roleBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', status: 'Suspendu', statusColor: 'text-amber-600 dark:text-amber-400', statusDot: 'bg-amber-500', date: '18 Fev 2024', avatarBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
  { id: 4, name: 'Elodie Petit', initials: 'EP', email: 'elodie.petit@gmail.com', role: 'Premium', roleBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', status: 'En attente', statusColor: 'text-slate-500 dark:text-slate-400', statusDot: 'bg-slate-400', date: 'Hier 22:15', avatarBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { id: 5, name: 'Karim Bensaid', initials: 'KB', email: 'k.bensaid@d5news.com', role: 'Super Admin', roleBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '03 Mar 2023', avatarBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { id: 6, name: 'Clara Fontaine', initials: 'CF', email: 'c.fontaine@media.fr', role: 'Editor', roleBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '22 Nov 2023', avatarBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { id: 7, name: 'Ibrahim Toure', initials: 'IT', email: 'i.toure@d5news.com', role: 'Editor', roleBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '15 Dec 2023', avatarBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { id: 8, name: 'Marie Leclerc', initials: 'ML', email: 'marie.leclerc@free.fr', role: 'Premium', roleBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', status: 'Actif', statusColor: 'text-emerald-600 dark:text-emerald-400', statusDot: 'bg-emerald-500', date: '01 Fev 2024', avatarBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
];

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const { show } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    const matchStatus = !statusFilter || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleBlock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newStatus = u.status === 'Suspendu' ? 'Actif' : 'Suspendu';
        return {
          ...u,
          status: newStatus,
          statusColor: newStatus === 'Actif' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400',
          statusDot: newStatus === 'Actif' ? 'bg-emerald-500' : 'bg-amber-500',
        };
      })
    );
    const user = users.find((u) => u.id === id);
    const action = user?.status === 'Suspendu' ? 'reactive' : 'bloque';
    show(`${user?.name} ${action}`, action === 'reactive' ? 'success' : 'error');
  };

  const handleExportCSV = () => {
    const csv = [
      'Nom,Email,Role,Statut,Date inscription',
      ...users.map((u) => `"${u.name}","${u.email}","${u.role}","${u.status}","${u.date}"`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'utilisateurs_d5news.csv';
    a.click();
    URL.revokeObjectURL(url);
    show('Export CSV telecharge', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Gestion des Utilisateurs</h1>
          <p className="text-slate-500 dark:text-slate-400">Supervisez et gerez les acces de la plateforme D5News.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
            <MaterialIcon name="download" className="text-lg" />
            Exporter CSV
          </button>
          <button onClick={() => show('Formulaire de nouvel utilisateur (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <MaterialIcon name="person_add" className="text-lg" />
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {kpiCards.map((card) => (
          <div key={card.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                <MaterialIcon name={card.icon} />
              </div>
              <span className={`text-xs font-bold flex items-center px-2 py-0.5 rounded-full ${
                card.positive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
              }`}>{card.change}</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 outline-none"
              placeholder="Rechercher par nom, email ou ID..."
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select
            className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">Tous les roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Premium">Premium</option>
            <option value="Partner">Partner</option>
          </select>
          <select
            className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="Suspendu">Suspendu</option>
            <option value="En attente">En attente</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Utilisateur</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Role</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Statut</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Inscrit le</th>
                <th className="text-right px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${user.avatarBg}`}>{user.initials}</div>
                      <span className="text-sm font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.roleBg}`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${user.statusDot}`}></span>
                      <span className={`text-sm font-medium ${user.statusColor}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                      <button onClick={() => show(`Edition de "${user.name}" (bientot disponible)`, 'info')} className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Modifier">
                        <MaterialIcon name="edit" className="text-lg" />
                      </button>
                      <button onClick={() => handleBlock(user.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors" title={user.status === 'Suspendu' ? 'Reactiver' : 'Bloquer'}>
                        <MaterialIcon name={user.status === 'Suspendu' ? 'check_circle' : 'block'} className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <MaterialIcon name="search_off" className="text-4xl text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Aucun utilisateur trouve.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Affichage de <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredUsers.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}</span> sur <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredUsers.length}</span> utilisateurs
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
                className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                  currentPage === page
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
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
