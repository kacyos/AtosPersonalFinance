import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    if (this.accountService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
