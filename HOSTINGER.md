# Publicacao na Hostinger Premium

Este projeto esta pronto para rodar na Hostinger Premium como site estatico com endpoint PHP para o formulario.

## 1. Gerar o build

```sh
npm ci
npm run build
```

## 2. Subir o site

No hPanel, abra o Gerenciador de Arquivos do dominio e envie o conteudo da pasta `dist/` para `public_html/`.

Importante: envie os arquivos que estao dentro de `dist/`, nao a pasta `dist` inteira.

## 3. Configurar o formulario

Crie uma pasta privada fora de `public_html`:

```txt
/home/SEU_USUARIO/private/
```

Crie o arquivo:

```txt
/home/SEU_USUARIO/private/contact-config.php
```

Use o modelo em `hostinger/contact-config.example.php` e troque `re_...` pela chave real da Resend.

## 4. Conferir rotas

O arquivo `public/.htaccess` e copiado para `dist/.htaccess` no build. Ele faz as rotas do React funcionarem ao recarregar paginas como:

```txt
/quem-somos
/areas/familia
/contato
```

## 5. Teste final

Depois de subir, teste:

- pagina inicial;
- recarregar `/quem-somos`;
- envio do formulario em `/contato`;
- fallback de WhatsApp;
- cadeado HTTPS ativo.

Se o formulario falhar, o site abre um e-mail preenchido como fallback.
