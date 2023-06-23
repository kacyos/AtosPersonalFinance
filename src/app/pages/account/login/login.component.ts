import { Component } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login = {
    userName: '',
    password: '',
  };

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    try {
      this.accountService.login(this.login);
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
  }
}
