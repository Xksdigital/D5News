import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

type Tab = 'profil' | 'notifications' | 'securite';

export default function Profile() {
  const { user, logout } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('notifications');

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || 'Jean Dupont');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'jean.dupont@email.com');

  // Notification toggles
  const [pushBrowser, setPushBrowser] = useState(true);
  const [mobileAlerts, setMobileAlerts] = useState(false);
  const [emailReminders, setEmailReminders] = useState(true);
  const [breakingNews, setBreakingNews] = useState(true);
  const [dailyNewsletter, setDailyNewsletter] = useState(true);
  const [commentReplies, setCommentReplies] = useState(false);
  const [promos, setPromos] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'JD';

  const handleSave = () => {
    show('Modifications sauvegardees avec succes', 'success');
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      show('Veuillez remplir tous les champs', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      show('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    show('Mot de passe mis a jour avec succes', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const sidebarLinks: { id: Tab; icon: string; label: string }[] = [
    { id: 'profil', icon: 'person', label: 'Profil' },
    { id: 'notifications', icon: 'notifications', label: 'Notifications' },
    { id: 'securite', icon: 'shield', label: 'Securite' },
  ];

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            {/* User Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-4 animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl mb-4">
                  {initials}
                </div>
                <h2 className="text-lg font-bold">{user?.name || 'Jean Dupont'}</h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <MaterialIcon name="star" className="text-amber-500 text-sm" filled />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Premium Account</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Membre depuis Mars 2023</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0 ${
                    activeTab === link.id
                      ? 'font-semibold text-primary bg-primary/5 dark:bg-primary/10 border-l-[3px] border-l-primary'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <MaterialIcon name={link.icon} className="text-xl" />
                  {link.label}
                </button>
              ))}
              <Link
                to="/subscription"
                className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800"
              >
                <MaterialIcon name="credit_card" className="text-xl" />
                Abonnement
              </Link>
              <button
                onClick={() => { logout(); navigate('/home'); }}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <MaterialIcon name="logout" className="text-xl" />
                Se deconnecter
              </button>
            </nav>
          </aside>

          {/* Main Settings Content */}
          <div className="flex-1 min-w-0 animate-fade-in">

            {/* ===== PROFIL TAB ===== */}
            {activeTab === 'profil' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold tracking-tight mb-1">Mon profil</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gerez vos informations personnelles et preferences de compte.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-6">
                  <h2 className="text-base font-bold mb-1">Informations personnelles</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Mettez a jour vos informations de profil.</p>

                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom complet</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Adresse email</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Sauvegarder les modifications
                  </button>
                </div>
              </>
            )}

            {/* ===== NOTIFICATIONS TAB ===== */}
            {activeTab === 'notifications' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold tracking-tight mb-1">Parametres des notifications</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gerez la facon dont vous recevez les alertes et les mises a jour de D5News.</p>
                </div>

                {/* Delivery Channels Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-6">
                  <h2 className="text-base font-bold mb-1">Canaux de reception</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Choisissez comment recevoir vos notifications.</p>

                  <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-800">
                    {/* Browser Push */}
                    <div className="flex items-center justify-between py-5 first:pt-0">
                      <div className="flex items-start gap-4 flex-1 min-w-0 pr-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                          <MaterialIcon name="web" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">Notifications push du navigateur</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recevez des alertes en temps reel directement dans votre navigateur, meme quand D5News est ferme.</p>
                        </div>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={pushBrowser} onChange={() => setPushBrowser(!pushBrowser)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>

                    {/* Mobile Alerts */}
                    <div className="flex items-center justify-between py-5">
                      <div className="flex items-start gap-4 flex-1 min-w-0 pr-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 flex-shrink-0 mt-0.5">
                          <MaterialIcon name="phone_android" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">Alertes mobiles pour emissions marquees</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Soyez notifie sur votre telephone quand vos emissions favorites commencent.</p>
                        </div>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={mobileAlerts} onChange={() => setMobileAlerts(!mobileAlerts)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>

                    {/* Email Reminders */}
                    <div className="flex items-center justify-between py-5 last:pb-0">
                      <div className="flex items-start gap-4 flex-1 min-w-0 pr-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                          <MaterialIcon name="mail" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">Rappels par email</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recevez un recapitulatif quotidien des articles importants et des mises a jour de la plateforme.</p>
                        </div>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={emailReminders} onChange={() => setEmailReminders(!emailReminders)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notification Test Section */}
                <div className="border-2 border-dashed border-primary/30 dark:border-primary/20 rounded-xl p-6 sm:p-8 mb-6 bg-primary/5 dark:bg-primary/5">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <MaterialIcon name="science" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold mb-1">Tester vos notifications</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Verifiez que vos canaux de notification fonctionnent correctement en envoyant un message de test.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => show('Notification push de test envoyee !', 'success')}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                    >
                      <MaterialIcon name="notifications_active" className="text-lg" />
                      Tester le Push
                    </button>
                    <button
                      onClick={() => show('Email de test envoye !', 'success')}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
                    >
                      <MaterialIcon name="forward_to_inbox" className="text-lg" />
                      Email de test
                    </button>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-6">
                  <h2 className="text-base font-bold mb-1">Types de notifications</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Selectionnez les types de contenus pour lesquels vous souhaitez etre notifie.</p>

                  <div className="space-y-0 divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex items-center justify-between py-4 first:pt-0">
                      <div>
                        <h3 className="text-sm font-semibold">Breaking news</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Alertes pour les actualites majeures</p>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={breakingNews} onChange={() => setBreakingNews(!breakingNews)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-sm font-semibold">Newsletter quotidienne</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Resume des articles du jour</p>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={dailyNewsletter} onChange={() => setDailyNewsletter(!dailyNewsletter)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-sm font-semibold">Reponses aux commentaires</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Quand quelqu'un repond a votre commentaire</p>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={commentReplies} onChange={() => setCommentReplies(!commentReplies)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 last:pb-0">
                      <div>
                        <h3 className="text-sm font-semibold">Offres et promotions</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Offres speciales et reductions Premium</p>
                      </div>
                      <label className="toggle-switch flex-shrink-0">
                        <input type="checkbox" checked={promos} onChange={() => setPromos(!promos)} />
                        <div className="toggle-track"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save / Cancel Buttons */}
                <div className="flex items-center justify-end gap-3">
                  <button className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Sauvegarder les modifications
                  </button>
                </div>
              </>
            )}

            {/* ===== SECURITE TAB ===== */}
            {activeTab === 'securite' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold tracking-tight mb-1">Securite du compte</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gerez votre mot de passe et la securite de votre compte D5News.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-6">
                  <h2 className="text-base font-bold mb-1">Changer le mot de passe</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Mettez a jour votre mot de passe pour securiser votre compte.</p>

                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mot de passe actuel</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                        placeholder="Entrez votre mot de passe actuel"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                        placeholder="Entrez un nouveau mot de passe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                        placeholder="Confirmez le nouveau mot de passe"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Annuler
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    Mettre a jour le mot de passe
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
