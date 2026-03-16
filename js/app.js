/**
 * D5News - Shared Application Logic
 * Design System V2.1
 */

// Theme Management
const ThemeManager = {
    init() {
        const saved = localStorage.getItem('d5news-theme');
        if (saved === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('d5news-theme', 'dark');
        }
    },
    toggle() {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('d5news-theme', 'light');
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('d5news-theme', 'dark');
        }
    }
};

// Sidebar Management (Admin pages)
const SidebarManager = {
    init() {
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => this.open());
        }
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }
    },
    open() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.add('sidebar-open');
        if (overlay) overlay.classList.add('active');
    },
    close() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.remove('sidebar-open');
        if (overlay) overlay.classList.remove('active');
    }
};

// Navigation - highlight active page
const NavManager = {
    init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('[data-nav]').forEach(link => {
            const navTarget = link.getAttribute('data-nav');
            if (navTarget === currentPage) {
                link.classList.add('nav-active');
                link.classList.remove('nav-inactive');
            } else {
                link.classList.remove('nav-active');
                link.classList.add('nav-inactive');
            }
        });
    }
};

// Language toggle mock
const LangManager = {
    current: localStorage.getItem('d5news-lang') || 'FR',
    init() {
        this.updateDisplay();
    },
    toggle() {
        this.current = this.current === 'FR' ? 'EN' : 'FR';
        localStorage.setItem('d5news-lang', this.current);
        this.updateDisplay();
    },
    updateDisplay() {
        document.querySelectorAll('[data-lang-display]').forEach(el => {
            el.textContent = this.current;
        });
    }
};

// Toast Notification System
const D5Toast = {
    show(message, type = 'success') {
        const existing = document.querySelector('.d5-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'd5-toast';
        const bg = type === 'error' ? '#ef4444' : type === 'info' ? '#0f58bd' : '#10b981';
        const icon = type === 'error' ? 'error' : type === 'info' ? 'info' : 'check_circle';
        toast.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;align-items:center;gap:10px;padding:14px 20px;background:${bg};color:#fff;border-radius:12px;font-size:14px;font-weight:600;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,0.25);transform:translateY(20px);opacity:0;transition:all .3s cubic-bezier(0.4,0,0.2,1);max-width:400px;`;
        toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px">${icon}</span><span>${message}</span>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; });
        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Interactive elements manager
const InteractionManager = {
    init() {
        this.bindLoadMore();
        this.bindNewsletter();
        this.bindShare();
        this.bindViewToggle();
    },
    bindLoadMore() {
        document.querySelectorAll('[data-load-more]').forEach(btn => {
            btn.addEventListener('click', () => {
                const orig = btn.innerHTML;
                btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-lg">progress_activity</span> Chargement...';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span> Tous les articles ont ete charges';
                    btn.classList.add('opacity-60', 'pointer-events-none');
                }, 1500);
            });
        });
    },
    bindNewsletter() {
        document.querySelectorAll('[data-newsletter]').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('input[type="email"]');
                if (!input || !input.value || !input.value.includes('@')) {
                    D5Toast.show('Veuillez entrer un email valide.', 'error');
                    return;
                }
                D5Toast.show('Merci pour votre inscription a la newsletter !');
                input.value = '';
            });
        });
    },
    bindShare() {
        document.querySelectorAll('[data-share]').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.getAttribute('data-share');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                if (platform === 'copy') {
                    navigator.clipboard.writeText(window.location.href).then(() => D5Toast.show('Lien copie !', 'info'));
                } else if (platform === 'twitter') {
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
                } else if (platform === 'facebook') {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                }
            });
        });
    },
    bindViewToggle() {
        document.querySelectorAll('[data-view-toggle]').forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.closest('[data-view-group]') || btn.parentElement;
                group.querySelectorAll('[data-view-toggle]').forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('text-slate-400');
                });
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('text-slate-400');
            });
        });
    }
};

