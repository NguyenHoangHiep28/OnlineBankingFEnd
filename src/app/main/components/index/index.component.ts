import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  eyes = {
    eyesOpen: 'fa fa-eye',
    eyesCLose: 'fa fa-eye-slash',
  };
  eyesDisplay = 'Show';
  valuePrice: any = 9999999;
  circle: any;
  constructor() {
    //format mặc định của price
    this.valuePrice = this.valuePrice
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  ngOnInit(): void {
    //unshowPrice
    const unShowPrice = () => {
      // get list element tag contains valuePrice
      let newValuePrice = this.valuePrice;
      const listAccountPrice = document.querySelectorAll('.account-price');
      for (let index = 0; index < newValuePrice.length; index++) {
        let element = newValuePrice[index]; // lấy ra 1 thành phần của mảng listAccountPrice
        newValuePrice = newValuePrice.toString().replace(element, '*');
      }
      for (let index = 0; index < listAccountPrice.length; index++) {
        listAccountPrice[index].innerHTML = newValuePrice;
      }
      const eyesElement = document.querySelector('#eyes');
      this.eyesDisplay = 'Show';
      eyesElement?.setAttribute('class', this.eyes.eyesCLose);
    };
    const showPrice = () => {
      const listAccountPrice = document.querySelectorAll('.account-price');
      for (let index = 0; index < listAccountPrice.length; index++) {
        listAccountPrice[index].innerHTML = this.valuePrice;
      }
      this.eyesDisplay = 'Unshow';
      eyesElement?.setAttribute('class', this.eyes.eyesOpen);
    };
    unShowPrice();
    const eyesElement = document.querySelector('#eyes');
    eyesElement?.addEventListener('click', (e) => {
      const listAccountPrice = document.querySelectorAll('.account-price');
      if (!listAccountPrice[0].innerHTML.toString().includes('*')) {
        unShowPrice();
      } else {
        showPrice();
      }
      e.stopPropagation();
    });

    //vẽ hình tròn
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
  }
}
