import { useState, useEffect } from 'react';
import { X, ChevronDown, Shield, FileText, Users, Home, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildWhatsAppUrl, defaultWhatsAppMessage, siteConfig } from '@/config/site';

const logo = '/media/logo-lucas-rodriguez.webp';

const navLinks = [
  { label: 'Início', href: '#inicio', route: '/' },
  { label: 'Sobre o Dr. Lucas', href: '/quem-somos', route: '/quem-somos' },
  { label: 'FAQ', href: '#faq', route: '/#faq' },
  { label: 'Contato', href: '#contato', route: '/contato' },
];

const areasSubLinks = [
  { label: 'Direito de Família', route: '/areas/familia', icon: Users },
  { label: 'Direito Penal', route: '/areas/criminal', icon: Shield },
  { label: 'Direito do Consumidor', route: '/areas/consumidor', icon: FileText },
  { label: 'Direito Imobiliário', route: '/areas/imobiliario', icon: Home },
];

const whatsappLink = buildWhatsAppUrl(defaultWhatsAppMessage);

function DesktopSocialLinks() {
  const links = [
    {
      href: siteConfig.social.instagram,
      label: 'Instagram',
      icon: Instagram,
      aria: 'Instagram de Lucas Rodriguez Advocacia',
    },
    {
      href: siteConfig.social.facebook,
      label: 'Facebook',
      icon: Facebook,
      aria: 'Facebook de Lucas Rodriguez Advocacia',
    },
    {
      href: whatsappLink,
      label: 'WhatsApp',
      icon: MessageCircle,
      aria: 'WhatsApp de Lucas Rodriguez Advocacia',
    },
  ];

  return (
    <div className="hidden items-center justify-end gap-2 lg:flex">
      {links.map(({ href, label, icon: Icon, aria }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          title={label}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:text-gold"
        >
          <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // The sticky desktop header should only appear when the visitor reaches the second section.
  const isScrolled = scrolled && isLg;

  useEffect(() => {
    const getStickyStart = () => {
      const secondSection = isHome
        ? document.querySelector('#areas')
        : document.querySelector('main section:nth-of-type(2)');
      const firstSection = document.querySelector('main section');
      const target = secondSection ?? firstSection;

      if (!target) return window.innerHeight * 0.9;

      const rect = target.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY;
      const stickyOffset = 88;

      if (!secondSection && firstSection) {
        return targetTop + rect.height - stickyOffset;
      }

      return Math.max(0, targetTop - stickyOffset);
    };

    const updateHeaderState = () => {
      const desktop = window.innerWidth >= 1024;
      setIsLg(desktop);
      setScrolled(desktop && window.scrollY >= getStickyStart());
    };

    updateHeaderState();
    const delayedChecks = [window.setTimeout(updateHeaderState, 300), window.setTimeout(updateHeaderState, 1000)];

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
    window.addEventListener('load', updateHeaderState);
    return () => {
      delayedChecks.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
      window.removeEventListener('load', updateHeaderState);
    };
  }, [isHome, location.pathname]);

  useEffect(() => {
    if (!location.hash) return;

    const timer = window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setMobileAreasOpen(false);
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (isHome && link.href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      e.preventDefault();
      navigate(link.route);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`${isScrolled ? 'fixed lg:px-4 lg:pt-2 xl:px-12' : 'absolute'} left-0 right-0 top-0 z-50 transition-all duration-300`}>
        {/* Desktop background appears only after scroll; mobile stays transparent. */}
        <div
          className={`mx-auto transition-all duration-300 ${isScrolled ? 'lg:max-w-6xl lg:rounded-full' : ''}`}
          style={{
            background: isScrolled ? 'rgba(245, 242, 236, 0.96)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
            border: isScrolled ? '1px solid rgba(255,255,255,0.55)' : '1px solid transparent',
            boxShadow: isScrolled ? '0 14px 36px -24px rgba(5, 15, 32, 0.45)' : 'none',
          }}
        >
        <div className={`relative mx-auto flex items-center justify-between px-6 transition-all duration-300 md:px-10 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6 ${isScrolled ? 'max-w-6xl py-2' : 'max-w-[1380px] py-4 lg:py-5'}`}>
          {/* Left: Logo */}
          <Link to="/" className="relative flex shrink-0 items-center">
            <img
              src={logo}
              alt="Lucas Rodriguez Advocacia"
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10 xl:h-11' : 'h-[4.5rem] lg:h-14 xl:h-16'}`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <nav className="hidden min-w-0 items-center justify-center gap-3 lg:flex xl:gap-5">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : link.route}
                onClick={(e) => handleNavClick(e, link)}
                className={`rounded-full px-2.5 py-2 font-sans text-[14px] font-semibold transition-colors duration-300 xl:text-[15px] ${
                  isScrolled ? 'text-navy/70 hover:bg-navy/5 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Áreas de Atuação dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAreasOpen(true)}
              onMouseLeave={() => setAreasOpen(false)}
            >
              <button
                className={`flex items-center gap-1 rounded-full px-2.5 py-2 font-sans text-[14px] font-semibold transition-colors duration-300 xl:text-[15px] ${
                  isScrolled ? 'text-navy/70 hover:bg-navy/5 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                Áreas de Atuação
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="absolute top-full left-0 right-0 h-4" />

              <AnimatePresence>
                {areasOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-[calc(100%+0.75rem)] left-0 w-60 bg-white rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] border border-black/5 py-2 z-[70] overflow-hidden"
                  >
                    {areasSubLinks.map((sub) => (
                      <Link
                        key={sub.route}
                        to={sub.route}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-navy hover:bg-gold/5 transition-all duration-200 group relative"
                        onClick={() => setAreasOpen(false)}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gold rounded-r-full group-hover:h-6 transition-all duration-200" />
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors shrink-0">
                          <sub.icon className="w-4 h-4 text-gold" />
                        </div>
                        <span className="group-hover:text-gold transition-colors font-medium">{sub.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-black/5 mt-1 pt-1">
                      <Link
                        to="/areas-de-atuacao"
                        className="flex items-center gap-3 px-5 py-2.5 text-xs font-medium text-gold hover:bg-gold/5 transition-all uppercase tracking-wider"
                        onClick={() => setAreasOpen(false)}
                      >
                        Ver todas as áreas →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : link.route}
                onClick={(e) => handleNavClick(e, link)}
                className={`rounded-full px-2.5 py-2 font-sans text-[14px] font-semibold transition-colors duration-300 xl:text-[15px] ${
                  isScrolled ? 'text-navy/70 hover:bg-navy/5 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA (desktop) + Hamburger (mobile) */}
          <div className={`flex items-center justify-end ${isScrolled ? 'lg:min-w-[260px]' : 'lg:min-w-[156px]'}`}>
            <AnimatePresence initial={false} mode="wait">
              {isScrolled ? (
                <motion.a
                  key="header-cta"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:block"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                >
                  <button className="btn-cta btn-cta-dark h-10 min-h-10 px-4 py-2 text-[11px] xl:px-5 xl:text-[12px]">
                    Quero ajuda de um especialista
                  </button>
                </motion.a>
              ) : (
                <motion.div
                  key="header-social"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                >
                  <DesktopSocialLinks />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`absolute right-6 top-1/2 z-10 -translate-y-1/2 p-2 transition-colors lg:hidden ${isScrolled ? 'text-navy' : 'text-white'}`}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px] w-6">
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''} ${isScrolled ? 'bg-navy' : 'bg-white'}`} />
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'} ${isScrolled ? 'bg-navy' : 'bg-white'}`} />
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''} ${isScrolled ? 'bg-navy' : 'bg-white'}`} />
              </div>
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-navy shadow-2xl lg:hidden"
            initial={{ opacity: 0, y: -18, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, y: -12, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
              <div className="flex items-center justify-between px-6 py-5">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo} alt="Lucas Rodriguez Advocacia" className="h-14 w-auto" decoding="async" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white p-2"
                  aria-label="Fechar menu"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-4">
                <motion.a
                  href={isHome ? '#inicio' : '/'}
                  onClick={(e) => handleNavClick(e, navLinks[0])}
                  className="text-2xl font-serif font-bold text-white hover:text-gold transition-colors py-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.3 }}
                >
                  Início
                </motion.a>

                <motion.a
                  href="/quem-somos"
                  onClick={(e) => handleNavClick(e, navLinks[1])}
                  className="text-2xl font-serif font-bold text-white hover:text-gold transition-colors py-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Sobre o Dr. Lucas
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <button
                    onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                    className="text-2xl font-serif font-bold text-white hover:text-gold transition-colors py-3 w-full text-left flex items-center gap-2"
                  >
                    Áreas de Atuação
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAreasOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAreasOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-2"
                      >
                        {areasSubLinks.map((sub) => (
                          <Link
                            key={sub.route}
                            to={sub.route}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 text-base text-white/70 hover:text-gold transition-colors py-2.5"
                          >
                            <sub.icon className="w-4 h-4 text-gold/60" />
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.slice(2).map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={isHome ? link.href : link.route}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-2xl font-serif font-bold text-white hover:text-gold transition-colors py-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + 0.05 * i, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="px-6 pb-8">
                {/* Social icons */}
                <div className="flex items-center gap-5 mb-6">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de Lucas Rodriguez Advocacia"
                    className="text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Lucas Rodriguez Advocacia"
                    className="text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    <Facebook size={22} />
                  </a>
                </div>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <button className="btn-cta btn-cta-primary h-12 w-full text-sm">
                    Falar com um especialista
                  </button>
                </a>
                <p className="text-white/30 text-xs text-center mt-4 font-sans">
                  OAB/SP
                </p>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
