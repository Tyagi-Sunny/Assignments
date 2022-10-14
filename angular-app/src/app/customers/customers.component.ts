import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import { CustomerStorageService } from '../shared/customer-storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @Input() customers: Customer[];

  constructor(private customerStorage: CustomerStorageService) {}

  ngOnInit(): void {}

  showUsersOfCustomer(id: number) {
    this.customerStorage
      .getUsersOfCustomer(id)
      .pipe(
        map((data) => {
          return data.map((user) => {
            return new User(
              user.id,
              user.firstName,
              user.middleName,
              user.lastName,
              user.email,
              user.contact,
              user.role,
              user.address,
              this.customers[id - 1].name
            );
          });
        })
      )
      .subscribe((users) => {
        this.customerStorage.usersOfCustomer.emit(users);
      });
  }
}
