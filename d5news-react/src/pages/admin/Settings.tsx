import { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const STORAGE_KEY = 'd5news_admin_settings';

interface SettingsData {
  siteName: string;
  siteDescription: string;
  defaultLang: string;
  timezone: string;
  twoFactor: boolean;
  sessionExpiry: string;
  ipWhitelist: string;
  smtpServer: string;
  senderEmail: string;
  maintenanceMode: boolean;
  backupSchedule: string;
}

const defaultSettings: SettingsData = {
  siteName: 'D5News',
  siteDescription: "Plateforme d'information et de media numerique de nouvelle generation.",
  defaultLang: 'fr',
  timezone: 'Europe/Paris',
  twoFactor: true,
  sessionExpiry: '30',
  ipWhitelist: '192.168.1.0/24\n10.0.0.0/8',
  smtpServer: 'smtp.d5news.com',
  senderEmail: 'noreply@d5news.com',
  maintenanceMode: false,
  backupSchedule: 'daily',
};

function loadSettings(): SettingsData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
  } catch { /* ignore */ }
  return defaultSettings;
}

export default function Settings() {
  const { show } = useToast();
  const [settings, setSettings] = useState<SettingsData>(loadSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const update = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setHasChanges(false);
    show('Parametres enregistres avec succes', 'success');
  };

  const handleCancel = () => {
    setSettings(loadSettings());
    setHasChanges(false);
    show('Modifications annulees', 'info');
  };

  const handleBackup = () => {
    show('Backup manuel lance...', 'info');
    setTimeout(() => show('Backup termine avec succes (2.4 GB)', 'success'), 1500);
  };

  // Warn on unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasChanges) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasChanges]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-black tracking-tight mb-1">Parametres Systeme</h1>
        <p className="text-slate-500 dark:text-slate-400">Configurez les parametres globaux de la plateforme D5News.</p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6 stagger-children">

        {/* General Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
              <MaterialIcon name="tune" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Parametres Generaux</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Informations de base du site</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Nom du site</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => update('siteName', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description du site</label>
              <textarea
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => update('siteDescription', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                placeholder="Decrivez votre plateforme..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Langue par defaut</label>
                <select
                  value={settings.defaultLang}
                  onChange={(e) => update('defaultLang', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                >
                  <option value="fr">Francais (FR)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Fuseau horaire</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => update('timezone', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                  <option value="Africa/Lagos">Africa/Lagos (UTC+1)</option>
                  <option value="UTC">UTC (UTC+0)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
              <MaterialIcon name="shield" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Securite</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Authentification et controle d'acces</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Authentification a deux facteurs (2FA)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Exiger la 2FA pour tous les comptes administrateurs</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.twoFactor} onChange={(e) => update('twoFactor', e.target.checked)} />
                <div className="toggle-track"></div>
              </label>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
              <label className="block text-sm font-semibold mb-2">Expiration de session</label>
              <select
                value={settings.sessionExpiry}
                onChange={(e) => update('sessionExpiry', e.target.value)}
                className="w-full md:w-64 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="120">2 heures</option>
              </select>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
              <label className="block text-sm font-semibold mb-2">Liste blanche d'adresses IP</label>
              <textarea
                rows={3}
                value={settings.ipWhitelist}
                onChange={(e) => update('ipWhitelist', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none font-mono"
                placeholder="Entrez une adresse IP par ligne..."
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Une adresse IP ou un sous-reseau CIDR par ligne. Laissez vide pour autoriser toutes les IP.</p>
            </div>
          </div>
        </div>

        {/* Email & Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
              <MaterialIcon name="mail" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email & Notifications</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configuration du serveur de messagerie</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Serveur SMTP</label>
                <input
                  type="text"
                  value={settings.smtpServer}
                  onChange={(e) => update('smtpServer', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email expediteur</label>
                <input
                  type="email"
                  value={settings.senderEmail}
                  onChange={(e) => update('senderEmail', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
              <button onClick={() => show('Gestion des templates (bientot disponible)', 'info')} className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                <MaterialIcon name="edit_note" className="text-lg" />
                Gerer les templates d'emails
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
              <MaterialIcon name="build" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Maintenance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mode maintenance et sauvegardes</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Mode Maintenance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Desactiver l'acces public au site</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => update('maintenanceMode', e.target.checked)} />
                <div className="toggle-track"></div>
              </label>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg">
              <MaterialIcon name="warning" className="text-amber-600 text-lg mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">Activer le mode maintenance rendra le site inaccessible pour tous les utilisateurs non-administrateurs. Utilisez cette option uniquement lors de mises a jour critiques.</p>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
              <div>
                <label className="block text-sm font-semibold mb-2">Planification des backups</label>
                <select
                  value={settings.backupSchedule}
                  onChange={(e) => update('backupSchedule', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                >
                  <option value="daily">Quotidien (02:00 UTC)</option>
                  <option value="weekly">Hebdomadaire (Dimanche 02:00 UTC)</option>
                  <option value="monthly">Mensuel (1er du mois 02:00 UTC)</option>
                </select>
              </div>
              <div>
                <button onClick={handleBackup} className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
                  <MaterialIcon name="backup" className="text-lg" />
                  Lancer un backup manuel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 animate-fade-in">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all ${hasChanges ? 'ring-2 ring-primary/50' : ''}`}
        >
          <MaterialIcon name="save" className="text-lg" />
          Enregistrer les modifications
          {hasChanges && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
        </button>
        <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
          Annuler
        </button>
      </div>
    </div>
  );
}
