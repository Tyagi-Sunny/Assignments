import { Component } from '@angular/core';
import { User } from './models/user.model';
import { DataStorageService } from './shared/data-storage.service';
import { map } from 'rxjs/operators';
import { CustomerStorageService } from './shared/customer-storage.service';
import { Customer } from './models/customer.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataLoaded: boolean = false;
  users: User[];
  title = 'angular-app';
  customers: Customer[];
  customersLoaded: boolean = false;
  usersOfCustomer: User[];

  constructor(
    private dataService: DataStorageService,
    private customerService: CustomerStorageService
  ) {
    customerService.usersOfCustomer.subscribe((data) => {
      this.usersOfCustomer = data;
    });
  }
  loadEmployee() {
    this.dataService
      .loadUser()
      .pipe(
        map((users) => {
          return users.map((user) => {
            let customerName: string;

            return new User(
              user.id,
              user.firstName,
              user.middleName,
              user.lastName,
              user.email,
              user.contact,
              user.role,
              user.address,
              user.UserCustomer.name
            );
          });
        })
      )
      .subscribe((users) => {
        this.users = users;
        this.dataLoaded = true;
      });
  }

  loadCustomer() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.customersLoaded = true;
    });
  }
}
