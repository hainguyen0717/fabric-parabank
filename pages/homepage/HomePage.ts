import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly successMessage: Locator;
  readonly logOutLink: Locator;

  // Global navigation links
  readonly openNewAccountLink: Locator;
  readonly accountsOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
  readonly updateContactInfoLink: Locator;
  readonly requestLoanLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByRole("heading", {
      name: "/Welcome .*/"
    });
    this.successMessage = page.getByText("Your account was created");
    this.logOutLink = page.getByRole("link", { name: "Log Out" });
    // Links
    this.openNewAccountLink = page.getByRole("link", {
      name: "Open New Account"
    });
    this.accountsOverviewLink = page.getByRole("link", {
      name: "Accounts Overview"
    });
    this.transferFundsLink = page.getByRole("link", { name: "Transfer Funds" });
    this.billPayLink = page.getByRole("link", { name: "Bill Pay" });
    this.findTransactionsLink = page.getByRole("link", {
      name: "Find Transactions"
    });
    this.updateContactInfoLink = page.getByRole("link", {
      name: "Update Contact Info"
    });
    this.requestLoanLink = page.getByRole("link", { name: "Request Loan" });
  }

  async verifyRegistrationSuccess(user: {
    username: string;
  }): Promise<boolean> {
    // Check if both welcome and success messages are visible
    try {
      const dynamicWelcomeMessage = this.page.getByRole("heading", {
        name: `Welcome ${user.username}`
      });

      await dynamicWelcomeMessage.waitFor({ state: "visible", timeout: 3000 });

      // Wait for the success message to appear
      await this.successMessage.waitFor({ state: "visible", timeout: 3000 });

      console.log("Registration success messages are visible.");
      return true; // Both messages are visible
    } catch (error) {
      console.error("Registration success messages not visible:", error);
      return false; // One or both messages are not visible
    }
  }

  async verifyLoginSuccess(): Promise<boolean> {
    await this.logOutLink.waitFor({ state: "visible" });
    return await this.logOutLink.isVisible(); // Returns true if the logout link is visible
  }

  async logOut(): Promise<void> {
    await this.logOutLink.click();
  }

  async navigateTo(link: Locator, heading: Locator): Promise<void> {
    await link.click();
    await heading.waitFor({ state: "visible" });
  }

  async validateNavigation(link: Locator, heading: Locator): Promise<boolean> {
    // Click the link
    await link.click();

    // Wait for the corresponding heading to be visible
    await heading.waitFor({ state: "visible" });

    // Validate that the heading is visible
    return await heading.isVisible();
  }
}
