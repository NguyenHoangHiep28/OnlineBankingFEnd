import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Account } from 'src/models/accounts/accounts';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {

  constructor(private accountlistService: AccountListService , private tokenStorage : TokenStorageService , private router : Router ) { }

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
  ngOnInit(): void {

    if(this.accountlistService.getAccountNumberDisplay()) {
      this.currentAccount = this.accountlistService.getAccountNumberDisplay()
    }

    this.getAccountListt()
  }
}
