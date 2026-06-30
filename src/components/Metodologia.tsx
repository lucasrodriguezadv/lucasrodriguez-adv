import { motion } from 'framer-motion';
import { ClipboardCheck, MessageCircle, Search, Shield } from 'lucide-react';

const etapas = [
  {
    icon: Search,
    title: 'Entendimento',
    desc: 'Leitura do contexto, dos documentos e dos riscos antes de qualquer orientação definitiva.',
  },
  {
    icon: ClipboardCheck,
    title: 'Estratégia',
    desc: 'Definição de caminhos possíveis, prioridades e próximos passos com linguagem objetiva.',
  },
  {
    icon: Shield,
    title: 'Atuação',
    desc: 'Condução técnica da demanda, judicial ou extrajudicial, com foco em segurança e consistência.',
  },
  {
    icon: MessageCircle,
    title: 'Acompanhamento',
    desc: 'Comunicação próxima para que o cliente entenda o andamento e tome decisões com clareza.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring' as const, stiffness: 100, damping: 18 },
  },
};

export default function Metodologia() {
  return (
    <section className="content-auto bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-gold">Método de trabalho</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Clareza do primeiro contato ao <span className="text-gold-gradient">próximo passo</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            Um fluxo simples para transformar dúvida jurídica em orientação prática, com preparo técnico e comunicação próxima.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block" />

          {etapas.map((etapa, index) => (
            <motion.div
              key={etapa.title}
              variants={cardVariants}
              className="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_22px_55px_-42px_hsl(43_53%_35%/0.5)]"
            >
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/15 bg-gold/10 text-gold transition-colors group-hover:bg-gold/15">
                    <etapa.icon className="h-5 w-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-navy/10">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{etapa.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{etapa.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
