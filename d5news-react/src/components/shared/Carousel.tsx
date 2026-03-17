import { useRef, useState, useCallback, useEffect, type ReactNode, type TouchEvent } from 'react';

interface CarouselProps {
  items: ReactNode[];
  name: string;
}

function getVisibleCount(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function Carousel({ items, name }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalPages = Math.max(1, Math.ceil(items.length / visibleCount));

  useEffect(() => {
    const handleResize = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      setCurrentPage(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page if it exceeds totalPages after resize
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [currentPage, totalPages]);

  const goTo = useCallback((page: number) => {
    const clamped = Math.max(0, Math.min(page, totalPages - 1));
    setCurrentPage(clamped);
  }, [totalPages]);

  const prev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);
  const next = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Calculate transform: each page shifts by visibleCount items worth of width
  // Items have gap-5 (20px) between them
  const getTransform = () => {
    if (!trackRef.current) return 'translateX(0)';
    const containerWidth = trackRef.current.parentElement?.clientWidth || 0;
    const offset = currentPage * containerWidth;
    return `translateX(-${offset}px)`;
  };

  // Item width classes matching original HTML
  const itemWidthClass = 'flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]';

  return (
    <div>
      {/* Header with prev/next is rendered by parent */}
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="carousel-track flex gap-5"
          style={{ transform: getTransform() }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-carousel={name}
        >
          {items.map((item, i) => (
            <div key={i} className={itemWidthClass}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4" data-carousel-dots={name}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Page ${i + 1}`}
            data-dot={i}
            className={`rounded-full transition-all ${
              i === currentPage
                ? 'w-6 h-2 bg-red-500'
                : 'w-2 h-2 bg-slate-400/30 hover:bg-slate-400/50 cursor-pointer'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Export navigation button components for parent use
export function CarouselPrevButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Precedent"
      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
    >
      <span className="material-symbols-outlined text-sm">chevron_left</span>
    </button>
  );
}

export function CarouselNextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Suivant"
      className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
    >
      <span className="material-symbols-outlined text-sm">chevron_right</span>
    </button>
  );
}
