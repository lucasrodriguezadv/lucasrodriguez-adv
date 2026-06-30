import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, Users, Shield, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';

const areas = [
  {
    title: 'Direito Imobiliário',
    description: 'Usucapião, contratos, compra, venda e doação de imóveis, registros de imóveis e outros.',
    servicos: ['Compra e venda de imóvel', 'Contratos e distratos', 'Registro de imóveis', 'Relações condominiais', 'Regularização imobiliária', 'Incorporações imobiliárias'],
    icon: Home,
    route: '/areas/imobiliario',
  },
  {
    title: 'Direito de Família e Sucessões',
    description: 'Divórcios, pensão alimentícia, união estável, guarda dos filhos, inventário, planejamento sucessório, testamento e outros.',
    servicos: ['Divórcios', 'Pensão alimentícia', 'União estável', 'Guarda dos filhos', 'Inventário', 'Planejamento sucessório', 'Testamento'],
    icon: Users,
    route: '/areas/familia',
  },
  {
    title: 'Direito Penal',
    description: 'Prisão em flagrante, atuação em inquéritos policiais, defesa em ação penal, execução criminal, habeas corpus e outros.',
    servicos: ['Prisão em flagrante', 'Inquéritos policiais', 'Defesa em ação penal', 'Execução criminal', 'Habeas corpus'],
    icon: Shield,
    route: '/areas/criminal',
  },
  {
    title: 'Direito do Consumidor',
    description: 'Ações indenizatórias (danos materiais e morais), revisão de contrato e outros.',
    servicos: ['Ações indenizatórias', 'Revisão de contrato', 'Proteção contra cobranças indevidas', 'Defesa contra negativações injustas'],
    icon: FileText,
    route: '/areas/consumidor',
  },
];

export default function AreasDeAtuacao() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Áreas de Atuação | Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Conheça as áreas de atuação do escritório: Direito Imobiliário, Família e Sucessões, Penal e Consumidor. Atendimento em Santos/SP." />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-curve overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />
        <div className="relative z-10 container mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-[13px] tracking-[0.2em] uppercase font-sans mb-4"
          >
            Especialidades
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            Áreas de <span className="text-gold-gradient">Atuação</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/50 text-base md:text-lg max-w-xl font-sans leading-relaxed"
          >
            Atendimento jurídico especializado com mais de 20 anos de experiência em Santos/SP.
          </motion.p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="content-auto bg-[#f5f3ee] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {areas.map((area, i) => (
              <motion.div
                key={area.route}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={area.route}
                  className="group block bg-white rounded-2xl p-8 md:p-10 border border-black/5 hover:border-gold/20 hover:shadow-[0_20px_60px_-12px_rgba(201,168,76,0.1)] transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <area.icon className="w-6 h-6 text-gold" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>

                  <h2 className="font-serif text-xl md:text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                    {area.title}
                  </h2>
                  <p className="text-navy/60 font-sans text-sm leading-relaxed mb-6">
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {area.servicos.slice(0, 4).map((s) => (
                      <span key={s} className="text-[11px] tracking-wide uppercase font-sans text-navy/40 bg-navy/5 rounded-full px-3 py-1">
                        {s}
                      </span>
                    ))}
                    {area.servicos.length > 4 && (
                      <span className="text-[11px] tracking-wide uppercase font-sans text-gold bg-gold/10 rounded-full px-3 py-1">
                        +{area.servicos.length - 4} mais
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
