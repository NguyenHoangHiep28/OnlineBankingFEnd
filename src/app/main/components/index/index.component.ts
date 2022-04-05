import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Account } from 'src/models/accounts/accounts';
import { AccountListService } from 'src/app/services/account-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  // LUAT
  // cartID: string | number | undefined;
  // cart: Account | undefined;

  myAccount = {
    currentAccount: '',
    balance: 0,
    userName: '',
    totalNumberCart: 0,
  };
  valuePrice = '**********';
  //dieu
  eyes = {
    eyesOpen: 'fa fa-eye',
    eyesCLose: 'fa fa-eye-slash',
  };
  eyesDisplay = 'Show';

  circle: any;
  //diru

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountlistService: AccountListService,
    private tokenStorage: TokenStorageService
  ) {}

  //  getlist
  getAccountListt(): void {
    if (this.tokenStorage.getToken()) {
      const userID = this.tokenStorage.getUser();
      const accountReq = {
        userId: userID,
      };
      this.accountlistService
        .getAccountList(accountReq)
        .subscribe((accounts) => this.findCart(accounts));
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
        // console.log(this.myAccount.balance);
        this.myAccount.userName = data.userName;
        // console.log(this.myAccount.userName);
        // this.getChart(this.myAccount.balance, this.myAccount.totalNumberCart);
      });
    }
  }

  //onInit//
  ngOnInit() {
    this.getAccountListt();
    this.getMyAccount();
    // console.log(this.myAccount.balance);

    //dieu
    const eyesElement = document.querySelector('#eyes');
    eyesElement?.addEventListener('click', () => {
      let listAccountPrice = document.querySelectorAll('.account-price');
      // thay đổi tất cả số thành *
      if (this.valuePrice.includes('*')) {
        for (let index = 0; index < listAccountPrice.length; index++) {
          // let valueHTML = listAccountPrice[index].innerHTML;
          // console.log(this.myAccount.totalNumberCart.toString());
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
              listAccountPrice[index].innerHTML = '0';
              break;
          }
          this.valuePrice = 'showing';
          this.eyesDisplay = 'Unshow';
        }
        // đổi thẻ eyes
        eyesElement.setAttribute('class', this.eyes.eyesOpen);
      } else if (!this.valuePrice.includes('*')) {
        for (let index = 0; index < listAccountPrice.length; index++) {
          let element = listAccountPrice[index]; // lấy ra 1 phần tử của chuỗi
          //tìm kiếm trong chuỗi có phần từ nào khồn thì thay
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
    //dieu
    this.getChart(1000,9999);
  }

  getChart(myBalance: number, total: number) {
    // chart
    this.circle = document.getElementById('myChart');

    // console.log(myBalance);
    const data = {
      labels: ['Total Card', 'Total Account'],
      datasets: [
        {
          label: '# of Votes',
          data: [myBalance, total],
          borderWidth: 1,
          backgroundColor: ['rgba(254, 153, 1)', '#7b35bb'],
          hoverOffset: 4,
          // pointHoverBackgroundColor: 'red',
        },
      ],
    };
    const config: any = {
      type: 'pie',
      data: data,
      //config
      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        layout: {
          // padding: 20,
        },
      },
    };
    const myChart = new Chart(this.circle, config);
  }

  //cart + for my account
  findCart(data: Account[]) {
    data.forEach((item) => {
      this.myAccount.totalNumberCart += item.balance;
    });
    // console.log(this.myAccount.totalNumberCart);
  }
}
