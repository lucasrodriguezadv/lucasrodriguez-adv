import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fotos = [
  {
    src: '/media/escritorio-atendimento.jpeg',
    alt: 'Sala de atendimento do escritório Lucas Rodriguez Advocacia',
    objectPosition: 'center',
  },
  {
    src: '/media/escritorio-mesa-reuniao.jpeg',
    alt: 'Mesa de reunião do escritório Lucas Rodriguez Advocacia',
    objectPosition: 'center',
  },
  {
    src: '/media/escritorio-recepcao.jpeg',
    alt: 'Recepção do escritório Lucas Rodriguez Advocacia',
    objectPosition: 'center',
  },
  {
    src: '/media/escritorio-reuniao-compacta.jpeg',
    alt: 'Sala de reunião compacta do escritório Lucas Rodriguez Advocacia',
    objectPosition: 'center',
  },
  {
    src: '/media/escritorio-sala-natural.jpeg',
    alt: 'Sala do escritório com iluminação natural',
    objectPosition: 'center',
  },
  {
    src: '/media/vista-santos-escritorio.jpeg',
    alt: 'Vista de Santos a partir do escritório',
    objectPosition: 'center',
  },
];

export default function GaleriaEscritorio() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = fotos[active];

  const goToPrevious = () => {
    setActive((index) => (index - 1 + fotos.length) % fotos.length);
  };

  const goToNext = () => {
    setActive((index) => (index + 1) % fotos.length);
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % fotos.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="content-auto overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Escritório
          </p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy md:text-5xl">
            Um espaço preparado para conversas importantes.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            Ambientes reservados, claros e funcionais para atendimento jurídico com privacidade e tranquilidade.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-lg border border-border bg-navy shadow-[0_28px_90px_-58px_rgba(0,0,0,0.65)]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative aspect-[4/5] min-h-[430px] sm:aspect-video sm:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: current.objectPosition }}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <div className="absolute inset-x-4 top-4 h-1 overflow-hidden rounded-full bg-white/[0.18]">
              {!shouldReduceMotion && (
                <motion.div
                  key={active}
                  className="h-full rounded-full bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5.2, ease: 'linear' }}
                />
              )}
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center px-3 sm:px-5">
              <button
                type="button"
                onClick={goToPrevious}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur transition-colors hover:border-gold/70 hover:text-gold"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center px-3 sm:px-5">
              <button
                type="button"
                onClick={goToNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur transition-colors hover:border-gold/70 hover:text-gold"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
              {fotos.map((foto, index) => (
                <button
                  key={foto.src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    active === index ? 'w-8 bg-gold' : 'w-2.5 bg-white/55 hover:bg-white'
                  }`}
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={active === index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
