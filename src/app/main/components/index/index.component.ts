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
  cartID: string | number | undefined;
  cart: Account | undefined;
  totalNumberCart: number = 0;

  //dieu
  eyes = {
    eyesOpen: 'fa fa-eye',
    eyesCLose: 'fa fa-eye-slash',
  };
  eyesDisplay = 'Show';
  valuePrice: any = '********';
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


//onInit//
  ngOnInit() {
    
    // chart
    this.circle = document.getElementById('myChart');
    const data = {
      labels: ['Total Card', 'Total Account'],
      datasets: [
        {
          label: '# of Votes',
          data: [1000, 9999],
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

    this.route.params.subscribe((params) => {
      console.log('params', !params);
      if (!params['id']) {
        const prs = sessionStorage.getItem('Account_Number');
        this.router.navigate([`/dashboard/${prs}`]);
      }
      this.cartID = params['id'];
    });
    this.getAccountListt();

//dieu
    const eyesElement = document.querySelector('#eyes');
    eyesElement?.addEventListener('click', () => {
      let listAccountPrice = document.querySelectorAll('.account-price');
      // thay đổi tất cả số thành *
      if (this.valuePrice.includes('*')) {
        for (let index = 0; index < listAccountPrice.length; index++) {
          let valueHTML = listAccountPrice[index].innerHTML;
          valueHTML = valueHTML.replace(valueHTML, '999,999');
          this.valuePrice = valueHTML;
          this.eyesDisplay = 'Unshow';
        }
        // đổi thẻ eyes
        eyesElement.setAttribute('class', this.eyes.eyesOpen);
      } else if (!this.valuePrice.includes('*')) {
        for (let index = 0; index < this.valuePrice.length; index++) {
          let element = this.valuePrice[index]; // lấy ra 1 phần tử của chuỗi
          //tìm kiếm trong chuỗi có phần từ nào khồn thì thay
          this.valuePrice = this.valuePrice.replace(element, '*');
          this.eyesDisplay = 'show';
        }
        eyesElement.setAttribute('class', this.eyes.eyesCLose);
      }
    });
    //dieu
  }



//cart + for my account
  findCart(data: Account[]) {
    data.forEach((item) => {
      this.totalNumberCart += item.balance;
    });
    const result = data.find((item) => item.accountNumber === this.cartID);
    this.cart = result;
  }
}

