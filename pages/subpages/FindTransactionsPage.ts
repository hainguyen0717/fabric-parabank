import { Page, Locator } from "@playwright/test";

export class FindTransactionsPage {
  private page: Page;
  readonly findTransactionsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.findTransactionsHeading = page.getByRole("heading", {
      name: "Find Transactions"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/findtrans.htm");
  }
}
