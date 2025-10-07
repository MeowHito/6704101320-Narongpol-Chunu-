import { test, expect } from '@playwright/test'

const fillForm = async (page: import('@playwright/test').Page) => {
  await page.getByLabel('Student ID').fill('6704101410')
  await page.getByLabel('First Name').fill('Rattapoom')
  await page.getByLabel('Last Name').fill('Maru')
  await page.getByLabel('Email').fill('rattapoom.maru@example.com')
  await page.getByLabel('Phone').fill('089-999-9999')
  await page.getByLabel('Program').click()
  await page.getByRole('option', { name: 'Software Engineering' }).click()
  await page.getByLabel('Additional Notes').fill('Looking forward to the final exam!')
}

test.describe('Student information form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows the student information form heading', async ({ page }) => {
    await expect(page.getByText('Student Information Form', { exact: true })).toBeVisible()
  })

  test('requires confirmation before allowing submission', async ({ page }) => {
    await fillForm(page)
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText('Please confirm the information before submitting.')).toBeVisible()
  })

  test('submits successfully when all fields are valid', async ({ page }) => {
    await fillForm(page)
    await page.getByRole('switch').click()
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText('Thank you, Rattapoom! Your response has been recorded.')).toBeVisible()
  })

})
