import { describe, it, expect } from 'vitest';
import { numberToTextPtBR, numberToTextEN, numberToTextES, numberToText } from '../../server/utils/numberToText';

describe('Number to Text Conversion', () => {
    describe('Portuguese (pt-BR)', () => {
        it('should convert units (0-19)', () => {
            expect(numberToTextPtBR(0)).toBe('zero');
            expect(numberToTextPtBR(1)).toBe('um');
            expect(numberToTextPtBR(5)).toBe('cinco');
            expect(numberToTextPtBR(10)).toBe('dez');
            expect(numberToTextPtBR(15)).toBe('quinze');
            expect(numberToTextPtBR(19)).toBe('dezenove');
        });

        it('should convert tens (20, 30, 40, 50)', () => {
            expect(numberToTextPtBR(20)).toBe('vinte');
            expect(numberToTextPtBR(30)).toBe('trinta');
            expect(numberToTextPtBR(40)).toBe('quarenta');
            expect(numberToTextPtBR(50)).toBe('cinquenta');
        });

        it('should convert compound numbers (21-59)', () => {
            expect(numberToTextPtBR(21)).toBe('vinte e um');
            expect(numberToTextPtBR(32)).toBe('trinta e dois');
            expect(numberToTextPtBR(45)).toBe('quarenta e cinco');
            expect(numberToTextPtBR(59)).toBe('cinquenta e nove');
        });
    });

    describe('English (en)', () => {
        it('should convert units (0-19)', () => {
            expect(numberToTextEN(0)).toBe('zero');
            expect(numberToTextEN(1)).toBe('one');
            expect(numberToTextEN(5)).toBe('five');
            expect(numberToTextEN(10)).toBe('ten');
            expect(numberToTextEN(15)).toBe('fifteen');
            expect(numberToTextEN(19)).toBe('nineteen');
        });

        it('should convert tens (20, 30, 40, 50)', () => {
            expect(numberToTextEN(20)).toBe('twenty');
            expect(numberToTextEN(30)).toBe('thirty');
            expect(numberToTextEN(40)).toBe('forty');
            expect(numberToTextEN(50)).toBe('fifty');
        });

        it('should convert compound numbers (21-59)', () => {
            expect(numberToTextEN(21)).toBe('twenty-one');
            expect(numberToTextEN(32)).toBe('thirty-two');
            expect(numberToTextEN(45)).toBe('forty-five');
            expect(numberToTextEN(59)).toBe('fifty-nine');
        });
    });

    describe('Spanish (es)', () => {
        it('should convert units (0-20)', () => {
            expect(numberToTextES(0)).toBe('cero');
            expect(numberToTextES(1)).toBe('uno');
            expect(numberToTextES(5)).toBe('cinco');
            expect(numberToTextES(10)).toBe('diez');
            expect(numberToTextES(15)).toBe('quince');
            expect(numberToTextES(20)).toBe('veinte');
        });

        it('should convert veinte special forms (21-29)', () => {
            expect(numberToTextES(21)).toBe('veintiuno');
            expect(numberToTextES(25)).toBe('veinticinco');
            expect(numberToTextES(29)).toBe('veintinueve');
        });

        it('should convert tens (30, 40, 50)', () => {
            expect(numberToTextES(30)).toBe('treinta');
            expect(numberToTextES(40)).toBe('cuarenta');
            expect(numberToTextES(50)).toBe('cincuenta');
        });

        it('should convert compound numbers (31-59)', () => {
            expect(numberToTextES(31)).toBe('treinta y uno');
            expect(numberToTextES(42)).toBe('cuarenta y dos');
            expect(numberToTextES(55)).toBe('cincuenta y cinco');
            expect(numberToTextES(59)).toBe('cincuenta y nueve');
        });
    });

    describe('Universal numberToText function', () => {
        it('should route to correct language converter', () => {
            expect(numberToText(25, 'pt-BR')).toBe('vinte e cinco');
            expect(numberToText(25, 'pt')).toBe('vinte e cinco');
            expect(numberToText(25, 'en')).toBe('twenty-five');
            expect(numberToText(25, 'en-US')).toBe('twenty-five');
            expect(numberToText(25, 'es')).toBe('veinticinco');
            expect(numberToText(25, 'es-ES')).toBe('veinticinco');
        });

        it('should default to English for unknown languages', () => {
            expect(numberToText(25, 'fr')).toBe('twenty-five');
            expect(numberToText(25, 'de')).toBe('twenty-five');
        });
    });

    describe('Edge cases', () => {
        it('should handle hour numbers (0-23)', () => {
            expect(numberToTextPtBR(0)).toBe('zero');
            expect(numberToTextPtBR(1)).toBe('um');
            expect(numberToTextPtBR(12)).toBe('doze');
            expect(numberToTextPtBR(23)).toBe('vinte e três');
        });

        it('should handle minute numbers (0-59)', () => {
            expect(numberToTextEN(0)).toBe('zero');
            expect(numberToTextEN(1)).toBe('one');
            expect(numberToTextEN(30)).toBe('thirty');
            expect(numberToTextEN(59)).toBe('fifty-nine');
        });
    });
});
