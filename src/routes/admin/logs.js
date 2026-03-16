const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', (req, res) => {
    const { page = 1, limit = 50, admin_id, action, entity_type } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = 'WHERE 1=1';
    const params = [];

    if (admin_id) { where += ' AND l.admin_id = ?'; params.push(parseInt(admin_id)); }
    if (action) { where += ' AND l.action = ?'; params.push(action); }
    if (entity_type) { where += ' AND l.entity_type = ?'; params.push(entity_type); }

    const logs = db.prepare(`
        SELECT l.*, u.full_name as admin_name FROM admin_logs l
        JOIN users u ON l.admin_id = u.id
        ${where} ORDER BY l.created_at DESC LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(`SELECT COUNT(*) as count FROM admin_logs l ${where}`).get(...params);
    res.json({ logs, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

module.exports = router;
