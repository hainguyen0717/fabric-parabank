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

  async validateAccountDetails(
    accountNumber: string,
    expectedBalance: string
  ): Promise<boolean> {
    try {
      const accountRow = this.page
        .locator(`text=${accountNumber}`)
        .locator("xpath=ancestor::tr");
      await accountRow
        .locator(`text=${accountNumber}`)
        .waitFor({ state: "visible" });

      // Validate the balance is displayed correctly
      const balanceCell = accountRow.locator(`text=${expectedBalance}`).nth(1);
      await balanceCell.waitFor({ state: "visible" });
      console.log(
        `Account ${accountNumber} with balance ${expectedBalance} is displayed correctly.`
      );
      return true;
    } catch (error) {
      console.error(
        `Validation failed for account ${accountNumber} with balance ${expectedBalance}:`,
        error
      );
      return false;
    }
  }
}
