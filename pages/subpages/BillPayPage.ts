import { Page, Locator } from "@playwright/test";

export class BillPayPage {
  private page: Page;
  readonly billPayHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayHeading = page.getByRole("heading", {
      name: "Bill Payment Service"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/billpay.htm");
  }
}
