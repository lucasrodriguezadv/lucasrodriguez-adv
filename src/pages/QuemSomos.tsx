import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternalPageLayout from '@/components/InternalPageLayout';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

const whatsappLink = buildWhatsAppUrl(defaultWhatsAppMessage);

const formacao = [
  'Graduação em Direito (2002) - Universidade Metropolitana de Santos',
  'Pós-graduação em Direito Imobiliário',
  'Formação técnica em Transações Imobiliárias',
  'Cursos de atualização e extensão jurídica',
];

const experiencia = [
  'Advogado atuante desde 2003',
  'Inscrito nos quadros da OAB - Seccional São Paulo',
  'Mais de 20 anos de carreira jurídica',
  'Atuação judicial e extrajudicial em demandas complexas',
];

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55 },
};

export default function QuemSomos() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Sobre o Dr. Lucas | Lucas Rodriguez Advocacia</title>
        <meta
          name="description"
          content="Conheça o Dr. Lucas Rodriguez de Castro, advogado desde 2003, especialista em Direito Imobiliário, Família, Penal e Consumidor em Santos/SP."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-curve pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />
        <div className="container relative z-10 mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-sans text-[13px] uppercase tracking-[0.2em] text-gold"
          >
            Sobre o Dr. Lucas
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 font-serif text-3xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            Dr. Lucas Rodriguez
            <br />
            <span className="text-gold-gradient">de Castro</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-xl font-sans text-base leading-relaxed text-white/56 md:text-lg"
          >
            Profissionalismo, comprometimento e excelência em oratória como base de uma carreira dedicada à defesa dos direitos de seus clientes.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f5f3ee] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_24px_80px_-56px_rgba(0,0,0,0.45)]"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              >
                <img
                  src="/media/lucas-rodriguez-retrato.jpeg"
                  alt="Dr. Lucas Rodriguez de Castro"
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">Desde 2003</p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-white">
                    Atuação próxima, técnica e estratégica.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                {...cardMotion}
                className="rounded-2xl border border-black/5 bg-white p-7 md:p-9"
              >
                <span className="text-gold text-xs font-sans tracking-[0.2em] uppercase">Perfil profissional</span>
                <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-navy md:text-4xl">
                  Uma advocacia construída sobre presença, preparo e clareza.
                </h2>
                <p className="mt-5 font-sans leading-relaxed text-navy/65">
                  O escritório atua com leitura estratégica de cada demanda, comunicação objetiva e acompanhamento próximo. A proposta é oferecer orientação jurídica consistente, sem perder a sensibilidade que cada caso exige.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  {...cardMotion}
                  className="rounded-2xl border border-black/5 bg-white p-7"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <GraduationCap className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy">Formação</h3>
                  </div>
                  <ul className="space-y-4">
                    {formacao.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span className="font-sans leading-relaxed text-navy/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  {...cardMotion}
                  className="rounded-2xl border border-black/5 bg-white p-7"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <Briefcase className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy">Experiência</h3>
                  </div>
                  <ul className="space-y-4">
                    {experiencia.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span className="font-sans leading-relaxed text-navy/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                {...cardMotion}
                className="rounded-2xl border border-gold/10 bg-navy p-7 md:p-9"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                    <Award className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">Diferenciais</h3>
                </div>
                <p className="mb-8 max-w-3xl font-sans leading-relaxed text-white/65">
                  Excelência em oratória, formação continuada e mais de duas décadas dedicadas ao exercício do Direito com profissionalismo, comprometimento com resultados e atendimento humanizado em Santos/SP.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link to="/contato">
                    <button className="btn-cta btn-cta-primary h-12 px-6 text-sm">
                      Quero ajuda de um especialista
                    </button>
                  </Link>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <button className="btn-cta btn-cta-secondary h-12 px-6 text-sm">
                      <MessageSquare className="h-4 w-4" />
                      Falar no WhatsApp
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </InternalPageLayout>
  );
}
