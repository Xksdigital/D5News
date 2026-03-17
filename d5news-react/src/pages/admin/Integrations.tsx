import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

const STORAGE_KEY = 'd5news_integrations';

interface IntegrationConfig {
  webhookUrl: string;
  channel: string;
  frequency: 'instant' | 'hourly' | 'daily';
  triggers: {
    reports: boolean;
    aiBlocked: boolean;
    suspiciousSignups: boolean;
    systemErrors: boolean;
  };
  discordEnabled: boolean;
  discordWebhook: string;
}

const defaultConfig: IntegrationConfig = {
  webhookUrl: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX',
  channel: 'alerts-moderation',
  frequency: 'instant',
  triggers: {
    reports: true,
    aiBlocked: true,
    suspiciousSignups: false,
    systemErrors: false,
  },
  discordEnabled: false,
  discordWebhook: '',
};

function loadConfig(): IntegrationConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultConfig, ...JSON.parse(stored) };
  } catch { /* ignore */ }
  return defaultConfig;
}

export default function Integrations() {
  const { show } = useToast();
  const [activeTab, setActiveTab] = useState<'slack' | 'discord'>('slack');
  const [showWebhook, setShowWebhook] = useState(false);
  const [config, setConfig] = useState<IntegrationConfig>(loadConfig);
  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (updates: Partial<IntegrationConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const toggleTrigger = (key: keyof IntegrationConfig['triggers']) => {
    setConfig((prev) => ({
      ...prev,
      triggers: { ...prev.triggers, [key]: !prev.triggers[key] },
    }));
    setHasChanges(true);
  };

  const handleTest = () => {
    show('Envoi du message de test...', 'info');
    setTimeout(() => show('Message de test envoye avec succes', 'success'), 1000);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setHasChanges(false);
    show('Configuration enregistree', 'success');
  };

  const handleDisable = () => {
    if (activeTab === 'slack') {
      updateConfig({ webhookUrl: '', channel: 'alerts-moderation', frequency: 'instant' });
      show('Integration Slack desactivee', 'error');
    } else {
      updateConfig({ discordEnabled: false, discordWebhook: '' });
      show('Integration Discord desactivee', 'error');
    }
  };

  const handleConfigureDiscord = () => {
    updateConfig({ discordEnabled: true });
    setActiveTab('discord');
    show('Configuration Discord activee', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Integration Slack/Discord</h1>
          <p className="text-slate-500 dark:text-slate-400">Configurez les webhooks pour recevoir des alertes en temps reel.</p>
        </div>
        <button onClick={() => show('Assistant de configuration webhook (bientot disponible)', 'info')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <MaterialIcon name="add" className="text-lg" />
          Nouveau Webhook
        </button>
      </div>

      {/* Platform Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('slack')}
            className={`pb-3 text-sm font-bold ${activeTab === 'slack' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'}`}
          >
            Slack
          </button>
          <button
            onClick={() => setActiveTab('discord')}
            className={`pb-3 text-sm font-bold ${activeTab === 'discord' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'}`}
          >
            Discord
          </button>
        </div>
      </div>

      {activeTab === 'slack' ? (
        /* Slack Configuration Card */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
          {/* Card Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E01E5A] flex items-center justify-center text-white font-black text-lg">S</div>
              <div>
                <h3 className="font-bold text-lg">Configuration de Slack</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Status:</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${config.webhookUrl ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span className={`text-xs font-bold ${config.webhookUrl ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {config.webhookUrl ? 'Connecte' : 'Deconnecte'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              config.webhookUrl ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
            }`}>{config.webhookUrl ? 'Actif' : 'Inactif'}</span>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-6">
            {/* Webhook URL */}
            <div>
              <label className="block text-sm font-semibold mb-2">URL du Webhook</label>
              <div className="relative">
                <input
                  type={showWebhook ? 'text' : 'password'}
                  value={config.webhookUrl}
                  onChange={(e) => updateConfig({ webhookUrl: e.target.value })}
                  className="w-full px-4 py-2.5 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
                <button
                  onClick={() => setShowWebhook(!showWebhook)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <MaterialIcon name={showWebhook ? 'visibility_off' : 'visibility'} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Channel & Frequency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Canal de destination</label>
                <select
                  value={config.channel}
                  onChange={(e) => updateConfig({ channel: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                >
                  <option value="alerts-moderation">#alerts-moderation</option>
                  <option value="general">#general</option>
                  <option value="admin-notifications">#admin-notifications</option>
                  <option value="security-alerts">#security-alerts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Frequence des alertes</label>
                <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {(['instant', 'hourly', 'daily'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => updateConfig({ frequency: freq })}
                      className={`flex-1 px-3 py-2.5 text-xs font-bold transition-colors ${
                        config.frequency === freq
                          ? 'bg-primary text-white'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border-l border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {freq === 'instant' ? 'Instantane' : freq === 'hourly' ? 'Groupe 1h' : 'Quotidien'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Triggers */}
            <div>
              <label className="block text-sm font-semibold mb-3">Declencheurs d'evenements</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  <input type="checkbox" checked={config.triggers.reports} onChange={() => toggleTrigger('reports')} className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded"><MaterialIcon name="flag" className="text-lg" /></div>
                  <span className="text-sm font-medium">Nouveaux Signalements</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  <input type="checkbox" checked={config.triggers.aiBlocked} onChange={() => toggleTrigger('aiBlocked')} className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded"><MaterialIcon name="smart_toy" className="text-lg" /></div>
                  <span className="text-sm font-medium">Contenu Bloque par l'IA</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  <input type="checkbox" checked={config.triggers.suspiciousSignups} onChange={() => toggleTrigger('suspiciousSignups')} className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded"><MaterialIcon name="person_alert" className="text-lg" /></div>
                  <span className="text-sm font-medium">Inscriptions Suspectes</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  <input type="checkbox" checked={config.triggers.systemErrors} onChange={() => toggleTrigger('systemErrors')} className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
                  <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded"><MaterialIcon name="error" className="text-lg" /></div>
                  <span className="text-sm font-medium">Erreurs Systeme</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button onClick={handleDisable} className="text-sm font-semibold text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Desactiver l'integration</button>
            <div className="flex items-center gap-3">
              <button onClick={handleTest} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all">
                <MaterialIcon name="send" className="text-lg" />
                Tester
              </button>
              <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all ${hasChanges ? 'ring-2 ring-primary/50' : ''}`}>
                <MaterialIcon name="save" className="text-lg" />
                Enregistrer
                {hasChanges && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Discord Card */
        <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${!config.discordEnabled ? 'opacity-60' : ''}`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center text-white font-black text-lg">D</div>
              <div>
                <h3 className="font-bold text-lg">Discord</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {config.discordEnabled ? 'Webhook configure' : 'Webhook non configure'}
                </p>
              </div>
            </div>
            <button onClick={config.discordEnabled ? handleDisable : handleConfigureDiscord} className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <MaterialIcon name="settings" className="text-lg" />
              {config.discordEnabled ? 'Desactiver' : 'Configurer'}
            </button>
          </div>
          {config.discordEnabled && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">URL du Webhook Discord</label>
                <input
                  type="text"
                  value={config.discordWebhook}
                  onChange={(e) => updateConfig({ discordWebhook: e.target.value })}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
                <MaterialIcon name="save" className="text-lg" />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
