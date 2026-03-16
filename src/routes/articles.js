const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/articles
router.get('/', (req, res) => {
    const { page = 1, limit = 10, category, search, sort = 'recent' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = "WHERE a.status = 'published'";
    const params = [];

    if (category) {
        where += ' AND c.slug = ?';
        params.push(category);
    }
    if (search) {
        where += ' AND (a.title LIKE ? OR a.excerpt LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    const orderBy = sort === 'popular' ? 'a.views_count DESC' : 'a.published_at DESC';

    const articles = db.prepare(`
        SELECT a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        JOIN users u ON a.author_id = u.id
        ${where}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(`
        SELECT COUNT(*) as count FROM articles a
        JOIN categories c ON a.category_id = c.id
        ${where}
    `).get(...params);

    res.json({ articles, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/articles/featured
router.get('/featured', (req, res) => {
    const articles = db.prepare(`
        SELECT a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        JOIN users u ON a.author_id = u.id
        WHERE a.is_featured = 1 AND a.status = 'published'
        ORDER BY a.published_at DESC
        LIMIT 5
    `).all();
    res.json({ articles });
});

// GET /api/articles/category/:slug
router.get('/category/:slug', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const category = db.prepare('SELECT * FROM categories WHERE slug = ?').get(req.params.slug);
    if (!category) return res.status(404).json({ error: 'Categorie introuvable' });

    const articles = db.prepare(`
        SELECT a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        JOIN users u ON a.author_id = u.id
        WHERE a.category_id = ? AND a.status = 'published'
        ORDER BY a.published_at DESC
        LIMIT ? OFFSET ?
    `).all(category.id, parseInt(limit), offset);

    const total = db.prepare("SELECT COUNT(*) as count FROM articles WHERE category_id = ? AND status = 'published'").get(category.id);

    res.json({ category, articles, total: total.count, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/articles/:id — by id or slug
router.get('/:id', (req, res) => {
    const param = req.params.id;
    const article = isNaN(param)
        ? db.prepare(`
            SELECT a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
            FROM articles a JOIN categories c ON a.category_id = c.id JOIN users u ON a.author_id = u.id
            WHERE a.slug = ? AND a.status = 'published'
        `).get(param)
        : db.prepare(`
            SELECT a.*, c.name as category_name, c.slug as category_slug, u.full_name as author_name
            FROM articles a JOIN categories c ON a.category_id = c.id JOIN users u ON a.author_id = u.id
            WHERE a.id = ? AND a.status = 'published'
        `).get(parseInt(param));

    if (!article) return res.status(404).json({ error: 'Article introuvable' });

    db.prepare('UPDATE articles SET views_count = views_count + 1 WHERE id = ?').run(article.id);
    article.views_count++;

    res.json({ article });
});

module.exports = router;
