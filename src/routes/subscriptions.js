const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { authenticate } = require('../middleware/auth');

const PLANS = [
    { id: 'free', name: 'Gratuit', price: 0, period: 'month', features: ['5 articles/jour', 'Publicites'] },
    { id: 'premium_monthly', name: 'Premium Mensuel', price: 9.99, period: 'month', features: ['Articles illimites', 'Sans publicite', 'Podcasts exclusifs'] },
    { id: 'premium_annual', name: 'Premium Annuel', price: 89.99, period: 'year', features: ['Articles illimites', 'Sans publicite', 'Podcasts exclusifs', '2 mois offerts'] },
];

// GET /api/subscriptions/plans
router.get('/plans', (req, res) => {
    res.json({ plans: PLANS });
});

// POST /api/subscriptions
router.post('/', authenticate, (req, res) => {
    const { plan_type } = req.body;
    if (!plan_type || !['monthly', 'annual'].includes(plan_type)) {
        return res.status(400).json({ error: 'Type de plan invalide (monthly ou annual)' });
    }

    const price = plan_type === 'monthly' ? 9.99 : 89.99;
    const days = plan_type === 'monthly' ? 30 : 365;
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

    const result = db.prepare(`
        INSERT INTO subscriptions (user_id, plan_type, price, expires_at) VALUES (?, ?, ?, ?)
    `).run(req.user.id, plan_type, price, expires);

    db.prepare("UPDATE users SET subscription_type = 'premium', updated_at = datetime('now') WHERE id = ?").run(req.user.id);

    const subscription = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ subscription });
});

module.exports = router;
