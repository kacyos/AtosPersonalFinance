import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { CookiesManagerService } from './cookies-manager.service';
import { Observable, catchError, map, observeOn, retry } from 'rxjs';

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

  deleteTransaction(transactionId: number) {
    return this.http
      .delete(`${API}/delete?transaction_id=${transactionId}`, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(map((response: HttpResponse<any>) => response));
  }

  getFilterTransaction(params: {
    transaction_type?: string;
    category_id?: string;
    initial_date?: string;
    final_date?: string;
    value?: string;
  }) {
    const paramsSearch = new URLSearchParams();
    const { transaction_type, category_id, value, initial_date, final_date } =
      params;

    transaction_type &&
      paramsSearch.append('transaction_type', transaction_type);
    category_id && paramsSearch.append('category_id', category_id);
    value && paramsSearch.append('value', value);
    initial_date && paramsSearch.append('initial_date', initial_date);
    final_date && paramsSearch.append('final_date', final_date);

    return this.http.get<ITransaction[]>(
      `${API}/list-by?user_id=${this.userId}&${paramsSearch.toString()}`
    );
  }

  getModifiedToday() {
    return this.http.get<ITransaction[]>(
      `${API}/modified-today?user_id=${this.userId}`
    );
  }
}
