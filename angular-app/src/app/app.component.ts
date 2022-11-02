import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { DataStorageService } from './shared/data-storage.service';
import { map } from 'rxjs/operators';
import { CustomerStorageService } from './shared/customer-storage.service';
import { Customer } from './models/customer.model';
import { AuthService } from './auth/auth.service';

const role: string[] = ['SuperAdmin', 'Admin', 'Subscriber'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataLoaded: boolean = false;
  users: User[];
  title = 'angular-app';
  customers: Customer[];
  customersLoaded: boolean = false;
  usersOfCustomer: User[];
  isLoggedIn: boolean;
  role: string;
  currentUserRole: string;

  constructor(
    private dataService: DataStorageService,
    private customerService: CustomerStorageService,
    private authService: AuthService
  ) {
    customerService.usersOfCustomer.subscribe((data) => {
      this.usersOfCustomer = data;
    });
    authService.userLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    });

    if (localStorage.getItem('user-token')) {
      this.isLoggedIn = true;
    }
    authService.userLoggedInRoleId.subscribe((rid) => {
      this.currentUserRole = role[rid - 1];
    });
  }

  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem('user-token');
    this.isLoggedIn = false;
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
              role[user.rid - 1],
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
    if (this.customersLoaded) this.customersLoaded = false;
    else {
      this.customerService.getCustomers().subscribe((customers) => {
        this.customers = customers;
        this.customersLoaded = true;
      });
    }
  }
}
