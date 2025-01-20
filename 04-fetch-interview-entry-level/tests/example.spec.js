// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'https://localhost:5173'

test('App shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  console.log(textContent)
  console.log(imageSrc)

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith('https://cataas.com/cat/says')).toBeTruthy()
});

