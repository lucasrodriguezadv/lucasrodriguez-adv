import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [canUseVideo, setCanUseVideo] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const shouldShowVideo = canUseVideo && !shouldReduceMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const reducedDataQuery = window.matchMedia('(prefers-reduced-data: reduce)');
    const connection = (navigator as NavigatorWithConnection).connection;

    const syncVideoPreference = () => {
      setCanUseVideo(mediaQuery.matches && !reducedDataQuery.matches && !connection?.saveData);
    };

    syncVideoPreference();
    mediaQuery.addEventListener('change', syncVideoPreference);
    reducedDataQuery.addEventListener('change', syncVideoPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncVideoPreference);
      reducedDataQuery.removeEventListener('change', syncVideoPreference);
    };
  }, []);

  return (
    <section id="inicio" ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div className="absolute inset-0 origin-center" style={{ scale: shouldReduceMotion ? 1 : videoScale }}>
        {shouldShowVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            // @ts-expect-error Non-standard WebView playback hint.
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="none"
            poster="/fundo-desktop-adaptado.webp"
            className="h-full w-full object-cover object-[center_42%] sm:object-center"
            aria-hidden="true"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src="/video-fundo-1.mp4" type="video/mp4" />
          </video>
        ) : (
          <picture>
            <source media="(max-width: 767px)" srcSet="/fundo-mobile-adaptado.webp" />
            <img
              src="/fundo-desktop-adaptado.webp"
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
              loading="eager"
              aria-hidden="true"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,20,38,0.42)_0%,rgba(9,20,38,0.76)_42%,rgba(9,20,38,0.94)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/38 to-navy/90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto px-6 pb-24 pt-32 text-center [text-shadow:_0_2px_20px_rgb(0_0_0_/_0.45)] sm:pb-16 md:px-10"
        style={{ opacity }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-navy/35 px-5 py-2 font-sans text-sm font-medium text-gold-light shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            +20 anos de experiência
          </motion.div>

          <motion.h1
            className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Excelência, <span className="text-gold-gradient">justiça</span>
            <br className="hidden sm:block" /> e <span className="text-gold-gradient">humanização.</span>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-white/75 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Advocacia especializada com atendimento humano, linguagem clara e estratégia para proteger seus direitos
            em Santos/SP.
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-primary group w-full min-w-0 px-5 shadow-[0_18px_48px_-18px_hsl(43_53%_34%/0.95)] sm:w-auto sm:px-8"
            >
              Quero ajuda de um especialista
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              to="/areas-de-atuacao"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 font-sans text-sm font-medium text-white/70 transition-colors hover:text-gold sm:w-auto"
            >
              Conheça nossas áreas
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 hidden w-full max-w-2xl border-y border-white/10 py-4 text-center sm:grid sm:grid-cols-3 sm:divide-x sm:divide-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {[
              ['Desde', '2003'],
              ['Atuação', 'Estratégica'],
              ['Base', 'Santos/SP'],
            ].map(([label, value]) => (
              <div key={label} className="px-3 first:pl-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</p>
                <p className="mt-1 font-serif text-base font-semibold text-white sm:text-lg">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 hidden h-10 w-6 -translate-x-1/2 rounded-full border border-white/20 p-1 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ opacity }}
        aria-hidden="true"
      >
        <motion.span
          className="mx-auto block h-2 w-1 rounded-full bg-gold"
          animate={shouldReduceMotion ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  );
}
