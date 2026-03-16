const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// GET /api/favorites
router.get('/', (req, res) => {
    const favorites = db.prepare(`
        SELECT f.id as favorite_id, f.created_at as favorited_at,
               a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
        FROM favorites f
        JOIN articles a ON f.article_id = a.id
        JOIN categories c ON a.category_id = c.id
        JOIN users u ON a.author_id = u.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `).all(req.user.id);
    res.json({ favorites });
});

// POST /api/favorites/:articleId
router.post('/:articleId', (req, res) => {
    const articleId = parseInt(req.params.articleId);
    const article = db.prepare('SELECT id FROM articles WHERE id = ?').get(articleId);
    if (!article) return res.status(404).json({ error: 'Article introuvable' });

    try {
        db.prepare('INSERT OR IGNORE INTO favorites (user_id, article_id) VALUES (?, ?)').run(req.user.id, articleId);
        res.status(201).json({ message: 'Article ajoute aux favoris' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// DELETE /api/favorites/:articleId
router.delete('/:articleId', (req, res) => {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND article_id = ?').run(req.user.id, parseInt(req.params.articleId));
    res.json({ message: 'Article retire des favoris' });
});

module.exports = router;
