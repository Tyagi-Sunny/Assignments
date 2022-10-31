import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  loadUser() {
    let filterParams = new HttpParams();
    filterParams = filterParams.append(
      'filter',
      '{"include":[{"relation":"UserCustomer"}]}'
    );
    return this.http.get<User[]>('http://localhost:3000/users', {
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
    let data = {
      id: newUser.id,
      firstName: newUser.firstName,
      middleName: newUser.middleName,
      lastName: newUser.lastName,
      email: newUser.email,
      contact: newUser.contact,
      role: newUser.role,
      address: newUser.address,
      cid: 1, //default customer initially
    };
    return this.http.post('http://localhost:3000/users', data);
  }
}
