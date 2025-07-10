import { Locator, Page } from "@playwright/test";
import { NewUser } from "../../tests/fixtures/NewUser";
import { generateUserData } from "../../tests/fixtures/dataGenerator";

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
    this.firstNameField = page.locator("#customer.firstName");
    this.lastNameField = page.locator("#customer.lastName");
    this.addressField = page.locator("#customer.address.street");
    this.cityField = page.locator("#customer.address.city");
    this.stateField = page.locator("#customer.address.state");
    this.zipCodeField = page.locator("#customer.address.zipCode");
    this.phoneField = page.locator("#customer.phoneNumber");
    this.ssnField = page.locator("#customer.ssn");
    this.usernameField = page.locator("#customer.username");
    this.passwordField = page.locator("#customer.password");
    this.confirmPasswordField = page.locator("#repeatedPassword");
    this.registerButton = page.locator("input[value='Register']");
  }

  async goto(): Promise<void> {
    await this.page.goto("/register.htm");
  }

  async registerNewUser(): Promise<any> {
    try {
      const user = new NewUser().generateUserData();
      const newUser = generateUserData();
      console.log("Generated User Data by function:", newUser);
      console.log("Generated User Data by class:", user);

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

      // Click the register button
      await this.registerButton.click();
      return user; // Return the user data for verification in tests
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Re-throw the error to be handled by the test
    }
  }
}
