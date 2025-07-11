import { fakerEN_AU } from "@faker-js/faker";

export class Payee {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  accountNumber: string;
  verifyAccount: string;

  constructor() {
    this.name = fakerEN_AU.person.fullName();
    this.streetAddress = fakerEN_AU.location.streetAddress();
    this.city = fakerEN_AU.location.city();
    this.state = fakerEN_AU.location.state();
    this.zipCode = fakerEN_AU.location.zipCode();
    this.phoneNumber = fakerEN_AU.phone.number();
    this.accountNumber = fakerEN_AU.finance.accountNumber();
    this.verifyAccount = this.accountNumber; // Assuming verifyAccount matches accountNumber
  }

  public getPayeeData() {
    return {
      name: this.name,
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      phoneNumber: this.phoneNumber,
      accountNumber: this.accountNumber,
      verifyAccount: this.verifyAccount
    };
  }
}
