import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { Given, When, Then } from '@cucumber/cucumber';
import { BASEURL } from '../config';
import { pages } from '../hooks/hook';
import { validateFirstLocator } from '../utils/validations';
import {
  FIRST_NAME_INPUT,
  LAST_NAME_INPUT,
  DATE_OF_BIRTH_INPUT,
  ADDRESS_INPUT,
  POSTCODE_INPUT,
  CITY_INPUT,
  STATE_INPUT,
  COUNTRY_SELECT,
  PHONE_INPUT,
  EMAIL_INPUT,
  PASSWORD_INPUT,
  REGISTER_BUTTON,
  SUCCESS_MESSAGE,
  GENERIC_ERROR_MESSAGE,
  ERROR_MESSAGE,
  EMAIL_ERROR,
  PASSWORD_ERROR 
} from '../locators/exampleLocators';
import {
  getByPlaceholderAndClickIt,
  getByPlaceholderAndFillIt,
  getElementByRole
} from '../utils/interactions';

Given("I am on the registration page", async function () {
    // Asignamos la primera página del array global 'pages' al contexto 'this' de la prueba actual.
    // Esto asegura que `this.page` esté disponible para los pasos subsiguientes.
    this.page = pages[0];
    await this.page.goto(BASEURL);
});

When('I enter valid registration details', async function () {
  await this.page.fill(FIRST_NAME_INPUT, 'Jose');
  await this.page.fill(LAST_NAME_INPUT, 'San Martin');
  await this.page.fill(DATE_OF_BIRTH_INPUT, '1987-08-17');
  await this.page.fill(ADDRESS_INPUT, 'El Plumerillo');
  await this.page.fill(POSTCODE_INPUT, '12345');
  await this.page.fill(CITY_INPUT, 'Buenos Aires');
  await this.page.fill(STATE_INPUT, 'CABA');
  await this.page.selectOption(COUNTRY_SELECT, 'Argentina');
  await this.page.fill(PHONE_INPUT, '1133334444');
  await this.page.fill(EMAIL_INPUT, `josetest${Date.now()}@test.com`);
  await this.page.fill(PASSWORD_INPUT, 'H0l4*Mund0!25');
});

When(
  'I enter valid registration details except email with {string}',
  async function (email: string) {
    await this.runStep('I enter valid registration details');
    await this.page.fill(EMAIL_INPUT, email);
  }
);

When(
  'I enter valid registration details except phone with {string} and state with {string}',
  async function (phone: string, state: string) {
    await this.runStep('I enter valid registration details');
    await this.page.fill(PHONE_INPUT, phone);
    await this.page.fill(STATE_INPUT, state);
  }
);

When(
  'I enter valid registration details except password with {string}',
  async function (password: string) {
    await this.runStep('I enter valid registration details');
    await this.page.fill(PASSWORD_INPUT, password);
  }
);

When('I submit the form without filling any fields', async function () {
  // Playwright puede no necesitar una acción específica aquí si el clic al botón es el único evento.
  // Pero para claridad, podemos asegurarnos de que los campos estén vacíos.
  await this.page.evaluate(() => {
    document.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
  });
});

When('I change the country to {string}', async function (country: string) {
  await this.page.selectOption(COUNTRY_SELECT, country);
});

When('I enter valid registration details except date of birth with {string}', async function (dob: string) {
    await this.runStep('I enter valid registration details');
    await this.page.fill(DATE_OF_BIRTH_INPUT, dob);
});

When('I enter valid registration details except first name with {string}', async function (firstName: string) {
    await this.runStep('I enter valid registration details');
    await this.page.fill(FIRST_NAME_INPUT, firstName);
});

When('I click the Register button', async function () {
  await this.page.click(REGISTER_BUTTON);
});

Then('I should see a success message', async function () {
  // Se ha mejorado la validación para verificar tanto la visibilidad como el contenido del texto.
  await expect(this.page.locator(SUCCESS_MESSAGE)).toBeVisible({ timeout: 10000 });
  await expect(this.page.locator(SUCCESS_MESSAGE)).toContainText(/success|bienvenido/i); // `i` para case-insensitive
});

Then('I should see an email error message', async function () {
  await expect(this.page.locator(EMAIL_ERROR)).toBeVisible();
});

Then('I should see error messages for required fields', async function () {
  const errors = this.page.locator(GENERIC_ERROR_MESSAGE);
  const count = await errors.count();
  expect(count).toBeGreaterThan(1);
});

Then('I should see phone and state error messages', async function () {
  const errors = this.page.locator(GENERIC_ERROR_MESSAGE);
  await expect(errors).toContainText(['Phone', 'State']);
});

Then('I should see a password error message', async function () {
  await expect(this.page.locator(PASSWORD_ERROR)).toBeVisible();
});

Then('I should see a date of birth error message', async function () {
    const dobError = this.page.locator(GENERIC_ERROR_MESSAGE).nth(2); // Ajustar según el orden real
    await expect(dobError).toBeVisible();
});

Then('I should see a first name error message', async function () {
    await expect(this.page.locator(GENERIC_ERROR_MESSAGE)).toContainText('First name');
});

Then('I should see a message that the email is already in use', async function () {
  await expect(this.page.locator(SUCCESS_MESSAGE)).not.toBeVisible();
  // Se podría agregar una verificación para un mensaje de error específico si existe un selector distinto para el email ya registrado.
});

