import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const kpiCards = [
  { icon: 'handshake', label: 'Total Partenaires', value: '128', change: '+8.2%', positive: true, iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-primary' },
  { icon: 'check_circle', label: 'Partenaires Actifs', value: '94', change: '+3.1%', positive: true, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: 'pending', label: 'En Attente', value: '12', change: '+2', positive: false, iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
  { icon: 'monetization_on', label: 'Revenus Partenaires', value: '$245K', change: '+18.4%', positive: true, iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
];

type PartnerStatus = 'actif' | 'en_attente' | 'suspendu' | 'expire';

interface Partner {
  id: number;
  name: string;
  initials: string;
  type: string;
  typeBg: string;
  status: PartnerStatus;
  contact: string;
  revenue: string;
  since: string;
  avatarBg: string;
}

const statusConfig: Record<PartnerStatus, { label: string; dot: string; text: string }> = {
  actif: { label: 'Actif', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  en_attente: { label: 'En attente', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  suspendu: { label: 'Suspendu', dot: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  expire: { label: 'Expire', dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
};

const initialPartners: Partner[] = [
  { id: 1, name: 'Global Media Corp', initials: 'GM', type: 'Syndication', typeBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', status: 'actif', contact: 'j.smith@globalmedia.com', revenue: '$42,500/mo', since: '15 Jan 2023', avatarBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { id: 2, name: 'TechVanguard Inc.', initials: 'TV', type: 'Publicite', typeBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', status: 'actif', contact: 'a.lee@techvanguard.io', revenue: '$28,000/mo', since: '03 Mar 2023', avatarBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { id: 3, name: 'AfriGreen Solutions', initials: 'AG', type: 'Sponsoring', typeBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', status: 'en_attente', contact: 'm.diop@afrigreen.org', revenue: '-', since: 'Demande recue', avatarBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { id: 4, name: 'Banque Atlantique', initials: 'BA', type: 'Publicite', typeBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', status: 'actif', contact: 'p.kouame@banqueatlantique.ci', revenue: '$35,200/mo', since: '10 Sep 2022', avatarBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
  { id: 5, name: 'Orange Digital', initials: 'OD', type: 'Syndication', typeBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', status: 'suspendu', contact: 'c.martin@orange.fr', revenue: '$18,000/mo', since: '22 Fev 2024', avatarBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
  { id: 6, name: 'Canal+ Afrique', initials: 'C+', type: 'Contenu', typeBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600', status: 'actif', contact: 'l.ndiaye@canalplus.com', revenue: '$52,000/mo', since: '01 Jun 2022', avatarBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600' },
];

export default function Partners() {
  const { show } = useToast();
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredPartners = partners.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.contact.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || p.type === typeFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const handleAccept = (id: number) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'actif' as PartnerStatus, since: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) } : p))
    );
    const partner = partners.find((p) => p.id === id);
    show(`Partenaire "${partner?.name}" accepte avec succes`, 'success');
  };

  const handleSuspend = (id: number) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'suspendu' as PartnerStatus } : p))
    );
    const partner = partners.find((p) => p.id === id);
    show(`Partenaire "${partner?.name}" suspendu`, 'info');
  };

  const handleReactivate = (id: number) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'actif' as PartnerStatus } : p))
    );
    const partner = partners.find((p) => p.id === id);
    show(`Partenaire "${partner?.name}" reactive`, 'success');
  };

  const handleExport = () => {
    const csv = [
      'Nom,Type,Statut,Contact,Revenus,Depuis',
      ...partners.map((p) => `"${p.name}","${p.type}","${statusConfig[p.status].label}","${p.contact}","${p.revenue}","${p.since}"`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'partenaires_d5news.csv';
    a.click();
    URL.revokeObjectURL(url);
    show('Export CSV telecharge', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Gestion des Partenaires</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerez les partenariats, contrats et revenus associes.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
            <MaterialIcon name="download" className="text-lg" />
            Exporter CSV
          </button>
          <button onClick={() => show('Formulaire de nouveau partenaire (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <MaterialIcon name="person_add" className="text-lg" />
            Nouveau Partenaire
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

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 outline-none"
              placeholder="Rechercher par nom ou contact..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all">
            <option value="">Tous les types</option>
            <option value="Syndication">Syndication</option>
            <option value="Publicite">Publicite</option>
            <option value="Sponsoring">Sponsoring</option>
            <option value="Contenu">Contenu</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all">
            <option value="">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="en_attente">En attente</option>
            <option value="suspendu">Suspendu</option>
            <option value="expire">Expire</option>
          </select>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Partenaire</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Statut</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Revenus</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Depuis</th>
                <th className="text-right px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPartners.map((partner) => {
                const st = statusConfig[partner.status];
                return (
                  <tr key={partner.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${partner.avatarBg}`}>{partner.initials}</div>
                        <div>
                          <span className="text-sm font-semibold block">{partner.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{partner.contact}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${partner.typeBg}`}>{partner.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${st.dot}`}></span>
                        <span className={`text-sm font-medium ${st.text}`}>{st.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">{partner.revenue}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{partner.since}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                        {partner.status === 'en_attente' && (
                          <button onClick={() => handleAccept(partner.id)} className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Accepter">
                            <MaterialIcon name="check_circle" className="text-lg" />
                          </button>
                        )}
                        {partner.status === 'actif' && (
                          <button onClick={() => handleSuspend(partner.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors" title="Suspendre">
                            <MaterialIcon name="pause_circle" className="text-lg" />
                          </button>
                        )}
                        {partner.status === 'suspendu' && (
                          <button onClick={() => handleReactivate(partner.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Reactiver">
                            <MaterialIcon name="play_circle" className="text-lg" />
                          </button>
                        )}
                        <button onClick={() => show(`Details du partenaire "${partner.name}" (bientot disponible)`, 'info')} className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Details">
                          <MaterialIcon name="visibility" className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredPartners.length === 0 && (
          <div className="p-12 text-center">
            <MaterialIcon name="search_off" className="text-4xl text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Aucun partenaire trouve avec ces filtres.</p>
          </div>
        )}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Affichage de <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredPartners.length}</span> sur <span className="font-semibold text-slate-700 dark:text-slate-200">{partners.length}</span> partenaires
          </p>
        </div>
      </div>
    </div>
  );
}
