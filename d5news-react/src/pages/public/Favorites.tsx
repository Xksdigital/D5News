import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, type Article } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const categoryColors: Record<string, string> = {
  politique: 'bg-sky-600',
  economie: 'bg-emerald-600',
  technologie: 'bg-purple-600',
  sport: 'bg-amber-600',
  culture: 'bg-amber-600',
  sante: 'bg-rose-600',
  education: 'bg-indigo-600',
  environnement: 'bg-green-600',
};

export default function Favorites() {
  const { show } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticles(1, 12).then((res) => {
      setArticles(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all'
    ? articles
    : articles.filter((a) => a.category === filter);

  const handleRemoveFavorite = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    show('Article retire des favoris', 'info');
  };

  if (loading) {
    return (
      <main className="flex-1 px-6 md:px-20 lg:px-40 py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 md:px-20 lg:px-40 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Mes Favoris</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Retrouvez tous les articles que vous avez sauvegardes.</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option value="all">Tous les articles</option>
              <option value="politique">Politique</option>
              <option value="economie">Economie</option>
              <option value="technologie">Tech</option>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
            </select>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400'}`}
              >
                <MaterialIcon name="grid_view" className="text-xl" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400'}`}
              >
                <MaterialIcon name="view_list" className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Favorites Count */}
        <div className="flex items-center gap-2 mb-6">
          <MaterialIcon name="bookmark" className="text-primary" filled />
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{filtered.length} articles sauvegardes</span>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <MaterialIcon name="bookmark_border" className="text-6xl text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-bold mt-4">Aucun favori</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Vous n'avez pas encore sauvegarde d'articles.</p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all"
            >
              <MaterialIcon name="explore" className="text-lg" />
              Explorer les articles
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
            {filtered.map((article) => (
              <div key={article.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveFavorite(article.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <MaterialIcon name="bookmark" className="text-xl" filled />
                  </button>
                  <span className={`absolute bottom-3 left-3 px-2 py-1 ${categoryColors[article.category] || 'bg-primary'} text-white text-[10px] font-bold rounded uppercase tracking-wider`}>
                    {article.categoryLabel}
                  </span>
                </div>
                <div className="p-5">
                  <Link to={`/article/${article.slug}`}>
                    <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Par {article.author} - {article.date}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MaterialIcon name="visibility" className="text-sm" /> {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MaterialIcon name="chat_bubble" className="text-sm" /> {article.comments}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MaterialIcon name="schedule" className="text-sm" /> {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:shadow-md transition-all">
              Charger plus d'articles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
