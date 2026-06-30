import { motion } from 'framer-motion';
import { Shield, Users, Home, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const areas = [
  {
    icon: Home,
    title: 'Direito Imobiliário',
    desc: 'Segurança jurídica total para suas transações.',
    items: ['Regularização de Imóveis (Usucapião)', 'Elaboração e Revisão de Contratos', 'Compra, Venda e Doações', 'Locações'],
    route: '/areas/imobiliario',
  },
  {
    icon: Users,
    title: 'Família e Sucessões',
    desc: 'Proteção e cuidado para o que mais importa.',
    items: ['Divórcio', 'Pensão Alimentícia', 'Guarda de Filhos', 'Inventários e Planejamento Sucessório'],
    route: '/areas/familia',
  },
  {
    icon: Shield,
    title: 'Direito Penal',
    desc: 'Defesa técnica, estratégica e incansável.',
    items: ['Prisões em Flagrante', 'Inquéritos Policiais', 'Ações Penais', 'Habeas Corpus'],
    route: '/areas/criminal',
  },
  {
    icon: FileText,
    title: 'Direito do Consumidor',
    desc: 'Não aceite abusos. Defendemos você.',
    items: ['Cobranças Indevidas', 'Falhas na Prestação de Serviços', 'Indenizações Justas', 'Vícios de Produtos'],
    route: '/areas/consumidor',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring' as const, stiffness: 90 },
  },
};

export default function AreasAtuacao() {
  return (
    <section id="areas" className="content-auto bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Especialidades</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            Áreas de <span className="text-gold-gradient">Atuação</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            Cada frente de atuação combina análise técnica, comunicação clara e plano de ação proporcional ao risco.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {areas.map((area) => (
            <motion.div
              key={area.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_22px_55px_-38px_hsla(43,53%,28%,0.45)] sm:p-6 md:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-gold/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <area.icon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-gold" />
                </motion.div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">{area.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-4 font-sans">{area.desc}</p>
                <ul className="space-y-1 sm:space-y-1.5 mb-6">
                  {area.items.map((item) => (
                    <li key={item} className="text-xs sm:text-sm text-muted-foreground font-sans flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={area.route}
                  className="group/link inline-flex h-10 items-center gap-2 rounded-lg border border-gold/20 bg-gold/5 px-4 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-gold transition-all hover:border-gold/55 hover:bg-gold hover:text-navy sm:text-sm"
                >
                  Saiba mais
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-lg border border-gold/0 transition-colors duration-500 group-hover:border-gold/20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
