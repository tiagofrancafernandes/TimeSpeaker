import { numberToTextPtBR, numberToTextEN, numberToTextES } from '../utils/numberToText'

export interface LanguageConfig {
    code: string
    ttsCode: string
    numberToText: (n: number) => string
    formatTime: (hours: number, minutes: number) => string
}

/**
 * Portuguese (pt-BR) language configuration
 */
const ptBR: LanguageConfig = {
    code: 'pt-BR',
    ttsCode: 'pt',
    numberToText: numberToTextPtBR,
    formatTime: (hours: number, minutes: number): string => {
        const hourText = numberToTextPtBR(hours)

        if (minutes === 0) {
            // Hour only format
            if (hours === 1) {
                return 'uma hora'
            }
            return `${hourText} horas`
        }

        // Hour and minutes format
        const minuteText = numberToTextPtBR(minutes)
        const hourWord = hours === 1 ? 'uma hora' : `${hourText} horas`

        if (minutes === 1) {
            return `${hourWord} e um minuto`
        }

        return `${hourWord} e ${minuteText} minutos`
    },
}

/**
 * English (en) language configuration
 */
const en: LanguageConfig = {
    code: 'en',
    ttsCode: 'en',
    numberToText: numberToTextEN,
    formatTime: (hours: number, minutes: number): string => {
        const hourText = numberToTextEN(hours)

        if (minutes === 0) {
            // Hour only format - "one o'clock", "two o'clock"
            return `${hourText} o'clock`
        }

        // Hour and minutes format - "one thirty-two", "three fifteen"
        const minuteText = numberToTextEN(minutes)
        return `${hourText} ${minuteText}`
    },
}

/**
 * Spanish (es) language configuration
 */
const es: LanguageConfig = {
    code: 'es',
    ttsCode: 'es',
    numberToText: numberToTextES,
    formatTime: (hours: number, minutes: number): string => {
        const hourText = numberToTextES(hours)

        if (minutes === 0) {
            // Hour only format
            if (hours === 1) {
                return 'una hora'
            }
            return `${hourText} horas`
        }

        // Hour and minutes format
        const minuteText = numberToTextES(minutes)
        const hourWord = hours === 1 ? 'una hora' : `${hourText} horas`

        if (minutes === 1) {
            return `${hourWord} y un minuto`
        }

        return `${hourWord} y ${minuteText} minutos`
    },
}

/**
 * Language configurations map
 */
export const languages: Record<string, LanguageConfig> = {
    'pt-BR': ptBR,
    pt: ptBR,
    en: en,
    'en-US': en,
    es: es,
    'es-ES': es,
}

/**
 * Get language configuration
 */
export function getLanguageConfig(language: string): LanguageConfig {
    return languages[language] || languages.en
}

/**
 * Get list of supported languages
 */
export function getSupportedLanguages(): string[] {
    return ['pt-BR', 'en', 'es']
}
