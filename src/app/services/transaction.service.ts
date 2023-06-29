import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { CookiesManagerService } from './cookies-manager.service';
import { catchError, retry } from 'rxjs';

const API = 'http://localhost:5029/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private http: HttpClient,
    private cookiesManagerService: CookiesManagerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  userId = this.cookiesManagerService.getCookie().id;

  getAllTransactions() {
    return this.http.get<ITransaction[]>(
      `${API}/list-all?user_id=${this.userId}`
    );
  }

  getLastTransactionsFromSevenDays() {
    return this.http.get<ITransaction[]>(
      `${API}/last-seven-days?user_id=${this.userId}`
    );
  }

  postCreateTransaction(transaction: ITransaction) {
    return this.http.post<ITransaction>(
      `${API}/create?user_id=${this.userId}`,
      transaction,
      this.httpOptions
    );
  }

  patchUpdateTransaction(transaction: ITransaction) {
    return this.http.patch<ITransaction>(
      `${API}/update?transaction_id=${transaction.id}`,
      transaction,
      this.httpOptions
    );
  }
}
