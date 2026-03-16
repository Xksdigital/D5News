const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { validateEmail } = require('../middleware/validate');

// POST /api/newsletter/subscribe
router.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email || !validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });

    const existing = db.prepare('SELECT id, status FROM newsletter WHERE email = ?').get(email);
    if (existing) {
        if (existing.status === 'unsubscribed') {
            db.prepare("UPDATE newsletter SET status = 'active', subscribed_at = datetime('now') WHERE id = ?").run(existing.id);
            return res.json({ message: 'Re-inscription reussie' });
        }
        return res.json({ message: 'Vous etes deja inscrit' });
    }

    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email);
    res.status(201).json({ message: 'Inscription a la newsletter reussie' });
});

module.exports = router;
