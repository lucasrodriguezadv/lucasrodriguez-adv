import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Pause, Play, Star, Quote } from 'lucide-react';

const depoimentos = [
  {
    nome: 'Rafaela Santos',
    texto: 'Profissionalismo, Qualidade, Excelente profissional, muito capaz e apto. Acompanhamento e consultoria jurídica de qualidade. Nos momentos que precisei, pude observar muita confiança e segurança. Obrigada Dr. Lucas pelo apoio!',
    stars: 5,
  },
  {
    nome: 'Elzebio Duarte',
    texto: 'Muito satisfatório, Dr. Lucas atencioso, profissional maravilhoso. Há anos que confio minhas causas aos seus cuidados. Muito obrigado!',
    stars: 5,
  },
  {
    nome: 'Priscila Alcantra',
    texto: 'Doutor Lucas além de muito competente é humano e extremamente comprometido com o que faz. Super indico.',
    stars: 5,
  },
];

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = setInterval(() => setCurrent((c) => (c + 1) % depoimentos.length), 5000);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  return (
    <section className="py-20 md:py-32 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Depoimentos</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-white">
            A Confiança de Quem Já Teve Seus <span className="text-gold-gradient">Direitos Garantidos</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-gold/20" />

            <div className="relative z-10 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-1 mb-6 justify-center">
                    {Array.from({ length: depoimentos[current].stars }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>

                  <p className="text-white/80 text-center text-lg font-sans leading-relaxed mb-6">
                    "{depoimentos[current].texto}"
                  </p>

                  <p className="text-gold font-serif text-lg font-bold text-center">
                    {depoimentos[current].nome}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex justify-center gap-2">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gold' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Depoimento ${i + 1}`}
                  aria-current={i === current}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsPaused((value) => !value)}
              disabled={shouldReduceMotion}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-xs font-medium uppercase tracking-[0.08em] text-white/70 transition-colors hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-45"
              aria-label={shouldReduceMotion ? 'Depoimentos automáticos desativados por preferência de movimento reduzido' : isPaused ? 'Retomar depoimentos automáticos' : 'Pausar depoimentos automáticos'}
              aria-pressed={isPaused || shouldReduceMotion}
            >
              {isPaused || shouldReduceMotion ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {shouldReduceMotion ? 'Manual' : isPaused ? 'Retomar' : 'Pausar'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
