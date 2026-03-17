import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, type Article, type Category as CategoryType } from '../../services/api';
import MaterialIcon from '../../components/shared/MaterialIcon';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortTab, setSortTab] = useState<'recents' | 'populaires' | 'commentes'>('recents');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getArticles(1, 50, slug),
      api.getCategories(),
    ]).then(([articlesRes, categories]) => {
      setArticles(articlesRes.data);
      setTotalPages(Math.ceil(articlesRes.data.length / 6) || 1);
      const found = categories.find((c) => c.slug === slug);
      setCategory(found || null);
      setLoading(false);
    });
  }, [slug]);

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortTab === 'populaires') return b.views - a.views;
    if (sortTab === 'commentes') return b.comments - a.comments;
    return 0; // default order (recents)
  });

  const paginatedArticles = sortedArticles.slice((page - 1) * 6, page * 6);

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
    <>
      {/* Category Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent py-16 px-6 md:px-20 lg:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MaterialIcon name={category?.icon || 'category'} className="text-primary text-3xl" />
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{articles.length} articles</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-3">{category?.name || slug}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Suivez l'actualite {category?.name?.toLowerCase() || ''} en Afrique et dans le monde. Analyses, decryptages et reportages sur les enjeux qui faconnent nos societes.
          </p>
        </div>
      </section>

      {/* Filter Bar & Articles */}
      <main className="flex-1 px-6 md:px-20 lg:px-40 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              {(['recents', 'populaires', 'commentes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSortTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    sortTab === tab
                      ? 'bg-white dark:bg-slate-700 shadow-sm font-bold text-primary'
                      : 'font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Affichage :</span>
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

          {/* Content + Sidebar Layout */}
          <div className="flex flex-col xl:flex-row gap-8">

            {/* Articles Column */}
            <div className="flex-1">
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {paginatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">
                        {article.categoryLabel}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                        <span className="text-xs text-slate-400">Par {article.author}</span>
                      </div>
                      <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MaterialIcon name="schedule" className="text-sm" /> {article.readTime}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MaterialIcon name="visibility" className="text-sm" /> {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MaterialIcon name="chat_bubble" className="text-sm" /> {article.comments}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30 transition-colors flex items-center gap-1"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <MaterialIcon name="chevron_left" className="text-lg" />
                    Precedent
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                          page === p
                            ? 'bg-primary text-white'
                            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    {totalPages > 5 && (
                      <>
                        <span className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm">...</span>
                        <button
                          onClick={() => setPage(totalPages)}
                          className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${
                            page === totalPages
                              ? 'bg-primary text-white'
                              : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium hover:text-primary hover:border-primary/30 transition-colors flex items-center gap-1"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Suivant
                    <MaterialIcon name="chevron_right" className="text-lg" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full xl:w-72 flex-shrink-0 space-y-6">
              {/* Sidebar Ad */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/50 relative">
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-[9px] text-white/60 rounded uppercase tracking-wider z-10">Publicite</div>
                <a href="#" className="block">
                  <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80" alt="Publicite - Assurance" loading="lazy" className="w-full h-48 object-cover" />
                  <div className="p-3 bg-emerald-600">
                    <p className="text-white font-bold text-sm">SahelAssur</p>
                    <p className="text-white/80 text-xs">Protegez votre avenir. Assurance sante des 9.99&euro;/mois.</p>
                  </div>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
