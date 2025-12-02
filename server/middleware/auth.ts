import type { H3Event } from 'h3';

/**
 * Authentication middleware
 * Checks for Authorization Bearer token and App-Id UUID
 */
export default defineEventHandler((event: H3Event) => {
    // Get Authorization header
    const authorization = getHeader(event, 'Authorization') || getHeader(event, 'authorization');
    const appId = getHeader(event, 'App-Id') || getHeader(event, 'app-id');

    // Check if request is authenticated
    const hasBearer = authorization && authorization.startsWith('Bearer ');
    const hasAppId = appId && isValidUUID(appId);

    // Add authentication flag to event context
    event.context.isAuthenticated = hasBearer && hasAppId;

    // Store auth info in context
    if (hasBearer) {
        event.context.bearerToken = authorization.substring(7);
    }
    if (hasAppId) {
        event.context.appId = appId;
    }
});

/**
 * Validate UUID format
 */
function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
