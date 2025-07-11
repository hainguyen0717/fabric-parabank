# fabric-parabank

## How to Run Tests

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run tests in sequence:
   ```bash
   npx playwright test
   ```

---

## Important: Test Execution Order

The tests in this project are designed to run **in sequence** because they share state (e.g., cookies, session data) between tests. Specifically:

1. **Test 1**: Registers a new user and logs in.

   - This test creates a new user and establishes the session state (cookies).
   - The session state is saved and reused by subsequent tests.

2. **Test 2**: Validates navigation on the home page.

   - This test relies on the session state created in Test 1 to verify the user's ability to navigate the application.

3. **Test 3 and Beyond**: Perform actions like creating accounts, transferring funds, and validating transactions.
   - These tests reuse the session state and depend on the data created in earlier tests (e.g., account numbers, payees).

### Why Sequential Execution is Crucial

- **Shared State**: The session state (e.g., cookies) is established in the first test and reused in subsequent tests. Running tests out of order or skipping tests will break this dependency.
- **Data Dependency**: Tests rely on data (e.g., account numbers, payees) created in earlier tests. Skipping or reordering tests will result in missing data and test failures.

### Recommendations

- Always run the tests using the command:
  ```bash
  npx playwright test
  ```
- Or run the whole test in IDE by running the describe block.
- Avoid running individual tests unless you manually set up the required state beforehand.

By following these guidelines, you ensure the tests run successfully and as intended.

### Known Issues

- I have tested a couple times and the scripts were working fine. Then I have made some slight changes and I was not able to logon to the issue due to the issue in /error/LoginError.png
