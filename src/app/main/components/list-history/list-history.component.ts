import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.css'],
})
export class ListHistoryComponent implements OnInit {
  valuePrice: any = 9999999;
  constructor() {
    this.valuePrice = this.valuePrice
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }
  circle: any;
  // vẽ hình tròn
  ngOnInit(): void {
    this.circle = document.getElementById('myChart');
    const data = {
      // labels: ['Total Balance'],
      datasets: [
        {
          label: '# of Votes',
          data: [9999],
          borderWidth: 1,
          backgroundColor: ['#7b35bb'],

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
