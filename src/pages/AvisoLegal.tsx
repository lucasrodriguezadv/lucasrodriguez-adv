import { Helmet } from 'react-helmet-async';
import InternalPageLayout from '@/components/InternalPageLayout';
import { motion } from 'framer-motion';

export default function AvisoLegal() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Aviso Legal - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Informações sobre a natureza do conteúdo e conformidade com a OAB." />
        <meta property="og:title" content="Aviso Legal - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Informações sobre a natureza do conteúdo e conformidade com a OAB." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Aviso <span className="text-gold-gradient">Legal</span>
          </motion.h1>
        </div>
      </section>

      <section className="content-auto bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg text-muted-foreground font-sans">
            <h2 className="font-serif text-foreground">Natureza do Conteúdo</h2>
            <p>As informações contidas neste site têm caráter meramente informativo e educativo, não devendo ser interpretadas como aconselhamento jurídico para situações específicas.</p>

            <h2 className="font-serif text-foreground">Relação Advogado-Cliente</h2>
            <p>O acesso ao site e o envio de informações através dos formulários de contato não estabelecem relação advogado-cliente. Esta relação somente se formaliza mediante assinatura de contrato de prestação de serviços advocatícios.</p>

            <h2 className="font-serif text-foreground">Resultados</h2>
            <p>Resultados anteriores não garantem resultados futuros. Cada caso é único e depende de suas circunstâncias específicas. As informações sobre áreas de atuação refletem a experiência do escritório, mas não asseguram êxito em casos individuais.</p>

            <h2 className="font-serif text-foreground">Conformidade</h2>
            <p>Este site está em conformidade com as diretrizes do Código de Ética e Disciplina da OAB e com o Provimento nº 94/2000, que regulamenta a publicidade advocatícia.</p>

            <h2 className="font-serif text-foreground">Registro Profissional</h2>
            <p>Lucas Rodriguez Advocacia — OAB/SP. Escritório localizado em Santos, SP.</p>

            <p className="text-sm text-muted-foreground/60 mt-12">Última atualização: Fevereiro de 2026.</p>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
