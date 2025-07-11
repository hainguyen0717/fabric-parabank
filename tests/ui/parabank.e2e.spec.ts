import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/homepage/RegisterPage";
import { HomePage } from "../../pages/homepage/HomePage";
import { NewUser } from "../fixtures/NewUser";
import { LoginPage } from "../../pages/LoginPage";
import { AccountsOverviewPage } from "../../pages/subpages/AccountsOverviewPage";
import { BillPayPage } from "../../pages/subpages/BillPayPage";
import { FindTransactionsPage } from "../../pages/subpages/FindTransactionsPage";
import { OpenNewAccountPage } from "../../pages/subpages/OpenNewAccount";
import { RequestLoanPage } from "../../pages/subpages/RequestLoanPage";
import { TransferFundsPage } from "../../pages/subpages/TransferFundsPage";
import { UpdateContactInfoPage } from "../../pages/subpages/UpdateContactInfoPage";
import { Payee } from "../fixtures/Payee";
import { validateTransactions } from "../../libs/api/axiosApiClient";

test.describe.serial("Parabank E2E Tests", () => {
  const user = new NewUser();
  const payee = new Payee();
  const EXPECTED_BALANCE = "$100.00";
  const EXPECTED_ACCOUNT_TYPE = "SAVINGS";
  const FUND_TRANSFER_AMOUNT = "5";
  const BILL_PAY_AMOUNT = "10";
  let cookies: any;
  let accountNumber: string;

  test("Step 1 & 2: Register new user on ParaBank", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    // Navigate to registration page using your page object
    await registerPage.goto();

    // Register user using your existing method

    console.log("Generated User Data:", user.getUserData());

    await registerPage.registerUser(user);
    const registerResultPage = new HomePage(page);
    expect(
      await registerResultPage.verifyRegistrationSuccess(user)
    ).toBeTruthy();

    // Logout after registration
    registerResultPage.logOut;
    console.log("Successfully registered user:", user.username);
  });

  test("Step 3 & 4: Login and validate the navigation on the home page", async ({
    page
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const homePage = await loginPage.login(user);
    expect(await homePage.verifyLoginSuccess()).toBeTruthy();

    // Store the state of the page for future tests
    cookies = await page.context().cookies();

    const openNewAccountPage = new OpenNewAccountPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.openNewAccountLink,
        openNewAccountPage.openNewAccountHeading
      )
    ).toBeTruthy();

    // Navigate to "Accounts Overview" and validate
    const accountsOverviewPage = new AccountsOverviewPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.accountsOverviewLink,
        accountsOverviewPage.accountsOverviewHeading
      )
    ).toBeTruthy();

    // Navigate to "Transfer Funds" and validate
    const transferFundsPage = new TransferFundsPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.transferFundsLink,
        transferFundsPage.transferFundsHeading
      )
    ).toBeTruthy();

    // Navigate to "Bill Pay" and validate
    const billPayPage = new BillPayPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.billPayLink,
        billPayPage.billPayHeading
      )
    ).toBeTruthy();

    // Navigate to "Find Transactions" and validate
    const findTransactionsPage = new FindTransactionsPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.findTransactionsLink,
        findTransactionsPage.findTransactionsHeading
      )
    ).toBeTruthy();

    // Navigate to "Update Contact Info" and validate
    const updateContactInfoPage = new UpdateContactInfoPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.updateContactInfoLink,
        updateContactInfoPage.updateContactInfoHeading
      )
    ).toBeTruthy();

    // Navigate to "Request Loan" and validate
    const requestLoanPage = new RequestLoanPage(page);
    expect(
      await homePage.validateNavigation(
        homePage.requestLoanLink,
        requestLoanPage.requestLoanHeading
      )
    ).toBeTruthy();
  });

  test("Step 5 & 6: Create a new Saving account and validate it on Accounts overview", async ({
    page,
    context
  }) => {
    if (!cookies && cookies.length === 0) test.skip();
    await context.addCookies(cookies);

    // Create new account
    const newAccountPage = new OpenNewAccountPage(page);
    await newAccountPage.navigateTo();
    const newAccountNumber = await newAccountPage.createNewAccount(
      EXPECTED_ACCOUNT_TYPE
    );
    console.log(`New account created with number: ${newAccountNumber}`);
    accountNumber = newAccountNumber;

    // Validate the account on the Accounts overview page
    const accountsOverview = new AccountsOverviewPage(page);
    await accountsOverview.navigateTo();
    const validateResult = await accountsOverview.validateAccountDetails(
      newAccountNumber,
      EXPECTED_BALANCE
    );

    // validate the account was created successfully
    expect(validateResult).toBeTruthy();
  });

  test("Step 7: Transfer funds between accounts", async ({ page, context }) => {
    if (!cookies && cookies.length === 0) test.skip();
    await context.addCookies(cookies);

    // Transfer Funds
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigateTo();
    const transferResult = await transferFundsPage.transferMoney(
      accountNumber,
      FUND_TRANSFER_AMOUNT
    );
    //Validate if the transfer was successful
    expect(transferResult).toBeTruthy();
  });

  test("Step 8: Pay a bill to a new payee", async ({ page, context }) => {
    if (!cookies && cookies.length === 0) test.skip();
    await context.addCookies(cookies);

    console.log(`Payee created:${JSON.stringify(payee)}`);

    const billPayPage = new BillPayPage(page);
    await billPayPage.navigateTo();

    const payBillResult = await billPayPage.payBill(
      payee,
      BILL_PAY_AMOUNT,
      accountNumber
    );
    // Validate if the bill payment was successful
    expect(payBillResult).toBeTruthy();
  });

  test("Step 9: Validate transactions via API", async ({ request }) => {
    if (!cookies || cookies.length === 0) test.skip();

    // Extract JSESSIONID from cookies
    const jsessionId = cookies.find(
      (cookie: any) => cookie.name === "JSESSIONID"
    )?.value;

    const verifyAccountId = parseInt(accountNumber, 10);
    const verifyAmount = parseFloat(BILL_PAY_AMOUNT);

    // Perform the API request using validateTransactions
    const responseBody = await validateTransactions(
      verifyAccountId,
      verifyAmount,
      jsessionId
    );

    console.log("API Response Body:", responseBody);

    // Validate the response body
    expect(responseBody).toEqual([
      expect.objectContaining({
        accountId: verifyAccountId,
        amount: verifyAmount,
        description: `Bill Payment to ${payee.name}`
      })
    ]);
  });
});
