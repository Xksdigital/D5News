const bcrypt = require('bcryptjs');

function runSeed(db) {
    console.log('Seeding database...');

    // Categories
    const categories = [
        { name: 'Politique', slug: 'politique', description: 'Actualites politiques africaines', icon: 'gavel', sort_order: 1 },
        { name: 'Economie', slug: 'economie', description: 'Marches, finance et business en Afrique', icon: 'trending_up', sort_order: 2 },
        { name: 'Culture', slug: 'culture', description: 'Art, musique et patrimoine africain', icon: 'palette', sort_order: 3 },
        { name: 'Sport', slug: 'sport', description: 'Football, CAN et sports africains', icon: 'sports_soccer', sort_order: 4 },
        { name: 'Technologie', slug: 'technologie', description: 'Innovation et startups en Afrique', icon: 'computer', sort_order: 5 },
        { name: 'Environnement', slug: 'environnement', description: 'Climat et developpement durable', icon: 'eco', sort_order: 6 },
        { name: 'Sante', slug: 'sante', description: 'Sante publique et medecine en Afrique', icon: 'health_and_safety', sort_order: 7 },
    ];
    for (const c of categories) {
        db.prepare('INSERT INTO categories (name, slug, description, icon, sort_order) VALUES (?, ?, ?, ?, ?)').run(c.name, c.slug, c.description, c.icon, c.sort_order);
    }

    // Users
    const hash = bcrypt.hashSync('Admin123!', 10);
    const userHash = bcrypt.hashSync('User1234!', 10);
    const users = [
        { email: 'admin@d5news.com', password_hash: hash, full_name: 'Alex Chen', role: 'admin', subscription_type: 'premium' },
        { email: 'aminata@d5news.com', password_hash: hash, full_name: 'Aminata Kouyate', role: 'admin', subscription_type: 'premium' },
        { email: 'marc@d5news.com', password_hash: hash, full_name: 'Marc Diallo', role: 'admin', subscription_type: 'premium' },
        { email: 'sophie@d5news.com', password_hash: hash, full_name: 'Sophie N\'Guessan', role: 'admin', subscription_type: 'premium' },
        { email: 'ibrahim@d5news.com', password_hash: hash, full_name: 'Ibrahim Toure', role: 'admin', subscription_type: 'premium' },
        { email: 'oumar@d5news.com', password_hash: hash, full_name: 'Oumar Keita', role: 'admin', subscription_type: 'premium' },
        { email: 'ama@d5news.com', password_hash: hash, full_name: 'Ama Asante', role: 'admin', subscription_type: 'premium' },
        { email: 'jean@example.com', password_hash: userHash, full_name: 'Jean Dupont', role: 'user', subscription_type: 'premium' },
        { email: 'fatou@example.com', password_hash: userHash, full_name: 'Fatou Diallo', role: 'user', subscription_type: 'free' },
        { email: 'kwame@example.com', password_hash: userHash, full_name: 'Kwame Mensah', role: 'user', subscription_type: 'free' },
    ];
    for (const u of users) {
        db.prepare('INSERT INTO users (email, password_hash, full_name, role, subscription_type) VALUES (?, ?, ?, ?, ?)').run(u.email, u.password_hash, u.full_name, u.role, u.subscription_type);
    }

    // Articles (matching home.html content)
    const articles = [
        {
            title: 'L\'essor des technologies vertes en Afrique de l\'Ouest : une revolution en marche',
            slug: 'essor-technologies-vertes-afrique-ouest',
            content: 'Des startups innovantes transforment le paysage energetique du continent africain. Avec des solutions solaires et ecoresponsables, ces entreprises changent le quotidien de millions de personnes.\n\nL\'Afrique de l\'Ouest connait une veritable revolution verte. Du Senegal au Ghana, en passant par la Cote d\'Ivoire et le Nigeria, des entrepreneurs audacieux developpent des technologies propres adaptees aux realites locales.\n\nLe secteur de l\'energie solaire est en pleine expansion. Des entreprises comme M-KOPA, d.light et Bboxx fournissent deja de l\'electricite a des millions de foyers grace a des systemes solaires domestiques payes via mobile money.\n\nLes gouvernements de la region ont egalement pris conscience de l\'enjeu. Le Plan Senegal Emergent prevoit 30% d\'energies renouvelables dans le mix energetique national d\'ici 2030. Le Ghana a quant a lui lance un programme ambitieux de mini-reseaux solaires pour electrifier les zones rurales.\n\nCette transition energetique cree des emplois et stimule l\'innovation locale. Les incubateurs et accelerateurs dedies aux cleantech se multiplient a Dakar, Accra et Lagos.',
            excerpt: 'Des startups innovantes transforment le paysage energetique du continent, avec des solutions solaires et ecoresponsables qui changent le quotidien de millions de personnes.',
            category_id: 5, author_id: 2, featured_image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop&q=80',
            views_count: 24500, likes_count: 1200, read_time: 12, is_featured: 1, status: 'published',
            published_at: new Date(Date.now() - 2 * 3600000).toISOString()
        },
        {
            title: 'Elections au Senegal : les enjeux du second tour',
            slug: 'elections-senegal-enjeux-second-tour',
            content: 'Le second tour des elections presidentielles au Senegal s\'annonce decisif pour l\'avenir politique du pays. Les deux candidats en lice presentent des visions contrastees pour le developpement national.\n\nLa campagne electorale bat son plein dans les rues de Dakar. Les enjeux sont multiples : emploi des jeunes, reforme de l\'education, politique etrangere et gestion des ressources naturelles.',
            excerpt: 'Le second tour des elections au Senegal s\'annonce decisif pour l\'avenir politique du pays ouest-africain.',
            category_id: 1, author_id: 3, featured_image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&q=80',
            views_count: 18200, likes_count: 890, read_time: 8, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 4 * 3600000).toISOString()
        },
        {
            title: 'BRVM : Les valeurs technologiques tirent le marche vers le haut',
            slug: 'brvm-valeurs-technologiques-marche',
            content: 'La Bourse Regionale des Valeurs Mobilieres enregistre une progression notable portee par les valeurs technologiques. Les analystes prevoient une tendance haussiere pour le trimestre a venir.\n\nLes investisseurs montrent un interet croissant pour les entreprises tech cotees a la BRVM. Cette dynamique reflete la transformation numerique acceleree du continent.',
            excerpt: 'La BRVM enregistre une progression notable portee par les valeurs technologiques et l\'engouement des investisseurs.',
            category_id: 2, author_id: 4, featured_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&q=80',
            views_count: 15600, likes_count: 720, read_time: 7, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 5 * 3600000).toISOString()
        },
        {
            title: 'Intelligence artificielle : comment les startups africaines rivalisent avec la Silicon Valley',
            slug: 'ia-startups-africaines-silicon-valley',
            content: 'Les startups africaines specialisees en intelligence artificielle connaissent une croissance fulgurante. De Lagos a Nairobi, des equipes developpent des solutions IA adaptees aux problematiques du continent.\n\nDans les domaines de la sante, de l\'agriculture et de la finance, l\'IA made in Africa apporte des reponses innovantes a des defis specifiques au continent.',
            excerpt: 'Les startups africaines en IA connaissent une croissance fulgurante, rivalisant avec les geants de la Silicon Valley.',
            category_id: 5, author_id: 5, featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&q=80',
            views_count: 21000, likes_count: 1050, read_time: 8, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 3 * 3600000).toISOString()
        },
        {
            title: 'Union Africaine : vers une monnaie unique pour le continent ?',
            slug: 'union-africaine-monnaie-unique-continent',
            content: 'Le projet de monnaie unique africaine refait surface lors du dernier sommet de l\'Union Africaine. Les debats entre partisans et opposants s\'intensifient.\n\nLes experts economiques sont divises sur la faisabilite et les benefices potentiels d\'une monnaie commune pour le continent africain.',
            excerpt: 'Le projet de monnaie unique africaine refait surface au sommet de l\'UA, divisant experts et dirigeants.',
            category_id: 1, author_id: 6, featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop&q=80',
            views_count: 12400, likes_count: 580, read_time: 11, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 5 * 3600000).toISOString()
        },
        {
            title: 'Agriculture durable : le Ghana mise sur l\'agritech pour nourrir le continent',
            slug: 'agriculture-durable-ghana-agritech',
            content: 'Le Ghana investit massivement dans l\'agritech pour moderniser son agriculture. Les nouvelles technologies permettent d\'optimiser les rendements tout en preservant l\'environnement.\n\nDes drones pour surveiller les cultures, des capteurs IoT pour optimiser l\'irrigation, des plateformes numeriques pour connecter agriculteurs et marches.',
            excerpt: 'Le Ghana investit massivement dans l\'agritech pour moderniser son agriculture et nourrir le continent.',
            category_id: 2, author_id: 7, featured_image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=450&fit=crop&q=80',
            views_count: 9800, likes_count: 430, read_time: 6, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 7 * 3600000).toISOString()
        },
        {
            title: 'CAN 2025 : la Cote d\'Ivoire confirme son statut de favori',
            slug: 'can-2025-cote-ivoire-favori',
            content: 'L\'equipe nationale de Cote d\'Ivoire realise un parcours impressionnant lors de la CAN 2025. Les Elephants confirment leur statut de favoris apres des victoires convaincantes.\n\nLe public ivoirien est en liesse apres cette serie de performances remarquables.',
            excerpt: 'La Cote d\'Ivoire realise un parcours impressionnant et confirme son statut de favori pour la CAN 2025.',
            category_id: 4, author_id: 3, featured_image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop&q=80',
            views_count: 32000, likes_count: 2100, read_time: 5, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 6 * 3600000).toISOString()
        },
        {
            title: 'Festival panafricain du cinema de Ouagadougou : les temps forts',
            slug: 'fespaco-ouagadougou-temps-forts',
            content: 'Le FESPACO 2025 a une nouvelle fois mis en lumiere la richesse et la diversite du cinema africain. Retour sur les moments marquants de cette edition.\n\nDes realisateurs venus de tout le continent ont presente des oeuvres audacieuses et engagees.',
            excerpt: 'Le FESPACO 2025 met en lumiere la richesse du cinema africain avec des oeuvres audacieuses.',
            category_id: 3, author_id: 7, featured_image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop&q=80',
            views_count: 8500, likes_count: 620, read_time: 9, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 8 * 3600000).toISOString()
        },
        {
            title: 'Lutte contre le paludisme : un nouveau vaccin prometteur developpe au Kenya',
            slug: 'paludisme-vaccin-prometteur-kenya',
            content: 'Des chercheurs kenyans annoncent des resultats prometteurs pour un nouveau vaccin contre le paludisme. Les essais cliniques montrent une efficacite superieure aux traitements existants.\n\nCette avancee pourrait revolutionner la lutte contre cette maladie qui touche des millions de personnes en Afrique.',
            excerpt: 'Des chercheurs kenyans annoncent des resultats prometteurs pour un nouveau vaccin antipaludique.',
            category_id: 7, author_id: 5, featured_image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=450&fit=crop&q=80',
            views_count: 14200, likes_count: 890, read_time: 7, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 9 * 3600000).toISOString()
        },
        {
            title: 'Reforestation au Congo : un million d\'arbres plantes en 2025',
            slug: 'reforestation-congo-million-arbres',
            content: 'Le programme de reforestation du bassin du Congo atteint un million d\'arbres plantes en 2025. Cette initiative implique les communautes locales et les organisations internationales.\n\nLe bassin du Congo, deuxieme poumon vert de la planete, beneficie d\'un effort sans precedent pour restaurer ses ecosystemes.',
            excerpt: 'Le programme de reforestation du Congo atteint le cap symbolique d\'un million d\'arbres plantes.',
            category_id: 6, author_id: 6, featured_image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop&q=80',
            views_count: 11500, likes_count: 780, read_time: 6, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 10 * 3600000).toISOString()
        },
        {
            title: 'Marathon de Lagos : record de participation pour l\'edition 2025',
            slug: 'marathon-lagos-record-participation',
            content: 'Le marathon de Lagos 2025 bat tous les records de participation avec plus de 50 000 coureurs inscrits. L\'evenement confirme le dynamisme sportif du Nigeria.\n\nDes athletes venus de 40 pays ont participe a cette edition historique qui a vu tomber le record du parcours.',
            excerpt: 'Le marathon de Lagos 2025 bat tous les records avec 50 000 coureurs de 40 pays.',
            category_id: 4, author_id: 4, featured_image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=450&fit=crop&q=80',
            views_count: 7200, likes_count: 340, read_time: 4, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 12 * 3600000).toISOString()
        },
        {
            title: 'Fintech africaine : les levees de fonds explosent en 2025',
            slug: 'fintech-africaine-levees-fonds-2025',
            content: 'Le secteur fintech africain continue d\'attirer les investisseurs avec des levees de fonds record en 2025. Mobile money, crypto et neobanques portent la croissance.\n\nLes startups fintech africaines ont leve plus de 3 milliards de dollars au premier semestre 2025.',
            excerpt: 'Le secteur fintech africain bat des records de levees de fonds avec plus de 3 milliards en 2025.',
            category_id: 2, author_id: 5, featured_image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&q=80',
            views_count: 16800, likes_count: 920, read_time: 8, is_featured: 0, status: 'published',
            published_at: new Date(Date.now() - 14 * 3600000).toISOString()
        },
    ];
    for (const a of articles) {
        db.prepare('INSERT INTO articles (title, slug, content, excerpt, category_id, author_id, featured_image, views_count, likes_count, read_time, is_featured, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(a.title, a.slug, a.content, a.excerpt, a.category_id, a.author_id, a.featured_image, a.views_count, a.likes_count, a.read_time, a.is_featured, a.status, a.published_at);
    }

    // Podcasts
    const podcasts = [
        { title: 'Le Grand Decryptage : Les enjeux de demain', description: 'Un voyage sonore au coeur des transformations technologiques qui faconnent notre avenir.', author: 'Aminata Kouyate', duration: '45:00', episode_number: 1, season: 1, category: 'Technologie', cover_image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80' },
        { title: 'Echoes of Science', description: 'L\'actualite scientifique decryptee en 15 minutes chrono.', author: 'Ibrahim Toure', duration: '15:00', episode_number: 24, season: 2, category: 'Science', cover_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80' },
        { title: 'Cultures & Mondes', description: 'Histoires et traditions des quatre coins du continent africain.', author: 'Ama Asante', duration: '32:00', episode_number: 18, season: 1, category: 'Culture', cover_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
        { title: 'Le Talk Politique', description: 'Les debats qui agitent le continent et la societe africaine.', author: 'Marc Diallo', duration: '55:00', episode_number: 32, season: 3, category: 'Politique', cover_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80' },
        { title: 'Africa Business Weekly', description: 'Le rendez-vous hebdomadaire de l\'economie africaine.', author: 'Sophie N\'Guessan', duration: '28:00', episode_number: 12, season: 1, category: 'Economie', cover_image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop&q=80' },
        { title: 'Sport Africa', description: 'Toute l\'actualite sportive du continent africain.', author: 'Oumar Keita', duration: '20:00', episode_number: 45, season: 2, category: 'Sport', cover_image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=400&fit=crop&q=80' },
    ];
    for (const p of podcasts) {
        db.prepare('INSERT INTO podcasts (title, description, author, duration, episode_number, season, category, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            .run(p.title, p.description, p.author, p.duration, p.episode_number, p.season, p.category, p.cover_image);
    }

    // Radio streams
    const streams = [
        { title: 'Le Grand Journal du Soir', description: 'Edition Speciale : Analyse des marches mondiaux', host: 'Moussa Diallo', status: 'live', listeners_count: 14200, cover_image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop&q=80' },
        { title: 'Morning Chill & News', description: 'Musique et actualites du matin pour bien demarrer la journee.', host: 'Thomas Durant', status: 'live', listeners_count: 8500, cover_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop&q=80' },
        { title: 'Africa Beats', description: 'Les meilleurs sons du continent en non-stop.', host: 'DJ Kofi', status: 'offline', listeners_count: 0, cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop&q=80' },
        { title: 'Debat du Soir', description: 'Les grandes questions politiques et societales du continent.', host: 'Fatou Sow', status: 'offline', listeners_count: 0, cover_image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=250&fit=crop&q=80' },
    ];
    for (const s of streams) {
        db.prepare('INSERT INTO radio_streams (title, description, host, status, listeners_count, cover_image) VALUES (?, ?, ?, ?, ?, ?)')
            .run(s.title, s.description, s.host, s.status, s.listeners_count, s.cover_image);
    }

    // Partners
    const partners = [
        { name: 'Global Media Corp', description: 'Partenariat de syndication de contenu pour la region Europe.', contact_email: 'contact@globalmedia.com', website: 'https://globalmedia.com', status: 'active', partner_type: 'media', performance_score: 92 },
        { name: 'AfriTech Ventures', description: 'Fonds d\'investissement specialise en startups tech africaines.', contact_email: 'info@afritech.vc', website: 'https://afritech.vc', status: 'active', partner_type: 'finance', performance_score: 88 },
        { name: 'Sahel Broadcasting', description: 'Reseau de diffusion television couvrant l\'Afrique de l\'Ouest.', contact_email: 'press@sahel-tv.com', website: 'https://sahel-tv.com', status: 'active', partner_type: 'media', performance_score: 75 },
        { name: 'EcoAfrica Foundation', description: 'ONG dediee a la preservation de l\'environnement africain.', contact_email: 'hello@ecoafrica.org', website: 'https://ecoafrica.org', status: 'pending', partner_type: 'ong', performance_score: 60 },
        { name: 'Pan-African News Agency', description: 'Agence de presse panafricaine basee a Addis-Abeba.', contact_email: 'desk@pana.africa', website: 'https://pana.africa', status: 'active', partner_type: 'media', performance_score: 95 },
    ];
    for (const p of partners) {
        db.prepare('INSERT INTO partners (name, description, contact_email, website, status, partner_type, performance_score) VALUES (?, ?, ?, ?, ?, ?, ?)')
            .run(p.name, p.description, p.contact_email, p.website, p.status, p.partner_type, p.performance_score);
    }

    // Newsletter subscribers
    const emails = ['fan@d5news.com', 'reader@example.com', 'news@gmail.com', 'info@startup.io', 'tech@africa.com'];
    for (const e of emails) {
        db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(e);
    }

    // Settings
    const settings = [
        { key: 'site_name', value: 'D5News' },
        { key: 'site_description', value: 'L\'info africaine en continu' },
        { key: 'contact_email', value: 'contact@d5news.com' },
        { key: 'articles_per_page', value: '10' },
        { key: 'allow_registration', value: 'true' },
        { key: 'maintenance_mode', value: 'false' },
        { key: 'default_language', value: 'fr' },
        { key: 'newsletter_enabled', value: 'true' },
        { key: 'live_tv_enabled', value: 'true' },
        { key: 'web_radio_enabled', value: 'true' },
    ];
    for (const s of settings) {
        db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(s.key, s.value);
    }

    console.log('Seed completed: 7 categories, 10 users, 12 articles, 6 podcasts, 4 radio streams, 5 partners, 10 settings');
}

// Allow standalone execution
if (require.main === module) {
    const { db, initDatabase } = require('./database');
    initDatabase().then(() => {
        runSeed(db);
        db.save();
        console.log('Seed done.');
        process.exit(0);
    });
}

module.exports = { runSeed };
