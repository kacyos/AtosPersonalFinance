import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookiesManagerService } from '../services/cookies-manager.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookiesManagerService: CookiesManagerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { token } = this.cookiesManagerService.getCookie();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      console.log(request);
    }

    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Ocorreu um erro:', error.error.message);
    } else {
      console.log(
        `Backend retornou o código ${error.status}, body : ${error.error.message}`
      );
    }

    return throwError(
      () =>
        'Ocorreu um erro na aplicação, tente novamente mais tarde. ' +
        error.error.message
    );
  }
}
