import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const kpiCards = [
  { icon: 'groups', label: 'Total Utilisateurs', value: '1,240,500', change: '+12.4%', positive: true, iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-primary' },
  { icon: 'star', label: 'Abonnes Premium', value: '450,210', change: '+5.2%', positive: true, iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { icon: 'handshake', label: 'Total Partenaires', value: '128', change: '-2.1%', positive: false, iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
  { icon: 'monetization_on', label: 'Revenus Totaux', value: '$3,245,000', change: '+18.4%', positive: true, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
];

interface PendingReview {
  id: number;
  title: string;
  author: string;
  section: string;
}

interface PartnerRequest {
  id: number;
  name: string;
  desc: string;
  icon: string;
  iconBg: string;
}

const categories = [
  { name: 'Politique', height: '85%' },
  { name: 'Tech', height: '65%' },
  { name: 'Sports', height: '90%' },
  { name: 'Sante', height: '45%' },
  { name: 'Finance', height: '75%' },
];

export default function Dashboard() {
  const { show } = useToast();
  const [reviews, setReviews] = useState<PendingReview[]>([
    { id: 1, title: "Le futur de l'IA dans le journalisme moderne", author: 'Sarah Jenkins', section: 'Section Tech' },
    { id: 2, title: 'Nouvelle politique economique : impacts sur les marches', author: 'Michael Ross', section: 'Section Finance' },
    { id: 3, title: "Technologies vertes en Afrique de l'Ouest", author: 'Amadou Diallo', section: 'Section Afrique' },
  ]);
  const [partners, setPartners] = useState<PartnerRequest[]>([
    { id: 1, name: 'Global Media Corp', desc: 'Partenariat de syndication de contenu pour la region Europe.', icon: 'business', iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' },
    { id: 2, name: 'TechVanguard Inc.', desc: 'Espace publicitaire premium pour le lancement Q4.', icon: 'rocket_launch', iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
    { id: 3, name: 'AfriGreen Solutions', desc: 'Contenu sponsorise sur les energies renouvelables.', icon: 'eco', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  ]);

  const handleApproveReview = (id: number) => {
    const review = reviews.find((r) => r.id === id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    show(`"${review?.title}" approuve`, 'success');
  };

  const handleRejectReview = (id: number) => {
    const review = reviews.find((r) => r.id === id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    show(`"${review?.title}" rejete`, 'error');
  };

  const handleAcceptPartner = (id: number) => {
    const partner = partners.find((p) => p.id === id);
    setPartners((prev) => prev.filter((p) => p.id !== id));
    show(`Partenaire "${partner?.name}" accepte`, 'success');
  };

  const handleExport = () => {
    show('Export du rapport en cours...', 'info');
    setTimeout(() => show('Rapport exporte avec succes', 'success'), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Insights en temps reel et performances de la plateforme.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
            <MaterialIcon name="calendar_today" className="text-lg" />
            30 derniers jours
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <MaterialIcon name="download" className="text-lg" />
            Exporter
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Croissance Utilisateurs (30j)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Acquisition quotidienne d'utilisateurs actifs</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">+15.4%</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">vs mois dernier</p>
            </div>
          </div>
          <div className="h-64 flex flex-col justify-end">
            <div className="relative h-full w-full">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0f58bd', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#0f58bd', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M0 109C20 109 20 21 40 21C60 21 60 41 80 41C100 41 100 93 120 93C140 93 140 33 160 33C180 33 180 101 200 101C220 101 220 61 240 61C260 61 260 45 280 45C300 45 300 121 320 121C340 121 340 149 360 149C380 149 380 1 400 1C420 1 420 81 440 81C460 81 460 129 480 129C500 129 500 25 520 25 V 150 H 0 Z" fill="url(#lineGrad)" />
                <path d="M0 109C20 109 20 21 40 21C60 21 60 41 80 41C100 41 100 93 120 93C140 93 140 33 160 33C180 33 180 101 200 101C220 101 220 61 240 61C260 61 260 45 280 45C300 45 300 121 320 121C340 121 340 149 360 149C380 149 380 1 400 1C420 1 420 81 440 81C460 81 460 129 480 129C500 129 500 25 520 25" stroke="#0f58bd" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-[10px] font-bold text-slate-400">JOUR 1</span>
              <span className="text-[10px] font-bold text-slate-400">JOUR 10</span>
              <span className="text-[10px] font-bold text-slate-400">JOUR 20</span>
              <span className="text-[10px] font-bold text-slate-400">JOUR 30</span>
            </div>
          </div>
        </div>

        {/* Content by Category */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Contenu par Categorie</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Repartition des articles par secteur</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">8,432</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Articles</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 h-64 items-end px-2">
            {categories.map((cat) => (
              <div key={cat.name} className="group flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/10 dark:bg-primary/20 rounded-t-lg transition-all duration-500 hover:bg-primary cursor-pointer"
                  style={{ height: cat.height }}
                ></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Partner Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Reviews */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-lg">Revues en attente</h3>
            <Link to="/admin/editorial" className="text-primary text-xs font-bold hover:underline">Voir tout</Link>
          </div>
          {reviews.length === 0 ? (
            <div className="p-8 text-center">
              <MaterialIcon name="check_circle" className="text-3xl text-emerald-500 mb-2" />
              <p className="text-sm text-slate-500">Toutes les revues ont ete traitees</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
                    <MaterialIcon name="image" className="text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">{review.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Par {review.author} - {review.section}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleApproveReview(review.id)} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Approuver">
                      <MaterialIcon name="check_circle" />
                    </button>
                    <button onClick={() => handleRejectReview(review.id)} className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors" title="Rejeter">
                      <MaterialIcon name="cancel" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partner Requests */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg">Demandes Partenaires</h3>
          </div>
          {partners.length === 0 ? (
            <div className="flex-1 p-8 text-center flex flex-col items-center justify-center">
              <MaterialIcon name="handshake" className="text-3xl text-emerald-500 mb-2" />
              <p className="text-sm text-slate-500">Toutes les demandes traitees</p>
            </div>
          ) : (
            <div className="flex-1 p-6 space-y-6">
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${partner.iconBg}`}>
                    <MaterialIcon name={partner.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{partner.name}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{partner.desc}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleAcceptPartner(partner.id)} className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-primary/90 transition-colors">Accepter</button>
                      <button onClick={() => show(`Examen de "${partner.name}" en cours`, 'info')} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Examiner</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
