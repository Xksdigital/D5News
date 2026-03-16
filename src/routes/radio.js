const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET /api/radio/streams
router.get('/streams', (req, res) => {
    const streams = db.prepare(`
        SELECT * FROM radio_streams ORDER BY CASE status WHEN 'live' THEN 0 ELSE 1 END, created_at DESC
    `).all();
    res.json({ streams });
});

module.exports = router;
