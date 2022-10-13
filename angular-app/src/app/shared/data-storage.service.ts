import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
