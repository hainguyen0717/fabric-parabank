import { fakerEN_AU } from "@faker-js/faker";
// Set the locale to Australia (en_AU)

export function generateUserData() {
  // Generates random user data using fakerEN_AU.js
  // Generates random user data using fakerEN_AU.js
  const userFirstName = fakerEN_AU.person.firstName;
  const userLastName = fakerEN_AU.person.lastName;
  const address = fakerEN_AU.location.streetAddress();
  const city = fakerEN_AU.location.city();
  const state = fakerEN_AU.location.state();
  const zipCode = fakerEN_AU.location.zipCode();
  const phone = fakerEN_AU.phone.number();
  const ssn = fakerEN_AU.finance.accountNumber(9); // Generates a 9-digit random number
  const timestamp = Date.now().toString;
  const baseUsername = fakerEN_AU.internet.username();
  const username = `${baseUsername}${timestamp}`; // Append timestamp to ensure uniqueness
  const password = fakerEN_AU.internet.password({
    length: 8,
    memorable: true,
    pattern: /[A-Z]/
  }); // Generates a random password with at least 8 characters

  return {
    userFirstName,
    userLastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password
  };
}
