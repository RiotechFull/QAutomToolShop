@ToolShopRegister @Smoke
Feature: Practice ToolShop Register
  Scenario: Successful registration with valid data
    Given I am on the registration page
    When I enter valid registration details
    And I click the Register button
    Then I should see a success message

  Scenario: Registration fails with invalid email
    Given I am on the registration page
    When I enter valid registration details except email with "invalid-email"
    And I click the Register button
    Then I should see an email error message

  Scenario: Registration fails with all fields empty
    Given I am on the registration page
    When I submit the form without filling any fields
    Then I should see error messages for required fields

  Scenario: Registration fails with text in phone and numbers in state
    Given I am on the registration page
    When I enter valid registration details except phone with "abcdef" and state with "12345"
    And I click the Register button
    Then I should see phone and state error messages

  Scenario: Registration fails with weak password
    Given I am on the registration page
    When I enter valid registration details except password with "123"
    And I click the Register button
    Then I should see a password error message