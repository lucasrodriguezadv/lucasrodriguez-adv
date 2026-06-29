import { Instagram, Facebook } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/">
              <img src={logo} alt="Lucas Rodriguez Advocacia" className="h-16 w-auto mb-4" />
            </Link>
            <p className="text-white/40 text-sm font-sans leading-relaxed mb-4">
              Proteja seus direitos com segurança e agilidade. Atendimento jurídico especializado em Santos/SP.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Lucas Rodriguez Advocacia"
                className="text-white/40 hover:text-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Lucas Rodriguez Advocacia"
                className="text-white/40 hover:text-gold transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-sans font-semibold text-sm mb-4">Links</h4>
            <div className="space-y-2">
              {footerLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block text-white/40 text-sm font-sans hover:text-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-sans font-semibold text-sm mb-4">Contato</h4>
            <div className="space-y-2 text-white/40 text-sm font-sans">
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
          <p className="text-white/30 text-xs font-sans">
            © {new Date().getFullYear()} Lucas Rodriguez de Castro – Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
