import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { catchError, retry } from 'rxjs';

const API = 'http://localhost:5029/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransactions() {
    return this.http.get<ITransaction[]>(`${API}/list`);
  }

  getLastTransactionsFromSevenDays(userId: number) {
    return this.http.get<ITransaction[]>(`${API}?user_id=${userId}`);
  }
}
