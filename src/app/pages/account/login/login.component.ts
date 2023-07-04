import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { CookiesManagerService } from 'src/app/services/cookies-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login = {
    userName: '',
    password: '',
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookiesManagerService: CookiesManagerService
  ) {}

  ngOnInit() {
    if (this.accountService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  async onSubmit() {
    try {
      this.accountService.login(this.login).subscribe((response) => {
        const cookieValue = JSON.stringify({
          id: response.user.id,
          name: response.user.firstName,
          token: response.token,
        });
        this.cookiesManagerService.setCookie(cookieValue);
        this.router.navigate(['/']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
