import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'fs'
import { join } from 'path'
import { generateHash } from '../../server/utils/hash'
import {
    checkCacheExists,
    getCachePath,
    saveCacheFile,
    readCacheFile,
    getOrCreateCache,
} from '../../server/utils/audioCache'

const TEST_CACHE_DIR = './public/test-audio-cache'
const TEST_TEXT = 'duas horas e vinte e cinco minutos'
const TEST_LANGUAGE = 'pt-BR'

describe('Audio Cache System', () => {
    beforeEach(async () => {
        // Create test cache directory
        await fs.mkdir(join(process.cwd(), TEST_CACHE_DIR), { recursive: true })
    })

    afterEach(async () => {
        // Clean up test cache directory
        try {
            await fs.rm(join(process.cwd(), TEST_CACHE_DIR), { recursive: true, force: true })
        } catch (error) {
            // Ignore cleanup errors
        }
    })

    describe('generateHash', () => {
        it('should generate consistent MD5 hash', () => {
            const hash1 = generateHash(TEST_TEXT, TEST_LANGUAGE)
            const hash2 = generateHash(TEST_TEXT, TEST_LANGUAGE)

            expect(hash1).toBe(hash2)
            expect(hash1).toHaveLength(32) // MD5 hash length
        })

        it('should generate different hashes for different inputs', () => {
            const hash1 = generateHash(TEST_TEXT, TEST_LANGUAGE)
            const hash2 = generateHash('uma hora', TEST_LANGUAGE)
            const hash3 = generateHash(TEST_TEXT, 'en')

            expect(hash1).not.toBe(hash2)
            expect(hash1).not.toBe(hash3)
            expect(hash2).not.toBe(hash3)
        })
    })

    describe('checkCacheExists', () => {
        it('should return false for non-existent file', async () => {
            const hash = 'nonexistent'
            const exists = await checkCacheExists(hash)

            expect(exists).toBe(false)
        })

        it('should return true for existing file', async () => {
            const hash = generateHash(TEST_TEXT, TEST_LANGUAGE)
            const testBuffer = Buffer.from('test audio data')

            // Mock useRuntimeConfig to use test directory
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            await saveCacheFile(hash, testBuffer)
            const exists = await checkCacheExists(hash)

            expect(exists).toBe(true)
        })
    })

    describe('getCachePath', () => {
        it('should return correct file path', () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            const hash = 'abc123'
            const path = getCachePath(hash)

            expect(path).toContain('test-audio-cache')
            expect(path).toContain('abc123.mp3')
        })
    })

    describe('saveCacheFile and readCacheFile', () => {
        it('should save and read audio file correctly', async () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            const hash = generateHash(TEST_TEXT, TEST_LANGUAGE)
            const testBuffer = Buffer.from('test audio data')

            await saveCacheFile(hash, testBuffer)
            const readBuffer = await readCacheFile(hash)

            expect(readBuffer.toString()).toBe(testBuffer.toString())
        })

        it('should create cache directory if it does not exist', async () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR + '/nested' }))

            const hash = generateHash(TEST_TEXT, TEST_LANGUAGE)
            const testBuffer = Buffer.from('test audio data')

            await saveCacheFile(hash, testBuffer)
            const exists = await checkCacheExists(hash)

            expect(exists).toBe(true)
        })
    })

    describe('getOrCreateCache', () => {
        it('should create new cache if not exists', async () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            const testBuffer = Buffer.from('generated audio')
            const generateFn = vi.fn(async () => testBuffer)

            const result = await getOrCreateCache(TEST_TEXT, TEST_LANGUAGE, generateFn)

            expect(result.cached).toBe(false)
            expect(result.buffer.toString()).toBe(testBuffer.toString())
            expect(generateFn).toHaveBeenCalledOnce()
        })

        it('should return cached file if exists', async () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            const testBuffer = Buffer.from('cached audio')
            const hash = generateHash(TEST_TEXT, TEST_LANGUAGE)
            await saveCacheFile(hash, testBuffer)

            const generateFn = vi.fn(async () => Buffer.from('new audio'))
            const result = await getOrCreateCache(TEST_TEXT, TEST_LANGUAGE, generateFn)

            expect(result.cached).toBe(true)
            expect(result.buffer.toString()).toBe(testBuffer.toString())
            expect(generateFn).not.toHaveBeenCalled()
        })

        it('should return correct hash', async () => {
            vi.stubGlobal('useRuntimeConfig', () => ({ audioCacheDir: TEST_CACHE_DIR }))

            const testBuffer = Buffer.from('generated audio')
            const generateFn = async () => testBuffer

            const result = await getOrCreateCache(TEST_TEXT, TEST_LANGUAGE, generateFn)
            const expectedHash = generateHash(TEST_TEXT, TEST_LANGUAGE)

            expect(result.hash).toBe(expectedHash)
        })
    })
})
