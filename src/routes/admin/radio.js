const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { validateRequired } = require('../../middleware/validate');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

router.post('/streams', (req, res) => {
    const { title, description, stream_url, status, schedule, host, cover_image } = req.body;
    const err = validateRequired(['title'], req.body);
    if (err) return res.status(400).json({ error: err });

    const result = db.prepare('INSERT INTO radio_streams (title, description, stream_url, status, schedule, host, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(title, description || '', stream_url || '', status || 'offline', schedule || '', host || '', cover_image || '');
    logAdminAction(req.user.id, 'create', 'radio_stream', result.lastInsertRowid, { title }, req.ip);
    res.status(201).json({ stream: db.prepare('SELECT * FROM radio_streams WHERE id = ?').get(result.lastInsertRowid) });
});

router.put('/streams/:id', (req, res) => {
    const stream = db.prepare('SELECT * FROM radio_streams WHERE id = ?').get(parseInt(req.params.id));
    if (!stream) return res.status(404).json({ error: 'Flux radio introuvable' });

    const fields = ['title', 'description', 'stream_url', 'status', 'schedule', 'host', 'cover_image', 'listeners_count'];
    const updates = {};
    fields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    if (!setClauses) return res.status(400).json({ error: 'Aucun champ a mettre a jour' });

    db.prepare(`UPDATE radio_streams SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`).run(...Object.values(updates), stream.id);
    logAdminAction(req.user.id, 'update', 'radio_stream', stream.id, updates, req.ip);
    res.json({ stream: db.prepare('SELECT * FROM radio_streams WHERE id = ?').get(stream.id) });
});

router.delete('/streams/:id', (req, res) => {
    const stream = db.prepare('SELECT * FROM radio_streams WHERE id = ?').get(parseInt(req.params.id));
    if (!stream) return res.status(404).json({ error: 'Flux radio introuvable' });
    db.prepare('DELETE FROM radio_streams WHERE id = ?').run(stream.id);
    logAdminAction(req.user.id, 'delete', 'radio_stream', stream.id, { title: stream.title }, req.ip);
    res.json({ message: 'Flux radio supprime' });
});

module.exports = router;
