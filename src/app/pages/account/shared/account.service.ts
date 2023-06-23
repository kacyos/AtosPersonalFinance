import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { IUser } from '../../../models/user.model';

const API = 'http://localhost:5029';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  async login(user: IUser) {
    return this.http
      .post<{
        user: IUser;
        token: string;
      }>(`${API}/user/login`, {
        userName: user.userName,
        password: user.password,
      })
      .subscribe((response) => {
        localStorage.setItem('token', response.token);
      });
  }

  createAccount(user: IUser) {
    return this.http.post<string>(`${API}/user/create`, {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      password: user.password,
    });
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = jwt_decode<JwtPayload>(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) {
      return false;
    }

    return !(date!.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}
