const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/podcasts
router.get('/', (req, res) => {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = '';
    const params = [];

    if (category) {
        where = 'WHERE category = ?';
        params.push(category);
    }

    const podcasts = db.prepare(`
        SELECT * FROM podcasts ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(`SELECT COUNT(*) as count FROM podcasts ${where}`).get(...params);

    res.json({ podcasts, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/podcasts/:id
router.get('/:id', (req, res) => {
    const podcast = db.prepare('SELECT * FROM podcasts WHERE id = ?').get(parseInt(req.params.id));
    if (!podcast) return res.status(404).json({ error: 'Podcast introuvable' });

    db.prepare('UPDATE podcasts SET views_count = views_count + 1 WHERE id = ?').run(podcast.id);
    podcast.views_count++;

    res.json({ podcast });
});

module.exports = router;
