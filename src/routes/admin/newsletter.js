const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

// GET /api/admin/newsletter
router.get('/', (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const subscribers = db.prepare('SELECT * FROM newsletter ORDER BY subscribed_at DESC LIMIT ? OFFSET ?').all(parseInt(limit), offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM newsletter').get();
    res.json({ subscribers, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

module.exports = router;
