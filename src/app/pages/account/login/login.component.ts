import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { CookiesManagerService } from 'src/app/services/cookies-manager.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login = {
    userName: '',
    password: '',
  };
  toast = { type: '', message: '' };

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
    this.accountService.login(this.login).subscribe(
      (response) => {
        const cookieValue = JSON.stringify({
          id: response.user.id,
          name: response.user.userName,
          token: response.token,
        });

        this.cookiesManagerService.setCookie(cookieValue);
        this.router.navigate(['home']);
      },
      (error) => {
        this.openToast('bg-danger', 'Usuário ou senha inválidos');
      }
    );
  }

  openToast(type: string, message: string) {
    this.toast.type = type;
    this.toast.message = message;

    const toast = document.querySelectorAll('.toast');

    toast.forEach((element) => {
      const toastBootstrap = Toast.getOrCreateInstance(element, {
        animation: true,
        autohide: true,
        delay: 3000,
      });
      toastBootstrap.show();
    });
  }
}
