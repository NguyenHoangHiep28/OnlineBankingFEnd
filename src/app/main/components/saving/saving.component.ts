import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardServiceService } from 'src/app/auth/auth-guard-service.service';
import { AccountListService } from 'src/app/services/account-list.service';
import { SavingService } from 'src/app/services/saving.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { SavingPackages } from 'src/models/accounts/saving-package';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.css']
})
export class SavingComponent implements OnInit {
  
isChecked = false
isVerify = false
date : number = 60
savingPackages : SavingPackages[] = []
myDepositAccount   = {
  accountNumber: '' ,
  balance : 0 ,
  userName : '' ,
  createdAt : '' ,
  active : 1
}

  constructor(private tokenStorage : TokenStorageService,
              private accountlistService : AccountListService,
              private savingService : SavingService ,
              private router : Router ,
              private transferService : TransferService,
              private authGuardService : AuthGuardServiceService) { }

getSavingPackages() : void {
  this.savingService.getSavingPackages().subscribe(respone => {
    this.savingPackages = respone
    console.log(this.savingPackages)
  })
}
getMyAccount () : void {
  
}
  ngOnInit(): void {
    this.authGuardService.canActivate()    
    if (this.accountlistService.getAccountNumberDisplay()) {
      const req = {
      accountNumber : this.accountlistService.getAccountNumberDisplay()
        }
      this.accountlistService.getMyAccount(req).subscribe( (data) => {
        this.myDepositAccount.accountNumber = data.accountNumber
        this.myDepositAccount.balance = data.balance
      })
  }else {
      alert('You have to choose the account to continue')
      this.router.navigate(['dashboard/account-list'])
  }

    this.getSavingPackages()
    document.querySelector('#btn-sendOTP')?.addEventListener('click', () => {
      //hàm xử lí otp
      this.sendOTP()
      let start = setInterval(() => {
          this.date = this.timer();
          if (this.date == 0) {
              this.stopInterval(start);
              this.date = 60;
          }
      }, 1000);
      (<HTMLInputElement> document.querySelector('#btn-sendOTP')).disabled = true;
});
  }
  // clear() : void {
  //   clearInterval(this.myInterval)
  // }

stopInterval(interval : any) {
  clearInterval(interval)
}
  timer() {
    --this.date
    let element = document.getElementById('time') as HTMLElement

    element.style.display ='inline-block'
    element.innerHTML = '(' +  this.date.toString() + ')'
  // console.log(date);
  if (this.date == 0) {
      (<HTMLInputElement> document.querySelector('#btn-sendOTP')).disabled = false
      element.style.display = 'none'
  }
  return this.date;
}
  sendOTP () {
    const phoneNumber = this.tokenStorage.getPhoneNumber()
    const req = {
      accountNumber : this.myDepositAccount.accountNumber ,
      phoneNumber : phoneNumber
    }
    this.transferService.sendTransactionOtp(req).subscribe(respone => {
      alert('OTP is send to your phone successfully')
    },(err : any) => {
      alert(JSON.stringify(err))
    })
  }

  onCreateSaving(savingForm : NgForm) : void {
    
    const packageID = Number(savingForm.controls['listPackage'].value)
    const amount = Number(savingForm.controls['userInputAmount'].value)
    const otp = savingForm.controls['userInputOTP'].value
    const verifyOTPreq = {
      accountNumber : this.myDepositAccount.accountNumber,
      otp : otp
    }
    this.transferService.verifyTransactionOTP(verifyOTPreq).subscribe( () => {
      const createSavingReq = {
        accountNumber : this.myDepositAccount.accountNumber,
        packageId : packageID,
        amount : amount
      }
      this.savingService.CreateSavingBook(createSavingReq).subscribe(()=> {
        alert('Create SavingBook succeeslly!')
        this.router.navigate(['dashboard/list-saving'])
        this.date = 60
      })
    },(error : any) => {
      this.isVerify = true
    })
  }
}
