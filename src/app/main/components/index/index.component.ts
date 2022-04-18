import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Account } from 'src/models/accounts/accounts';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Chart } from 'chart.js';
import { SavingService } from 'src/app/services/saving.service';
import { SavingPackages } from 'src/models/accounts/saving-package';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  savingPackages : SavingPackages[] = []
  depositCaclute = {
    amount : 0,
    predictProfit : 0,
  }

  myAccount = {
    currentAccount: '',
    balance: 0,
    userName: '',
    totalNumberCart: 0,
    savingTotalBalance : 0,
    savingBooksCount : 0
  };
  valuePrice = '**********';

  eyes = {
    eyesOpen: 'fa fa-eye',
    eyesCLose: 'fa fa-eye-slash',
  };
  eyesDisplay = 'Show';

  circle: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountlistService: AccountListService,
    private tokenStorage: TokenStorageService , 
    private savingService : SavingService
  ) {}
  getSavingPackages() : void {
    this.savingService.getSavingPackages().subscribe(respone => {
      this.savingPackages = respone
    })
  }
caculateDeposit(savingID : any) {
    if(Number(savingID)> 0){
      let saving !: SavingPackages ;
 
      this.savingPackages.forEach(element => {
        if(element.id == Number(savingID)){
          saving = element;
        }
      });
      if(this.depositCaclute.amount >= 1000000) {
        const interest = this.depositCaclute.amount * (saving.interest/100) * (saving.duration /12)
        this.depositCaclute.predictProfit = Math.round(this.depositCaclute.amount + interest)
      }else {
        alert('Deposit amount must be from 1,000,000 upwards')
        this.depositCaclute = {
          amount : 0,
          predictProfit : 0,
        }
      }

    }else {
      alert('You are not choose a tern')
     this.depositCaclute = {
        amount : 0,
        predictProfit : 0,
      }
    }
}
  getAccountListt(): void {
    if (this.tokenStorage.getToken()) {
      const userID = this.tokenStorage.getUser();
      const accountReq = {
        userId: userID,
      };
      this.accountlistService
        .getAccountList(accountReq)
        .subscribe((accounts) => this.findCart(accounts));
        const getSavingReq = {
          userID : userID,
          accountNumber : this.myAccount.currentAccount
        }

        this.accountlistService.getMyDashboard(getSavingReq).subscribe((respone : any) => {
          this.myAccount.savingTotalBalance = respone.savingTotalBalance
          this.myAccount.savingBooksCount = respone.savingBooksCount
        })
    }

  }
  getMyAccount(): void {
    if (this.accountlistService.getAccountNumberDisplay()) {
      this.myAccount.currentAccount =
        this.accountlistService.getAccountNumberDisplay();
      const req = {
        accountNumber: this.myAccount.currentAccount,
      };
      this.accountlistService.getMyAccount(req).subscribe((data) => {
        this.myAccount.balance = data.balance;
        this.myAccount.userName = data.userName;
        this.getChart(this.myAccount.balance, this.myAccount.totalNumberCart);
      });
    } else {
      alert('You have to choose the account to continue')
      this.router.navigate(['dashboard/account-list'])
    }
    }


  ngOnInit() {
    this.getMyAccount();
    this.getAccountListt();
    this.getSavingPackages()

    const eyesElement = document.querySelector('#eyes');
    eyesElement?.addEventListener('click', () => {
      let listAccountPrice = document.querySelectorAll('.account-price');

      if (this.valuePrice.includes('*')) {
        for (let index = 0; index < listAccountPrice.length; index++) {

          switch (index) {
            case 0:
              listAccountPrice[index].innerHTML = this.myAccount.totalNumberCart
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
              break;
            case 1:
              listAccountPrice[index].innerHTML = this.myAccount.balance
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
              break;
            case 2:
              console.log(this.myAccount.savingTotalBalance)
              listAccountPrice[index].innerHTML = this.myAccount.savingTotalBalance
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
              break;
          }
          this.valuePrice = 'showing';
          this.eyesDisplay = 'Unshow';
        }

        eyesElement.setAttribute('class', this.eyes.eyesOpen);
      } else if (!this.valuePrice.includes('*')) {
        for (let index = 0; index < listAccountPrice.length; index++) {
          let element = listAccountPrice[index]; 
          let hiddenString = '';
          for (let i = 0; i < element.innerHTML.length; i++) {
            hiddenString += '*';
          }
          element.innerHTML = hiddenString;
          this.eyesDisplay = 'show';
        }
        this.valuePrice = '*';
        eyesElement.setAttribute('class', this.eyes.eyesCLose);
      }
    });
   

  }

  getChart(myBalance: number, total: number) {

    this.circle = document.getElementById('myChart');


    const data = {
      labels: ['This Account Balance', 'Other Accounts Balance'],
      datasets: [
        {
          label: '# of Votes',
          data: [myBalance, total - myBalance],
          borderWidth: 1,
          backgroundColor: ['rgba(254, 153, 1)', '#7b35bb'],
          hoverOffset: 4,

        },
      ],
    };
    const config: any = {
      type: 'pie',
      data: data,

      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        layout: {

        },
      },
    };
    const myChart = new Chart(this.circle, config);
  }


  findCart(data: Account[]) {
    data.forEach((item) => {
      this.myAccount.totalNumberCart += item.balance;
    });
    console.log(this.myAccount.totalNumberCart);
  }
}
