import { Injectable } from '@angular/core';
import { Observable ,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const sendOtp_URL = "https://localhost:44367/controller/transaction-otp"
const verifyOtp_URL ="https://localhost:44367/controller/totp-verify"
const transfer_URL = "https://localhost:44367/controller/transfer"
@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http : HttpClient) { }



  sendTransactionOtp(accountNumber : Object) : Observable <any> {
    return this.http.post (sendOtp_URL,accountNumber).pipe (
      tap(_ => console.log ('otp is sended')),
      catchError(this.handleError<any>(`get otp`))
    )
  }
  verifyTransactionOTP (verifyReq : Object) : Observable <any> {
    return this.http.post (verifyOtp_URL,verifyReq
,{observe :'response'}).pipe (
      // catchError(this.handleError<any>(`otp code is not right`)),
      tap(_ => console.log('the request is send ')),
    )
  }

  transferMoney(
    transferReq : Object
  ) : Observable <any> {
    return this.http.post (transfer_URL , transferReq).
    pipe (
      catchError(this.handleError<any>(`Transfer not success`)),
      tap(_ => console.log('Transfered from ${fromAccountNumber} to ${toAccountNumber}'))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(error.error);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
