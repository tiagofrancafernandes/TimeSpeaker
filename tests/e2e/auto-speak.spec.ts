import { expect, test } from '@playwright/test';

test.describe('Auto-Speak Feature', () => {
    test('should have auto-speak checkbox', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');
        await expect(checkbox).toBeVisible();

        const label = page.locator('label[for="auto-speak-checkbox"]');
        await expect(label).toHaveText('Falar automaticamente a hora');
    });

    test('should show repeat cycle selector only when checkbox is checked', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');
        const repeatCycleSelect = page.locator('#repeat-cycle-select');

        // Initially, repeat cycle selector might not be visible
        const isChecked = await checkbox.isChecked();

        if (!isChecked) {
            // Selector should not be visible
            await expect(repeatCycleSelect).not.toBeVisible();

            // Check the checkbox
            await checkbox.click();
            await page.waitForTimeout(300);

            // Now selector should be visible
            await expect(repeatCycleSelect).toBeVisible();
        } else {
            // Selector should be visible
            await expect(repeatCycleSelect).toBeVisible();

            // Uncheck the checkbox
            await checkbox.click();
            await page.waitForTimeout(300);

            // Now selector should not be visible
            await expect(repeatCycleSelect).not.toBeVisible();
        }
    });

    test('should have all repeat cycle options', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');

        // Enable auto-speak if not already enabled
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.click();
            await page.waitForTimeout(300);
        }

        const repeatCycleSelect = page.locator('#repeat-cycle-select');
        await expect(repeatCycleSelect).toBeVisible();

        // Check all options exist
        const options = await repeatCycleSelect.locator('option').allTextContents();

        expect(options).toContain('Closed hour (every hour)');
        expect(options).toContain('Every half hour');
        expect(options).toContain('Quarter hour (every 15 minutes)');
        expect(options).toContain('1/6 hour (every 10 minutes)');
        expect(options).toContain('Even hours');
        expect(options).toContain('Odd hours');
    });

    test('should show visual indicator when auto-speak is active', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');

        // Enable auto-speak
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.click();
            await page.waitForTimeout(300);
        }

        // Check for visual indicator
        const indicator = page.locator('text=Auto-speak ativo');
        await expect(indicator).toBeVisible();

        // Check for pulsing dot
        const pulsingDot = page.locator('.animate-pulse');
        await expect(pulsingDot).toBeVisible();
    });

    test('should persist auto-speak settings to localStorage', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');

        // Enable auto-speak
        await checkbox.click();
        await page.waitForTimeout(300);

        // Check localStorage
        const autoSpeakValue = await page.evaluate(() => localStorage.getItem('autoSpeak'));
        expect(autoSpeakValue).toBeTruthy();

        const settings = JSON.parse(autoSpeakValue || '{}');
        expect(settings.enabled).toBe(true);
        expect(settings.repeatCycle).toBeTruthy();
    });

    test('should change repeat cycle option', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');

        // Enable auto-speak if not already enabled
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.click();
            await page.waitForTimeout(300);
        }

        const repeatCycleSelect = page.locator('#repeat-cycle-select');

        // Select different option
        await repeatCycleSelect.selectOption('half-hour');
        await page.waitForTimeout(300);

        // Verify selection
        const selectedValue = await repeatCycleSelect.inputValue();
        expect(selectedValue).toBe('half-hour');

        // Check localStorage was updated
        const autoSpeakValue = await page.evaluate(() => localStorage.getItem('autoSpeak'));
        const settings = JSON.parse(autoSpeakValue || '{}');
        expect(settings.repeatCycle).toBe('half-hour');
    });

    test('should maintain auto-speak settings after page reload', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');
        const repeatCycleSelect = page.locator('#repeat-cycle-select');

        // Enable auto-speak and set specific cycle
        await checkbox.click();
        await page.waitForTimeout(300);

        await repeatCycleSelect.selectOption('quarter');
        await page.waitForTimeout(300);

        // Reload page
        await page.reload();
        await page.waitForTimeout(500);

        // Check if settings persisted
        const isStillChecked = await checkbox.isChecked();
        expect(isStillChecked).toBe(true);

        const selectedValue = await repeatCycleSelect.inputValue();
        expect(selectedValue).toBe('quarter');
    });

    test('should hide indicator when auto-speak is disabled', async ({ page }) => {
        await page.goto('/');

        const checkbox = page.locator('#auto-speak-checkbox');

        // Make sure auto-speak is enabled first
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.click();
            await page.waitForTimeout(300);
        }

        // Verify indicator is visible
        const indicator = page.locator('text=Auto-speak ativo');
        await expect(indicator).toBeVisible();

        // Disable auto-speak
        await checkbox.click();
        await page.waitForTimeout(300);

        // Indicator should not be visible
        await expect(indicator).not.toBeVisible();
    });
});
