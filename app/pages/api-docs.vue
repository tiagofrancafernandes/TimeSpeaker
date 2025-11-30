<template>
    <div
        class="min-h-screen bg-linear-to-b from-indigo-100 to-indigo-900 dark:from-indigo-800 dark:to-gray-950 py-12 px-4"
    >
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
                >
                    ← Voltar para o app
                </NuxtLink>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    API Documentation
                </h1>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    Complete API reference with request examples using fetch and curl
                </p>
            </div>

            <!-- Main Content -->
            <div class="space-y-8">
                <!-- API Overview -->
                <section class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        API Overview
                    </h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        TimeSpeaker provides two main endpoints for generating and retrieving time
                        audio files:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                >/api/audio</code
                            >
                            - Generate or retrieve time audio
                        </li>
                        <li>
                            <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                >/api/session</code
                            >
                            - Get current session information
                        </li>
                    </ul>
                </section>

                <!-- GET /api/audio -->
                <section class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        GET /api/audio
                    </h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        Generates or retrieves cached audio of the current time.
                    </p>

                    <!-- Parameters -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Query Parameters
                        </h3>
                        <div class="space-y-3">
                            <div class="border-l-4 border-indigo-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    language
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Language code (pt-BR, en, es). Default: en
                                </p>
                            </div>
                            <div class="border-l-4 border-indigo-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    timezone
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Timezone identifier (e.g., America/Sao_Paulo). Default: UTC
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Headers -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Headers
                        </h3>
                        <div class="space-y-3">
                            <div class="border-l-4 border-green-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    Accept
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >audio/mpeg</code
                                    >
                                    returns audio file<br />
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >application/json</code
                                    >
                                    returns JSON with URL
                                </p>
                            </div>
                            <div class="border-l-4 border-yellow-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    Authorization (optional)
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Bearer token for higher rate limits
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Fetch Example -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            JavaScript (fetch) Example
                        </h3>
                        <pre
                            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                        ><code class="text-gray-800 dark:text-gray-200">// Get audio file
fetch('/api/audio?language=pt-BR&timezone=America/Sao_Paulo', {
    headers: {
        'Accept': 'audio/mpeg'
    }
})
.then(response => response.blob())
.then(blob => {
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();
})
.catch(error => console.error('Error:', error));

// Get JSON response with URL
fetch('/api/audio?language=en&timezone=UTC', {
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Audio URL:', data.url);
    console.log('Language:', data.language);
    console.log('Timezone:', data.timezone);
    console.log('Time:', data.time);
})
.catch(error => console.error('Error:', error));</code></pre>
                    </div>

                    <!-- cURL Example -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            cURL Example
                        </h3>
                        <pre
                            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                        ><code class="text-gray-800 dark:text-gray-200"># Download audio file
curl -H "Accept: audio/mpeg" \
     "http://localhost:3000/api/audio?language=pt-BR&timezone=America/Sao_Paulo" \
     --output time.mp3

# Get JSON response
curl -H "Accept: application/json" \
     "http://localhost:3000/api/audio?language=en&timezone=UTC"

# With authentication
curl -H "Accept: audio/mpeg" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "App-Id: YOUR_UUID" \
     "http://localhost:3000/api/audio?language=es&timezone=Europe/Madrid"</code></pre>
                    </div>

                    <!-- Response Examples -->
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Response Examples
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    JSON Response (Accept: application/json):
                                </p>
                                <pre
                                    class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                                ><code class="text-gray-800 dark:text-gray-200">{
  "url": "/audio-cache/abc123def456.mp3",
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "time": "14:30"
}</code></pre>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Audio Response (Accept: audio/mpeg):
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Binary audio file (MP3 format)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- GET /api/session -->
                <section class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        GET /api/session
                    </h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">
                        Returns current session information based on request context.
                    </p>

                    <!-- Parameters -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Query Parameters
                        </h3>
                        <div class="space-y-3">
                            <div class="border-l-4 border-indigo-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    language (optional)
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Override language detection
                                </p>
                            </div>
                            <div class="border-l-4 border-indigo-500 pl-4">
                                <p class="font-mono text-sm text-gray-800 dark:text-gray-200">
                                    timezone (optional)
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Override timezone detection
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Fetch Example -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            JavaScript (fetch) Example
                        </h3>
                        <pre
                            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                        ><code class="text-gray-800 dark:text-gray-200">// Get session info with auto-detection
fetch('/api/session')
.then(response => response.json())
.then(data => {
    console.log('Detected Language:', data.language);
    console.log('Detected Timezone:', data.timezone);
    console.log('Current Time:', data.currentTime);
})
.catch(error => console.error('Error:', error));

// Override detection
fetch('/api/session?language=pt-BR&timezone=America/Sao_Paulo')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</code></pre>
                    </div>

                    <!-- cURL Example -->
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            cURL Example
                        </h3>
                        <pre
                            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                        ><code class="text-gray-800 dark:text-gray-200"># Auto-detect session
curl "http://localhost:3000/api/session"

# With overrides
curl "http://localhost:3000/api/session?language=es&timezone=Europe/Madrid"

# With Accept-Language header
curl -H "Accept-Language: pt-BR" \
     "http://localhost:3000/api/session"</code></pre>
                    </div>

                    <!-- Response Example -->
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Response Example
                        </h3>
                        <pre
                            class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"
                        ><code class="text-gray-800 dark:text-gray-200">{
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "currentTime": "2025-11-30T14:30:00-03:00"
}</code></pre>
                    </div>
                </section>

                <!-- Rate Limiting -->
                <section class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Rate Limiting
                    </h2>
                    <div class="space-y-4">
                        <div class="border-l-4 border-red-500 pl-4">
                            <p class="font-semibold text-gray-800 dark:text-gray-200">
                                Unauthenticated Requests
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                5 requests per minute per IP address
                            </p>
                        </div>
                        <div class="border-l-4 border-green-500 pl-4">
                            <p class="font-semibold text-gray-800 dark:text-gray-200">
                                Authenticated Requests
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                20 requests per minute per IP address
                            </p>
                        </div>
                        <div
                            class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4"
                        >
                            <p class="text-sm text-gray-700 dark:text-gray-300">
                                <strong>429 Too Many Requests:</strong> When rate limit is exceeded,
                                the API will return HTTP 429 with a message indicating the limit has
                                been reached.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Supported Languages & Timezones -->
                <section class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Supported Languages & Timezones
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                Languages
                            </h3>
                            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >pt-BR</code
                                    >
                                    - Português (Brasil)
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >en</code
                                    >
                                    - English
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >es</code
                                    >
                                    - Español
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                Common Timezones
                            </h3>
                            <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >UTC</code
                                    >
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >America/Sao_Paulo</code
                                    >
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >America/New_York</code
                                    >
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >Europe/London</code
                                    >
                                </li>
                                <li>
                                    <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                        >Asia/Tokyo</code
                                    >
                                </li>
                                <li class="text-xs text-gray-500 dark:text-gray-500 italic">
                                    + All IANA timezone identifiers
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'API Documentation - TimeSpeaker',
    description:
        'Complete API reference for TimeSpeaker with request examples using fetch and curl',
})
</script>
