import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';

const logo = '/media/logo-lucas-rodriguez.webp';

const footerLinks = [
  { label: 'Quem Somos', to: '/quem-somos' },
  { label: 'Áreas de Atuação', to: '/areas-de-atuacao' },
  { label: 'Contato', to: '/contato' },
  { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
  { label: 'Termos de Uso', to: '/termos-de-uso' },
  { label: 'Aviso Legal', to: '/aviso-legal' },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link to="/">
              <img src={logo} alt="Lucas Rodriguez Advocacia" className="mb-4 h-16 w-auto" />
            </Link>
            <p className="mb-4 font-sans text-sm leading-relaxed text-white/40">
              Proteja seus direitos com segurança e agilidade. Atendimento jurídico especializado em Santos/SP.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Lucas Rodriguez Advocacia"
                className="text-white/40 transition-colors hover:text-gold"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Lucas Rodriguez Advocacia"
                className="text-white/40 transition-colors hover:text-gold"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold text-white">Links</h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-sans text-sm text-white/40 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold text-white">Contato</h4>
            <div className="space-y-2 font-sans text-sm text-white/40">
              {siteConfig.phones.map((phone) => (
                <p key={phone.href}>{phone.label}</p>
              ))}
              <p>{siteConfig.email}</p>
              <p>{siteConfig.address.line1}</p>
              <p>{siteConfig.address.line2}</p>
              <p>{siteConfig.businessHours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Lucas Rodriguez de Castro - Todos os direitos reservados.
          </p>
          <p className="mt-2 font-sans text-[11px] text-white/25">
            Desenvolvido por Michel Brotherhood
          </p>
        </div>
      </div>
    </footer>
  );
}
