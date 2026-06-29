import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';
import { buildWhatsAppUrl } from '@/config/site';

const whatsappLink = buildWhatsAppUrl('Olá, gostaria de saber mais sobre Direito de Família.');

const servicos = [
  'Divórcio Consensual e Litigioso',
  'Guarda Compartilhada e Unilateral',
  'Pensão Alimentícia — Fixação e Revisão',
  'Inventário e Partilha de Bens',
  'Reconhecimento e Dissolução de União Estável',
  'Adoção e Destituição de Poder Familiar',
  'Alienação Parental',
  'Mediação Familiar',
];

export default function Familia() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Direito de Família - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Assessoria jurídica para divórcio, guarda de filhos, pensão alimentícia e inventário." />
        <meta property="og:title" content="Direito de Família - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Assessoria jurídica para divórcio, guarda de filhos, pensão alimentícia e inventário." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Link to="/#areas" className="text-gold text-sm font-sans tracking-[0.15em] uppercase hover:text-gold-light transition-colors">← Áreas de Atuação</Link>
            <div className="flex items-center gap-4 mt-6 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Direito de <span className="text-gold-gradient">Família</span>
              </h1>
            </div>
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Assessoria jurídica sensível, humanizada e eficiente para questões familiares, priorizando o diálogo e a proteção dos envolvidos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Nossos Serviços</motion.h2>
            <div className="grid gap-4">
              {servicos.map((s, i) => (
                <motion.div key={s} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-gold/30 transition-colors" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground font-sans">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Como Podemos Ajudar</h2>
              <div className="prose prose-lg text-muted-foreground font-sans space-y-4">
                <p>Questões familiares exigem sensibilidade e discrição. Na Lucas Rodriguez Advocacia, tratamos cada caso com empatia, buscando soluções que preservem as relações e protejam os interesses de todos os envolvidos.</p>
                <p>Oferecemos mediação e negociação como alternativas ao litígio, sempre que possível, priorizando o bem-estar da família.</p>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <button className="btn-cta btn-cta-primary h-12 px-6 text-sm">Fale com um especialista</button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
