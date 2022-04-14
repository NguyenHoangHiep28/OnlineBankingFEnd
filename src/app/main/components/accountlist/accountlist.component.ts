import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Account } from 'src/models/accounts/accounts';
import { DialogLockedComponent } from './dialog-locked.component';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class AccountlistComponent implements OnInit {

  constructor(private accountlistService: AccountListService , private tokenStorage : TokenStorageService , private router : Router
    ,public diaLog : MatDialog , private jwtService: JwtHelperService)  { }

  accounts :  Account []  = []
  currentAccount = ''

   getAccountListt() : void {
     const token = this.tokenStorage.getToken()
    if( token && !this.jwtService.isTokenExpired()){
      const userID = this.tokenStorage.getUser()
      const accountReq = {
        userId: userID
      }
     this.accountlistService.getAccountList(accountReq).subscribe( accounts => this.accounts = accounts)
    } else {
        this.accountlistService.removeAccountNumberDisplay()
        this.router.navigate(['login']);
          }
  }

onSelect (acc_number : string) : void {
      this.accountlistService.saveAccountNumberDisplay(acc_number)
      this.router.navigate(["/dashboard"])
}
onLock (acc_number : string) : void {
  const diaLogRef =  this.diaLog.open(DialogLockedComponent, 
    {
      width : '540px' , 
      height : '150px',
      data : {
        acc_number : acc_number
      }
    },)
    diaLogRef.afterClosed().subscribe(result => {
      if(result) {
        window.location.reload()
      }
    })
}
onUnLocked(acc_number : string) : void {
  const req = {
    accountNumber : acc_number
  }
  this.accountlistService.unlockAccount(req).subscribe(respone => {
    console.log(respone)
    alert('This account has been unlocked')
    window.location.reload()
  })
}

  ngOnInit(): void {
    this.getAccountListt()
    if(this.accountlistService.getAccountNumberDisplay()) {
      this.currentAccount = this.accountlistService.getAccountNumberDisplay()
    }
  }
}
