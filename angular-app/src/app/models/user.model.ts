export class User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  role: string;
  UserCustomer: any;
  constructor(
    _firstName: string,
    _middleName: string,
    _lastName: string,
    _email: string,
    _contact: string,
    _role: string,
    _address: string,
    _UserCustomer: any
  ) {
    this.firstName = _firstName;
    this.middleName = _middleName;
    this.lastName = _lastName;
    this.email = _email;
    this.contact = _contact;
    this.address = _address;
    this.role = _role;
    this.UserCustomer = _UserCustomer;
  }
  getProperty(property: string): string {
    if (property === 'firstName') return this.firstName;
    else if (property === 'middleName') return this.middleName;
    else if (property === 'lastName') return this.lastName;
    else if (property === 'email') return this.email;
    else if (property === 'contact') return this.contact;
    else if (property === 'role') return this.role;
    else if (property === 'address') return this.address;
    else return this.UserCustomer;
  }
}
