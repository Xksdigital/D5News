function validateRequired(fields, body) {
    const missing = fields.filter(f => !body[f] || body[f].toString().trim() === '');
    if (missing.length > 0) {
        return `Champs requis manquants: ${missing.join(', ')}`;
    }
    return null;
}

function validateEmail(email) {
    if (typeof email !== 'string') return false;
    if (email.length > 254) return false; // RFC 5321 max
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sanitize string input — strip HTML tags and dangerous characters
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/[<>]/g, '') // Remove angle brackets (prevent HTML injection)
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove inline event handlers (onclick=, onerror=, etc.)
        .replace(/data:\s*text\/html/gi, '') // Remove data:text/html
        .trim();
}

// Sanitize all string fields in an object
function sanitizeBody(body) {
    if (!body || typeof body !== 'object') return body;
    const clean = {};
    for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string') {
            clean[key] = sanitize(value);
        } else {
            clean[key] = value;
        }
    }
    return clean;
}

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

// Validate password strength
function validatePassword(password) {
    if (typeof password !== 'string') return 'Mot de passe invalide';
    if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caracteres';
    if (password.length > 128) return 'Le mot de passe est trop long';
    return null;
}

module.exports = { validateRequired, validateEmail, sanitize, sanitizeBody, slugify, validatePassword };
