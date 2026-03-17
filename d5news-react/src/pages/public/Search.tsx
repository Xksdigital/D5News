import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, type Article } from '../../services/api';
import MaterialIcon from '../../components/shared/MaterialIcon';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('pertinence');
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    api.getArticles(1, 50).then((res) => {
      setAllArticles(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = [...allArticles];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter((a) => a.category === category);
    }

    if (sort === 'recents') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'lus') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sort === 'commentes') {
      filtered.sort((a, b) => b.comments - a.comments);
    }

    setArticles(filtered);
  }, [query, category, sort, allArticles]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      {/* Search Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent py-16 px-6 md:px-20 lg:px-40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Recherche Avancee</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Trouvez exactement ce que vous cherchez parmi des milliers d'articles.</p>
          <div className="relative">
            <MaterialIcon name="search" className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
            <input
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base focus:ring-2 focus:ring-primary/50 shadow-lg transition-all placeholder:text-slate-400 outline-none"
              placeholder="Rechercher des articles, auteurs, sujets..."
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <main className="flex-1 px-6 md:px-20 lg:px-40 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option value="all">Toutes categories</option>
              <option value="politique">Politique</option>
              <option value="economie">Economie</option>
              <option value="technologie">Tech</option>
              <option value="sport">Sports</option>
              <option value="culture">Culture</option>
              <option value="sante">Sante</option>
            </select>
            <select
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option>Toute periode</option>
              <option>Aujourd'hui</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Cette annee</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option value="pertinence">Pertinence</option>
              <option value="recents">Plus recents</option>
              <option value="lus">Plus lus</option>
              <option value="commentes">Plus commentes</option>
            </select>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-slate-500">{articles.length} resultats</span>
            </div>
          </div>

          {/* Active Filters */}
          {query && (
            <div className="flex flex-wrap gap-2 mb-6">
              {query.split(' ').filter(Boolean).map((word, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {word}
                  <button
                    className="ml-1 hover:text-primary/70"
                    onClick={() => {
                      const words = query.split(' ').filter(Boolean);
                      words.splice(i, 1);
                      handleSearch(words.join(' '));
                    }}
                  >
                    <MaterialIcon name="close" className="text-sm" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Results List */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <MaterialIcon name="search_off" className="text-6xl text-slate-300 dark:text-slate-600" />
              <h3 className="text-lg font-bold mt-4">Aucun resultat</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Essayez avec d'autres mots-cles ou modifiez les filtres.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="flex gap-6">
                    <div className="hidden md:block w-48 h-32 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">{article.categoryLabel}</span>
                      </div>
                      <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-slate-400">Par {article.author}</span>
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MaterialIcon name="schedule" className="text-sm" /> {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {articles.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-30"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <MaterialIcon name="chevron_left" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm ${
                    page === p
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <MaterialIcon name="chevron_right" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
