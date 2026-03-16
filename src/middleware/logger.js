const { db } = require('../database');

function logAdminAction(adminId, action, entityType, entityId, details, ip) {
    db.prepare(`
        INSERT INTO admin_logs (admin_id, action, entity_type, entity_id, details, ip_address)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(adminId, action, entityType || '', entityId || null, JSON.stringify(details || {}), ip || '');
}

module.exports = { logAdminAction };
