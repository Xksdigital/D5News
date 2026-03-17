import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import MaterialIcon from '../../components/shared/MaterialIcon';

export default function Checkout() {
  const { show } = useToast();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [country, setCountry] = useState('FR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      show('Veuillez remplir tous les champs', 'error');
      return;
    }
    show('Paiement effectue avec succes ! Bienvenue chez D5News Premium.', 'success');
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 lg:py-16 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

        {/* Left Column: Checkout Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Finalisez votre abonnement</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Rejoignez la communaute Premium pour un acces illimite a l'information.</p>
          </div>

          {/* Step Indicator + Form */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white font-bold text-sm">1</span>
              <h2 className="text-xl font-bold">Informations de paiement</h2>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Card Holder Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="cardName">Nom complet sur la carte</label>
                <input
                  id="cardName"
                  className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                  placeholder="Jean Dupont"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>

              {/* Card Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="cardNumber">Numero de carte</label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 pl-4 pr-12 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <MaterialIcon name="credit_card" className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Expiration + CVC (2-col grid) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="cardExpiry">Date d'expiration</label>
                  <input
                    id="cardExpiry"
                    className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    placeholder="MM / YY"
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="cardCvc">CVC</label>
                  <input
                    id="cardCvc"
                    className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    placeholder="123"
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                  />
                </div>
              </div>

              {/* Country Select */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="country">Pays ou region</label>
                <select
                  id="country"
                  className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="CA">Canada</option>
                </select>
              </div>

              {/* Pay Button */}
              <div className="pt-4">
                <button
                  className="w-full h-14 bg-primary text-white font-bold rounded-xl text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  <MaterialIcon name="lock" />
                  Payer 99,99&euro;
                </button>
              </div>

              {/* SSL Secure Badge */}
              <div className="flex items-center justify-center gap-6 pt-4 opacity-60">
                <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider">
                  <MaterialIcon name="verified_user" className="text-sm" />
                  SSL Secure
                </div>
                <div className="h-4 w-[1px] bg-slate-400"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Powered by</span>
                  <svg className="h-5 w-auto" fill="currentColor" viewBox="0 0 60 25">
                    <path d="M59.64 14.28c0-4.59-2.48-7.74-6.81-7.74-4.22 0-7.01 3.15-7.01 7.74 0 5.4 3.4 7.68 7.37 7.68 1.95 0 3.33-.35 4.38-.85l-.54-2.18c-.8.36-1.8.61-3.15.61-2.22 0-4.73-1-4.73-4.14h10.45c.03-.33.04-.76.04-1.12zm-10.45-1.92c0-2.43 1.54-3.72 3.58-3.72 2.02 0 3.4 1.3 3.4 3.72h-6.98zm-15.15 9.17c.92.42 2.16.66 3.19.66 3.03 0 4.86-1.51 4.86-4.15 0-3.32-4.52-3.74-4.52-5.59 0-.61.53-1.03 1.48-1.03 1.05 0 2.22.38 2.87.71l.66-2.26c-.8-.44-2.02-.75-3.32-.75-2.8 0-4.8 1.48-4.8 4.09 0 3.4 4.5 3.81 4.5 5.72 0 .79-.7 1.15-1.63 1.15-1.14 0-2.52-.45-3.35-.91l-.94 2.36zm-8.35-15.02h-3.35v14.93h3.35V6.51zm0-3.54h-3.35v2.66h3.35V2.97zm-14.7 3.54h-3.35v3.13c-.63-.9-1.83-1.54-3.46-1.54-3.07 0-5.61 2.65-5.61 7.51 0 5.3 2.76 7.63 5.48 7.63 1.63 0 2.9-.68 3.59-1.55v1.17h3.35V6.51zm-3.41 10.45c0 3.08-1.46 4.38-3.1 4.38-1.74 0-3.09-1.37-3.09-4.38 0-2.9 1.35-4.3 3.09-4.3 1.64 0 3.1 1.41 3.1 4.3zm18.34-10.45h-3.35v14.93h3.35V6.51zm0-3.54h-3.35v2.66h3.35V2.97z"></path>
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 flex flex-col gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            {/* Summary Title */}
            <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Resume de la commande</h2>

            {/* Plan Details Card */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MaterialIcon name="auto_awesome" className="text-primary" filled />
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">Pass Annuel Premium</p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-normal">Facture annuellement. Acces illimite, sans publicite.</p>
                <Link to="/subscription" className="flex items-center gap-1 text-primary text-sm font-bold mt-2 hover:underline">
                  Modifier le plan
                </Link>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold">99,99&euro;</p>
                <p className="text-xs text-slate-500">/an</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex justify-between items-center text-sm">
                <p className="text-slate-500 dark:text-slate-400">Prix HT</p>
                <p className="text-slate-900 dark:text-slate-100">83,33&euro;</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-slate-500 dark:text-slate-400">TVA (20%)</p>
                <p className="text-slate-900 dark:text-slate-100">16,66&euro;</p>
              </div>
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2"></div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total a payer</p>
                <p className="text-2xl font-black text-primary tracking-tight">99,99&euro;</p>
              </div>
            </div>

            {/* Auto-Renewal Note */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                * Votre abonnement sera renouvele automatiquement au tarif de 99,99&euro;/an jusqu'a ce que vous l'annuliez. Vous pouvez annuler a tout moment depuis votre espace client.
              </p>
            </div>

            {/* Benefits with Green Checkmarks */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MaterialIcon name="check_circle" className="text-green-500" filled />
                <span>Acces instantane a tous les articles</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MaterialIcon name="check_circle" className="text-green-500" filled />
                <span>Experience de lecture sans publicite</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MaterialIcon name="check_circle" className="text-green-500" filled />
                <span>Newsletters exclusives reservees aux abonnes</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
