import { Page, Locator } from "@playwright/test";

export class AccountsOverviewPage {
  private page: Page;
  readonly accountsOverviewHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsOverviewHeading = page.getByRole("heading", {
      name: "Accounts Overview"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/overview.htm");
  }
}
