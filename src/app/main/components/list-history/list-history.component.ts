import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HistoryAccountService } from 'src/app/services/history-account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.css'],
})
export class ListHistoryComponent implements OnInit {
  dataHistory: any;
  timeStart: Date | String | undefined;
  dataSub: any;
  myDate1: string= moment().format('YYYY-MM-DD');
  myDate2: string= moment().format('YYYY-MM-DD');

  
  constructor(private historyAccountService: HistoryAccountService) {
  }

  ngOnInit(): void {
    this.List();
    
  }

  List(): void {
    this.historyAccountService
      .historyCart(sessionStorage.getItem('Account_Number')!)
      .subscribe((data) => {
        this.dataHistory = data;
        this.dataSub = data;
      });
  }

  onSubmit(getTime: NgForm) {
    this.dataHistory = this.dataSub;
    if (!getTime.valid) return;
    this.handleFindByDate(getTime.value.timeStart, getTime.value.timeEnd);
  }

  handleFindByDate(timeStart: string, timeEnd: string): void {
    this.dataHistory = this.dataHistory.filter((item: any) => {
      if (
        moment(timeStart) <= moment(item.createdAt.substring(0, 10)) &&
        moment(item.createdAt.substring(0, 10)) <= moment(timeEnd)
      ) {
        return item;
      }
    });
  }

  reset(): void {
    this.dataHistory = this.dataSub;
  }
}
