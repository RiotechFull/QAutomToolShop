@formQarmAnd @Smoke
Feature: Registro de Usuario QarmAnd

  Scenario: Registro exitoso con datos válidos
    Given El usuario está en la página de registro
    When El usuario completa el formulario con datos válidos
    And El usuario envía el formulario
    Then El usuario debería ver un mensaje de éxito

  Scenario: Registro falla por email inválido
    Given El usuario está en la página de registro
    When El usuario completa el formulario con un email inválido "correo-invalido"
    And El usuario envía el formulario
    Then El usuario debería ver un mensaje de error de email

  Scenario: Registro falla por contraseña débil
    Given El usuario está en la página de registro
    When El usuario completa el formulario con una contraseña inválida "123"
    And El usuario envía el formulario
    Then El usuario debería ver un mensaje de error de contraseña

  Scenario: Registro falla por campos obligatorios vacíos
    Given El usuario está en la página de registro
    When El usuario intenta enviar el formulario vacío
    And El usuario envía el formulario
    Then El usuario debería ver mensajes de error por campos obligatorios

  Scenario: Registro falla por fecha de nacimiento inválida
    Given El usuario está en la página de registro
    When El usuario completa el formulario con una fecha de nacimiento inválida "32/13/2020"
    And El usuario envía el formulario
    Then El usuario debería ver un mensaje de error de fecha de nacimiento

