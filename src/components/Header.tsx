import { useState, useEffect } from 'react';
import { X, ChevronDown, Shield, FileText, Users, Home, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildWhatsAppUrl, defaultWhatsAppMessage, siteConfig } from '@/config/site';

const logo = '/media/logo-lucas-rodriguez.webp';

const navLinks = [
  { label: 'Início', href: '#inicio', route: '/' },
  { label: 'Quem Somos', href: '#sobre', route: '/quem-somos' },
  { label: 'Contato', href: '#contato', route: '/contato' },
];

const areasSubLinks = [
  { label: 'Direito de Família', route: '/areas/familia', icon: Users },
  { label: 'Direito Penal', route: '/areas/criminal', icon: Shield },
  { label: 'Direito do Consumidor', route: '/areas/consumidor', icon: FileText },
  { label: 'Direito Imobiliário', route: '/areas/imobiliario', icon: Home },
];

const whatsappLink = buildWhatsAppUrl(defaultWhatsAppMessage);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Only show scrolled bar style on desktop (lg+)
  const isScrolled = (scrolled || !isHome) && isLg;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsLg(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
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
      <header className={`absolute lg:fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'lg:px-4 xl:px-12 lg:pt-2' : ''}`}>
        {/* Background bar — constrained when scrolled (desktop only) */}
        <div
          className={`transition-all duration-300 mx-auto ${isScrolled ? 'lg:max-w-6xl lg:rounded-full' : ''}`}
          style={{
            background: isScrolled ? 'rgba(235, 232, 228, 0.97)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px -4px rgba(0,0,0,0.08)' : 'none',
          }}
        >
        <div className={`mx-auto flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${isScrolled ? 'max-w-6xl py-2' : 'max-w-7xl py-4'}`}>
          {/* Left: Logo (mobile) + Nav links (desktop) */}
          <Link to="/" className="lg:hidden flex items-center relative">
            <img
              src={logo}
              alt="Lucas Rodriguez Advocacia"
              className="w-auto h-[4.5rem]"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : link.route}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
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
                className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 flex items-center gap-1 ${
                  isScrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                Especialidades
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
                className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Center: Logo (desktop only) */}
          <Link to="/" className="hidden lg:flex items-center justify-center relative">
            <img
              src={logo}
              alt="Lucas Rodriguez Advocacia"
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12' : 'h-14'}`}
            />
          </Link>

          {/* Right: CTA (desktop) + Hamburger (mobile) */}
          <div className="flex items-center justify-end flex-1 lg:flex-1">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <button
                className={`px-6 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase border transition-all duration-300 rounded-none ${
                  isScrolled
                    ? 'border-navy/20 text-navy hover:bg-navy hover:text-white'
                    : 'border-white/30 text-white hover:bg-white hover:text-navy'
                }`}
              >
                Agendar consulta
              </button>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-navy' : 'text-white'}`}
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

      {/* Mobile Side Panel Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[60] bg-navy flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center justify-between py-5 px-6">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo} alt="Lucas Rodriguez Advocacia" className="h-14 w-auto" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white p-2"
                  aria-label="Fechar menu"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-1 px-6 pt-4 overflow-y-auto">
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
                  href={isHome ? '#sobre' : '/quem-somos'}
                  onClick={(e) => handleNavClick(e, navLinks[1])}
                  className="text-2xl font-serif font-bold text-white hover:text-gold transition-colors py-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Quem Somos
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
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors duration-300">
                    <Instagram size={22} />
                  </a>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors duration-300">
                    <Facebook size={22} />
                  </a>
                </div>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <button className="shadow-btn-gold w-full text-white font-semibold py-4 text-base">
                    Agendar consulta
                  </button>
                </a>
                <p className="text-white/30 text-xs text-center mt-4 font-sans">
                  OAB/SP
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
