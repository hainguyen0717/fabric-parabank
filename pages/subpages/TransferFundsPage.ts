import { Page, Locator } from "@playwright/test";

export class TransferFundsPage {
  private page: Page;
  readonly transferFundsHeading: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsHeading = page.getByRole("heading", {
      name: "Transfer Funds"
    });
    this.amountInput = page.locator("#amount");
    this.fromAccountDropdown = page.locator("#fromAccountId");
    this.transferButton = page.getByRole("button", { name: "Transfer" });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/transfer.htm");
  }

  async transferMoney(fromAccount: string, amount: string): Promise<boolean> {
    try {
      // Fill in the transfer details
      await this.amountInput.click();
      await this.amountInput.fill(amount);
      await this.fromAccountDropdown.click();
      await this.fromAccountDropdown.selectOption(fromAccount);

      // Click the transfer button
      await this.page.waitForTimeout(1000); // Wait for dropdown to be ready
      await this.transferButton.click();

      // Validate the success message
      const successMessage = this.page.getByText(
        `$${amount}.00 has been transferred`
      );
      await successMessage.waitFor({ state: "visible" });
      console.log(
        `Successfully transferred '$${amount}' from account '${fromAccount}'.`
      );

      return true;
    } catch (error) {
      console.error(
        `Failed to transfer '$${amount}' from account '${fromAccount}':`,
        error
      );
      return false;
    }
  }
}
