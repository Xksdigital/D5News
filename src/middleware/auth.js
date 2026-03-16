const jwt = require('jsonwebtoken');
const { db } = require('../database');

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requis' });
    }
    try {
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = db.prepare('SELECT id, email, full_name, role, subscription_type, status FROM users WHERE id = ?').get(decoded.id);
        if (!user || user.status === 'suspended') {
            return res.status(401).json({ error: 'Compte invalide ou suspendu' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expire' });
    }
}

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acces reserve aux administrateurs' });
    }
    next();
}

module.exports = { authenticate, requireAdmin };
