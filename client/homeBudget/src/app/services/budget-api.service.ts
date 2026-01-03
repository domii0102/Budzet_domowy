import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, newCategory } from '../../models/Category';
import { Transaction, newTransaction  } from '../../models/Transaction';
import {Limit, newLimit} from '../../models/Limit';

type ApiResponse<T> = { success: boolean; data: T };

@Injectable({ providedIn: 'root' })
export class BudgetApiService {
  base: string = environment.apiUrl;
  http: HttpClient = inject(HttpClient);


  getCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<Category[]>>(`${this.base}/categories`)
      .pipe(map(r => r.data));
  }

  getTransactions(month: number, year: number): Observable<Transaction[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http
      .get<ApiResponse<Transaction[]>>(`${this.base}/transactions`, { params })
      .pipe(map(r => r.data));
  }

  getLimits(month: number, year: number): Observable<Limit[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http
      .get<ApiResponse<Limit[]>>(`${this.base}/limits`, { params })
      .pipe(map(r => r.data));
  }


  addTransaction(body: newTransaction): Observable<any> {
    return this.http.post(`${this.base}/transactions`, body);
  }

  addLimit(body: newLimit): Observable<any> {
    return this.http.post(`${this.base}/limits`, body);
  }

  addCategory(body: newCategory): Observable<any> {
    return this.http.post(`${this.base}/categories`, body);
  }
}
