import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HistoryAccountService } from 'src/app/services/history-account.service';
import * as moment from 'moment';

const pdfMake = require('pdfmake/build/pdfmake.js');

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AccountListService } from 'src/app/services/account-list.service';
import { Router } from '@angular/router';
import { AuthGuardServiceService } from 'src/app/auth/auth-guard-service.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.css'],
})


export class ListHistoryComponent implements OnInit {
  currentAccount = ''
  //Declare pdf instance
  pdfMake: any;
  private readonly pdfFonts: any;

 numberTransitons : number [] = [5,10,15,20]
  p: number = 1 
  dataHistory: any;
  timeStart: Date | String | undefined;
  dataSub: any;
  myDate1: string= moment().format('YYYY-MM-DD');
  myDate2: string= moment().format('YYYY-MM-DD');

  
  constructor(private historyAccountService: HistoryAccountService,
              private AccountService : AccountListService,
              private route : Router,
              private authGuardService : AuthGuardServiceService) {
  }
  

  ngOnInit(): void {
    this.authGuardService.canActivate()
    if (this.AccountService.getAccountNumberDisplay()) {
      this.currentAccount = this.AccountService.getAccountNumberDisplay()
    }else {
      alert('You have to choose the account to continue')
      this.route.navigate(['dashboard/account-list'])
    }
    
    this.List();
  }

 async generatePDF() {  
    let docDefinition = {  

      
      content: [
        { 
          image: await this.getBase64ImageFromURL("../../../../assets/images/dashboard/index/logoMTBank.PNG") ,
          fit: [100, 100]
        } ,

       {
        text : 'List of transaction  history ',
        style  : 'SectionHeader'
       },
       {
         table :{
           headerRows : 1,

           width : ['*','*','*','*','*','*','**'],
           body : [
             [{ text: 'Code Transaction', style : 'header'},
             { text: 'Time', style : 'header'},
             { text: 'Amount', style : 'header'},
             { text: 'Balance', style : 'header'},
             { text: 'Partner AccNumber', style : 'header'},
             { text: 'Partner Name', style : 'header'},
             { text: 'Content', style : 'header'},
            ],
             ...this.dataHistory.map((element : any) => 

          
              ([element.id,moment(element.createdAt).format('YYYY-MM-DD HH:mm:ss'), element.changedAmount, element.myCurrentBalance,element.partnerAccountNumber,element.partnerName, element.content]))
           ] ,
          
         } ,
         styles : 'thTable'
       }
      ],
      defaultStyle: {
        fontSize: 9 ,
        alignment: 'center'
      } ,

      styles: {
        SectionHeader: {
          fontSize: 30 ,
          margin : [30,30,30,30],  
          alignment: 'center',
          color: '#42236a',      
        },
        header : {
          color: '#42236a',decoration: 'underline',fontSize : 12
        },


      }
    };  
    pdfMake.createPdf(docDefinition).open();  
  }  
  madePDF() {
      this.generatePDF()
  }
  
  getBase64ImageFromURL(url : any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
  
  onchangeTransition(numFilter : string) {
    const length : number = this.dataSub.length;
    this.p = 1
    if(+numFilter < length) {
      this.dataHistory = this.dataSub.slice(0,+numFilter)
    } else {
      this.dataHistory = this.dataSub
    }
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
}
