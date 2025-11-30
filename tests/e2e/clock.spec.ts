import { test, expect } from '@playwright/test'

test.describe('Digital Clock', () => {
    test('should display the digital clock', async ({ page }) => {
        await page.goto('/')

        // Wait for clock to be visible
        const clock = page.locator('.digital-clock')
        await expect(clock).toBeVisible()

        // Check time display format (HH:MM:SS)
        const timeDisplay = page.locator('.time-display')
        await expect(timeDisplay).toBeVisible()

        const timeText = await timeDisplay.textContent()
        expect(timeText).toMatch(/\d{2}:\d{2}:\d{2}/)
    })

    test('should update every second', async ({ page }) => {
        await page.goto('/')

        const timeDisplay = page.locator('.time-display')
        const initialTime = await timeDisplay.textContent()

        // Wait 2 seconds
        await page.waitForTimeout(2000)

        const updatedTime = await timeDisplay.textContent()
        expect(updatedTime).not.toBe(initialTime)
    })

    test('should display date information', async ({ page }) => {
        await page.goto('/')

        const dateDisplay = page.locator('.date-display')
        await expect(dateDisplay).toBeVisible()

        const dateText = await dateDisplay.textContent()
        expect(dateText).toBeTruthy()
        expect(dateText?.length).toBeGreaterThan(0)
    })
})
