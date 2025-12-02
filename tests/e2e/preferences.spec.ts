import { test, expect } from '@playwright/test';

test.describe('Language and Timezone Preferences', () => {
    test('should change language', async ({ page }) => {
        await page.goto('/');

        // Find and click language selector
        const languageSelect = page.locator('#language-select');
        await expect(languageSelect).toBeVisible();

        // Change to Portuguese
        await languageSelect.selectOption('pt-BR');

        // URL should update
        await page.waitForTimeout(500);
        expect(page.url()).toContain('language=pt-BR');
    });

    test('should change timezone', async ({ page }) => {
        await page.goto('/');

        // Find timezone selector display mode
        const timezoneSelector = page.locator('.timezone-selector');
        await expect(timezoneSelector).toBeVisible();

        // Click edit button
        const editButton = page.locator('.edit-button');
        await editButton.click();

        // Select timezone
        const timezoneSelect = page.locator('#timezone-select');
        await timezoneSelect.selectOption('America/Sao_Paulo');

        // Click save button
        const saveButton = page.locator('.save-button');
        await saveButton.click();

        // URL should update
        await page.waitForTimeout(500);
        expect(page.url()).toContain('timezone=America');
    });

    test('should save preferences', async ({ page }) => {
        await page.goto('/');

        // Change language
        const languageSelect = page.locator('#language-select');
        await languageSelect.selectOption('es');

        // Click save preferences button
        const preferencesButton = page.locator('.preferences-button');
        await expect(preferencesButton).toBeVisible();
        await preferencesButton.click();

        // Reload page
        await page.reload();

        // Language should persist
        await page.waitForTimeout(500);
        const selectedLanguage = await languageSelect.inputValue();
        expect(selectedLanguage).toBe('es');
    });

    test('should update URL with query parameters', async ({ page }) => {
        await page.goto('/');

        // Change language
        const languageSelect = page.locator('#language-select');
        await languageSelect.selectOption('pt-BR');

        await page.waitForTimeout(500);

        // URL should have query parameter
        expect(page.url()).toContain('?');
        expect(page.url()).toContain('language=pt-BR');
    });
});
