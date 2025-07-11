import { Page, Locator } from "@playwright/test";

export class UpdateContactInfoPage {
  private page: Page;
  readonly updateContactInfoHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.updateContactInfoHeading = page.getByRole("heading", {
      name: "Update Profile"
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("/parabank/updateprofile.htm");
  }
}
