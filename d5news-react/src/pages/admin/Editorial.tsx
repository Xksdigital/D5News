import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const tabs = ['En attente', 'Approuves', 'Rejetes', 'Brouillons'];

type ArticleStatus = 'en_attente' | 'approuve' | 'rejete' | 'brouillon';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  status: ArticleStatus;
  category: string;
  categoryBg: string;
  excerpt: string;
}

const statusLabels: Record<ArticleStatus, { label: string; bg: string }> = {
  en_attente: { label: 'En revision', bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
  approuve: { label: 'Approuve', bg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  rejete: { label: 'Rejete', bg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600' },
  brouillon: { label: 'Brouillon', bg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300' },
};

const tabToStatus: Record<number, ArticleStatus> = {
  0: 'en_attente',
  1: 'approuve',
  2: 'rejete',
  3: 'brouillon',
};

const initialArticles: Article[] = [
  { id: 1, title: "Le futur de l'IA dans le journalisme moderne", author: 'Sarah Jenkins', date: '04 Mar 2024', status: 'en_attente', category: 'Tech', categoryBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', excerpt: "Analyse approfondie de l'impact de l'intelligence artificielle sur les pratiques journalistiques, de la redaction automatisee a la verification des faits assistee par IA." },
  { id: 2, title: 'Nouvelle politique economique : impacts sur les marches', author: 'Michael Ross', date: '05 Mar 2024', status: 'en_attente', category: 'Finance', categoryBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', excerpt: 'Decryptage des nouvelles mesures economiques annoncees par le gouvernement et leurs consequences prevues sur les marches financiers europeens.' },
  { id: 3, title: "Technologies vertes en Afrique de l'Ouest", author: 'Amadou Diallo', date: '03 Mar 2024', status: 'en_attente', category: 'Afrique', categoryBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600', excerpt: "Tour d'horizon des initiatives technologiques vertes qui transforment le paysage energetique de l'Afrique de l'Ouest, du solaire a l'eolien." },
  { id: 4, title: 'La montee du sport feminin en France', author: 'Claire Martin', date: '05 Mar 2024', status: 'en_attente', category: 'Sports', categoryBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600', excerpt: "Enquete sur la visibilite croissante du sport feminin en France, portee par les succes recents et l'evolution des mentalites." },
  { id: 5, title: 'Cybersecurite : les nouvelles menaces de 2024', author: 'Pierre Leblanc', date: '02 Mar 2024', status: 'en_attente', category: 'Tech', categoryBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', excerpt: 'Panorama des nouvelles cybermenaces emergentes en 2024, des attaques par ransomware aux deepfakes.' },
  { id: 6, title: "Economie circulaire : l'Afrique montre la voie", author: 'Fatou Sow', date: '01 Mar 2024', status: 'approuve', category: 'Economie', categoryBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600', excerpt: "Comment les entreprises africaines innovent dans l'economie circulaire et le recyclage." },
  { id: 7, title: 'CAN 2024 : bilan et perspectives', author: 'Youssef Benali', date: '28 Fev 2024', status: 'approuve', category: 'Sports', categoryBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600', excerpt: "Retour complet sur la Coupe d'Afrique des Nations 2024 et les enseignements pour le football africain." },
  { id: 8, title: 'Les NFT sont-ils morts ?', author: 'Lucas Moreau', date: '25 Fev 2024', status: 'rejete', category: 'Tech', categoryBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', excerpt: "Analyse du marche des NFT en 2024 : effondrement ou transformation ? L'article manque de sources fiables." },
  { id: 9, title: 'Brouillon : Interview president UA', author: 'Admin', date: '06 Mar 2024', status: 'brouillon', category: 'Politique', categoryBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600', excerpt: "Interview exclusive avec le president de l'Union Africaine. En cours de redaction." },
];

export default function Editorial() {
  const { show } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const currentStatus = tabToStatus[activeTab];
  const filteredArticles = articles.filter((a) => a.status === currentStatus);
  const pendingCount = articles.filter((a) => a.status === 'en_attente').length;
  const approvedCount = articles.filter((a) => a.status === 'approuve').length;
  const approvalRate = articles.length > 0 ? Math.round((approvedCount / articles.length) * 100 * 10) / 10 : 0;

  const handleApprove = (id: number) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approuve' as ArticleStatus } : a)));
    const article = articles.find((a) => a.id === id);
    show(`"${article?.title}" approuve`, 'success');
  };

  const handleReject = (id: number) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'rejete' as ArticleStatus } : a)));
    const article = articles.find((a) => a.id === id);
    show(`"${article?.title}" rejete`, 'error');
  };

  const handleApproveAll = () => {
    const count = articles.filter((a) => a.status === 'en_attente').length;
    if (count === 0) { show('Aucun article en attente', 'info'); return; }
    setArticles((prev) => prev.map((a) => (a.status === 'en_attente' ? { ...a, status: 'approuve' as ArticleStatus } : a)));
    show(`${count} articles approuves`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Revue Editoriale</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerez et validez le contenu avant publication.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
            <MaterialIcon name="filter_list" className="text-lg" />
            Filtrer
          </button>
          <button onClick={() => show("Editeur d'article (bientot disponible)", 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <MaterialIcon name="edit_note" className="text-lg" />
            Nouvel Article
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 animate-fade-in">
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab, index) => {
            const count = articles.filter((a) => a.status === tabToStatus[index]).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === index
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {tab}
                <span className={`ml-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  activeTab === index ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>{count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Grid: Articles + Sidebar Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Article Cards List */}
        <div className="xl:col-span-2 space-y-4 stagger-children">
          {filteredArticles.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <MaterialIcon name="article" className="text-4xl text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Aucun article dans cette categorie.</p>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const sl = statusLabels[article.status];
              return (
                <div key={article.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-5 flex gap-5">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
                      <MaterialIcon name="image" className="text-3xl text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold truncate">{article.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Par <span className="font-semibold text-slate-600 dark:text-slate-300">{article.author}</span> - Soumis le {article.date}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${sl.bg}`}>
                          {sl.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${article.categoryBg}`}>
                          {article.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 mt-4">
                        {(article.status === 'en_attente' || article.status === 'rejete' || article.status === 'brouillon') && (
                          <button onClick={() => handleApprove(article.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                            <MaterialIcon name="check_circle" className="text-base" />
                            Approuver
                          </button>
                        )}
                        {(article.status === 'en_attente' || article.status === 'brouillon') && (
                          <button onClick={() => handleReject(article.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
                            <MaterialIcon name="cancel" className="text-base" />
                            Rejeter
                          </button>
                        )}
                        <button onClick={() => show(`Apercu de "${article.title}" (bientot disponible)`, 'info')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          <MaterialIcon name="visibility" className="text-base" />
                          Apercu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Stats Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-lg">Statistiques</h3>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <MaterialIcon name="pending_actions" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Articles en attente</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800"></div>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                <MaterialIcon name="check_circle" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Approuves ce mois</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800"></div>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                <MaterialIcon name="trending_up" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Taux d'approbation</p>
                <p className="text-2xl font-bold">{approvalRate}%</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Objectif mensuel</span>
                <span className="font-bold text-primary">{approvalRate}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(approvalRate, 100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-lg">Actions rapides</h3>
            <button onClick={handleApproveAll} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
              <MaterialIcon name="check_circle" className="text-emerald-600" />
              <span className="text-sm font-medium">Approuver tous les en attente</span>
            </button>
            <button onClick={() => show('Notifications envoyees aux auteurs', 'success')} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
              <MaterialIcon name="send" className="text-primary" />
              <span className="text-sm font-medium">Notifier les auteurs</span>
            </button>
            <button onClick={() => show('Planification de publication (bientot disponible)', 'info')} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left">
              <MaterialIcon name="schedule" className="text-amber-600" />
              <span className="text-sm font-medium">Planifier la publication</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
