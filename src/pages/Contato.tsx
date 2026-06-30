import { Helmet } from 'react-helmet-async';
import InternalPageLayout from '@/components/InternalPageLayout';
import ContatoForm from '@/components/ContatoForm';

export default function Contato() {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Contato - Lucas Rodriguez Advocacia</title>
        <meta name="description" content="Entre em contato com o escritório Lucas Rodriguez Advocacia. Atendimento em Santos, SP. Fale com um especialista." />
        <meta property="og:title" content="Contato - Lucas Rodriguez Advocacia" />
        <meta property="og:description" content="Entre em contato com o escritório Lucas Rodriguez Advocacia. Fale com um especialista." />
      </Helmet>
      <ContatoForm withHeaderOffset />
    </InternalPageLayout>
  );
}
