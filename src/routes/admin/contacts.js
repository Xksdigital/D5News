const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

// GET /api/admin/contacts
router.get('/', (req, res) => {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = '';
    const params = [];
    if (status) { where = 'WHERE status = ?'; params.push(status); }

    const contacts = db.prepare(`SELECT * FROM contacts ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, parseInt(limit), offset);
    const total = db.prepare(`SELECT COUNT(*) as count FROM contacts ${where}`).get(...params);
    res.json({ contacts, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

// PUT /api/admin/contacts/:id
router.put('/:id', (req, res) => {
    const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(parseInt(req.params.id));
    if (!contact) return res.status(404).json({ error: 'Message introuvable' });

    const { status } = req.body;
    if (status && ['new', 'read', 'responded'].includes(status)) {
        db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, contact.id);
    }
    const updated = db.prepare('SELECT * FROM contacts WHERE id = ?').get(contact.id);
    res.json({ contact: updated });
});

module.exports = router;
