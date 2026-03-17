import { useState } from 'react';
import MaterialIcon from '../../components/shared/MaterialIcon';
import { useToast } from '../../contexts/ToastContext';

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.show('Veuillez remplir tous les champs.', 'error');
      return;
    }
    toast.show('Message envoye avec succes !', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent py-16 px-6 md:px-20 lg:px-40">
        <div className="max-w-3xl mx-auto text-center">
          <MaterialIcon name="mail" className="text-primary text-4xl mb-4" />
          <h2 className="text-4xl font-black tracking-tight mb-4">Contactez-nous</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Une question, une suggestion ou une proposition de partenariat ? Notre equipe est a votre ecoute.</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-6 md:px-20 lg:px-40 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Email Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center hover:shadow-md hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="email" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold text-base mb-2">Email</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ecrivez-nous a tout moment</p>
              <a href="mailto:redaction@d5news.com" className="inline-block mt-3 text-sm text-primary font-semibold hover:underline">redaction@d5news.com</a>
            </div>

            {/* Phone Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center hover:shadow-md hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="phone" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold text-base mb-2">Telephone</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Lun - Ven, 8h - 18h</p>
              <a href="tel:+22500000000" className="inline-block mt-3 text-sm text-primary font-semibold hover:underline">+225 XX XX XX XX</a>
            </div>

            {/* Address Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center hover:shadow-md hover:border-primary/30 transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="location_on" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold text-base mb-2">Adresse</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Siege de la redaction</p>
              <p className="mt-3 text-sm text-primary font-semibold">Abidjan, Cote d'Ivoire</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-10 mb-14">
            <h3 className="text-2xl font-black tracking-tight mb-2">Envoyez-nous un message</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Remplissez le formulaire ci-dessous et nous vous repondrons dans les plus brefs delais.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="contact-name">Nom complet</label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none placeholder:text-slate-400 transition-all"
                    id="contact-name"
                    name="name"
                    placeholder="Votre nom"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2" htmlFor="contact-email">Adresse email</label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none placeholder:text-slate-400 transition-all"
                    id="contact-email"
                    name="email"
                    placeholder="votre@email.com"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="contact-subject">Sujet</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Selectionnez un sujet</option>
                  <option value="general">Question generale</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="support">Support technique</option>
                  <option value="publicite">Publicite</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="contact-message">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none placeholder:text-slate-400 transition-all resize-y"
                  id="contact-message"
                  name="message"
                  placeholder="Decrivez votre demande en detail..."
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 hidden md:block">Tous les champs sont obligatoires.</p>
                <button className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2" type="submit">
                  <MaterialIcon name="send" className="text-xl" />
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>

          {/* Map / Localisation */}
          <div className="mb-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop&q=80" alt="Carte du monde - Nos bureaux" loading="lazy" className="w-full h-56 md:h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <MaterialIcon name="location_on" className="text-white" />
                <h3 className="text-white font-bold">Nos bureaux dans le monde</h3>
              </div>
              <p className="text-white/70 text-sm">Abidjan - Paris - Dakar - Casablanca</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black tracking-tight mb-2">Questions frequentes</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Retrouvez les reponses aux questions les plus posees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Comment proposer un article ou un sujet ?',
                  answer: 'Envoyez-nous votre proposition via le formulaire ci-dessus en selectionnant le sujet "Partenariat". Notre equipe editoriale examinera votre proposition sous 48h.',
                },
                {
                  question: 'Comment devenir annonceur sur D5News ?',
                  answer: 'Contactez notre regie publicitaire en selectionnant "Publicite" dans le formulaire. Nous proposons des formats adaptes a vos objectifs de communication.',
                },
                {
                  question: 'Quel est le delai de reponse habituel ?',
                  answer: "Notre equipe s'efforce de repondre dans un delai de 24 a 48 heures ouvrables. Les demandes de support technique sont traitees en priorite.",
                },
                {
                  question: 'Comment signaler une erreur dans un article ?',
                  answer: 'Utilisez le formulaire avec le sujet "Question generale" en precisant l\'article concerne et la nature de l\'erreur. Notre equipe procede aux corrections rapidement.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                  <div className="flex items-start gap-3">
                    <MaterialIcon name="help" className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-2">{faq.question}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
