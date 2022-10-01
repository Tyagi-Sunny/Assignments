export class User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  constructor(
    _firstName: string,
    _middleName: string,
    _lastName: string,
    _email: string,
    _phone: string,
    _address: string,
    _role: string
  ) {
    this.firstName = _firstName;
    this.middleName = _middleName;
    this.lastName = _lastName;
    this.email = _email;
    this.phone = _phone;
    this.address = _address;
    this.role = _role;
  }
  getProperty(property: string): string {
    if (property === 'firstName') return this.firstName;
    else if (property === 'middleName') return this.middleName;
    else if (property === 'lastName') return this.lastName;
    else if (property === 'email') return this.email;
    else if (property === 'phone') return this.phone;
    else if (property === 'address') return this.address;
    else return this.role;
  }
}
