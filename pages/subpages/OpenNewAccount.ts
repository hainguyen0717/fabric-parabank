import { Page, Locator } from "@playwright/test";

export class OpenNewAccountPage {
  private page: Page;
  readonly openNewAccountHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountHeading = page.getByRole("heading", {
      name: "Open New Account"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/openaccount.htm");
  }
}
