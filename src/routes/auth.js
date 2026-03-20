const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database');
const { authenticate } = require('../middleware/auth');
const { validateRequired, validateEmail, sanitize, validatePassword } = require('../middleware/validate');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const email = sanitize(req.body.email || '').toLowerCase();
        const full_name = sanitize(req.body.full_name || '');
        const password = req.body.password || '';

        const err = validateRequired(['email', 'password', 'full_name'], { email, password, full_name });
        if (err) return res.status(400).json({ error: err });
        if (!validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });
        if (full_name.length > 100) return res.status(400).json({ error: 'Nom trop long (max 100 caracteres)' });

        const pwErr = validatePassword(password);
        if (pwErr) return res.status(400).json({ error: pwErr });

        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existing) return res.status(409).json({ error: 'Cet email est deja utilise' });

        const password_hash = await bcrypt.hash(password, 12); // Increased from 10 to 12 rounds
        const result = db.prepare(
            'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)'
        ).run(email, password_hash, full_name);

        const user = db.prepare('SELECT id, email, full_name, role, subscription_type, status FROM users WHERE id = ?').get(result.lastInsertRowid);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const email = sanitize(req.body.email || '').toLowerCase();
        const password = req.body.password || '';

        const err = validateRequired(['email', 'password'], { email, password });
        if (err) return res.status(400).json({ error: err });

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        // Use constant-time comparison — always hash even if user not found
        if (!user) {
            await bcrypt.hash(password, 12); // Prevent timing attacks
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
        if (user.status === 'suspended') return res.status(403).json({ error: 'Compte suspendu' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { password_hash, ...safeUser } = user;

        res.json({ token, user: safeUser });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// GET /api/auth/me
router.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
