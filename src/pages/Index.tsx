import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import DeferredWhatsAppButton from '@/components/DeferredWhatsAppButton';
import { siteConfig } from '@/config/site';

const AreasAtuacao = lazy(() => import('@/components/AreasAtuacao'));
const SobreAdvogado = lazy(() => import('@/components/SobreAdvogado'));
const Metodologia = lazy(() => import('@/components/Metodologia'));
const Depoimentos = lazy(() => import('@/components/Depoimentos'));
const GaleriaEscritorio = lazy(() => import('@/components/GaleriaEscritorio'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContatoForm = lazy(() => import('@/components/ContatoForm'));

const homeUrl = siteConfig.siteUrl;
const homeDescription =
  'Escritório de advocacia em Santos/SP especializado em Direito Imobiliário, Família, Penal e Consumidor.';
const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteConfig.name,
  url: homeUrl,
  image: `${homeUrl}/fundo-desktop-adaptado.webp`,
  logo: `${homeUrl}/media/logo-lucas-rodriguez.webp`,
  description: homeDescription,
  email: siteConfig.email,
  telephone: siteConfig.phones[0].href.replace('tel:', ''),
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'Santos' },
    { '@type': 'AdministrativeArea', name: 'São Paulo' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Vereador Henrique Soler, 287 - Sala 1010',
    addressLocality: 'Santos',
    addressRegion: 'SP',
    postalCode: '11030-011',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Lucas Rodriguez Advocacia - Competência, Inovação e Eficiência</title>
        <meta name="description" content={homeDescription} />
        <link rel="canonical" href={homeUrl} />
        <meta property="og:title" content="Lucas Rodriguez Advocacia - Competência, Inovação e Eficiência" />
        <meta property="og:description" content={homeDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={homeUrl} />
        <meta property="og:image" content={`${homeUrl}/fundo-desktop-adaptado.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lucas Rodriguez Advocacia" />
        <meta name="twitter:description" content={homeDescription} />
        <meta name="twitter:image" content={`${homeUrl}/fundo-desktop-adaptado.webp`} />
        <script type="application/ld+json">{JSON.stringify(legalServiceSchema)}</script>
      </Helmet>
      <Header />
      <main id="conteudo" className="overflow-hidden">
        <HeroSection />
        <Suspense fallback={null}>
          <AreasAtuacao />
          <SobreAdvogado />
          <Metodologia />
          <Depoimentos />
          <GaleriaEscritorio />
          <FAQSection />
          <ContatoForm />
        </Suspense>
        <DeferredWhatsAppButton />
      </main>
      <Footer />
    </>
  );
};

export default Index;
