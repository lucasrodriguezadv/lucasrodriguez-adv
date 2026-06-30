import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '@/config/site';

const assuntoLabels: Record<string, string> = {
  imobiliario: 'Direito Imobiliário',
  familia: 'Família e Sucessões',
  criminal: 'Direito Penal',
  consumidor: 'Direito do Consumidor',
  outro: 'Outro',
};

const contactEndpoints = [
  '/api/send-contact-email.php',
  '/.netlify/functions/send-contact-email',
];

function getTextValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function buildEmailBody(formData: FormData) {
  const assunto = getTextValue(formData, 'assunto');

  return [
    'Olá, equipe Lucas Rodriguez Advocacia.',
    '',
    'Recebi orientação pelo site e gostaria de atendimento.',
    '',
    `Nome: ${getTextValue(formData, 'nome')}`,
    `E-mail: ${getTextValue(formData, 'email')}`,
    `Telefone: ${getTextValue(formData, 'telefone') || 'Não informado'}`,
    `Assunto: ${assuntoLabels[assunto] ?? 'Não informado'}`,
    `Horário preferido: ${getTextValue(formData, 'horario') || 'Não informado'}`,
    '',
    'Mensagem:',
    getTextValue(formData, 'mensagem'),
  ].join('\n');
}

interface ContatoFormProps {
  withHeaderOffset?: boolean;
}

export default function ContatoForm({ withHeaderOffset = false }: ContatoFormProps) {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!agreed) {
      toast({ title: 'Aceite a Política de Privacidade para enviar.', variant: 'destructive' });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nome = getTextValue(formData, 'nome');
    const subject = `Contato pelo site - ${nome || 'Novo atendimento'}`;
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEmailBody(formData))}`;

    const payload = {
      nome,
      email: getTextValue(formData, 'email'),
      telefone: getTextValue(formData, 'telefone'),
      assunto: getTextValue(formData, 'assunto'),
      horario: getTextValue(formData, 'horario'),
      mensagem: getTextValue(formData, 'mensagem'),
      website: getTextValue(formData, 'website'),
    };

    setLoading(true);
    try {
      let lastError = 'Falha no envio.';

      for (const endpoint of contactEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            toast({
              title: 'Mensagem enviada com sucesso!',
              description: 'Retornaremos em breve pelo contato informado.',
            });

            form.reset();
            setAgreed(false);
            return;
          }

          const data = await response.json().catch(() => null);
          lastError = data?.error ?? lastError;
        } catch (error) {
          lastError = error instanceof Error ? error.message : lastError;
        }
      }

      throw new Error(lastError);
    } catch (error) {
      console.error('Erro ao enviar contato:', error);
      window.location.href = mailtoUrl;

      toast({
        title: 'Abrimos seu e-mail como alternativa.',
        description: 'Revise a mensagem preenchida e clique em enviar.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: siteConfig.phones[0].label, href: siteConfig.phones[0].href, subtitle: 'WhatsApp disponível' },
    { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}`, subtitle: 'Resposta em até 24h' },
    { icon: MapPin, label: siteConfig.address.line1, href: '#', subtitle: siteConfig.address.line2 },
    { icon: Clock, label: siteConfig.businessHours, href: '#', subtitle: 'Atendimento com hora marcada' },
  ];

  return (
    <section
      id="contato"
      className={`content-auto bg-navy-gradient ${
        withHeaderOffset ? 'pb-20 pt-32 md:pb-32 md:pt-40' : 'py-20 md:py-32'
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Contato</span>
          <h2 className="font-serif mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Fale <span className="text-gold-gradient">Conosco</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-white/65 md:text-base">
            Preencha o formulário para enviar sua solicitação com segurança ou fale diretamente pelo WhatsApp.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="space-y-5 lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <span className="block break-words font-sans text-sm leading-relaxed text-white/80 transition-colors group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs text-white/30">
                      {item.subtitle}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Localização do escritório"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.8!2d-46.3278!3d-23.9877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDU5JzE1LjciUyA0NsKwMTknNDAuMSJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-white/10 bg-white/[0.02] p-6 md:p-8 lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-serif mb-2 text-xl font-semibold text-white">Envie sua mensagem</h3>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="font-sans text-xs uppercase tracking-wider text-white/50">Nome *</label>
                <Input name="nome" placeholder="Seu nome completo" required className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-gold" />
              </div>
              <div className="space-y-1.5">
                <label className="font-sans text-xs uppercase tracking-wider text-white/50">E-mail *</label>
                <Input name="email" type="email" placeholder="seu@email.com" required className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-gold" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="font-sans text-xs uppercase tracking-wider text-white/50">Telefone</label>
                <Input name="telefone" placeholder="(13) 99999-9999" className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-gold" />
              </div>
              <div className="space-y-1.5">
                <label className="font-sans text-xs uppercase tracking-wider text-white/50">Assunto</label>
                <select name="assunto" className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold">
                  <option value="" className="bg-navy">Selecione o assunto</option>
                  <option value="imobiliario" className="bg-navy">Direito Imobiliário</option>
                  <option value="familia" className="bg-navy">Família e Sucessões</option>
                  <option value="criminal" className="bg-navy">Direito Penal</option>
                  <option value="consumidor" className="bg-navy">Direito do Consumidor</option>
                  <option value="outro" className="bg-navy">Outro</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs uppercase tracking-wider text-white/50">Horário preferido</label>
              <Input name="horario" placeholder="Ex: Manhã, das 9h às 12h" className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-gold" />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs uppercase tracking-wider text-white/50">Mensagem *</label>
              <Textarea name="mensagem" placeholder="Descreva brevemente como podemos ajudá-lo..." rows={4} required className="resize-none rounded-lg border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-gold" />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(value) => setAgreed(value === true)}
                className="mt-0.5 border-white/20 data-[state=checked]:border-gold data-[state=checked]:bg-gold"
              />
              <label htmlFor="privacy" className="cursor-pointer font-sans text-sm leading-relaxed text-white/50">
                Li e aceito a <a href="/politica-de-privacidade" className="text-gold underline transition-colors hover:text-gold-light">Política de Privacidade</a>
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button type="submit" size="lg" disabled={loading} className="btn-cta btn-cta-primary h-12 w-full text-base">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
              <a
                href={buildWhatsAppUrl('Olá, quero ajuda de um especialista do escritório Lucas Rodriguez Advocacia.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-secondary h-12 px-6"
              >
                WhatsApp
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
