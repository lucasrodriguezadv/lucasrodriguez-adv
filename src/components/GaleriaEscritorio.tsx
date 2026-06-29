import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Film, Pause, Play, X } from 'lucide-react';

type OfficeMedia = {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  label: string;
  title: string;
  description: string;
};

const medias: OfficeMedia[] = [
  {
    type: 'video',
    src: '/videos/video-escritorio1.mp4',
    poster: '/fundo-desktop-adaptado.webp',
    alt: 'Vídeo institucional do escritório Lucas Rodriguez Advocacia',
    label: 'Video tour',
    title: 'Ambiente preparado para atendimento estratégico',
    description: 'Um escritório pensado para conversas reservadas, leitura técnica do caso e tomada de decisão com tranquilidade.',
  },
  {
    type: 'image',
    src: '/media/escritorio-atendimento.jpeg',
    alt: 'Sala de atendimento do escritório Lucas Rodriguez Advocacia',
    label: 'Atendimento',
    title: 'Atendimento reservado e objetivo',
    description: 'Espaço acolhedor para entender o contexto do cliente com privacidade e clareza.',
  },
  {
    type: 'video',
    src: '/media/escritorio-bastidores.mp4',
    poster: '/media/escritorio-mesa-reuniao.jpeg',
    alt: 'Vídeo do escritório Lucas Rodriguez Advocacia',
    label: 'Bastidores',
    title: 'Rotina de trabalho próxima e cuidadosa',
    description: 'A estrutura acompanha uma advocacia presente, técnica e comprometida com cada detalhe.',
  },
  {
    type: 'image',
    src: '/media/escritorio-mesa-reuniao.jpeg',
    alt: 'Mesa de reunião ampla do escritório',
    label: 'Estratégia',
    title: 'Reuniões para construir a melhor tese',
    description: 'Cada demanda é avaliada com método, organização documental e visão prática dos próximos passos.',
  },
  {
    type: 'image',
    src: '/media/escritorio-sala-natural.jpeg',
    alt: 'Sala de reuniões com iluminação natural',
    label: 'Estrutura',
    title: 'Conforto visual e concentração',
    description: 'Um ambiente contemporâneo, iluminado e funcional para conversas importantes.',
  },
  {
    type: 'image',
    src: '/media/vista-santos-escritorio.jpeg',
    alt: 'Vista da cidade a partir do escritório',
    label: 'Santos/SP',
    title: 'Presença local em Santos',
    description: 'Atuação enraizada na cidade, com atendimento presencial e digital.',
  },
];

const fotos = medias.filter((media) => media.type === 'image');

const metricas = [
  { value: '02', label: 'Vídeos reais' },
  { value: '04', label: 'Ambientes' },
  { value: '100%', label: 'Atendimento reservado' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

export default function GaleriaEscritorio() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const current = medias[active];
  const autoplayDisabled = isPaused || shouldReduceMotion;
  const autoplayLabel = shouldReduceMotion ? 'Manual' : isPaused ? 'Retomar' : 'Pausar';

  const goToPrevious = () => {
    setActive((index) => (index - 1 + medias.length) % medias.length);
  };

  const goToNext = () => {
    setActive((index) => (index + 1) % medias.length);
  };

  useEffect(() => {
    if (autoplayDisabled) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % medias.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [autoplayDisabled]);

  return (
    <section className="overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Estrutura</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            Nosso <span className="text-gold-gradient">Escritório</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Fotos e vídeos reais do ambiente onde o atendimento acontece: privacidade, sobriedade e estrutura para conduzir cada caso com estratégia.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-navy shadow-[0_28px_90px_-55px_rgba(0,0,0,0.65)]">
            <div className="relative aspect-[4/5] min-h-[420px] sm:aspect-video sm:min-h-[500px] lg:h-full lg:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.type === 'video' ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={current.poster}
                    >
                      <source src={current.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={current.src} alt={current.alt} className="h-full w-full object-cover" loading="lazy" />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-9">
                <motion.div
                  key={`${current.src}-caption`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="max-w-2xl"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                    {current.type === 'video' ? <Film className="h-3.5 w-3.5 text-gold" /> : <Camera className="h-3.5 w-3.5 text-gold" />}
                    {current.label}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/68 sm:text-base">
                    {current.description}
                  </p>
                </motion.div>
              </div>

              {current.type === 'video' && (
                <div className="absolute right-5 top-5 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur sm:flex">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              )}

              {!shouldReduceMotion && (
                <div className="absolute inset-x-5 top-5 h-1 overflow-hidden rounded-full bg-white/15">
                  {!isPaused && (
                    <motion.div
                      key={active}
                      className="h-full rounded-full bg-gold"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6.5, ease: 'linear' }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">Mídia real</p>
                  <p className="mt-1 font-serif text-xl font-semibold text-foreground">Alternância automática</p>
                </div>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {String(active + 1).padStart(2, '0')}/{String(medias.length).padStart(2, '0')}
                </span>
              </div>

              <div className="mb-4 grid grid-cols-[44px_1fr_44px] gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  aria-label="Mídia anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused((value) => !value)}
                  disabled={shouldReduceMotion}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-3 text-xs font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={shouldReduceMotion ? 'Alternância automática desativada por preferência de movimento reduzido' : autoplayDisabled ? 'Retomar alternância automática' : 'Pausar alternância automática'}
                  aria-pressed={autoplayDisabled}
                >
                  {autoplayDisabled ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {autoplayLabel}
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  aria-label="Próxima mídia"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {medias.map((media, index) => (
                  <button
                    key={media.src}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`group grid w-full grid-cols-[84px_1fr] items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition-all duration-300 ${
                      active === index
                        ? 'border-gold/55 bg-gold/10 shadow-[0_16px_35px_-28px_rgba(184,134,11,0.9)]'
                        : 'border-border bg-background hover:border-gold/30 hover:bg-gold/5'
                    }`}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-navy">
                      <img
                        src={media.poster ?? media.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {media.type === 'video' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                          <Play className="h-4 w-4 fill-current" />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-gold">{media.label}</span>
                      <span className="mt-1 line-clamp-2 block text-sm font-semibold leading-snug text-foreground">{media.title}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {metricas.map((metrica, index) => (
                <motion.div
                  key={metrica.label}
                  className="rounded-xl border border-border bg-card p-3 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * index, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                >
                  <p className="font-serif text-2xl font-semibold text-gold">{metrica.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{metrica.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {fotos.map((foto, i) => (
            <motion.button
              key={foto.src}
              type="button"
              variants={itemVariants}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border text-left"
              onClick={() => setLightbox(i)}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur">
                {foto.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-white/60 transition-colors hover:text-white"
              onClick={() => setLightbox(null)}
              aria-label="Fechar imagem"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              src={fotos[lightbox].src}
              alt={fotos[lightbox].alt}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