// Cookie/RGPD Popup Manager
const CookieManager = {
    init() {
        const popup = document.getElementById('cookiePopup');
        if (!popup) return;
        if (localStorage.getItem('d5news-cookies')) {
            popup.remove();
            return;
        }
        popup.classList.remove('hidden');
        popup.querySelectorAll('[data-cookie-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-cookie-action');
                localStorage.setItem('d5news-cookies', action);
                popup.style.opacity = '0';
                popup.style.transition = 'opacity 0.3s';
                setTimeout(() => popup.remove(), 300);
            });
        });
    }
};

// Carousel Manager for category sections
const CarouselManager = {
    carousels: {},
    init() {
        document.querySelectorAll('[data-carousel]').forEach(track => {
            const name = track.dataset.carousel;
            const container = track.parentElement;
            const prev = document.querySelector(`[data-carousel-prev="${name}"]`);
            const next = document.querySelector(`[data-carousel-next="${name}"]`);
            const dotsContainer = document.querySelector(`[data-carousel-dots="${name}"]`);
            this.carousels[name] = { track, container, prev, next, dotsContainer, currentPage: 0 };
            if (prev) prev.addEventListener('click', () => this.slide(name, -1));
            if (next) next.addEventListener('click', () => this.slide(name, 1));
            if (dotsContainer) {
                dotsContainer.querySelectorAll('[data-dot]').forEach(dot => {
                    dot.addEventListener('click', () => {
                        this.goToPage(name, parseInt(dot.dataset.dot));
                    });
                });
            }
            // Touch support
            let startX = 0, isDragging = false;
            track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
            track.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                const diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) this.slide(name, diff > 0 ? 1 : -1);
            }, { passive: true });
        });
        window.addEventListener('resize', () => this.updateAll());
    },
    getVisibleCount(name) {
        const w = window.innerWidth;
        if (w < 640) return 1;
        if (w < 1024) return 2;
        return 3;
    },
    getTotalPages(name) {
        const c = this.carousels[name];
        if (!c) return 1;
        const items = c.track.children.length;
        const visible = this.getVisibleCount(name);
        return Math.max(1, Math.ceil(items / visible));
    },
    slide(name, direction) {
        const c = this.carousels[name];
        if (!c) return;
        const totalPages = this.getTotalPages(name);
        c.currentPage = Math.max(0, Math.min(totalPages - 1, c.currentPage + direction));
        this.updatePosition(name);
    },
    goToPage(name, page) {
        const c = this.carousels[name];
        if (!c) return;
        c.currentPage = page;
        this.updatePosition(name);
    },
    updatePosition(name) {
        const c = this.carousels[name];
        if (!c) return;
        const visible = this.getVisibleCount(name);
        const gap = 20;
        const containerWidth = c.container.offsetWidth;
        const itemWidth = (containerWidth - gap * (visible - 1)) / visible;
        const offset = c.currentPage * (itemWidth + gap) * visible;
        c.track.style.transform = `translateX(-${offset}px)`;
        this.updateDots(name);
    },
    updateDots(name) {
        const c = this.carousels[name];
        if (!c || !c.dotsContainer) return;
        c.dotsContainer.querySelectorAll('[data-dot]').forEach(dot => {
            const idx = parseInt(dot.dataset.dot);
            if (idx === c.currentPage) {
                dot.className = 'w-6 h-2 rounded-full bg-red-500 transition-all';
            } else {
                dot.className = 'w-2 h-2 rounded-full bg-slate-400/30 hover:bg-slate-400/50 transition-all cursor-pointer';
            }
        });
    },
    updateAll() {
        Object.keys(this.carousels).forEach(name => {
            const c = this.carousels[name];
            const totalPages = this.getTotalPages(name);
            if (c.currentPage >= totalPages) c.currentPage = totalPages - 1;
            this.updatePosition(name);
        });
    }
};

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    SidebarManager.init();
    NavManager.init();
    LangManager.init();
    InteractionManager.init();
    CookieManager.init();
    CarouselManager.init();

    // Bind theme toggles
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => ThemeManager.toggle());
    });

    // Bind lang toggles
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.addEventListener('click', () => LangManager.toggle());
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
});
