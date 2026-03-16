const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { validateRequired } = require('../../middleware/validate');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

router.get('/', (req, res) => {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = '';
    const params = [];
    if (status) { where = 'WHERE status = ?'; params.push(status); }

    const partners = db.prepare(`SELECT * FROM partners ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, parseInt(limit), offset);
    const total = db.prepare(`SELECT COUNT(*) as count FROM partners ${where}`).get(...params);
    res.json({ partners, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

router.post('/', (req, res) => {
    const { name, logo, description, contact_email, website, status, partner_type, performance_score } = req.body;
    const err = validateRequired(['name'], req.body);
    if (err) return res.status(400).json({ error: err });

    const result = db.prepare('INSERT INTO partners (name, logo, description, contact_email, website, status, partner_type, performance_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .run(name, logo || '', description || '', contact_email || '', website || '', status || 'active', partner_type || 'media', performance_score || 0);
    logAdminAction(req.user.id, 'create', 'partner', result.lastInsertRowid, { name }, req.ip);
    res.status(201).json({ partner: db.prepare('SELECT * FROM partners WHERE id = ?').get(result.lastInsertRowid) });
});

router.put('/:id', (req, res) => {
    const partner = db.prepare('SELECT * FROM partners WHERE id = ?').get(parseInt(req.params.id));
    if (!partner) return res.status(404).json({ error: 'Partenaire introuvable' });

    const fields = ['name', 'logo', 'description', 'contact_email', 'website', 'status', 'partner_type', 'performance_score'];
    const updates = {};
    fields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    if (!setClauses) return res.status(400).json({ error: 'Aucun champ a mettre a jour' });

    db.prepare(`UPDATE partners SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`).run(...Object.values(updates), partner.id);
    logAdminAction(req.user.id, 'update', 'partner', partner.id, updates, req.ip);
    res.json({ partner: db.prepare('SELECT * FROM partners WHERE id = ?').get(partner.id) });
});

router.delete('/:id', (req, res) => {
    const partner = db.prepare('SELECT * FROM partners WHERE id = ?').get(parseInt(req.params.id));
    if (!partner) return res.status(404).json({ error: 'Partenaire introuvable' });
    db.prepare('DELETE FROM partners WHERE id = ?').run(partner.id);
    logAdminAction(req.user.id, 'delete', 'partner', partner.id, { name: partner.name }, req.ip);
    res.json({ message: 'Partenaire supprime' });
});

module.exports = router;
