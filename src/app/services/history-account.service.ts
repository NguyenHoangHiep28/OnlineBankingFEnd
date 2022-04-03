import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';

const httpOntions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class HistoryAccountService {
  constructor(private http: HttpClient) {}
  historyCart(accountNumber: string): Observable<any> {
    return this.http.post<any[]>(
      environment.api + 'controller/transaction-history',
      {
        accountNumber,
      },
      httpOntions
    );
  }
}
