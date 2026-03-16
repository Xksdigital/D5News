const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { validateRequired, validateEmail } = require('../../middleware/validate');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

// GET /api/admin/users
router.get('/', (req, res) => {
    const { page = 1, limit = 20, search, role, status, subscription_type } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = 'WHERE 1=1';
    const params = [];

    if (search) { where += ' AND (full_name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (role) { where += ' AND role = ?'; params.push(role); }
    if (status) { where += ' AND status = ?'; params.push(status); }
    if (subscription_type) { where += ' AND subscription_type = ?'; params.push(subscription_type); }

    const users = db.prepare(`
        SELECT id, email, full_name, avatar, role, subscription_type, status, created_at, updated_at
        FROM users ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(`SELECT COUNT(*) as count FROM users ${where}`).get(...params);
    res.json({ users, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/admin/users/export
router.get('/export', (req, res) => {
    const users = db.prepare('SELECT id, email, full_name, role, subscription_type, status, created_at FROM users ORDER BY id').all();
    const csv = ['ID,Email,Nom,Role,Abonnement,Statut,Date inscription'];
    users.forEach(u => csv.push(`${u.id},${u.email},"${u.full_name}",${u.role},${u.subscription_type},${u.status},${u.created_at}`));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users_d5news.csv');
    res.send(csv.join('\n'));
});

// POST /api/admin/users
router.post('/', async (req, res) => {
    const { email, password, full_name, role, subscription_type } = req.body;
    const err = validateRequired(['email', 'password', 'full_name'], req.body);
    if (err) return res.status(400).json({ error: err });
    if (!validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(409).json({ error: 'Email deja utilise' });

    const password_hash = await bcrypt.hash(password, 10);
    const result = db.prepare('INSERT INTO users (email, password_hash, full_name, role, subscription_type) VALUES (?, ?, ?, ?, ?)')
        .run(email, password_hash, full_name, role || 'user', subscription_type || 'free');

    logAdminAction(req.user.id, 'create', 'user', result.lastInsertRowid, { email, full_name }, req.ip);
    const user = db.prepare('SELECT id, email, full_name, role, subscription_type, status, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ user });
});

// PUT /api/admin/users/:id
router.put('/:id', async (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const { full_name, email, role, subscription_type, status, password } = req.body;
    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;
    if (subscription_type !== undefined) updates.subscription_type = subscription_type;
    if (status !== undefined) updates.status = status;
    if (password) updates.password_hash = await bcrypt.hash(password, 10);

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    if (!setClauses) return res.status(400).json({ error: 'Aucun champ a mettre a jour' });

    db.prepare(`UPDATE users SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`).run(...Object.values(updates), user.id);
    logAdminAction(req.user.id, 'update', 'user', user.id, { fields: Object.keys(updates).filter(k => k !== 'password_hash') }, req.ip);

    const updated = db.prepare('SELECT id, email, full_name, role, subscription_type, status, created_at, updated_at FROM users WHERE id = ?').get(user.id);
    res.json({ user: updated });
});

// DELETE /api/admin/users/:id
router.delete('/:id', (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    if (user.id === req.user.id) return res.status(400).json({ error: 'Impossible de supprimer votre propre compte' });

    db.prepare('DELETE FROM users WHERE id = ?').run(user.id);
    logAdminAction(req.user.id, 'delete', 'user', user.id, { email: user.email }, req.ip);
    res.json({ message: 'Utilisateur supprime' });
});

module.exports = router;
