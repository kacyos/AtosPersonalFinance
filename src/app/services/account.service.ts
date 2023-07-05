import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { IUser } from '../models/user.model';
import { CookiesManagerService } from 'src/app/services/cookies-manager.service';

const API = 'http://localhost:5029';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private cookiesManagerService: CookiesManagerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(user: IUser) {
    return this.http.post<{
      user: IUser;
      token: string;
    }>(`${API}/user/login`, {
      userName: user.userName,
      password: user.password,
    });
  }

  createAccount(user: IUser) {
    return this.http
      .post<{
        user: IUser;
        token: string;
      }>(`${API}/user/create`, {
        userName: user.userName,
        password: user.password,
      })
      .subscribe((response) => {
        const cookieValue = JSON.stringify({
          id: response.user.id,
          name: response.user.userName,
          token: response.token,
        });
        this.cookiesManagerService.setCookie(cookieValue);
      });
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  isUserLoggedIn() {
    const { token } = this.cookiesManagerService.getCookie();
    if (!token) {
      return false;
    }
    if (!!this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) {
      return false;
    }

    return !(date!.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = jwt_decode<JwtPayload>(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
