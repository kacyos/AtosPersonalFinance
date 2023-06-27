import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { CookiesManagerService } from './cookies-manager.service';

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
    console;
    return this.http.post<ITransaction>(
      `${API}/create?user_id=${this.userId}`,
      transaction,
      this.httpOptions
    );
  }
}
