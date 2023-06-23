import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';

const API = 'http://localhost:5029/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransactions() {
    return this.http.get<ITransaction[]>(`${API}/list-all`);
  }

  getLastTransactionsFromSevenDays(userId: number) {
    return this.http.get<ITransaction[]>(
      `${API}/last-seven-days?user_id=${userId}`
    );
  }
}
