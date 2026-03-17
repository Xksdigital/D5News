import { Link } from 'react-router-dom';

export interface ArticleCardData {
  id: number;
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  categoryColor?: string;
  date: string;
  views?: number;
  likes?: number;
  type?: 'article' | 'video' | 'podcast';
}

interface ArticleCardProps {
  article: ArticleCardData;
}

const categoryColorMap: Record<string, string> = {
  Politique: 'bg-amber-500/10 text-amber-400',
  Economie: 'bg-emerald-500/10 text-emerald-400',
  Societe: 'bg-rose-500/10 text-rose-400',
  Sport: 'bg-sky-500/10 text-sky-400',
  Culture: 'bg-violet-500/10 text-violet-400',
  Technologie: 'bg-cyan-500/10 text-cyan-400',
  Environnement: 'bg-green-500/10 text-green-400',
  Sante: 'bg-pink-500/10 text-pink-400',
  Education: 'bg-indigo-500/10 text-indigo-400',
};

const typeIconMap: Record<string, string> = {
  article: 'article',
  video: 'play_arrow',
  podcast: 'headphones',
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const colorClass = article.categoryColor || categoryColorMap[article.category] || 'bg-primary/10 text-primary';
  const typeIcon = typeIconMap[article.type || 'article'];

  return (
    <Link
      to={`/article/${article.id}`}
      className="card-lift block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-secondary/40 transition-all group overflow-hidden"
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-sm">{typeIcon}</span>
        </span>
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded text-white text-[10px]">
            <span className="material-symbols-outlined text-xs">visibility</span> {article.views ?? 0}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded text-white text-[10px]">
            <span className="material-symbols-outlined text-xs">thumb_up</span> {article.likes ?? 0}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 ${colorClass} text-[10px] font-bold rounded uppercase`}>
            {article.category}
          </span>
          <span className="text-[10px] text-slate-400">{article.date}</span>
        </div>
        <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
