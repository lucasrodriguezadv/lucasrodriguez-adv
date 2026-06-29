import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const AreasAtuacao = lazy(() => import('@/components/AreasAtuacao'));
const SobreAdvogado = lazy(() => import('@/components/SobreAdvogado'));
const Metodologia = lazy(() => import('@/components/Metodologia'));
const Depoimentos = lazy(() => import('@/components/Depoimentos'));
const GaleriaEscritorio = lazy(() => import('@/components/GaleriaEscritorio'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const ContatoForm = lazy(() => import('@/components/ContatoForm'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Helmet>
        <title>Lucas Rodriguez Advocacia - Competência, Inovação e Eficiência</title>
        <meta name="description" content="Escritório de advocacia no Santos/SP especializado em Direito Criminal, Família, Consumidor e Imobiliário." />
        <meta property="og:title" content="Lucas Rodriguez Advocacia - Competência, Inovação e Eficiência" />
        <meta property="og:description" content="Escritório de advocacia no Santos/SP especializado em Direito Criminal, Família, Consumidor e Imobiliário." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Lucas Rodriguez Advocacia" />
        <meta name="twitter:description" content="Escritório de advocacia no Santos/SP especializado em Direito Criminal, Família, Consumidor e Imobiliário." />
      </Helmet>
      <Header />
      <HeroSection />
      <Suspense fallback={null}>
        <AreasAtuacao />
        <SobreAdvogado />
        <Metodologia />
        <Depoimentos />
        <GaleriaEscritorio />
        <FAQSection />
        <ContatoForm />
        <WhatsAppButton />
      </Suspense>
      <Footer />
    </main>
  );
};

export default Index;
