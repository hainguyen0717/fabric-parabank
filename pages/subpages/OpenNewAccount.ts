import { Page, Locator } from "@playwright/test";

export class OpenNewAccountPage {
  private page: Page;
  readonly openNewAccountHeading: Locator;
  readonly accountTypeDropdown: Locator;
  readonly openNewAccountButton: Locator;
  readonly accountNumberText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountHeading = page.getByRole("heading", {
      name: "Open New Account"
    });
    this.accountTypeDropdown = page.locator("[id='type']");
    this.openNewAccountButton = page.getByRole("button", {
      name: "Open New Account"
    });
    this.accountNumberText = page.locator(
      "text=/Your new account number: \\d+/"
    );
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/openaccount.htm");
  }

  async createNewAccount(accountType: "CHECKING" | "SAVINGS"): Promise<string> {
    // Select the account type
    const accountTypeValue = accountType === "CHECKING" ? "0" : "1";
    await this.accountTypeDropdown.click();
    await this.accountTypeDropdown.selectOption(accountTypeValue);
    // await this.page.getByText(accountType).click();

    // Click the "Open New Account" button
    await this.page.waitForTimeout(1000); // Wait for dropdown to settle
    await this.openNewAccountButton.click();

    // Wait for the account number text to appear
    await this.accountNumberText.waitFor({
      state: "visible"
    });

    // Extract and return the account number
    const accountNumber = await this.accountNumberText.textContent();
    return accountNumber?.replace("Your new account number: ", "").trim() || "";
  }
}
