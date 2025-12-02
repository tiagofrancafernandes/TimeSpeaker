export type NumberType = 'hour' | 'minute' | 'second' | 'auto';

/**
 * Convert numbers (0-59) to text in Portuguese (pt-BR)
 */
export function numberToTextPtBR(n: number, type: NumberType = 'auto'): string {
    const units: Record<number, string> = {
        0: 'zero',
        1: 'um',
        2: 'dois',
        3: 'três',
        4: 'quatro',
        5: 'cinco',
        6: 'seis',
        7: 'sete',
        8: 'oito',
        9: 'nove',
        10: 'dez',
        11: 'onze',
        12: 'doze',
        13: 'treze',
        14: 'quatorze',
        15: 'quinze',
        16: 'dezesseis',
        17: 'dezessete',
        18: 'dezoito',
        19: 'dezenove',
        21: 'vinte e um',
        22: 'vinte e dois',
    };

    if (type === 'hour') {
        units[1] = 'uma';
        units[2] = 'duas';
        units[21] = 'vinte e uma';
    }

    const tens: Record<number, string> = {
        20: 'vinte',
        30: 'trinta',
        40: 'quarenta',
        50: 'cinquenta',
    };

    if (n in units) {
        return units[n];
    }

    const tenValue = Math.floor(n / 10) * 10;
    const unitValue = n % 10;

    if (unitValue === 0) {
        return tens[tenValue];
    }

    return `${tens[tenValue]} e ${units[unitValue]}`;
}

/**
 * Convert numbers (0-59) to text in English (en)
 */
export function numberToTextEN(n: number): string {
    const units: Record<number, string> = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
    };

    const tens: Record<number, string> = {
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
    };

    if (n in units) {
        return units[n];
    }

    const tenValue = Math.floor(n / 10) * 10;
    const unitValue = n % 10;

    if (unitValue === 0) {
        return tens[tenValue];
    }

    return `${tens[tenValue]}-${units[unitValue]}`;
}

/**
 * Convert numbers (0-59) to text in Spanish (es)
 */
export function numberToTextES(n: number): string {
    const units: Record<number, string> = {
        0: 'cero',
        1: 'uno',
        2: 'dos',
        3: 'tres',
        4: 'cuatro',
        5: 'cinco',
        6: 'seis',
        7: 'siete',
        8: 'ocho',
        9: 'nueve',
        10: 'diez',
        11: 'once',
        12: 'doce',
        13: 'trece',
        14: 'catorce',
        15: 'quince',
        16: 'dieciséis',
        17: 'diecisiete',
        18: 'dieciocho',
        19: 'diecinueve',
        20: 'veinte',
        21: 'veintiuno',
        22: 'veintidós',
        23: 'veintitrés',
        24: 'veinticuatro',
        25: 'veinticinco',
        26: 'veintiséis',
        27: 'veintisiete',
        28: 'veintiocho',
        29: 'veintinueve',
    };

    const tens: Record<number, string> = {
        30: 'treinta',
        40: 'cuarenta',
        50: 'cincuenta',
    };

    if (n in units) {
        return units[n];
    }

    const tenValue = Math.floor(n / 10) * 10;
    const unitValue = n % 10;

    if (unitValue === 0) {
        return tens[tenValue];
    }

    return `${tens[tenValue]} y ${units[unitValue]}`;
}

/**
 * Convert number to text based on language code
 */
export function numberToText(n: number, language: string): string {
    switch (language) {
        case 'pt':
        case 'pt-BR':
            return numberToTextPtBR(n);
        case 'en':
        case 'en-US':
            return numberToTextEN(n);
        case 'es':
        case 'es-ES':
            return numberToTextES(n);
        default:
            return numberToTextEN(n); // Default to English
    }
}
