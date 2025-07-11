import { fakerEN_AU } from "@faker-js/faker";

export class NewUser {
  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public phone: string;
  public ssn: string;
  public username: string;
  public password: string;

  constructor() {
    // Initialize all fields with random data
    this.firstName = fakerEN_AU.person.firstName();
    this.lastName = fakerEN_AU.person.lastName();
    this.address = fakerEN_AU.location.streetAddress();
    this.city = fakerEN_AU.location.city();
    this.state = fakerEN_AU.location.state();
    this.zipCode = fakerEN_AU.location.zipCode();
    this.phone = fakerEN_AU.phone.number();
    this.ssn = fakerEN_AU.finance.accountNumber(9); // Generates a 9-digit random number
    const randomNumber = Math.floor(100 + Math.random() * 900).toString();
    this.username = `${this.firstName}${this.lastName}${randomNumber}`;
    this.password = fakerEN_AU.internet.password({
      length: 8,
      memorable: true,
      pattern: /[A-Z0-9]/
    });
  }

  /**
   * Returns the user data as an object
   */
  public getUserData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      phone: this.phone,
      ssn: this.ssn,
      username: this.username,
      password: this.password
    };
  }
}
