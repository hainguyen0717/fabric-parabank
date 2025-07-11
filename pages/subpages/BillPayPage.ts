import { Page, Locator } from "@playwright/test";
import { Payee } from "../../tests/fixtures/Payee";

export class BillPayPage {
  private page: Page;
  readonly billPayHeading: Locator;
  readonly payeeNameInput: Locator;
  readonly payeeStreetAddressInput: Locator;
  readonly payeeCityInput: Locator;
  readonly payeeStateInput: Locator;
  readonly payeeZipCodeInput: Locator;
  readonly payeePhoneNumberInput: Locator;
  readonly payeeAccountNumberInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput: Locator;
  readonly sendPaymentButton: Locator;
  readonly fromAccountDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayHeading = page.getByRole("heading", {
      name: "Bill Payment Service"
    });
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.payeeStreetAddressInput = page.locator(
      'input[name="payee.address.street"]'
    );
    this.payeeCityInput = page.locator('input[name="payee.address.city"]');
    this.payeeStateInput = page.locator('input[name="payee.address.state"]');
    this.payeeZipCodeInput = page.locator(
      'input[name="payee.address.zipCode"]'
    );
    this.payeePhoneNumberInput = page.locator(
      'input[name="payee.phoneNumber"]'
    );
    this.payeeAccountNumberInput = page.locator(
      'input[name="payee.accountNumber"]'
    );
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.getByRole("button", { name: "Send Payment" });
    this.fromAccountDropdown = page.getByRole("combobox");
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/billpay.htm");
  }

  async payBill(
    payee: Payee,
    amount: string,
    fromAccount: string
  ): Promise<boolean> {
    try {
      await this.payeeNameInput.fill(payee.name);
      await this.payeeStreetAddressInput.fill(payee.streetAddress);
      await this.payeeCityInput.fill(payee.city);
      await this.payeeStateInput.fill(payee.state);
      await this.payeeZipCodeInput.fill(payee.zipCode);
      await this.payeePhoneNumberInput.fill(payee.phoneNumber);
      await this.payeeAccountNumberInput.fill(payee.accountNumber);
      await this.verifyAccountInput.fill(payee.verifyAccount);
      await this.amountInput.fill(amount);

      //Select the account to pay from
      await this.selectAccount(fromAccount);

      await this.page.waitForTimeout(1000); // Wait for dropdown to be ready

      await this.sendPaymentButton.click();
      const successMessage = this.page.getByText(
        new RegExp(`Bill Payment to .* was successful.`)
      );
      await successMessage.waitFor({ state: "visible" });

      console.log(
        `Successfully sent payment to '${payee.name}' from account '${fromAccount}'.`
      );
      return true;
    } catch (error) {
      console.error(
        `Failed  sent payment to '${payee.name}' from account '${fromAccount}':`,
        error
      );
      return false;
    }
  }

  async selectAccount(accountNumber: string): Promise<void> {
    await this.fromAccountDropdown.click();
    await this.page.waitForTimeout(500);
    await this.fromAccountDropdown.selectOption(accountNumber);
  }
}
