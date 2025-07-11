import { Page, Locator } from "@playwright/test";

export class TransferFundsPage {
  private page: Page;
  readonly transferFundsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsHeading = page.getByRole("heading", {
      name: "Transfer Funds"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/transfer.htm");
  }
}
