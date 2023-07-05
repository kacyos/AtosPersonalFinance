import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesManagerService {
  constructor() {}
  private cookieName = 'finance';

  setCookie(value: string) {
    document.cookie = `${this.cookieName}=${value}; path=/`;
  }

  getCookie() {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(this.cookieName));
    if (cookie) {
      return JSON.parse(cookie.split('=')[1]);
    }
    return '';
  }

  deleteCookie() {
    document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.clear();
  }
}
