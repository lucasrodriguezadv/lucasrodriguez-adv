import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Quais são os tipos de divórcio existentes?',
    a: 'Existem duas modalidades: o divórcio consensual, quando ambas as partes estão de acordo, e o divórcio litigioso, quando há divergências. Ambos podem ser realizados judicialmente ou, no caso do consensual sem filhos menores, em cartório.',
  },
  {
    q: 'Como funciona a guarda compartilhada?',
    a: 'A guarda compartilhada é o regime em que ambos os pais exercem conjuntamente os direitos e deveres relativos aos filhos. É a modalidade preferencial pela legislação brasileira e visa garantir o convívio equilibrado da criança com ambos os genitores.',
  },
  {
    q: 'Quais são os requisitos para adoção no Brasil?',
    a: 'O adotante deve ter no mínimo 18 anos e ser pelo menos 16 anos mais velho que o adotando. É necessário cadastro prévio junto à Vara da Infância e Juventude, além de avaliação psicossocial e participação em curso preparatório.',
  },
  {
    q: 'Como é calculada a pensão alimentícia?',
    a: 'A pensão alimentícia é calculada com base no binômio necessidade x possibilidade, considerando as necessidades de quem recebe e a capacidade financeira de quem paga. Não existe um percentual fixo na lei, mas a jurisprudência costuma fixar entre 15% e 33% dos rendimentos.',
  },
  {
    q: 'Quais medidas protetivas existem em caso de violência doméstica?',
    a: 'A Lei Maria da Penha prevê diversas medidas protetivas, como afastamento do agressor do lar, proibição de aproximação e contato, além de encaminhamento a programas de proteção. As medidas podem ser solicitadas na delegacia ou diretamente ao juiz.',
  },
  {
    q: 'É possível modificar acordos de guarda e pensão?',
    a: 'Sim, tanto a guarda quanto a pensão alimentícia podem ser revisadas judicialmente sempre que houver mudança nas circunstâncias fáticas, como alteração na condição financeira ou nas necessidades dos envolvidos.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, type: 'spring' as const, stiffness: 120 },
  },
};

export default function FAQSection() {
  return (
    <section id="faq" className="content-auto bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-sans tracking-[0.2em] uppercase">Dúvidas</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            Perguntas <span className="text-gold-gradient">Frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-6 data-[state=open]:border-gold/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-sans text-base font-medium text-foreground hover:text-gold hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
