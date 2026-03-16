const express = require('express');
const router = express.Router();
const { db } = require('../../database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { validateRequired } = require('../../middleware/validate');
const { logAdminAction } = require('../../middleware/logger');

router.use(authenticate, requireAdmin);

router.post('/', (req, res) => {
    const { title, description, audio_url, cover_image, author, duration, episode_number, season, category } = req.body;
    const err = validateRequired(['title'], req.body);
    if (err) return res.status(400).json({ error: err });

    const result = db.prepare('INSERT INTO podcasts (title, description, audio_url, cover_image, author, duration, episode_number, season, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .run(title, description || '', audio_url || '', cover_image || '', author || '', duration || '', episode_number || 1, season || 1, category || 'Actualite');
    logAdminAction(req.user.id, 'create', 'podcast', result.lastInsertRowid, { title }, req.ip);
    res.status(201).json({ podcast: db.prepare('SELECT * FROM podcasts WHERE id = ?').get(result.lastInsertRowid) });
});

router.put('/:id', (req, res) => {
    const podcast = db.prepare('SELECT * FROM podcasts WHERE id = ?').get(parseInt(req.params.id));
    if (!podcast) return res.status(404).json({ error: 'Podcast introuvable' });

    const fields = ['title', 'description', 'audio_url', 'cover_image', 'author', 'duration', 'episode_number', 'season', 'category'];
    const updates = {};
    fields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    if (!setClauses) return res.status(400).json({ error: 'Aucun champ a mettre a jour' });

    db.prepare(`UPDATE podcasts SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`).run(...Object.values(updates), podcast.id);
    logAdminAction(req.user.id, 'update', 'podcast', podcast.id, updates, req.ip);
    res.json({ podcast: db.prepare('SELECT * FROM podcasts WHERE id = ?').get(podcast.id) });
});

router.delete('/:id', (req, res) => {
    const podcast = db.prepare('SELECT * FROM podcasts WHERE id = ?').get(parseInt(req.params.id));
    if (!podcast) return res.status(404).json({ error: 'Podcast introuvable' });
    db.prepare('DELETE FROM podcasts WHERE id = ?').run(podcast.id);
    logAdminAction(req.user.id, 'delete', 'podcast', podcast.id, { title: podcast.title }, req.ip);
    res.json({ message: 'Podcast supprime' });
});

module.exports = router;
