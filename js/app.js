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

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    SidebarManager.init();
    NavManager.init();
    LangManager.init();

    // Bind theme toggles
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => ThemeManager.toggle());
    });

    // Bind lang toggles
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.addEventListener('click', () => LangManager.toggle());
    });
});
