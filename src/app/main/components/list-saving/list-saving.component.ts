import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardServiceService } from 'src/app/auth/auth-guard-service.service';
import { AccountListService } from 'src/app/services/account-list.service';
import { SavingService } from 'src/app/services/saving.service';
import { ListSaving } from 'src/models/list-saving';
import * as moment from 'moment';

@Component({
  selector: 'app-list-saving',
  templateUrl: './list-saving.component.html',
  styleUrls: ['./list-saving.component.css']
})
export class ListSavingComponent implements OnInit {
  currentAccount = ''
  savings : ListSaving [] = []

  date = ''

  modalInfo = {
    amount : 0,
    period : '',
    type : '',
    interestRate : 0,
    expectAmount : 0,
    startDate : '',
    endDate : ''
  }

  constructor(private authGuardService: AuthGuardServiceService,
             private accountService : AccountListService,
             private route : Router,
             private savingService : SavingService) { }


  ngOnInit(): void {
    this.authGuardService.canActivate()
    this.getListSaving()
    console.log(this.savings)
  }
  showModel(id : number) {
    console.log(id);
    const closeModal = document.querySelector('#close-modal');
    const viewModal = document.querySelector('.modal-view-card-saving');
    viewModal?.classList.remove('show-modal');

      closeModal?.addEventListener('click', () => {
        viewModal?.classList.add('show-modal');
      });
    let modal !: ListSaving ;
      console.log(this.savings)
      this.savings.forEach(element => {
        if(element.id == id){
          modal = element;
        }
      });
     
      if(modal){
        const interest = modal.amount * (modal.interest/100) * (modal.duration /12)
        this.modalInfo = {
          amount : modal.amount,
          period : modal.packageName,
          type :  'Time Deposit',
          interestRate : modal.interest,
          expectAmount :modal.amount + interest,
          startDate : modal.startDate,
          endDate : modal.endDate
        }
      this.date = `Start :${moment(this.modalInfo.startDate).format('YYYY-MM-DD')} -End :${moment(this.modalInfo.endDate).format('YYYY-MM-DD')}`
      }
  } 
 
  getListSaving () : void  {
    if(this.accountService.getAccountNumberDisplay()) {
      this.currentAccount = this.accountService.getAccountNumberDisplay()
      const req = {
        accountNumber : this.currentAccount
      }
      this.savingService.getSavingList(req).subscribe(data  => {this.savings = data;
      })
    } else {
      alert('You have to choose the account to continue')
      this.route.navigate(['dashboard/account-list'])
    }
  }
  
  
}
