export class Customer {
  id: number;
  name: string;
  website: string;
  address: string;
  constructor(_id: number, _name: string, _website: string, _address: string) {
    this.id = _id;
    this.name = _name;
    this.website = _website;
    this.address = _address;
  }
}
