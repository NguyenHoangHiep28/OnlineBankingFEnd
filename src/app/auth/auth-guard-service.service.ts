import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { relativeTimeRounding } from 'moment';
import { AccountListService } from '../services/account-list.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate  {

  constructor(private router : Router, private jwtHelper: JwtHelperService,
    private tokenStorage:TokenStorageService,
    private accountService :AccountListService) {
   }
   canActivate() {
    const token = this.tokenStorage.getToken();
      if(token && !this.jwtHelper.isTokenExpired(token)) {
          return true;
      } else {
          this.accountService.removeAccountNumberDisplay()
          this.router.navigate(['login']);
          return false
    }   }
}
