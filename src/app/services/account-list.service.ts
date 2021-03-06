import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable ,of } from 'rxjs';
import { Account } from 'src/models/accounts/accounts';
const listaccount_url = "https://localhost:44367/controller/accounts"
const myaccount_url = "https://localhost:44367/controller/myaccount"
const lockAccount_url = "https://localhost:44367/controller/lock-account"
const unlockAccount_url = "https://localhost:44367/controller/unlock-account"
const dashboard_url = "https://localhost:44367/controller/dashboard"

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

  getMyDashboard (myReq : any) : Observable<any> {
    return this.http.post(dashboard_url,myReq).pipe(
      tap(_ => console.log ('get dashboard successsly !'))
    )
  }

getMyAccount(accountNumber : any) : Observable<Account> {
  return this.http.post<Account>(myaccount_url,accountNumber).pipe(
    tap(_ => console.log('get My Account')),
      // catchError(this.handleError<any>(`get Account List`))
  )
}
lockAccount (acc_number : any) : Observable<any>  {
  return this.http.post(lockAccount_url,acc_number).pipe(
    tap(_ => console.log(`locked account ${acc_number}`)),
  )
}
unlockAccount(acc_number : any) : Observable<any> {
  return this.http.post(unlockAccount_url,acc_number).pipe(
    tap(_ => console.log(`unlocked account ${JSON.stringify(acc_number)}`)),
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
  removeAccountNumberDisplay() : any {
    window.sessionStorage.removeItem(Acount_KEY)
  }
}
