import { promises as fs } from 'fs'
import { join } from 'path'
import { generateHash } from './hash'

/**
 * Check if audio file exists in cache
 */
export async function checkCacheExists(hash: string): Promise<boolean> {
    try {
        const filePath = getCachePath(hash)
        await fs.access(filePath)
        return true
    } catch {
        return false
    }
}

/**
 * Get full path for cached audio file
 */
export function getCachePath(hash: string): string {
    const config = useRuntimeConfig()
    const cacheDir = config.audioCacheDir
    return join(process.cwd(), cacheDir, `${hash}.mp3`)
}

/**
 * Save audio buffer to cache
 */
export async function saveCacheFile(hash: string, buffer: Buffer): Promise<void> {
    const filePath = getCachePath(hash)

    // Ensure cache directory exists
    const cacheDir = join(process.cwd(), useRuntimeConfig().audioCacheDir)
    await fs.mkdir(cacheDir, { recursive: true })

    // Write file
    await fs.writeFile(filePath, buffer)
}

/**
 * Read audio file from cache
 */
export async function readCacheFile(hash: string): Promise<Buffer> {
    const filePath = getCachePath(hash)
    return await fs.readFile(filePath)
}

/**
 * Get or create cached audio
 * If file exists, return it. Otherwise, generate using the provided function.
 */
export async function getOrCreateCache(
    text: string,
    language: string,
    generateFn: () => Promise<Buffer>
): Promise<{ buffer: Buffer; hash: string; cached: boolean }> {
    const hash = generateHash(text, language)
    const exists = await checkCacheExists(hash)

    if (exists) {
        const buffer = await readCacheFile(hash)
        return { buffer, hash, cached: true }
    }

    const buffer = await generateFn()
    await saveCacheFile(hash, buffer)
    return { buffer, hash, cached: false }
}
