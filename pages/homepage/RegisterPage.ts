import { Locator, Page } from "@playwright/test";
import { generateUserData } from "../../tests/fixtures/dataGenerator";
import { NewUser } from "../../tests/fixtures/NewUser";

export class RegisterPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly addressField: Locator;
  readonly cityField: Locator;
  readonly stateField: Locator;
  readonly zipCodeField: Locator;
  readonly phoneField: Locator;
  readonly ssnField: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');
    this.ssnField = page.locator('[id="customer.ssn"]');
    this.usernameField = page.locator('[id="customer.username"]');
    this.passwordField = page.locator('[id="customer.password"]');
    this.confirmPasswordField = page.locator("#repeatedPassword");
    this.registerButton = page.locator('input[value="Register"]');
  }

  async goto() {
    await this.page.goto("/parabank/register.htm");
  }

  async registerUser(user: NewUser): Promise<any> {
    try {
      // Fill in the registration form with user data
      // Since Playwright automatically waits for elements to be visible,
      //  enabled, and stable, we can directly fill the fields
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneField.fill(user.phone);
      await this.ssnField.fill(user.ssn);
      await this.usernameField.fill(user.username);
      await this.passwordField.fill(user.password);
      await this.confirmPasswordField.fill(user.password);

      // Click the register button, should slow it down a bit
      await this.page.waitForTimeout(500);
      await this.registerButton.click();

      return user; // Return the user data for verification in tests
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Re-throw the error to be handled by the test
    }
  }
}
