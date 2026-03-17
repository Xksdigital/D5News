import articlesData from '../data/mock/articles.json';
import categoriesData from '../data/mock/categories.json';
import podcastsData from '../data/mock/podcasts.json';
import radioData from '../data/mock/radio.json';
import plansData from '../data/mock/plans.json';
import statsData from '../data/mock/stats.json';
import usersData from '../data/mock/users.json';
import contactsData from '../data/mock/contacts.json';
import partnersData from '../data/mock/partners.json';
import logsData from '../data/mock/logs.json';
import settingsData from '../data/mock/settings.json';

// --- Types ---

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  views: number;
  comments: number;
  tags: string[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface Podcast {
  id: number;
  title: string;
  description: string;
  host: string;
  image: string;
  episodes: number;
  category: string;
  duration: string;
  date: string;
  audioUrl: string;
  featured: boolean;
}

export interface RadioStream {
  id: number;
  name: string;
  frequency: string;
  description: string;
  genre: string;
  streamUrl: string;
  isLive: boolean;
  listeners: number;
  image: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  popular: boolean;
}

export interface AdminStats {
  totalArticles: number;
  totalUsers: number;
  totalViews: number;
  totalSubscribers: number;
  activeUsers: number;
  revenue: number;
  articlesToday: number;
  newUsersToday: number;
  viewsToday: number;
  topCategories: { name: string; views: number; percentage: number }[];
  monthlyViews: { month: string; views: number }[];
  recentActivity: { type: string; title: string; time: string }[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  status: string;
  articles: number;
  plan: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  type: string;
}

export interface Partner {
  id: number;
  name: string;
  type: string;
  logo: string;
  website: string;
  status: string;
  since: string;
  description: string;
}

export interface LogEntry {
  id: number;
  action: string;
  user: string;
  details: string;
  date: string;
  type: string;
  level: string;
}

export interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    contactEmail: string;
    language: string;
    timezone: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    googleAnalyticsId: string;
    enableSitemap: boolean;
  };
  content: {
    articlesPerPage: number;
    enableComments: boolean;
    moderateComments: boolean;
    enableNewsletter: boolean;
    enablePodcast: boolean;
    enableRadio: boolean;
    enableLiveTV: boolean;
  };
  notifications: {
    emailOnNewArticle: boolean;
    emailOnNewComment: boolean;
    emailOnNewSubscriber: boolean;
    pushNotifications: boolean;
    slackWebhook: string;
  };
  security: {
    enableTwoFactor: boolean;
    maxLoginAttempts: number;
    sessionTimeout: number;
    enableCaptcha: boolean;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    showTicker: boolean;
    showWeather: boolean;
    layout: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- Helpers ---

function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function paginate<T>(items: T[], page = 1, limit = 12): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return {
    data,
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit),
  };
}

// --- API ---

export const api = {
  // Articles
  getArticles(
    page = 1,
    limit = 12,
    category?: string,
    search?: string
  ): Promise<PaginatedResponse<Article>> {
    let filtered = articlesData as Article[];

    if (category) {
      filtered = filtered.filter((a) => a.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return delay(paginate(filtered, page, limit));
  },

  getFeaturedArticles(): Promise<Article[]> {
    const featured = (articlesData as Article[]).filter((a) => a.featured).slice(0, 5);
    return delay(featured);
  },

  getArticle(id: number | string): Promise<Article | undefined> {
    const articles = articlesData as Article[];
    const article =
      typeof id === 'number'
        ? articles.find((a) => a.id === id)
        : articles.find((a) => a.slug === id || a.id === Number(id));
    return delay(article);
  },

  // Categories
  getCategories(): Promise<Category[]> {
    return delay(categoriesData as Category[]);
  },

  // Podcasts
  getPodcasts(page = 1, limit = 12): Promise<PaginatedResponse<Podcast>> {
    return delay(paginate(podcastsData as Podcast[], page, limit));
  },

  // Radio
  getRadioStreams(): Promise<RadioStream[]> {
    return delay(radioData as RadioStream[]);
  },

  // Plans
  getPlans(): Promise<Plan[]> {
    return delay(plansData as Plan[]);
  },

  // Admin
  getAdminStats(): Promise<AdminStats> {
    return delay(statsData as AdminStats);
  },

  getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    return delay(paginate(usersData as User[], page, limit));
  },

  getContacts(): Promise<Contact[]> {
    return delay(contactsData as Contact[]);
  },

  getPartners(): Promise<Partner[]> {
    return delay(partnersData as Partner[]);
  },

  getLogs(page = 1, limit = 10): Promise<PaginatedResponse<LogEntry>> {
    return delay(paginate(logsData as LogEntry[], page, limit));
  },

  getSettings(): Promise<Settings> {
    return delay(settingsData as Settings);
  },
};

export default api;
