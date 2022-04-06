import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TransferService } from 'src/app/services/transfer.service';
// import { Account } from 'src/models/accounts/accounts';
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
      private route : Router
  ) { }
  stateTransferValid = false;
  amounInputInvalid = false
  ngOnInit(): void {
    // Validate Form
    // get currentAccountNumber
    if(this.accountlistService.getAccountNumberDisplay()) {
      const  req =  {
        accountNumber : this.accountlistService.getAccountNumberDisplay()
      }

        this.accountlistService.getMyAccount(req).subscribe(respone => {
          this.senderInfo.currentAccount =respone.accountNumber
          this.senderInfo.senderName = respone.userName
          this.senderInfo.balance = respone.balance
          this.reciverInfo.content = this.senderInfo.senderName.concat(' transfer money')
        })
    } else {
      alert('You have to choose the account to continue')
      this.route.navigate(['dashboard/account-list'])
    }
  }


  transferInfo = {
    transactionId : '',
    transferTime : ''
  }
    senderInfo  = {
      currentAccount : '',
      senderName : '' ,
      balance : 0
    }
    reciverInfo = {
      toAccountNumber : '',
      name: '',
      content : '',
      amount : 0 ,
      fee : 10000
    }
  @ViewChild('textContent',{read:HTMLTextAreaElement})  textContent!: HTMLTextAreaElement;


  openDiaLog ()  {
    console.log(this.stateTransferValid)
    const acc_number = {
      accountNumber : this.senderInfo.currentAccount
    }

    this.transferService.sendTransactionOtp(acc_number).subscribe(res => console.log(res))


    const diaLogRef = this.diaLog.open(DialogContentComponent ,{
      data : { fromAccountNumber : this.senderInfo.currentAccount,
        toAccountNumber : this.reciverInfo.toAccountNumber ,
        amount : this.reciverInfo.amount ,
        content : this.reciverInfo.content,
        }
    });

    diaLogRef.afterClosed().subscribe (result => {
      if(result) {
        this.stateTransferValid = result
        const transferReq = {
          fromAccountNumber : this.senderInfo.currentAccount,
          toAccountNumber : this.reciverInfo.toAccountNumber.toString(),
          amount : this.reciverInfo.amount,
          content : this.reciverInfo.content,
          type : 1
        }
        console.log(transferReq)
        this.transferService.transferMoney(transferReq).subscribe( (respone:any) => {
          this.transferInfo.transactionId = respone.transactionId
          this.transferInfo.transferTime = respone.transferTime
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

onAmountInput(amount : number) {
  if(amount > this.senderInfo.balance) {
    this.amounInputInvalid = true
  }else{
      this.amounInputInvalid = false
  }
  if(amount < 10000){
    this.amounInputInvalid = false
  }
}
onContentInput(txt : string) {
  this.reciverInfo.content = txt
  console.log(this.reciverInfo)
  console.log(txt)
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

