import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookiesManagerService } from './cookies-manager.service';
import { ICategory } from '../models/category.model';

const API = 'http://localhost:5029';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private cookiesManagerService: CookiesManagerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllCategories() {
    const user_id = this.cookiesManagerService.getCookie().id;
    return this.http.get<ICategory[]>(
      `${API}/category/list-all?user_id=${user_id}`
    );
  }
}
