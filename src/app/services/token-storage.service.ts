import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY =  'auth-user';
const PHONENUMBER_key = 'auth_phonenumber'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut () : void {
    window.sessionStorage.clear();
  }
  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser (user: any ) :void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public savePhoneNumber (phoneNumber : any) : void  {
    window.sessionStorage.removeItem(PHONENUMBER_key);
    window.sessionStorage.setItem(PHONENUMBER_key, JSON.stringify(phoneNumber));
  }
  public getPhoneNumber () : any {
    const phoneNumber = window.sessionStorage.getItem(PHONENUMBER_key);
    if(phoneNumber) {
      return phoneNumber
    }
    return ''
  }
}
