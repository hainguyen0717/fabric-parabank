import { Page, Locator } from "@playwright/test";

export class RequestLoanPage {
  private page: Page;
  readonly requestLoanHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.requestLoanHeading = page.getByRole("heading", {
      name: "Apply for a Loan"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/requestloan.htm");
  }
}
