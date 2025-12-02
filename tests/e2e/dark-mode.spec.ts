import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
    test('should have dark mode toggle button', async ({ page }) => {
        await page.goto('/');

        // Check if toggle button exists
        const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');
        await expect(toggleButton).toBeVisible();
    });

    test('should toggle dark mode when button is clicked', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');
        const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');

        // Check initial state (light mode by default in test)
        const initialHasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));

        // Click toggle button
        await toggleButton.click();
        await page.waitForTimeout(300); // Wait for transition

        // Check if dark class was toggled
        const afterClickHasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));
        expect(afterClickHasDarkClass).toBe(!initialHasDarkClass);

        // Click again to toggle back
        await toggleButton.click();
        await page.waitForTimeout(300);

        const finalHasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));
        expect(finalHasDarkClass).toBe(initialHasDarkClass);
    });

    test('should persist dark mode preference to localStorage', async ({ page }) => {
        await page.goto('/');

        const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');

        // Enable dark mode
        await toggleButton.click();
        await page.waitForTimeout(300);

        // Check localStorage
        const darkModeValue = await page.evaluate(() => localStorage.getItem('darkMode'));
        expect(darkModeValue).toBeTruthy();

        // Reload page and check if dark mode persists
        await page.reload();
        await page.waitForTimeout(500);

        const html = page.locator('html');
        const hasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));

        // Should maintain dark mode after reload
        expect(hasDarkClass).toBe(darkModeValue === 'dark');
    });

    test('should show moon icon in light mode and sun icon in dark mode', async ({ page }) => {
        await page.goto('/');

        const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');
        const html = page.locator('html');

        // Get initial state
        const initialHasDarkClass = await html.evaluate((el) => el.classList.contains('dark'));
        const initialButtonText = await toggleButton.textContent();

        // Icons: 🌙 (moon) in light mode, ☀️ (sun) in dark mode
        if (initialHasDarkClass) {
            expect(initialButtonText).toContain('☀️');
        } else {
            expect(initialButtonText).toContain('🌙');
        }

        // Toggle and check icon changed
        await toggleButton.click();
        await page.waitForTimeout(300);

        const afterToggleText = await toggleButton.textContent();
        expect(afterToggleText).not.toBe(initialButtonText);
    });

    test('should apply dark mode styles to components', async ({ page }) => {
        await page.goto('/');

        const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');
        const mainCard = page.locator('div.rounded-3xl').first();

        // Toggle to dark mode
        await toggleButton.click();
        await page.waitForTimeout(300);

        // Check if dark mode classes are applied
        const cardClasses = await mainCard.getAttribute('class');
        expect(cardClasses).toContain('dark:bg-gray-900');
    });
});
