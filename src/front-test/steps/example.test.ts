import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { BASEURL } from '../config';
import { pages } from '../hooks/hook';
import { validateFirstLocator } from '../utils/validations';
import {
  inputLabel,
  buttonSearch,
  divResult
} from '../locators/exampleLocators';
import {
  getByPlaceholderAndClickIt,
  getByPlaceholderAndFillIt,
  getElementByRole
} from '../utils/interactions';

Given("User navigates to MercadoLibre page", async () => {
  for (const page of pages) {
    console.log(`Ejecutando prueba en navegador: ${page.context().browser()?.browserType().name()}`);
    await page.goto(BASEURL);
  }
});

When('User search for cars options', async function () {
  for (const page of pages) {
    await getByPlaceholderAndClickIt(page, inputLabel);
    await getByPlaceholderAndFillIt(page, inputLabel, "auto");
    await page.locator(buttonSearch).click();
  }
});

Then('It should show all the results according to the search', async function () {
  for (const page of pages) {
    expect(validateFirstLocator(page, "div", divResult)).toBeTruthy();
  }
});
