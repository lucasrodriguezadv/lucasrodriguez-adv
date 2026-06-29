import { Helmet } from 'react-helmet-async';
import InternalPageLayout from '@/components/InternalPageLayout';
import { motion } from 'framer-motion';

export default function PoliticaPrivacidade() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Política de Privacidade - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Saiba como coletamos, usamos e protegemos seus dados pessoais." />
        <meta property="og:title" content="Política de Privacidade - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Saiba como coletamos, usamos e protegemos seus dados pessoais." />
      </Helmet>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-curve">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Política de <span className="text-gold-gradient">Privacidade</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg text-muted-foreground font-sans">
            <h2 className="font-serif text-foreground">1. Informações Coletadas</h2>
            <p>Coletamos informações pessoais fornecidas voluntariamente por você ao preencher formulários de contato, como nome, e-mail e telefone. Também podemos coletar dados de navegação automaticamente, como endereço IP e tipo de navegador.</p>

            <h2 className="font-serif text-foreground">2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas exclusivamente para responder às suas consultas, prestar serviços jurídicos e melhorar a experiência no site. Não compartilhamos seus dados com terceiros sem seu consentimento expresso.</p>

            <h2 className="font-serif text-foreground">3. Proteção de Dados</h2>
            <p>Adotamos medidas de segurança técnicas e administrativas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>

            <h2 className="font-serif text-foreground">4. Cookies</h2>
            <p>Utilizamos cookies para melhorar a funcionalidade do site e personalizar sua experiência. Você pode desativar os cookies nas configurações do seu navegador.</p>

            <h2 className="font-serif text-foreground">5. Seus Direitos</h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de acessar, corrigir, excluir ou solicitar a portabilidade de seus dados pessoais a qualquer momento.</p>

            <h2 className="font-serif text-foreground">6. Contato</h2>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco pelo WhatsApp ou formulário de contato disponível no site.</p>

            <p className="text-sm text-muted-foreground/60 mt-12">Última atualização: Fevereiro de 2026.</p>
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
