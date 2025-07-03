# 🔐 Auth App - Autenticação e Autorização com Next.js

Este é um projeto de autenticação e autorização construído com **Next.js 14 (App Router)**. Ele utiliza **cookies** para manter a sessão do usuário autenticado e implementa **middleware de proteção de rotas**, além de formulários validados com **React Hook Form** e **Zod**.

## ✨ Funcionalidades

- Cadastro de usuários (Sign Up)
- Login com token JWT (armazenado em cookie)
- Logout
- Proteção de rotas com middleware
- Redirecionamento automático para páginas corretas com base na autenticação
- Notificações com `react-toastify`
- Estilização com `Chakra UI`
- Backend integrado (NestJS ou outro) para persistência e autenticação

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Pedrovisk19/authenticator-frontend.git
cd auth-app-next
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

---

## 🧱 Estrutura do Projeto

- `app/` — estrutura de rotas com App Router
- `middleware.ts` — verifica se o usuário está autenticado via cookie e redireciona
- `components/` — componentes reutilizáveis como modais e tabelas
- `auth/` — páginas de login (`/`) e cadastro (`/signup`)
- `dashboard/` — área protegida (acessível apenas com token)
- `utils/` — utilitários de validação, cookies etc.

---

## 🔒 Middleware de Autenticação

A aplicação protege as páginas que começam com `/dashboard`, permitindo acesso apenas se o token JWT estiver presente nos cookies. Caso contrário, o usuário é redirecionado para `/`.

```ts
// middleware.ts (resumo)
if (!token && rota protegida) redireciona para '/login'
if (token e rota pública) redireciona para '/dashboard'
```

---

## 🛠 Tecnologias Utilizadas

- [Next.js](https://nextjs.org)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form + Zod](https://react-hook-form.com/)
- [Chakra UI](https://chakra-ui.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Axios](https://axios-http.com/)
- [js-cookie](https://github.com/js-cookie/js-cookie)

---

## 🧪 Futuras Melhorias

- Recuperação de senha [x]
- Confirmação por e-mail [x]
- Notificações em tempo real (WebSocket) []
- Painel de permissões por papel (admin, user) []

---

## 📦 Backend

Este projeto consome uma API REST feita com **NestJS**, que cuida da autenticação (JWT), criação de usuários e regras de segurança. O código backend está em outro repositório.

---

## Objetivo do projeto 

Foco em autenticação e controle de rotas, o restante das funcionalidades não foram desenvolvidas 100%, pois não era o foco! 

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por [Pedro Henrique Gonçalves de Souza]