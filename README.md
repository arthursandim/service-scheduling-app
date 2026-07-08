# Service Scheduling App

Interface web para gerenciamento de agendamentos da Sandim Jardinagem. Permite visualizar, criar e gerenciar agendamentos de serviços de jardinagem.

## Tecnologias

- React + Vite
- Tailwind CSS
- React Router DOM
- Playwright (testes E2E)

## Pré-requisitos

- Node.js 18+
- Backend `service-scheduling-api` rodando

## Instalação

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
VITE_API_URL=http://localhost:3000
PLAYWRIGHT_BASE_URL=http://localhost:5173
PLAYWRIGHT_API_URL=http://localhost:3000
E2E_USER_EMAIL=e2e@test.com
E2E_USER_PASSWORD=senha_e2e
```

## Execução

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
```

## Testes E2E

Os testes utilizam Playwright e requerem os servidores de backend e frontend rodando.

```bash
# Subir o backend (em outro terminal, dentro de service-scheduling-api)
npm run dev

# Subir o frontend (em outro terminal)
npm run dev

# Rodar os testes em modo headless
npx playwright test

# Rodar os testes com UI
npx playwright test --ui
```

### Rodar contra o ambiente de staging

Atualize as variáveis no `.env` para apontar para o staging:

```env
PLAYWRIGHT_BASE_URL=https://service-scheduling-app-dev.vercel.app
PLAYWRIGHT_API_URL=https://service-scheduling-api-dev.onrender.com
```

Depois execute normalmente:

```bash
npx playwright test
```

## Páginas

| Rota | Descrição |
|------|-----------|
| `/login` | Login do profissional |
| `/registro` | Cadastro de novo profissional |
| `/verificar` | Verificação de e-mail |
| `/dashboard` | Lista de agendamentos |
| `/agendamentos/:id` | Detalhes do agendamento |

## Deploy

Hospedado na [Vercel](https://vercel.com).

- **Produção:** `https://service-scheduling-app-rho.vercel.app`
- **Staging:** `https://service-scheduling-app-dev.vercel.app`
