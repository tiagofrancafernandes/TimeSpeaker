import { test, expect } from '@playwright/test';

test.describe('Session Detection', () => {
    test('should detect language from URL query parameter', async ({ page }) => {
        await page.goto('/?language=pt-BR');

        // Language selector should reflect the URL parameter
        const languageSelect = page.locator('#language-select');
        await page.waitForTimeout(500);

        const selectedValue = await languageSelect.inputValue();
        expect(selectedValue).toBe('pt-BR');
    });

    test('should detect timezone from URL query parameter', async ({ page }) => {
        await page.goto('/?timezone=America/Sao_Paulo');

        // Timezone should be displayed
        const timezoneValue = page.locator('.current-timezone .value');
        await expect(timezoneValue).toBeVisible();

        const text = await timezoneValue.textContent();
        expect(text).toContain('America/Sao_Paulo');
    });

    test('should handle both language and timezone from URL', async ({ page }) => {
        await page.goto('/?language=es&timezone=Europe/London');

        await page.waitForTimeout(500);

        // Check language
        const languageSelect = page.locator('#language-select');
        const selectedLanguage = await languageSelect.inputValue();
        expect(selectedLanguage).toBe('es');

        // Check timezone
        const timezoneValue = page.locator('.current-timezone .value');
        const timezoneText = await timezoneValue.textContent();
        expect(timezoneText).toContain('Europe/London');
    });

    test('should use defaults when no parameters provided', async ({ page }) => {
        await page.goto('/');

        await page.waitForTimeout(500);

        // Should have default values
        const languageSelect = page.locator('#language-select');
        const selectedLanguage = await languageSelect.inputValue();

        // Default is either 'en' or browser language
        expect(selectedLanguage).toBeTruthy();
    });
});
