import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';
import { buildWhatsAppUrl } from '@/config/site';

const whatsappLink = buildWhatsAppUrl('Olá, gostaria de saber mais sobre Direito Imobiliário.');

const servicos = [
  'Contratos de Compra e Venda de Imóveis',
  'Usucapião Judicial e Extrajudicial',
  'Locações — Despejo e Renovatória',
  'Regularização de Imóveis',
  'Incorporação Imobiliária',
  'Due Diligence Imobiliária',
  'Condomínios — Assessoria e Litígios',
  'Financiamento e Garantias Imobiliárias',
];

export default function Imobiliario() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Direito Imobiliário - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Segurança jurídica em negociações imobiliárias. Contratos, usucapião e regularização." />
        <meta property="og:title" content="Direito Imobiliário - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Segurança jurídica em negociações imobiliárias." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Link to="/#areas" className="text-gold text-sm font-sans tracking-[0.15em] uppercase hover:text-gold-light transition-colors">← Áreas de Atuação</Link>
            <div className="flex items-center gap-4 mt-6 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <Home className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Direito <span className="text-gold-gradient">Imobiliário</span>
              </h1>
            </div>
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Segurança jurídica em negociações e transações imobiliárias, protegendo seu patrimônio em cada etapa.
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
                <p>Transações imobiliárias envolvem grandes valores e riscos. Nossa assessoria garante que cada negociação seja segura, transparente e juridicamente blindada.</p>
                <p>Realizamos análise completa de documentação, elaboração de contratos e acompanhamento em todas as etapas do processo.</p>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
                <button className="shadow-btn-gold text-white font-semibold px-8 py-3 text-sm">Fale com um especialista</button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
