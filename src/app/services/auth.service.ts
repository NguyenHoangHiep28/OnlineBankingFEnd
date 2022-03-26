import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const AUTH_API = "https://localhost:44367/controller/authenticate";
const httpOntions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(phone: string , password: string): Observable<any> {
    return this.http.post(AUTH_API,{
      phone,
      password
    },httpOntions)
    .pipe(
      tap(_ => console.log('user login')),
      catchError(this.handleError<any>('login',[]))
    );
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


}
