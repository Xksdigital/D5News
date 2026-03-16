function validateRequired(fields, body) {
    const missing = fields.filter(f => !body[f] || body[f].toString().trim() === '');
    if (missing.length > 0) {
        return `Champs requis manquants: ${missing.join(', ')}`;
    }
    return null;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

module.exports = { validateRequired, validateEmail, slugify };
