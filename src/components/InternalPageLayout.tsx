import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeferredWhatsAppButton from '@/components/DeferredWhatsAppButton';

interface InternalPageLayoutProps {
  children: React.ReactNode;
}

export default function InternalPageLayout({ children }: InternalPageLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main id="conteudo" className="overflow-hidden">
        {children}
      </main>
      <Footer />
      <DeferredWhatsAppButton />
    </>
  );
}
