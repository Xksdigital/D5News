const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database');
const { authenticate } = require('../middleware/auth');
const { validateRequired, validateEmail } = require('../middleware/validate');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, full_name } = req.body;
        const err = validateRequired(['email', 'password', 'full_name'], req.body);
        if (err) return res.status(400).json({ error: err });
        if (!validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });
        if (password.length < 8) return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caracteres' });

        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existing) return res.status(409).json({ error: 'Cet email est deja utilise' });

        const password_hash = await bcrypt.hash(password, 10);
        const result = db.prepare(
            'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)'
        ).run(email, password_hash, full_name);

        const user = db.prepare('SELECT id, email, full_name, role, subscription_type, status FROM users WHERE id = ?').get(result.lastInsertRowid);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const err = validateRequired(['email', 'password'], req.body);
        if (err) return res.status(400).json({ error: err });

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        if (user.status === 'suspended') return res.status(403).json({ error: 'Compte suspendu' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { password_hash, ...safeUser } = user;

        res.json({ token, user: safeUser });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
