require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { initDatabase } = require('./src/database');

// Security check: JWT_SECRET must be set and strong in production
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    if (process.env.NODE_ENV === 'production') {
        console.error('FATAL: JWT_SECRET must be set and at least 32 characters in production');
        process.exit(1);
    } else {
        console.warn('WARNING: JWT_SECRET is weak or missing. Set a strong secret for production.');
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================

// 1. Helmet — security headers (CSP, HSTS, X-Frame, etc.)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.tailwindcss.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://ui-avatars.com"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
        }
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// 2. CORS — restrict to our domains only
const ALLOWED_ORIGINS = [
    'https://d5newstv.com',
    'https://www.d5newstv.com',
    'https://admin.d5newstv.com',
    'http://localhost:3000',
    'http://localhost:5173',
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (server-to-server, curl, mobile apps)
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 3. Rate Limiting
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // 300 requests per 15 min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de requetes, veuillez reessayer dans quelques minutes' },
});
app.use(globalLimiter);

// Strict rate limit on auth routes (anti brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per 15 min
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de tentatives de connexion, reessayez dans 15 minutes' },
});

// Strict rate limit on public form submissions (anti-spam)
const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 submissions per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de soumissions, reessayez plus tard' },
});

// 4. Body parser with size limit (prevent large payload attacks)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// 5. Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 6. Block access to sensitive files BEFORE static middleware
app.use((req, res, next) => {
    const blocked = [
        '.env', '.git', '.gitignore', 'package.json', 'package-lock.json',
        'node_modules', 'server.js', 'src/', 'data/', '.claude/',
        'd5news-react/src/', 'd5news-react/node_modules/',
        'd5news-react/package.json', 'd5news-react/vite.config',
        'd5news-react/tsconfig', 'd5news-react/.env',
    ];
    const reqPath = decodeURIComponent(req.path).toLowerCase();
    for (const pattern of blocked) {
        if (reqPath === '/' + pattern || reqPath.startsWith('/' + pattern)) {
            return res.status(403).json({ error: 'Acces interdit' });
        }
    }
    // Block database files
    if (reqPath.endsWith('.db') || reqPath.endsWith('.sqlite') || reqPath.endsWith('.sql')) {
        return res.status(403).json({ error: 'Acces interdit' });
    }
    next();
});

// 7. Remove X-Powered-By (extra precaution, helmet does this too)
app.disable('x-powered-by');

// ============================================================
// DATABASE INIT & ROUTES
// ============================================================

initDatabase().then(() => {
    const { authenticate, requireAdmin } = require('./src/middleware/auth');

    // API Routes with rate limiting on sensitive endpoints
    app.use('/api/auth/login', authLimiter);
    app.use('/api/auth/register', authLimiter);
    app.use('/api/auth', require('./src/routes/auth'));

    app.use('/api/articles', require('./src/routes/articles'));
    app.use('/api/favorites', require('./src/routes/favorites'));
    app.use('/api/subscriptions', require('./src/routes/subscriptions'));
    app.use('/api/podcasts', require('./src/routes/podcasts'));
    app.use('/api/radio', require('./src/routes/radio'));

    // Public form endpoints with spam protection
    app.use('/api/contacts', formLimiter, require('./src/routes/contacts'));
    app.use('/api/newsletter', formLimiter, require('./src/routes/newsletter'));

    // Admin routes (all protected by authenticate + requireAdmin)
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

    // Coming Soon API — GET is public, PUT requires admin auth
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

    // SECURED: PUT requires admin authentication
    app.put('/api/coming-soon', authenticate, requireAdmin, (req, res) => {
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

    // ============================================================
    // STATIC FILES & SPA
    // ============================================================

    const REACT_DIST = path.join(__dirname, 'd5news-react', 'dist');
    const ADMIN_DIR = __dirname;

    // Admin subdomain middleware with HTTP Basic Auth
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'D5News@dmin2025!';

    app.use((req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) {
            // Logout endpoint — forces browser to forget cached credentials
            if (req.path === '/logout') {
                res.set('WWW-Authenticate', 'Basic realm="D5News Admin"');
                return res.status(401).send(`
                    <!DOCTYPE html>
                    <html><head><meta charset="utf-8"><title>Deconnexion</title>
                    <style>body{background:#101822;color:#fff;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}
                    .box{text-align:center;}.box h1{font-size:2rem;margin-bottom:1rem;}.box a{color:#0f58bd;text-decoration:none;font-weight:600;}</style>
                    </head><body><div class="box"><h1>Deconnecte</h1><p>Vous avez ete deconnecte avec succes.</p><p><a href="/">Se reconnecter</a></p></div></body></html>
                `);
            }

            // Allow static assets (CSS, JS, images, fonts) without auth
            if (req.path.match(/\.(css|js|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot)$/)) {
                return express.static(ADMIN_DIR, {
                    dotfiles: 'deny',
                })(req, res, next);
            }

            // HTTP Basic Authentication
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Basic ')) {
                res.set('WWW-Authenticate', 'Basic realm="D5News Admin"');
                return res.status(401).send('Authentification requise');
            }

            const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
            const [user, pass] = credentials.split(':');

            if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
                res.set('WWW-Authenticate', 'Basic realm="D5News Admin"');
                return res.status(401).send('Identifiants incorrects');
            }

            // Authenticated — serve admin pages
            if (req.path === '/' || req.path === '') {
                return res.sendFile(path.join(ADMIN_DIR, 'index.html'));
            }
            return express.static(ADMIN_DIR, {
                extensions: ['html'],
                index: false,
                dotfiles: 'deny',
            })(req, res, next);
        }
        next();
    });

    // Coming Soon middleware
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

    // Public site: serve React build (safe — only built assets)
    app.use(express.static(REACT_DIST, {
        dotfiles: 'deny',
        index: 'index.html',
    }));

    // Serve only specific safe static directories from root (for admin pages)
    app.use('/images', express.static(path.join(ADMIN_DIR, 'images'), { dotfiles: 'deny' }));
    app.use('/css', express.static(path.join(ADMIN_DIR, 'css'), { dotfiles: 'deny' }));
    app.use('/js', express.static(path.join(ADMIN_DIR, 'js'), { dotfiles: 'deny' }));

    // SPA fallback
    app.get('*', (req, res, next) => {
        const host = req.hostname || req.headers.host;
        if (host && host.startsWith('admin.')) return next();
        if (req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(REACT_DIST, 'index.html'));
    });

    // 404 fallback
    app.use((req, res) => {
        res.status(404).sendFile(path.join(ADMIN_DIR, '404.html'));
    });

    // Error handler — never leak stack traces in production
    app.use((err, req, res, next) => {
        console.error(err.stack);
        if (err.message === 'Not allowed by CORS') {
            return res.status(403).json({ error: 'Origine non autorisee' });
        }
        const message = process.env.NODE_ENV === 'production'
            ? 'Erreur serveur'
            : err.message;
        res.status(500).json({ error: message });
    });

    app.listen(PORT, () => {
        console.log(`D5News server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
