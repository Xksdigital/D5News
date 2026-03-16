const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
const DB_PATH = path.join(DATA_DIR, 'd5news.db');

// Wrapper providing better-sqlite3 compatible API over sql.js
class DatabaseWrapper {
    constructor() {
        this._db = null;
        this._dirty = false;
    }

    async init() {
        const SQL = await initSqlJs();
        if (fs.existsSync(DB_PATH)) {
            const buffer = fs.readFileSync(DB_PATH);
            this._db = new SQL.Database(buffer);
        } else {
            this._db = new SQL.Database();
        }
        // Auto-save every 5 seconds
        setInterval(() => { if (this._dirty) { this.save(); this._dirty = false; } }, 5000);
        return this;
    }

    save() {
        const data = this._db.export();
        fs.writeFileSync(DB_PATH, Buffer.from(data));
    }

    exec(sql) {
        this._db.run(sql);
        this._dirty = true;
    }

    pragma(str) {
        try { this._db.run(`PRAGMA ${str}`); } catch (e) { /* ignore */ }
    }

    prepare(sql) {
        const self = this;
        return {
            get(...params) {
                const stmt = self._db.prepare(sql);
                if (params.length > 0) stmt.bind(params);
                if (stmt.step()) { const r = stmt.getAsObject(); stmt.free(); return r; }
                stmt.free();
                return undefined;
            },
            all(...params) {
                const results = [];
                const stmt = self._db.prepare(sql);
                if (params.length > 0) stmt.bind(params);
                while (stmt.step()) results.push(stmt.getAsObject());
                stmt.free();
                return results;
            },
            run(...params) {
                if (params.length > 0) {
                    const stmt = self._db.prepare(sql);
                    stmt.bind(params);
                    stmt.step();
                    stmt.free();
                } else {
                    self._db.run(sql);
                }
                self._dirty = true;
                const info = self._db.exec('SELECT last_insert_rowid() as lid, changes() as chg');
                const lid = info[0] ? info[0].values[0][0] : 0;
                const chg = info[0] ? info[0].values[0][1] : 0;
                return { lastInsertRowid: lid, changes: chg };
            }
        };
    }
}

const db = new DatabaseWrapper();

async function initDatabase() {
    await db.init();
    db.pragma('foreign_keys = ON');

    // Split CREATE statements to avoid sql.js multi-statement issues
    const statements = [
        `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, full_name TEXT NOT NULL, avatar TEXT DEFAULT NULL, role TEXT NOT NULL DEFAULT 'user', subscription_type TEXT NOT NULL DEFAULT 'free', status TEXT NOT NULL DEFAULT 'active', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`,
        `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, slug TEXT UNIQUE NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`,
        `CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, content TEXT NOT NULL DEFAULT '', excerpt TEXT DEFAULT '', category_id INTEGER NOT NULL, author_id INTEGER NOT NULL, featured_image TEXT DEFAULT '', published_at TEXT DEFAULT NULL, views_count INTEGER DEFAULT 0, likes_count INTEGER DEFAULT 0, read_time INTEGER DEFAULT 5, is_featured INTEGER DEFAULT 0, status TEXT NOT NULL DEFAULT 'draft', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (category_id) REFERENCES categories(id), FOREIGN KEY (author_id) REFERENCES users(id))`,
        `CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, article_id INTEGER NOT NULL, created_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id, article_id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE)`,
        `CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, plan_type TEXT NOT NULL, price REAL NOT NULL, status TEXT NOT NULL DEFAULT 'active', starts_at TEXT NOT NULL DEFAULT (datetime('now')), expires_at TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`,
        `CREATE TABLE IF NOT EXISTS podcasts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT DEFAULT '', audio_url TEXT DEFAULT '', cover_image TEXT DEFAULT '', author TEXT DEFAULT '', duration TEXT DEFAULT '', episode_number INTEGER DEFAULT 1, season INTEGER DEFAULT 1, category TEXT DEFAULT 'Actualite', published_at TEXT DEFAULT (datetime('now')), views_count INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`,
        `CREATE TABLE IF NOT EXISTS radio_streams (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT DEFAULT '', stream_url TEXT DEFAULT '', status TEXT NOT NULL DEFAULT 'offline', schedule TEXT DEFAULT '', host TEXT DEFAULT '', cover_image TEXT DEFAULT '', listeners_count INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`,
        `CREATE TABLE IF NOT EXISTS partners (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, logo TEXT DEFAULT '', description TEXT DEFAULT '', contact_email TEXT DEFAULT '', website TEXT DEFAULT '', status TEXT NOT NULL DEFAULT 'active', partner_type TEXT DEFAULT 'media', performance_score INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`,
        `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')))`,
        `CREATE TABLE IF NOT EXISTS newsletter (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, subscribed_at TEXT DEFAULT (datetime('now')), status TEXT NOT NULL DEFAULT 'active')`,
        `CREATE TABLE IF NOT EXISTS admin_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, admin_id INTEGER NOT NULL, action TEXT NOT NULL, entity_type TEXT DEFAULT '', entity_id INTEGER DEFAULT NULL, details TEXT DEFAULT '', ip_address TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (admin_id) REFERENCES users(id))`,
        `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT UNIQUE NOT NULL, value TEXT DEFAULT '', updated_by INTEGER DEFAULT NULL, updated_at TEXT DEFAULT (datetime('now')), FOREIGN KEY (updated_by) REFERENCES users(id))`,
        `CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug)`,
        `CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id)`,
        `CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status)`,
        `CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug)`,
        `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
        `CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id)`,
    ];

    for (const stmt of statements) {
        db.exec(stmt);
    }

    // Auto-seed if database is empty
    const count = db.prepare('SELECT COUNT(*) as c FROM categories').get();
    if (!count || count.c === 0) {
        console.log('Database empty, running auto-seed...');
        require('./seed').runSeed(db);
        db.save();
    }

    console.log('Database initialized');
}

module.exports = { db, initDatabase };
