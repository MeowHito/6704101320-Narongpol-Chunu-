import { test, expect } from '@playwright/test'

test.describe('Landing page', () => {
  test('shows the student information form heading', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Student Information Form', { exact: true })).toBeVisible()
  })
})
