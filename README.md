# Lucas Rodriguez Advocacia

Site institucional profissional para Lucas Rodriguez Advocacia, desenvolvido em React, TypeScript e Tailwind CSS.

O projeto foi estruturado para performance, responsividade, SEO, acessibilidade e envio seguro de contatos com Resend por função serverless. A chave da Resend fica protegida no ambiente do servidor e nunca é exposta no frontend.

## Principais Recursos

- Página inicial institucional com vídeo, fallback visual e animações controladas.
- Áreas de atuação: Imobiliário, Família, Penal e Consumidor.
- Página “Quem Somos” com apresentação profissional.
- Galeria do escritório com fotos, vídeos, controles manuais e suporte a redução de movimento.
- Formulário de contato com envio real via Resend.
- Fallback automático por `mailto:` caso a função de envio não esteja disponível.
- WhatsApp como canal rápido de atendimento.
- SEO técnico com sitemap, robots, canonical e schema `LegalService`.
- Headers de segurança para hospedagem estática compatível com `_headers`.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Resend via função serverless
- Vitest
- ESLint

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior
- Chave Resend ativa
- Domínio/remetente verificado na Resend

## Instalação

```sh
npm install
```

Crie um `.env` local a partir do modelo, se for testar a função de envio em ambiente com suporte a functions:

```sh
cp .env.example .env
```

Variáveis esperadas:

```env
RESEND_API_KEY="re_..."
CONTACT_FROM_EMAIL="Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>"
CONTACT_TO_EMAIL="contato@lucasrodriguez.adv.br"
SITE_URL="https://lucasrodriguez.adv.br"
```

Essas variáveis são server-side. Não use prefixo `VITE_` nelas.

## Desenvolvimento

```sh
npm run dev
```

Servidor local padrão:

```txt
http://localhost:8080
```

Observação: `npm run dev` executa apenas o frontend. Para testar a função de contato localmente, use uma plataforma/CLI que execute funções serverless compatíveis com a pasta `netlify/functions`.

## Scripts

```sh
npm run dev        # servidor local
npm run build      # build de produção
npm run preview    # preview do build
npm run lint       # análise estática
npm run test       # testes com Vitest
```

## Formulário de Contato

O fluxo de contato funciona assim:

1. O usuário preenche o formulário.
2. O frontend envia os dados para `/.netlify/functions/send-contact-email`.
3. A função valida os campos e usa a Resend para enviar o e-mail.
4. A chave `RESEND_API_KEY` fica somente no ambiente do servidor.
5. Se a função não estiver disponível, o site abre um e-mail preenchido via `mailto:`.

Função responsável:

```txt
netlify/functions/send-contact-email.mjs
```

Dados de contato e domínio canônico:

```txt
src/config/site.ts
```

## Estrutura

```txt
netlify/
  functions/               função de envio com Resend

public/
  _headers                 headers de segurança
  sitemap.xml              sitemap público
  robots.txt               regras de indexação
  .well-known/security.txt contato para relatos de segurança
  media/                   imagens, logo e vídeos do escritório
  videos/                  vídeo principal do hero

src/
  components/              seções autorais e componentes de interface
  components/ui/           componentes base shadcn/ui
  config/                  dados centrais do site
  hooks/                   hooks reutilizáveis
  lib/                     utilitários
  pages/                   páginas e rotas
  test/                    configuração e testes
```

## Segurança

O projeto inclui:

- `Content-Security-Policy`;
- `Permissions-Policy`;
- `Referrer-Policy`;
- `X-Content-Type-Options`;
- `X-Frame-Options`;
- `Cross-Origin-Opener-Policy`;
- `security.txt`;
- honeypot simples no formulário;
- validação server-side da função de contato.

Headers definidos em:

```txt
public/_headers
```

Em servidores próprios, configure headers equivalentes no Nginx, Apache ou serviço de hospedagem utilizado.

## SEO

Arquivos e recursos incluídos:

- `public/sitemap.xml`;
- `public/robots.txt`;
- canonical na página inicial;
- metadados Open Graph e Twitter;
- schema JSON-LD `LegalService`.

Se o domínio final mudar, atualize:

```txt
src/config/site.ts
public/sitemap.xml
public/robots.txt
public/.well-known/security.txt
```

## Build e Publicação

Gere o build:

```sh
npm run build
```

O resultado será criado em:

```txt
dist/
```

Publique em hospedagem estática com suporte a SPA e funções serverless compatíveis com a pasta `netlify/functions`.

## Checklist Antes de Publicar

```sh
npm run lint
npm run test
npm run build
npm audit --audit-level=moderate
```

## Créditos

Desenvolvido por Michel Brotherhood.
