import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { Given, When, Then } from '@cucumber/cucumber';
import { BASEURL } from '../config';
import { pages } from '../hooks/hook';
import { validateFirstLocator } from '../utils/validations';
import {
  FIRSTNAME_INPUT,
  LASTNAME_INPUT,
  SEXO_MASC_RADIO,
  SEXO_FEM_RADIO,
  SEXO_OTRO_RADIO,
  EMAIL_INPUT,
  COUNTRY_SELECT,
  USERNAME_INPUT,
  PASSWORD_INPUT,
  SUBMIT_BUTTON,
  SUCCESS_MESSAGE,
  GENERIC_ERROR_MESSAGE
} from '../locators/formQarmyLocators';

// Helper para llenar el formulario con datos válidos o personalizados
async function fillForm(page, {
  nombre = 'Juan',
  apellido = 'Pérez',
  sexo = 'Masculino',
  email = `test_${Date.now()}@mail.com`,
  pais = 'AR',
  usuario = 'juanp',
  password = 'Password123!'
} = {}) {
  await page.fill(FIRSTNAME_INPUT, nombre);
  await page.fill(LASTNAME_INPUT, apellido);
  if (sexo === 'Masculino') await page.check(SEXO_MASC_RADIO);
  else if (sexo === 'Femenino') await page.check(SEXO_FEM_RADIO);
  else await page.check(SEXO_OTRO_RADIO);
  await page.fill(EMAIL_INPUT, email);
  await page.selectOption(COUNTRY_SELECT, pais);
  await page.fill(USERNAME_INPUT, usuario);
  await page.fill(PASSWORD_INPUT, password);
}

// Steps definidos exactamente como en el feature

Given('El usuario está en la página de registro', async function () {
  this.page = pages[0];
  await this.page.goto(BASEURL);
});

When('El usuario completa el formulario con datos válidos', async function () {
  await fillForm(this.page);
});

When('El usuario completa el formulario con un email inválido {string}', async function (email) {
  await fillForm(this.page, { email });
});

When('El usuario completa el formulario con una contraseña inválida {string}', async function (password) {
  await fillForm(this.page, { password });
});

When('El usuario intenta enviar el formulario vacío', async function () {
  await this.page.fill(FIRSTNAME_INPUT, '');
  await this.page.fill(LASTNAME_INPUT, '');
  await this.page.uncheck(SEXO_MASC_RADIO);
  await this.page.uncheck(SEXO_FEM_RADIO);
  await this.page.uncheck(SEXO_OTRO_RADIO);
  await this.page.fill(EMAIL_INPUT, '');
  await this.page.selectOption(COUNTRY_SELECT, '');
  await this.page.fill(USERNAME_INPUT, '');
  await this.page.fill(PASSWORD_INPUT, '');
});

When('El usuario completa el formulario con una fecha de nacimiento inválida {string}', async function (fecha) {
  // Si el campo existe, agregar aquí el llenado. Si no, dejar como placeholder.
  // await this.page.fill(FECHA_NAC_INPUT, fecha);
});

When('El usuario envía el formulario', async function () {
  await this.page.click(SUBMIT_BUTTON);
  await this.page.waitForTimeout(1000);
});

Then('El usuario debería ver un mensaje de éxito', async function () {
  await expect(this.page.locator(SUCCESS_MESSAGE)).toBeVisible({ timeout: 5000 });
});

Then('El usuario debería ver un mensaje de error de email', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver un mensaje de error de contraseña', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver mensajes de error por campos obligatorios', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver un mensaje de error de fecha de nacimiento', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Given("El usuario está en la página de registro", async function () {
    this.page = pages[0];
    await this.page.goto(BASEURL);
});

Then('El usuario debería ver un mensaje de error de nombre', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver un mensaje que el email ya está en uso', async function () {
  await expect(this.page.locator(SUCCESS_MESSAGE)).not.toBeVisible();
  // Se podría agregar una verificación para un mensaje de error específico si existe un selector distinto para el email ya registrado.
});

Then('El usuario debería ver un mensaje de error de email', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});
Then('El usuario debería ver un mensaje de error de contraseña', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver un mensaje de error de país', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});

Then('El usuario debería ver un mensaje de error de sexo', async function () {
  const errorCount = await this.page.locator(GENERIC_ERROR_MESSAGE).count();
  expect(errorCount).toBeGreaterThan(0);
});
