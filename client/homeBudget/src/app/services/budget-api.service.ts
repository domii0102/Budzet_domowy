import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

type ApiResponse<T> = { success: boolean; data: T };

@Injectable({ providedIn: 'root' })
export class BudgetApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.base}/categories`)
      .pipe(map(r => r.data));
  }

  getTransactions(month: number, year: number): Observable<any[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http
      .get<ApiResponse<any[]>>(`${this.base}/transactions`, { params })
      .pipe(map(r => r.data));
  }

  getLimits(month: number, year: number): Observable<any[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http
      .get<ApiResponse<any[]>>(`${this.base}/limits`, { params })
      .pipe(map(r => r.data));
  }

  addTransaction(body: any): Observable<any> {
    return this.http.post(`${this.base}/transactions`, body);
  }

  addLimit(body: any): Observable<any> {
    return this.http.post(`${this.base}/limits`, body);
  }

  addCategory(body: any): Observable<any> {
    return this.http.post(`${this.base}/categories`, body);
  }
}
