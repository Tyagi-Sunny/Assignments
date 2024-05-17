import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class CustomerStorageService {
  usersOfCustomer = new EventEmitter<User[]>();
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<Customer[]>('http://localhost:3000/customers');
  }

  getUsersOfCustomer(id: number) {
    let filterParams = new HttpParams();
    filterParams = filterParams.append(
      'filter',
      '{"include":[{"relation":"UserCustomer"},{"relation":"roledetails"}]}'
    );
    return this.http.get<User[]>(`http://localhost:3000/customers/${id}/users`);
  }
}
