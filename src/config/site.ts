export const siteConfig = {
  name: 'Lucas Rodriguez Advocacia',
  title: 'Lucas Rodriguez Advocacia | Atendimento jurídico em Santos/SP',
  description:
    'Escritório de advocacia em Santos/SP especializado em Direito Imobiliário, Família, Penal e Consumidor.',
  email: 'contato@lucasrodriguez.adv.br',
  phones: [
    { label: '(13) 97413-1626', href: 'tel:+5513974131626' },
    { label: '(11) 97442-5237', href: 'tel:+5511974425237' },
  ],
  address: {
    line1: 'Rua Vereador Henrique Soler, 287 - Sala 1010',
    line2: 'Ponta da Praia - Santos/SP - CEP 11030-011',
  },
  businessHours: 'Segunda a sexta, das 8h às 18h',
  whatsappPhone: '5513974131626',
  social: {
    instagram: 'https://instagram.com/lucas.castro_adv',
    facebook: 'https://www.facebook.com/lucas.castro.advogado',
  },
} as const;

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${siteConfig.whatsappPhone}&text=${text}`;
}

export const defaultWhatsAppMessage =
  'Olá, gostaria de agendar uma consulta com o Dr. Lucas Rodriguez.';
