import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  @ViewChild('authform') authForm: NgForm;
  err: string;
  constructor(private authService: AuthService) {}

  signIn() {
    this.err = '';
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;
    this.authService.logIn(username, password).subscribe(
      (res: { token: string; rid: number }) => {
        localStorage.setItem('user-token', res.token);
        this.authService.userLoggedIn.emit(true);
        this.authService.userLoggedInRoleId.emit(res.rid);
      },
      (err) => {
        this.err = err.error.error.message;
      }
    );

    this.authForm.reset();
  }
}
