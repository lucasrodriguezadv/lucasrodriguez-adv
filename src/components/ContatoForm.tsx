import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Send, Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site';

export default function ContatoForm() {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: 'Aceite a Política de Privacidade para enviar.', variant: 'destructive' });
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          nome: formData.get('nome'),
          email: formData.get('email'),
          telefone: formData.get('telefone'),
          assunto: formData.get('assunto'),
          horario: formData.get('horario'),
          mensagem: formData.get('mensagem'),
        },
      });

      if (error) throw error;

      toast({ title: 'Mensagem enviada com sucesso!', description: 'Retornaremos em breve.' });
      form.reset();
      setAgreed(false);
    } catch (err) {
      console.error('Erro ao enviar:', err);
      toast({ title: 'Erro ao enviar mensagem.', description: 'Tente novamente mais tarde.', variant: 'destructive' });
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
    <section id="contato" className="py-20 md:py-32 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Contato</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-white">
            Fale <span className="text-gold-gradient">Conosco</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm md:text-base font-sans">
            Preencha o formulário abaixo ou entre em contato diretamente. Estamos prontos para ajudá-lo.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                className="flex items-start gap-4 group p-4 rounded-lg border border-white/5 hover:border-gold/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-white/80 font-sans text-sm leading-relaxed group-hover:text-white transition-colors block break-words">
                      {item.label}
                    </span>
                    <span className="text-white/30 font-sans text-xs mt-0.5 block">
                      {item.subtitle}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10">
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
            className="lg:col-span-3 space-y-5 p-6 md:p-8 rounded-lg border border-white/10 bg-white/[0.02]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="text-white font-serif text-xl font-semibold mb-2">Envie sua mensagem</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/50 text-xs font-sans uppercase tracking-wider">Nome *</label>
                <Input name="nome" placeholder="Seu nome completo" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold h-11" />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/50 text-xs font-sans uppercase tracking-wider">E-mail *</label>
                <Input name="email" type="email" placeholder="seu@email.com" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold h-11" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/50 text-xs font-sans uppercase tracking-wider">Telefone</label>
                <Input name="telefone" placeholder="(13) 99999-9999" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold h-11" />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/50 text-xs font-sans uppercase tracking-wider">Assunto</label>
                <select name="assunto" className="flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 focus:outline-none focus:ring-2 focus:ring-gold transition-colors">
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
              <label className="text-white/50 text-xs font-sans uppercase tracking-wider">Horário preferido</label>
              <Input name="horario" placeholder="Ex: Manhã, das 9h às 12h" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold h-11" />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-sans uppercase tracking-wider">Mensagem *</label>
              <Textarea name="mensagem" placeholder="Descreva brevemente como podemos ajudá-lo..." rows={4} required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gold resize-none" />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-0.5"
              />
              <label htmlFor="privacy" className="text-white/50 text-sm font-sans cursor-pointer leading-relaxed">
                Li e aceito a <a href="/politica-de-privacidade" className="text-gold underline hover:text-gold-light transition-colors">Política de Privacidade</a>
              </label>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_hsla(43,53%,54%,0.3)] h-12 text-base">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
