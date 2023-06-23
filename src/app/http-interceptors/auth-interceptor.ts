import { Injectable } from '@angular/core';
import { AccountService } from '../pages/account/shared/account.service';

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.accountService.getToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
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
      () => 'Ocorreu um erro na aplicação, tente novamente mais tarde.'
    );
  }
}
