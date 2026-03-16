/**
 * D5News - API Client
 * Provides frontend integration with the backend API
 */
const D5API = {
    BASE: '/api',

    getToken() { return localStorage.getItem('d5news-token'); },
    setToken(t) { localStorage.setItem('d5news-token', t); },
    removeToken() { localStorage.removeItem('d5news-token'); },
    getUser() { try { return JSON.parse(localStorage.getItem('d5news-user')); } catch { return null; } },
    setUser(u) { localStorage.setItem('d5news-user', JSON.stringify(u)); },
    removeUser() { localStorage.removeItem('d5news-user'); },
    isLoggedIn() { return !!this.getToken(); },
    isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },

    async request(endpoint, options = {}) {
        const headers = { 'Content-Type': 'application/json' };
        const token = this.getToken();
        if (token) headers['Authorization'] = 'Bearer ' + token;
        try {
            const res = await fetch(this.BASE + endpoint, { ...options, headers });
            if (res.status === 401) { this.removeToken(); this.removeUser(); }
            return res;
        } catch (err) {
            console.error('API Error:', err);
            return { ok: false, status: 0, json: async () => ({ error: 'Erreur de connexion' }) };
        }
    },

    // Auth
    async login(email, password) {
        const res = await this.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if (res.ok) { this.setToken(data.token); this.setUser(data.user); }
        return data;
    },
    async register(email, password, full_name) {
        const res = await this.request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, full_name }) });
        const data = await res.json();
        if (res.ok) { this.setToken(data.token); this.setUser(data.user); }
        return data;
    },
    async getMe() {
        const res = await this.request('/auth/me');
        return res.ok ? (await res.json()).user : null;
    },
    logout() { this.removeToken(); this.removeUser(); window.location.href = 'home.html'; },

    // Articles
    async getArticles(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/articles' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { articles: [], total: 0 };
    },
    async getArticle(id) {
        const res = await this.request('/articles/' + id);
        return res.ok ? (await res.json()).article : null;
    },
    async getFeatured() {
        const res = await this.request('/articles/featured');
        return res.ok ? (await res.json()).articles : [];
    },

    // Favorites
    async getFavorites() {
        const res = await this.request('/favorites');
        return res.ok ? (await res.json()).favorites : [];
    },
    async addFavorite(articleId) {
        const res = await this.request('/favorites/' + articleId, { method: 'POST' });
        return res.ok;
    },
    async removeFavorite(articleId) {
        const res = await this.request('/favorites/' + articleId, { method: 'DELETE' });
        return res.ok;
    },

    // Contacts
    async submitContact(data) {
        const res = await this.request('/contacts', { method: 'POST', body: JSON.stringify(data) });
        return await res.json();
    },

    // Newsletter
    async subscribeNewsletter(email) {
        const res = await this.request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
        return await res.json();
    },

    // Subscriptions
    async getPlans() {
        const res = await this.request('/subscriptions/plans');
        return res.ok ? (await res.json()).plans : [];
    },
    async subscribe(plan_type) {
        const res = await this.request('/subscriptions', { method: 'POST', body: JSON.stringify({ plan_type }) });
        return await res.json();
    },

    // Podcasts
    async getPodcasts(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/podcasts' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { podcasts: [], total: 0 };
    },

    // Radio
    async getRadioStreams() {
        const res = await this.request('/radio/streams');
        return res.ok ? (await res.json()).streams : [];
    },

    // Admin
    async adminGetStats() {
        const res = await this.request('/admin/dashboard/stats');
        return res.ok ? await res.json() : null;
    },
    async adminGetUsers(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/admin/users' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { users: [], total: 0 };
    },
    async adminGetContacts(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/admin/contacts' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { contacts: [], total: 0 };
    },
    async adminGetPartners(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/admin/partners' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { partners: [], total: 0 };
    },
    async adminGetLogs(params = {}) {
        const q = new URLSearchParams(params).toString();
        const res = await this.request('/admin/logs' + (q ? '?' + q : ''));
        return res.ok ? await res.json() : { logs: [], total: 0 };
    },
    async adminGetSettings() {
        const res = await this.request('/admin/settings');
        return res.ok ? (await res.json()).settings : [];
    },

    // UI helper: update header based on auth state
    updateAuthUI() {
        const user = this.getUser();
        const authBtns = document.querySelectorAll('[data-auth-area]');
        authBtns.forEach(area => {
            if (user) {
                const initials = user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                area.innerHTML = `
                    <a href="profile.html" class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">${initials}</div>
                    </a>
                `;
            }
        });
    }
};

// Auto-update auth UI on page load
document.addEventListener('DOMContentLoaded', () => D5API.updateAuthUI());
