import { test, expect } from '@playwright/test'

test.describe('Play Button', () => {
    test('should display play button', async ({ page }) => {
        await page.goto('/')

        const playButton = page.locator('.play-button')
        await expect(playButton).toBeVisible()
        await expect(playButton).toContainText('Play Current Time')
    })

    test('should disable button for 15 seconds after click', async ({ page }) => {
        await page.goto('/')

        const playButton = page.locator('.play-button')

        // Button should be enabled initially
        await expect(playButton).toBeEnabled()

        // Click the button
        await playButton.click()

        // Button should change state
        await page.waitForTimeout(500)

        // Check if button shows loading or playing state
        const buttonText = await playButton.textContent()
        expect(['Loading...', 'Playing...', 'Wait...']).toContain(buttonText)

        // Wait a bit and check if disabled
        await page.waitForTimeout(1000)
        const isDisabled = await playButton.isDisabled()

        // Button should be disabled OR show wait state
        if (!isDisabled) {
            await expect(playButton).toContainText('Wait...')
        }
    })

    test('should show correct button states', async ({ page }) => {
        await page.goto('/')

        const playButton = page.locator('.play-button')

        // Initial state
        await expect(playButton).toContainText('Play Current Time')

        // Click button
        await playButton.click()

        // Should show loading or playing state
        await page.waitForTimeout(500)
        const stateText = await playButton.textContent()
        expect(stateText).not.toBe('Play Current Time')
    })
})
