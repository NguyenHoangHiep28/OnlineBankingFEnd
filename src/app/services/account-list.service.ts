import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable ,of } from 'rxjs';
import { Account } from 'src/models/accounts/accounts';
const listaccount_url = "https://localhost:44367/controller/accounts"
const myaccount_url = "https://localhost:44367/controller/myaccount"


const Acount_KEY = 'Account_Number';

@Injectable({
  providedIn: 'root'
})

export class AccountListService { 

  constructor(private http: HttpClient) { }

  getAccountList (userID: any): Observable<Account[]>{

    return this.http.post<Account[]>(listaccount_url,userID).pipe(
      tap(_ => console.log('get Account list')),
      catchError(this.handleError<any>(`get Account List`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

getMyAccount(accountNumber : any) : Observable<Account> {
  return this.http.post<Account>(myaccount_url,accountNumber).pipe(
    tap(_ => console.log('get Account list')),
      // catchError(this.handleError<any>(`get Account List`))
  )
}


  saveAccountNumberDisplay(accountNumber : string) {
    window.sessionStorage.removeItem(Acount_KEY);
    window.sessionStorage.setItem(Acount_KEY,accountNumber);
  }
  getAccountNumberDisplay(): any {
    const acc_number =  window.sessionStorage.getItem(Acount_KEY)
      if(acc_number) {
        return acc_number
      }
      return ''
  }
}
