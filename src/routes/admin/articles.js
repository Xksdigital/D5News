const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { validateRequired, slugify } = require('../../middleware/validate');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

// POST /api/admin/articles
router.post('/', (req, res) => {
    const { title, content, excerpt, category_id, featured_image, is_featured, status } = req.body;
    const err = validateRequired(['title', 'content', 'category_id'], req.body);
    if (err) return res.status(400).json({ error: err });

    const slug = slugify(title);
    const result = db.prepare(`
        INSERT INTO articles (title, slug, content, excerpt, category_id, author_id, featured_image, is_featured, status, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, content, excerpt || '', parseInt(category_id), req.user.id, featured_image || '', is_featured ? 1 : 0, status || 'draft', status === 'published' ? new Date().toISOString() : null);

    logAdminAction(req.user.id, 'create', 'article', result.lastInsertRowid, { title }, req.ip);
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ article });
});

// PUT /api/admin/articles/:id
router.put('/:id', (req, res) => {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(parseInt(req.params.id));
    if (!article) return res.status(404).json({ error: 'Article introuvable' });

    const { title, content, excerpt, category_id, featured_image, is_featured, status } = req.body;
    const updates = {};
    if (title !== undefined) { updates.title = title; updates.slug = slugify(title); }
    if (content !== undefined) updates.content = content;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (category_id !== undefined) updates.category_id = parseInt(category_id);
    if (featured_image !== undefined) updates.featured_image = featured_image;
    if (is_featured !== undefined) updates.is_featured = is_featured ? 1 : 0;
    if (status !== undefined) {
        updates.status = status;
        if (status === 'published' && !article.published_at) updates.published_at = new Date().toISOString();
    }

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    if (!setClauses) return res.status(400).json({ error: 'Aucun champ a mettre a jour' });

    db.prepare(`UPDATE articles SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`).run(...Object.values(updates), article.id);
    logAdminAction(req.user.id, 'update', 'article', article.id, updates, req.ip);

    const updated = db.prepare('SELECT * FROM articles WHERE id = ?').get(article.id);
    res.json({ article: updated });
});

// DELETE /api/admin/articles/:id
router.delete('/:id', (req, res) => {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(parseInt(req.params.id));
    if (!article) return res.status(404).json({ error: 'Article introuvable' });

    db.prepare('DELETE FROM articles WHERE id = ?').run(article.id);
    logAdminAction(req.user.id, 'delete', 'article', article.id, { title: article.title }, req.ip);
    res.json({ message: 'Article supprime' });
});

module.exports = router;
