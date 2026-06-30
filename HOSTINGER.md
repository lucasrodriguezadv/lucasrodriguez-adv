# Publicacao na Hostinger Premium

Este projeto esta pronto para rodar na Hostinger Premium como site estatico com endpoint PHP para o formulario.

## 1. Gerar o build

```sh
npm ci
npm run build
```

## 2. Usar deploy por Git da Hostinger

Se voce usar a conexao direta do GitHub na Hostinger, conecte a branch:

```txt
hostinger
```

Nao conecte a branch `main` ao `public_html`, porque `main` contem o codigo-fonte do Vite. A branch `hostinger` contem apenas o build pronto para hospedagem.

Sempre que a branch `main` receber um push, o GitHub Actions gera um novo build e atualiza a branch `hostinger`.

## 3. Opcao manual

No hPanel, abra o Gerenciador de Arquivos do dominio e envie o conteudo da pasta `dist/` para `public_html/`.

Importante: envie os arquivos que estao dentro de `dist/`, nao a pasta `dist` inteira.

## 4. Configurar o formulario

Crie uma pasta privada fora de `public_html`:

```txt
/home/SEU_USUARIO/private/
```

Crie o arquivo:

```txt
/home/SEU_USUARIO/private/contact-config.php
```

Use o modelo em `hostinger/contact-config.example.php` e troque `re_...` pela chave real da Resend.

## 5. Conferir rotas

O arquivo `public/.htaccess` e copiado para `dist/.htaccess` no build. Ele faz as rotas do React funcionarem ao recarregar paginas como:

```txt
/quem-somos
/areas/familia
/contato
```

## 6. Teste final

Depois de subir, teste:

- pagina inicial;
- recarregar `/quem-somos`;
- envio do formulario em `/contato`;
- fallback de WhatsApp;
- cadeado HTTPS ativo.

Se o formulario falhar, o site abre um e-mail preenchido como fallback.
