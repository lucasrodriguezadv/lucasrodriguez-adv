import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Award, label: 'Experiência', value: '+20 anos' },
  { icon: BookOpen, label: 'Especialização', value: 'Imobiliário' },
  { icon: Users, label: 'Atendimento', value: 'Próximo' },
];

export default function SobreAdvogado() {
  return (
    <section id="sobre" className="bg-brand-curve py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.76fr_1.24fr] lg:gap-16">
          <motion.div
            className="relative mx-auto w-full max-w-[360px] md:max-w-[390px]"
            initial={{ opacity: 0, x: -42 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 85, damping: 18 }}
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/15 bg-white/5 shadow-[0_28px_80px_-52px_rgba(0,0,0,0.85)]"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              <img
                src="/media/lucas-rodriguez-retrato-biblioteca.jpeg"
                alt="Dr. Lucas Rodriguez de Castro no escritório"
                loading="lazy"
                className="h-full w-full object-cover object-[center_32%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">Lucas Rodriguez</p>
                <p className="mt-1 font-serif text-xl font-semibold text-white">Advocacia estratégica</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl border-2 border-gold/20 md:block"
              aria-hidden="true"
              initial={{ opacity: 0, x: 12, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 42 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 85, damping: 18, delay: 0.1 }}
          >
            <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Sobre</span>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Dr. Lucas Rodriguez<br className="sm:hidden" /> de Castro
            </h2>
            <p className="mb-6 mt-2 text-sm font-sans text-gold">OAB/SP</p>
            <div className="space-y-5 text-white/70">
              <p className="font-sans leading-relaxed">
                Com mais de duas décadas de atuação combativa e estratégica, o Dr. Lucas Rodriguez de Castro dedica sua carreira a entregar orientação jurídica clara, técnica e conectada aos objetivos de cada cliente.
              </p>
              <p className="font-sans leading-relaxed">
                Formado em Direito em 2002 e pós-graduado em Direito Imobiliário, une conhecimento técnico, oratória de excelência e acompanhamento próximo para construir caminhos jurídicos consistentes.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.45 }}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <stat.icon className="mb-3 h-5 w-5 text-gold" />
                  <p className="font-sans text-sm font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 font-sans text-xs text-white/45">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/quem-somos" className="btn-cta btn-cta-primary">
                Sobre o Dr. Lucas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
