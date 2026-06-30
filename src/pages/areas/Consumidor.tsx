import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';
import { buildWhatsAppUrl } from '@/config/site';

const whatsappLink = buildWhatsAppUrl('Olá, gostaria de saber mais sobre Direito do Consumidor.');

const servicos = [
  'Revisão de Contratos Abusivos',
  'Indenizações por Danos Morais e Materiais',
  'Cobranças Indevidas e Negativação Indevida',
  'Vícios de Produtos e Serviços',
  'Cancelamento de Compras e Serviços',
  'Ações contra Bancos e Operadoras',
  'Recall e Responsabilidade Civil',
  'Mediação e Negociação Extrajudicial',
];

export default function Consumidor() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Direito do Consumidor - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Proteção dos seus direitos nas relações de consumo. Revisão de contratos, indenizações e cobranças indevidas." />
        <meta property="og:title" content="Direito do Consumidor - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Proteção dos seus direitos nas relações de consumo." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Link to="/#areas" className="text-gold text-sm font-sans tracking-[0.15em] uppercase hover:text-gold-light transition-colors">← Áreas de Atuação</Link>
            <div className="flex items-center gap-4 mt-6 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Direito do <span className="text-gold-gradient">Consumidor</span>
              </h1>
            </div>
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Proteção integral dos seus direitos nas relações de consumo, combatendo práticas abusivas e garantindo a reparação de danos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-auto bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Nossos Serviços
            </motion.h2>
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

      <section className="content-auto bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Como Podemos Ajudar</h2>
              <div className="prose prose-lg text-muted-foreground font-sans space-y-4">
                <p>Nosso escritório possui ampla experiência na defesa dos direitos do consumidor, atuando tanto na esfera judicial quanto extrajudicial para resolver conflitos de forma eficiente.</p>
                <p>Trabalhamos com transparência e agilidade, buscando as melhores indenizações e soluções para nossos clientes.</p>
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
