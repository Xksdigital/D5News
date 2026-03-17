require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { initDatabase } = require('./src/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

// Init DB (async) then start server
initDatabase().then(() => {
    // API Routes
    app.use('/api/auth', require('./src/routes/auth'));
    app.use('/api/articles', require('./src/routes/articles'));
    app.use('/api/favorites', require('./src/routes/favorites'));
    app.use('/api/subscriptions', require('./src/routes/subscriptions'));
    app.use('/api/contacts', require('./src/routes/contacts'));
    app.use('/api/newsletter', require('./src/routes/newsletter'));
    app.use('/api/podcasts', require('./src/routes/podcasts'));
    app.use('/api/radio', require('./src/routes/radio'));
    app.use('/api/admin/dashboard', require('./src/routes/admin/dashboard'));
    app.use('/api/admin/articles', require('./src/routes/admin/articles'));
    app.use('/api/admin/users', require('./src/routes/admin/users'));
    app.use('/api/admin/contacts', require('./src/routes/admin/contacts'));
    app.use('/api/admin/newsletter', require('./src/routes/admin/newsletter'));
    app.use('/api/admin/podcasts', require('./src/routes/admin/podcasts'));
    app.use('/api/admin/radio', require('./src/routes/admin/radio'));
    app.use('/api/admin/partners', require('./src/routes/admin/partners'));
    app.use('/api/admin/logs', require('./src/routes/admin/logs'));
    app.use('/api/admin/settings', require('./src/routes/admin/settings'));

    // Coming Soon API (public - no auth needed for GET)
    app.get('/api/coming-soon', (req, res) => {
        const { db } = require('./src/database');
        const row = db.prepare("SELECT value FROM settings WHERE key = 'coming_soon'").get();
        if (row && row.value) {
            try {
                res.json(JSON.parse(row.value));
            } catch { res.json({ enabled: false }); }
        } else {
            res.json({ enabled: false });
        }
    });

    app.put('/api/coming-soon', (req, res) => {
        const { db } = require('./src/database');
        const data = JSON.stringify({
            enabled: !!req.body.coming_soon,
            launch_date: req.body.launch_date || null,
            launch_message: req.body.launch_message || ''
        });
        const existing = db.prepare("SELECT id FROM settings WHERE key = 'coming_soon'").get();
        if (existing) {
            db.prepare("UPDATE settings SET value = ?, updated_at = datetime('now') WHERE key = 'coming_soon'").run(data);
        } else {
            db.prepare("INSERT INTO settings (key, value) VALUES ('coming_soon', ?)").run(data);
        }
        res.json({ success: true });
    });

    // Paths
    const REACT_DIST = path.join(__dirname, 'd5news-react', 'dist');
    const ADMIN_DIR = __dirname; // Admin pages are at root level

    // Admin subdomain middleware - serve admin pages from root
    app.use((req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) {
            if (req.path === '/' || req.path === '') {
                return res.sendFile(path.join(ADMIN_DIR, 'index.html'));
            }
            // Serve admin static files (css, js, images) from root
            return express.static(ADMIN_DIR, { extensions: ['html'], index: false })(req, res, next);
        }
        next();
    });

    // Coming Soon middleware - intercept public site when enabled
    app.use((req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) return next();
        if (req.path.startsWith('/api/')) return next();
        if (req.path.startsWith('/assets/')) return next();
        if (req.path === '/coming-soon' || req.path === '/coming-soon.html') return next();

        const { db } = require('./src/database');
        try {
            const row = db.prepare("SELECT value FROM settings WHERE key = 'coming_soon'").get();
            if (row && row.value) {
                const config = JSON.parse(row.value);
                if (config.enabled) {
                    return res.sendFile(path.join(__dirname, 'coming-soon.html'));
                }
            }
        } catch (e) { /* ignore */ }
        next();
    });

    // Public site: serve React build from d5news-react/dist
    app.use(express.static(REACT_DIST));

    // Also serve root-level static files (images, css, js for admin/coming-soon)
    app.use(express.static(ADMIN_DIR, { extensions: ['html'], index: false }));

    // SPA fallback: all non-API, non-admin routes serve React index.html
    app.get('*', (req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) return next();
        if (req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(REACT_DIST, 'index.html'));
    });

    // 404 fallback (admin only at this point)
    app.use((req, res) => {
        res.status(404).sendFile(path.join(ADMIN_DIR, '404.html'));
    });

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).sendFile(path.join(ADMIN_DIR, '500.html'));
    });

    app.listen(PORT, () => {
        console.log(`D5News server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
