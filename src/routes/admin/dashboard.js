const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

// GET /api/admin/dashboard/stats
router.get('/stats', (req, res) => {
    const stats = {
        totalUsers: db.prepare('SELECT COUNT(*) as c FROM users').get().c,
        premiumUsers: db.prepare("SELECT COUNT(*) as c FROM users WHERE subscription_type = 'premium'").get().c,
        activeUsers: db.prepare("SELECT COUNT(*) as c FROM users WHERE status = 'active'").get().c,
        totalArticles: db.prepare('SELECT COUNT(*) as c FROM articles').get().c,
        publishedArticles: db.prepare("SELECT COUNT(*) as c FROM articles WHERE status = 'published'").get().c,
        totalViews: db.prepare('SELECT COALESCE(SUM(views_count), 0) as c FROM articles').get().c,
        totalPodcasts: db.prepare('SELECT COUNT(*) as c FROM podcasts').get().c,
        totalPartners: db.prepare('SELECT COUNT(*) as c FROM partners').get().c,
        newContacts: db.prepare("SELECT COUNT(*) as c FROM contacts WHERE status = 'new'").get().c,
        newsletterSubscribers: db.prepare("SELECT COUNT(*) as c FROM newsletter WHERE status = 'active'").get().c,
        revenueEstimate: db.prepare("SELECT COALESCE(SUM(price), 0) as c FROM subscriptions WHERE status = 'active'").get().c,
        recentUsers: db.prepare('SELECT id, full_name, email, role, subscription_type, created_at FROM users ORDER BY created_at DESC LIMIT 5').all(),
        popularArticles: db.prepare(`
            SELECT a.id, a.title, a.views_count, a.published_at, c.name as category_name
            FROM articles a JOIN categories c ON a.category_id = c.id
            WHERE a.status = 'published' ORDER BY a.views_count DESC LIMIT 5
        `).all(),
    };
    res.json(stats);
});

module.exports = router;
