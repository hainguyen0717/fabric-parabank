import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/homepage/RegisterPage";
import { HomePage } from "../../pages/homepage/HomePage";
import { NewUser } from "../fixtures/NewUser";

test("Register new user on ParaBank", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  // Navigate to registration page using your page object
  await registerPage.goto();

  // Register user using your existing method
  const newUser = new NewUser();
  console.log("Generated User Data:", newUser.getUserData());

  await registerPage.registerUser(newUser);

  // Verify successful registration
  const registerResultPage = new HomePage(page);
  expect(
    await registerResultPage.verifyRegistrationSuccess(newUser)
  ).toBeTruthy();

  // Logout after registration
  registerResultPage.logOut;

  console.log("Successfully registered user:", newUser.username);
});
