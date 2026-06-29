import { motion } from 'framer-motion';
import { Heart, Shield, Star, Target, Handshake, Flame } from 'lucide-react';

const valores = [
  { icon: Shield, title: 'Ética', desc: 'Atuação pautada nos mais altos padrões éticos e morais.' },
  { icon: Star, title: 'Profissionalismo', desc: 'Excelência e competência em cada caso.' },
  { icon: Handshake, title: 'Lealdade', desc: 'Compromisso fiel com os interesses dos clientes.' },
  { icon: Heart, title: 'Integridade', desc: 'Transparência e honestidade em todas as relações.' },
  { icon: Target, title: 'Dedicação', desc: 'Empenho total para alcançar os melhores resultados.' },
  { icon: Flame, title: 'Comprometimento', desc: 'Envolvimento completo com cada demanda jurídica.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 },
  },
};

export default function Metodologia() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Nossos Valores</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            Nossa <span className="text-gold-gradient">Metodologia</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {valores.map((v) => (
            <motion.div
              key={v.title}
              variants={cardVariants}
              className="text-center p-4 sm:p-6 rounded-2xl border border-border hover:border-gold/30 transition-all duration-500 hover:shadow-[0_4px_20px_hsla(43,53%,54%,0.08)]"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">{v.title}</h3>
              <p className="text-muted-foreground text-sm font-sans">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
