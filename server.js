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

    // Admin subdomain middleware
    // admin.d5newstv.com serves admin pages (index.html, users.html, etc. at root level)
    // Admin pages: index, users, editorial, partners, radio, settings, logs, integrations
    const ADMIN_PAGES = ['index', 'users', 'editorial', 'partners', 'radio', 'settings', 'logs', 'integrations'];
    app.use((req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) {
            // Root -> admin dashboard (index.html)
            if (req.path === '/' || req.path === '') {
                return res.sendFile(path.join(__dirname, 'index.html'));
            }
            // Admin pages are at root level, so /users -> users.html, etc.
            // No rewriting needed since they're already at root
        }
        next();
    });

    // Static files
    app.use(express.static(path.join(__dirname), { extensions: ['html'], index: false }));

    // Root -> home.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'home.html'));
    });

    // 404 fallback
    app.use((req, res) => {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
    });

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).sendFile(path.join(__dirname, '500.html'));
    });

    app.listen(PORT, () => {
        console.log(`D5News server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
