import { Locator, Page } from "@playwright/test";
import { NewUser } from "../tests/fixtures/NewUser";
import { HomePage } from "./homepage/HomePage";

export class LoginPage {
  readonly page: Page;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Log In" });
  }

  async goto() {
    await this.page.goto("/parabank/index.htm");
  }

  async login(user: NewUser): Promise<HomePage> {
    try {
      await this.userNameField.fill(user.username);
      await this.passwordField.fill(user.password);
      await this.loginButton.click();
      return new HomePage(this.page);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
}
