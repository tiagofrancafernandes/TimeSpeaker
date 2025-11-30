# TimeSpeaker

**[English](./README.md) | Português**

Uma aplicação Nuxt 4 que gera e serve áudios com a hora atual em múltiplos idiomas usando Google Translator TTS.

## 📋 Requisitos

- Node.js 18.x ou superior
- npm, pnpm ou yarn

## 🚀 Configuração Local

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Diretório de cache de áudio (padrão: ./public/audio-cache)
AUDIO_CACHE_DIR=./public/audio-cache

# Rate limiting
RATE_LIMIT_UNAUTH=5
RATE_LIMIT_AUTH=20

# Idioma e timezone padrão
DEFAULT_LANGUAGE=en
DEFAULT_TIMEZONE=UTC

# Velocidade do TTS (0.5 = mais lento, 1.0 = normal)
TTS_SPEED=0.5
```

### 3. Criar Diretório de Cache

```bash
mkdir -p public/audio-cache
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testes

### Executar Todos os Testes

```bash
npm run test
```

### Testes de Integração

```bash
npm run test:integration
```

### Testes E2E

```bash
npm run test:e2e
```

## 🏗️ Build para Produção

### Build Local

```bash
npm run build
```

### Preview da Build de Produção

```bash
npm run preview
```

## 📦 Deploy na Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push do código para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/timespeaker.git
   git push -u origin main
   ```

2. **Importe o projeto na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Import Project"
   - Selecione seu repositório do GitHub
   - Configure as variáveis de ambiente

3. **Configurar Variáveis de Ambiente na Vercel**

   No painel da Vercel, vá em Settings → Environment Variables e adicione:

   ```
   AUDIO_CACHE_DIR=/tmp/audio-cache
   RATE_LIMIT_UNAUTH=5
   RATE_LIMIT_AUTH=20
   DEFAULT_LANGUAGE=en
   DEFAULT_TIMEZONE=UTC
   TTS_SPEED=0.5
   ```

   **⚠️ IMPORTANTE**: Na Vercel, use `/tmp/audio-cache` para o diretório de cache, pois o sistema de arquivos é efêmero.

4. **Deploy Automático**
   - A Vercel fará deploy automático a cada push na branch `main`

### Opção 2: Deploy via CLI da Vercel

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login na Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy para Produção**
   ```bash
   vercel --prod
   ```

### Configuração do Vercel (vercel.json)

O projeto já inclui um arquivo `vercel.json` com as configurações necessárias:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

## 🔧 Configuração Avançada

### Cache de Áudio na Vercel

Como o sistema de arquivos da Vercel é efêmero, considere usar:

1. **Vercel Blob Storage** (Recomendado)
   - Armazenamento persistente
   - [Documentação](https://vercel.com/docs/storage/vercel-blob)

2. **Cloudflare R2** ou **AWS S3**
   - Alternativas externas
   - Requer configuração adicional

### Configuração de Domínio Customizado

1. Acesse Settings → Domains na Vercel
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

## 📚 Documentação

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/frameworks/nuxt)
- [Project CLAUDE.md](../CLAUDE.md) - Documentação técnica completa
- [Project PLANO-DE-ACAO.md](../PLANO-DE-ACAO.md) - Plano de implementação

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run preview` | Preview da build de produção |
| `npm run test` | Executa todos os testes |
| `npm run test:integration` | Executa testes de integração |
| `npm run test:e2e` | Executa testes E2E |
| `npm run lint` | Executa linter |
| `npm run lint:fix` | Corrige problemas de linting |

## 🌐 API Endpoints

### `GET /api/audio`
Gera ou retorna áudio da hora atual

**Query Parameters:**
- `language` (opcional): Código do idioma (pt-BR, en, es)
- `timezone` (opcional): Timezone (America/Sao_Paulo, UTC, etc.)

**Headers:**
- `Accept`: `audio/mpeg` ou `application/json`

### `GET /api/session`
Retorna informações da sessão atual

**Response:**
```json
{
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "currentTime": "2025-11-30T14:30:00-03:00"
}
```

## 📝 Licença

[UNLICENSE](./LICENSE) <br>
For more information, please refer to <https://unlicense.org>

----
### Deploy na [Vercel](https://vercel.com):
<a href="https://vercel.com/new/clone?repository-url=https://github.com/tiagofrancafernandes/TimeSpeaker/tree/master"><img src="https://vercel.com/button"></a>
