# Lucas Rodriguez Advocacia

Site institucional profissional para o escritório Lucas Rodriguez Advocacia, com foco em apresentação de áreas de atuação, captação de contatos e integração com Supabase para registro de leads e envio de e-mails.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase Edge Functions
- Resend para envio de e-mail

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior
- Conta/projeto Supabase configurado
- Chave Resend configurada na Edge Function

## Instalação

```sh
npm install
```

Crie um arquivo `.env` a partir do modelo:

```sh
cp .env.example .env
```

Configure as variáveis públicas do frontend:

```env
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-chave-publica"
```

As variáveis abaixo devem ser configuradas como secrets da Edge Function no Supabase:

```env
SUPABASE_SERVICE_ROLE_KEY="sua-chave-service-role"
RESEND_API_KEY="sua-chave-resend"
CONTACT_FROM_EMAIL="Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>"
CONTACT_TO_EMAIL="contato@lucasrodriguez.adv.br"
```

## Desenvolvimento

```sh
npm run dev
```

Por padrão, o Vite sobe em:

```txt
http://localhost:8080
```

## Scripts

```sh
npm run dev        # servidor local
npm run build      # build de produção
npm run preview    # preview do build
npm run lint       # análise estática
npm run test       # testes com Vitest
```

## Estrutura

```txt
src/
  components/      componentes autorais e UI base
  config/          dados centrais do site e links de contato
  integrations/    cliente Supabase tipado
  pages/           páginas e rotas
  assets/          imagens e marcas
supabase/
  functions/       Edge Functions
  migrations/      schema do banco
public/
  videos/          hero video e poster
```

## Supabase

A tabela `contact_leads` é criada pelas migrations em `supabase/migrations`.

A função `send-contact-email`:

- valida campos obrigatórios;
- registra o lead no banco;
- envia o e-mail via Resend;
- marca o lead como `email_sent` após envio bem-sucedido.

Para publicar a função:

```sh
supabase functions deploy send-contact-email
```

Para configurar secrets:

```sh
supabase secrets set RESEND_API_KEY="..."
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="..."
supabase secrets set CONTACT_FROM_EMAIL="Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>"
supabase secrets set CONTACT_TO_EMAIL="contato@lucasrodriguez.adv.br"
```

## Qualidade

Antes de publicar, rode:

```sh
npm run lint
npm run test
npm run build
```

## Deploy

O build final é gerado em `dist/`:

```sh
npm run build
```

Esse diretório pode ser publicado em qualquer hospedagem estática compatível com SPA, como Vercel, Netlify, Cloudflare Pages ou servidor próprio.
