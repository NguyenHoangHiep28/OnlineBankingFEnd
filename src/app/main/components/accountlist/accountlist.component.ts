import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Account } from 'src/models/accounts/accounts';
import { DialogLockedComponent } from './dialog-locked.component';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {

  constructor(private accountlistService: AccountListService , private tokenStorage : TokenStorageService , private router : Router
    ,public diaLog : MatDialog)  { }

  accounts :  Account []  = []
  currentAccount = ''

   getAccountListt() : void {
    if(this.tokenStorage.getToken()){

      const userID = this.tokenStorage.getUser()
      const accountReq = {
        userId: userID
      }
     this.accountlistService.getAccountList(accountReq).subscribe( accounts => this.accounts = accounts)
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
  ngOnInit(): void {

    if(this.accountlistService.getAccountNumberDisplay()) {
      this.currentAccount = this.accountlistService.getAccountNumberDisplay()
    }

    this.getAccountListt()
  }
}
