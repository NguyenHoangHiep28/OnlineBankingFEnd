import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { Account } from 'src/models/accounts/accounts';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['../../../dashboard/default/default.component.css','./transfer.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TransferComponent implements OnInit {
  constructor( public diaLog : MatDialog,
    private accountlistService: AccountListService,
    private tokenStorage : TokenStorageService,
      private transferService : TransferService,
  ) { }

    accounts :  Account []  = [];
    currentAccount = ''
  

    stateTransferValid = false ;

 

    reciverInfo = { 
      toAccountNumber : '', 
      name: '',
      content : '',
      amount : 0 ,
      fee : 10000
    }

    
    getAccountListt() : void {
    if(this.tokenStorage.getToken()){
      const userID = this.tokenStorage.getUser()
      const accountReq = {
        userId: userID
      }

     this.accountlistService.getAccountList(accountReq).subscribe( accounts => this.accounts = accounts)
  }
    }
    changeAccount(number : any) {
this.accountlistService.saveAccountNumberDisplay(number);
window.location.reload()
    }
  ngOnInit(): void {
    // Validate Form
    // get currentAccountNumber
    if(this.accountlistService.getAccountNumberDisplay()) {
      this.currentAccount = this.accountlistService.getAccountNumberDisplay()
    }
    this.getAccountListt()
  }
  openDiaLog ()  { 
    console.log(this.stateTransferValid)
    const acc_number = {
      accountNumber : this.currentAccount
    }

    this.transferService.sendTransactionOtp(acc_number).subscribe(res => console.log(res))


    const diaLogRef = this.diaLog.open(DialogContentComponent ,{
      data : { fromAccountNumber : this.currentAccount,
        toAccountNumber : this.reciverInfo.toAccountNumber , 
        amount : this.reciverInfo.amount ,
        content : this.reciverInfo.content,
        }
    });

    diaLogRef.afterClosed().subscribe (result => {
      if(result) {
        this.stateTransferValid = result
        const transferReq = {
          fromAccountNumber : this.currentAccount,
          toAccountNumber : this.reciverInfo.toAccountNumber.toString(),
          amount : this.reciverInfo.amount,
          content : this.reciverInfo.content,
          type : 1
        }
        console.log(transferReq)
        this.transferService.transferMoney(transferReq).subscribe( respone => {
          console.log('Transfer Successly')
        })
      }
    });
}

onInput(accountNumber: string) {
    if (accountNumber.length === 12) {
      const req =  {
        accountNumber : accountNumber
      }

      this.accountlistService.getMyAccount(req).subscribe(response => {
         this.reciverInfo.name =  response.userName

      },(error) => {
        this.reciverInfo.name = ''

      })
    }else {
      this.reciverInfo.name = ''
    }
}
onSubmit() : void {

}

@ViewChild('stepper',{read:MatStepper}) stepper:MatStepper | undefined;

transferAgain() {
  this.stateTransferValid = false;
  this.reciverInfo = {
    toAccountNumber :'',
    name  :'',
    content : '',
    amount : 0 , 
    fee : 10000
  }
  if(this.stepper) {
    this.stepper.reset()
  }
}

 
  }

