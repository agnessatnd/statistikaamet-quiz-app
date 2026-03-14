import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:5173';

test('opens the quiz application', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  await expect(page.getByText('Viktoriin')).toBeVisible();
  await expect(page.locator('progress')).toBeVisible();
  await expect(page.getByText(/Küsimus/)).toBeVisible();
});

test('user can answer a question', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  const answer = page.getByLabel('Saaremaa');

  await expect(answer).toBeVisible();
  await answer.click();

  await expect(page.locator('.feedback')).toBeVisible();
});

test('wrong answer shows correct feedback', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  const wrongAnswer = page.getByLabel('Hiiumaa');

  await expect(wrongAnswer).toBeVisible();
  await wrongAnswer.click();

  await expect(page.locator('.feedback'))
    .toContainText('Vale vastus! Õige vastus oli: Saaremaa');
});

test('score updates after answering questions', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  const answers = ['Saaremaa', '15', 'Kuressaare', 'Rukkilill'];

  for (const answer of answers) {
    const option = page.getByLabel(answer);

    await expect(option).toBeVisible();
    await option.click();

    const nextButton = page.getByRole('button');

    await expect(nextButton).toBeVisible();
    await nextButton.click();
  }

  await expect(page.getByText('Viktoriin on lõppenud')).toBeVisible();
  await expect(page.getByText('3 / 4')).toBeVisible();
});

test('final results table is displayed', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  const answers = ['Saaremaa', '15', 'Pärnu', 'Rukkilill'];

  for (const answer of answers) {
    const option = page.getByLabel(answer);

    await expect(option).toBeVisible();
    await option.click();

    const nextButton = page.getByRole('button');
    await nextButton.click();
  }

  await expect(page.getByText('Viktoriin on lõppenud')).toBeVisible();
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('tbody tr')).toHaveCount(4);
});

test('user can restart the quiz', async ({ page }) => {
  await page.goto(APP_URL, { waitUntil: 'networkidle' });

  const answers = ['Saaremaa', '15', 'Pärnu', 'Rukkilill'];

  for (const answer of answers) {
    const option = page.getByLabel(answer);

    await expect(option).toBeVisible();
    await option.click();

    const nextButton = page.getByRole('button');
    await nextButton.click();
  }

  const restartButton = page.getByText('Alusta uuesti');

  await expect(restartButton).toBeVisible();
  await restartButton.click();

  await expect(page.getByText('Küsimus 1 / 4')).toBeVisible();
});