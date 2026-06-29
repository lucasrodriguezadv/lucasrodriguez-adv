import { ArrowRight, CalendarCheck, Facebook, Instagram } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { buildWhatsAppUrl, defaultWhatsAppMessage, siteConfig } from '@/config/site';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-[680px] h-screen items-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 origin-center" style={{ scale: shouldReduceMotion ? 1 : videoScale }}>
        {shouldReduceMotion ? (
          <picture>
            <source media="(max-width: 767px)" srcSet="/fundo-mobile-adaptado.webp" />
            <img
              src="/fundo-desktop-adaptado.webp"
              alt=""
              className="h-full w-full object-cover"
              aria-hidden="true"
            />
          </picture>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            // @ts-expect-error Non-standard WebView playback hint.
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="metadata"
            poster="/fundo-desktop-adaptado.webp"
            className="w-full h-full object-cover"
          >
            <source src="/videos/video-escritorio1.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/55 sm:from-black/90 sm:via-black/60 sm:to-black/40" />
        <div className="absolute inset-0 bg-black/20 sm:bg-transparent" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-10 pb-20 sm:pb-0 [text-shadow:_0_2px_20px_rgb(0_0_0_/_0.55)]"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/60 text-[13px] tracking-[0.2em] uppercase font-sans mb-6"
          >
            Lucas Rodriguez · Advocacia
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-white">Proteja seus{' '}</span>
            <em className="text-gold-gradient font-serif italic">direitos</em>
            <br />
            <span className="text-white">com </span>
            <span className="text-gold-gradient">segurança</span>
            <br className="hidden sm:block" />
            <span className="text-white"> e </span>
            <span className="text-gold-gradient">agilidade.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/50 text-base md:text-lg max-w-lg font-sans leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Atendimento jurídico especializado e humanizado{' '}
            <br className="hidden md:block" />
            em Santos/SP.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-navy transition-all duration-300 hover:bg-gold-light"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendar consulta
            </a>
            <Link
              to="/areas-de-atuacao"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Ver especialidades
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4"
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
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</p>
                <p className="mt-1 font-serif text-base font-semibold text-white sm:text-lg">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Right: Social Icons */}
      <motion.div
        className="absolute bottom-24 sm:bottom-8 right-6 md:right-10 z-10 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{ opacity }}
      >
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
        >
          <Instagram size={18} />
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
        >
          <Facebook size={18} />
        </a>
      </motion.div>
    </section>
  );
}
