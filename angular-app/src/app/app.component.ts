import { Component } from '@angular/core';
import { User } from './models/user.model';
import { DataStorageService } from './shared/data-storage.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataLoaded: boolean = false;
  users: User[];
  title = 'angular-app';

  constructor(private dataService: DataStorageService) {}
  loadEmployee() {
    this.dataLoaded = true;
    this.dataService
      .loadUser()
      .pipe(
        map((users) => {
          // return users.map(user)
          // return users;
          return users.map((user) => {
            let customerName: string;

            return new User(
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
      });
  }
}
