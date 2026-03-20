const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { validateRequired, validateEmail, sanitizeBody } = require('../middleware/validate');

// POST /api/contacts
router.post('/', (req, res) => {
    const body = sanitizeBody(req.body);
    const { name, email, subject, message } = body;
    const err = validateRequired(['name', 'email', 'subject', 'message'], body);
    if (err) return res.status(400).json({ error: err });
    if (!validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });

    // Length limits
    if (name.length > 100) return res.status(400).json({ error: 'Nom trop long (max 100 caracteres)' });
    if (subject.length > 200) return res.status(400).json({ error: 'Sujet trop long (max 200 caracteres)' });
    if (message.length > 5000) return res.status(400).json({ error: 'Message trop long (max 5000 caracteres)' });

    db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)').run(name, email, subject, message);
    res.status(201).json({ message: 'Message envoye avec succes' });
});

module.exports = router;
