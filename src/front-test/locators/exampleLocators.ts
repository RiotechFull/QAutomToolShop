// Registration Page Locators
export const FIRST_NAME_INPUT = '#first_name';
export const LAST_NAME_INPUT = '#last_name';
export const DATE_OF_BIRTH_INPUT = '#dob'; 
export const ADDRESS_INPUT = '#street';
export const POSTCODE_INPUT = '#postal_code';
export const CITY_INPUT = '#city';
export const STATE_INPUT = '#state';
export const COUNTRY_SELECT = '#country';
export const PHONE_INPUT = '#phone';
export const EMAIL_INPUT = '#email';
export const PASSWORD_INPUT = '#password';
export const REGISTER_BUTTON = 'button[type="submit"]';

// Messages / Validations
export const SUCCESS_MESSAGE = '.alert-success';   // after successful registration
export const GENERIC_ERROR_MESSAGE = '.invalid-feedback, .error, .error-message, .alert-danger, .text-danger';
export const ERROR_MESSAGE = '.invalid-feedback, .error, .error-message, .alert-danger, .text-danger'; // generic field validation
export const EMAIL_ERROR = '#email + .invalid-feedback, #email + .error, #email + .error-message, #email + .alert-danger, #email + .text-danger';
export const PASSWORD_ERROR = '#password + .invalid-feedback, #password + .error, #password + .error-message, #password + .alert-danger, #password + .text-danger';