import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesManagerService } from 'src/app/services/cookies-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private cookiesManagerService: CookiesManagerService,
    private router: Router
  ) {}
  logout() {
    this.cookiesManagerService.deleteCookie();
    this.router.navigate(['/login']);
  }
}
