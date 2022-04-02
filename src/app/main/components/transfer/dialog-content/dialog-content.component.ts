import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferService } from 'src/app/services/transfer.service';
 interface error  {
  isError : boolean
}
@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

verifyError : error = {isError : false}
verifyState = true

  constructor(@Inject(MAT_DIALOG_DATA)public data:any , 
              private transferSerivce : TransferService,
              private dialogRef :MatDialogRef<DialogContentComponent>
              )  { }

  ngOnInit(): void {

  }
  closeDialog() {
    this.dialogRef.close(this.verifyState)
  }
  
    verify(otpCode : string) {
    const verifyReq = {
      accountNumber : this.data.fromAccountNumber,
      otp : otpCode
    }
   this.transferSerivce.verifyTransactionOTP(verifyReq).subscribe( response => {
    this.closeDialog()
      console.log('Verify success fully')
      alert('Verify success fully')
      }, (err) => {
       this.verifyError.isError = true
    })
    }
  }


