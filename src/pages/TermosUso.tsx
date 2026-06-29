import { Helmet } from 'react-helmet-async';
import InternalPageLayout from '@/components/InternalPageLayout';
import { motion } from 'framer-motion';

export default function TermosUso() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Termos de Uso - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Termos e condições de uso do site Lucas Rodriguez Advocacia." />
        <meta property="og:title" content="Termos de Uso - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Termos e condições de uso do site Lucas Rodriguez Advocacia." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Termos de <span className="text-gold-gradient">Uso</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg text-muted-foreground font-sans">
            <h2 className="font-serif text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar este site, você concorda com os presentes Termos de Uso. Caso não concorde, recomendamos que não utilize o site.</p>

            <h2 className="font-serif text-foreground">2. Uso do Site</h2>
            <p>O conteúdo deste site é fornecido apenas para fins informativos e não constitui aconselhamento jurídico. A relação advogado-cliente somente se estabelece mediante contrato formal de prestação de serviços.</p>

            <h2 className="font-serif text-foreground">3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, é de propriedade exclusiva da Lucas Rodriguez Advocacia, sendo vedada sua reprodução sem autorização prévia.</p>

            <h2 className="font-serif text-foreground">4. Limitação de Responsabilidade</h2>
            <p>Não nos responsabilizamos por decisões tomadas com base exclusivamente nas informações disponibilizadas neste site. Para orientação jurídica personalizada, entre em contato com nosso escritório.</p>

            <h2 className="font-serif text-foreground">5. Alterações</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo a versão atualizada publicada nesta página.</p>

            <p className="text-sm text-muted-foreground/60 mt-12">Última atualização: Fevereiro de 2026.</p>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
