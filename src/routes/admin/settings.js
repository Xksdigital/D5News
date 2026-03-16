const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

router.get('/', (req, res) => {
    const settings = db.prepare('SELECT * FROM settings ORDER BY key').all();
    res.json({ settings });
});

router.put('/', (req, res) => {
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ error: 'Format invalide: settings doit etre un tableau' });

    for (const { key, value } of settings) {
        if (!key) continue;
        const existing = db.prepare('SELECT id FROM settings WHERE key = ?').get(key);
        if (existing) {
            db.prepare("UPDATE settings SET value = ?, updated_by = ?, updated_at = datetime('now') WHERE key = ?").run(value, req.user.id, key);
        } else {
            db.prepare('INSERT INTO settings (key, value, updated_by) VALUES (?, ?, ?)').run(key, value, req.user.id);
        }
    }

    logAdminAction(req.user.id, 'update', 'settings', null, { keys: settings.map(s => s.key) }, req.ip);
    const updated = db.prepare('SELECT * FROM settings ORDER BY key').all();
    res.json({ settings: updated });
});

module.exports = router;
