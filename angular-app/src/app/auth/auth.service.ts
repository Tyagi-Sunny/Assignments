import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userLoggedIn = new EventEmitter<boolean>();
  userLoggedInRoleId = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  logIn(username: string, password: string) {
    return this.http.post<{ token: string; rid: number }>(
      'http://localhost:3000/users/login',
      {
        username,
        password,
      }
    );
  }
}
