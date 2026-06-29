import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';
import { buildWhatsAppUrl } from '@/config/site';

const whatsappLink = buildWhatsAppUrl('Olá, gostaria de saber mais sobre Advocacia Criminal.');

const servicos = [
  'Habeas Corpus e Liberdade Provisória',
  'Defesa em Crimes Financeiros e Tributários',
  'Tribunal do Júri — Defesa e Assistência',
  'Execução Penal e Progressão de Regime',
  'Audiência de Custódia',
  'Crimes contra a Administração Pública',
  'Inquérito Policial e Investigações',
  'Recursos Criminais (Apelação, Embargos, REsp, RE)',
];

export default function Criminal() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Advocacia Criminal - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Defesa técnica especializada em todas as fases do processo penal. Habeas Corpus, Tribunal do Júri e mais." />
        <meta property="og:title" content="Advocacia Criminal - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Defesa técnica especializada em todas as fases do processo penal." />
      </Helmet>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link to="/#areas" className="text-gold text-sm font-sans tracking-[0.15em] uppercase hover:text-gold-light transition-colors">
              ← Áreas de Atuação
            </Link>
            <div className="flex items-center gap-4 mt-6 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Advocacia <span className="text-gold-gradient">Criminal</span>
              </h1>
            </div>
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Defesa técnica especializada em todas as fases do processo penal, com atuação estratégica e comprometida com a proteção dos seus direitos fundamentais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Nossos Serviços
            </motion.h2>
            <div className="grid gap-4">
              {servicos.map((s, i) => (
                <motion.div
                  key={s}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-gold/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground font-sans">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como podemos ajudar */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                Como Podemos Ajudar
              </h2>
              <div className="prose prose-lg text-muted-foreground font-sans space-y-4">
                <p>
                  Na Lucas Rodriguez Advocacia, entendemos que enfrentar um processo criminal é uma das experiências mais difíceis na vida de qualquer pessoa. Nossa equipe oferece atendimento humanizado, sigiloso e estratégico.
                </p>
                <p>
                  Atuamos desde a fase investigativa até os tribunais superiores, elaborando teses defensivas sólidas e buscando sempre a melhor solução jurídica para cada caso.
                </p>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <button className="btn-cta btn-cta-primary h-12 px-6 text-sm">
                  Fale com um especialista
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
