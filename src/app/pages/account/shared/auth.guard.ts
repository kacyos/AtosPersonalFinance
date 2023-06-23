import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

// generated guard and modified to use localStorage
@Injectable({ providedIn: 'root' })
export class authGuard {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(): boolean {
    if (this.accountService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
