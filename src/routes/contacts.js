const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { validateRequired, validateEmail } = require('../middleware/validate');

// POST /api/contacts
router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    const err = validateRequired(['name', 'email', 'subject', 'message'], req.body);
    if (err) return res.status(400).json({ error: err });
    if (!validateEmail(email)) return res.status(400).json({ error: 'Email invalide' });

    db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)').run(name, email, subject, message);
    res.status(201).json({ message: 'Message envoye avec succes' });
});

module.exports = router;
