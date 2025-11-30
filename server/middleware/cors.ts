import type { H3Event } from 'h3'

/**
 * CORS middleware - Enable CORS for all origins
 */
export default defineEventHandler((event: H3Event) => {
    setResponseHeaders(event, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers':
            'Content-Type, Authorization, App-Id, X-Language, X-Timezone',
        'Access-Control-Max-Age': '86400',
    })

    // Handle preflight requests
    if (event.method === 'OPTIONS') {
        setResponseStatus(event, 204)
        return ''
    }
})
