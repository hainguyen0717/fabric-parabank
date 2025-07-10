import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/homepage/registerPage";

test("register new user on ParaBank", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  // Navigate to registration page using your page object
  await registerPage.goto();

  // Register user using your existing method
  const userData = await registerPage.registerNewUser();

  // Verify successful registration
  await expect(page).toHaveURL(/overview/);

  console.log("Successfully registered user:", userData.username);
});
