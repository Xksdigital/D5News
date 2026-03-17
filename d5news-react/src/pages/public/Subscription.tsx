import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, type Plan } from '../../services/api';
import MaterialIcon from '../../components/shared/MaterialIcon';

export default function Subscription() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    api.getPlans().then((data) => {
      setPlans(data);
      setLoading(false);
    });
  }, []);

  const faqItems = [
    {
      question: "Puis-je annuler mon abonnement a tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement a tout moment depuis les parametres de votre compte. L'acces Premium reste actif jusqu'a la fin de la periode de facturation en cours.",
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Pour les abonnements annuels, le virement bancaire est egalement disponible.",
    },
    {
      question: "Puis-je partager mon compte avec d'autres personnes ?",
      answer: "Chaque abonnement est personnel et lie a un seul compte. Pour les equipes ou les entreprises, nous proposons des offres speciales avec des tarifs degressifs. Contactez-nous pour plus d'informations.",
    },
    {
      question: "Y a-t-il une periode d'essai gratuite ?",
      answer: "Oui, nous offrons 14 jours d'essai gratuit pour les nouveaux abonnes Premium. Aucun paiement n'est requis pendant la periode d'essai, et vous pouvez annuler a tout moment.",
    },
    {
      question: "Comment fonctionne la suppression des publicites ?",
      answer: "Des que votre abonnement Premium est actif, toutes les publicites sont automatiquement supprimees de votre experience de lecture, y compris les bannieres, les interstitiels et les videos pre-roll.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center relative animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
            <MaterialIcon name="star" className="text-lg" filled />
            Premium
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">D5News Premium</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Accedez a l'information sans limites. Analyses exclusives, contenu premium, et une experience de lecture sans publicite.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-8 flex flex-col relative ${
                plan.popular
                  ? 'border-2 border-primary shadow-xl shadow-primary/10'
                  : 'border border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">Recommande</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-primary' : ''}`}>
                    {plan.price}&euro;
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/{plan.period}</span>
                </div>
                {plan.name === 'Enterprise' && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">Solution entreprise</span>
                )}
              </div>
              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <MaterialIcon name="check_circle" className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={`lim-${i}`} className="flex items-start gap-3">
                    <MaterialIcon name="cancel" className="text-slate-300 dark:text-slate-600 text-lg mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400 dark:text-slate-500">{limitation}</span>
                  </li>
                ))}
              </ul>
              {plan.price === 0 ? (
                <button className="w-full py-3 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Plan actuel
                </button>
              ) : plan.popular ? (
                <Link
                  to="/checkout"
                  className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all text-center block"
                >
                  S'abonner
                </Link>
              ) : (
                <Link
                  to="/checkout"
                  className="w-full py-3 border-2 border-primary text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-center block"
                >
                  S'abonner
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl font-extrabold tracking-tight text-center mb-10">Questions frequentes</h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold pr-4">{item.question}</span>
                <MaterialIcon
                  name="expand_more"
                  className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
