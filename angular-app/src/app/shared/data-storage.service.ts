import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from '../models/user.model';

const Customer: string[] = ['max', 'suzen'];

const Role: string[] = ['SuperAdmin', 'Admin', 'Subscriber'];

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  loadUser() {
    let filterParams = new HttpParams();
    filterParams = filterParams.append(
      'filter',
      '{"include":[{"relation":"UserCustomer"},{"relation":"roledetails"}]}'
    );
    return this.http.get<User[]>('http://localhost:3000/users', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      params: filterParams,
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  saveUser(newUser: User, id: number) {
    let data = {
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      email: newUser.email,
      contact: newUser.contact,
      role: newUser.role,
      address: newUser.address,
    };
    return this.http.patch(`http://localhost:3000/users/${id}`, data);
  }

  addUser(newUser: User) {
    let customerId = Customer.indexOf(newUser.UserCustomer);
    let roleId = Role.indexOf(newUser.role);

    let data = {
      id: newUser.id,
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: 'test',
      password: 'test@123',
      contact: newUser.contact,
      role: newUser.role,
      address: newUser.address,
      cid: customerId + 1,
      rid: roleId + 1,
    };

    return this.http.post('http://localhost:3000/users', data);
  }
}
