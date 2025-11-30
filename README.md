# TimeSpeaker

**English | [Português](./README.pt-BR.md)**

A Nuxt 4 application that generates and serves audio files with the current time in multiple languages using Google Translator TTS.

## 📋 Requirements

- Node.js 18.x or higher
- npm, pnpm or yarn

## 🚀 Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Audio cache directory (default: ./public/audio-cache)
AUDIO_CACHE_DIR=./public/audio-cache

# Rate limiting
RATE_LIMIT_UNAUTH=5
RATE_LIMIT_AUTH=20

# Default language and timezone
DEFAULT_LANGUAGE=en
DEFAULT_TIMEZONE=UTC

# TTS speed (0.5 = slower, 1.0 = normal)
TTS_SPEED=0.5
```

### 3. Create Cache Directory

```bash
mkdir -p public/audio-cache
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Run All Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## 🏗️ Production Build

### Local Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/timespeaker.git
   git push -u origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables

3. **Configure Environment Variables on Vercel**

   In the Vercel dashboard, go to Settings → Environment Variables and add:

   ```
   AUDIO_CACHE_DIR=/tmp/audio-cache
   RATE_LIMIT_UNAUTH=5
   RATE_LIMIT_AUTH=20
   DEFAULT_LANGUAGE=en
   DEFAULT_TIMEZONE=UTC
   TTS_SPEED=0.5
   ```

   **⚠️ IMPORTANT**: On Vercel, use `/tmp/audio-cache` for the cache directory, as the file system is ephemeral.

4. **Automatic Deployment**
   - Vercel will automatically deploy on every push to the `main` branch

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Vercel Configuration (vercel.json)

The project already includes a `vercel.json` file with the necessary settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

## 🔧 Advanced Configuration

### Audio Cache on Vercel

Since Vercel's file system is ephemeral, consider using:

1. **Vercel Blob Storage** (Recommended)
   - Persistent storage
   - [Documentation](https://vercel.com/docs/storage/vercel-blob)

2. **Cloudflare R2** or **AWS S3**
   - External alternatives
   - Requires additional configuration

### Custom Domain Configuration

1. Go to Settings → Domains in Vercel
2. Add your custom domain
3. Configure DNS as instructed

## 📚 Documentation

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/frameworks/nuxt)
- [Project CLAUDE.md](../CLAUDE.md) - Complete technical documentation
- [Project PLANO-DE-ACAO.md](../PLANO-DE-ACAO.md) - Implementation plan

## 🛠️ Available Scripts

| Command | Description |
|---------|-----------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run all tests |
| `npm run test:integration` | Run integration tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Run linter |
| `npm run lint:fix` | Fix linting issues |

## 🌐 API Endpoints

### `GET /api/audio`
Generates or returns audio of the current time

**Query Parameters:**
- `language` (optional): Language code (pt-BR, en, es)
- `timezone` (optional): Timezone (America/Sao_Paulo, UTC, etc.)

**Headers:**
- `Accept`: `audio/mpeg` or `application/json`

Demo http: <br>

#### GET request demo (json response)
```http
GET /api/audio
?language=pt-BR
&timezone=America%2FSao_Paulo
Accept: application/json
Authorization: Bearer MyAuthToken
```

#### GET request demo (mp3 response)
```http
GET /api/audio
?language=pt-BR
&timezone=America%2FSao_Paulo
```

### `GET /api/session`
Returns current session information

**Response:**
```json
{
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "currentTime": "2025-11-30T14:30:00-03:00"
}
```

### Demo URLs
- http://localhost:3000/api/audio?language=pt-BR&timezone=America%2FSao_Paulo&type=audio
- http://localhost:3000/api/audio?language=pt-BR&timezone=America%2FSao_Paulo&type=json

## ⌛ Rate limiting
By default unauthenticated requests can do `5` requests by minute and auth requests `20`.

You can change the values in .env file or your environment settings
```sh
RATE_LIMIT_UNAUTH=5
RATE_LIMIT_AUTH=20
```

Auth headers:

```sh
## TODO
Authorization: [any string]
App-Id: [any uuid string]
```

## 📝 License

[UNLICENSE](./LICENSE) <br>
For more information, please refer to <https://unlicense.org>

----
### Deploy on [Vercel](https://vercel.com):
<a href="https://vercel.com/new/clone?repository-url=https://github.com/tiagofrancafernandes/TimeSpeaker/tree/master"><img src="https://vercel.com/button"></a>
