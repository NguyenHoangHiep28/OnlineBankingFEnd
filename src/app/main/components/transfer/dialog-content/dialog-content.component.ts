import { Component,Inject, OnInit} from '@angular/core';
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
phoneNumber  = ''
verifyError : error = {isError : false}
verifyState = true

  constructor(@Inject(MAT_DIALOG_DATA)public data:any ,
              private transferSerivce : TransferService,
              private dialogRef :MatDialogRef<DialogContentComponent>,
              )  { }

  ngOnInit(): void {
   this.phoneNumber = JSON.parse(this.data.phoneNumber)
  }
  closeDialog() {
    this.dialogRef.close(this.verifyState)
  }

    verify(otpCode : string) {
    const verifyReq = {
      accountNumber : this.data.accountNumber,
      otp : otpCode
    }
   this.transferSerivce.verifyTransactionOTP(verifyReq).subscribe( response => {
      console.log('Verify success fully')
      this.closeDialog()
      alert('Verify success fully')

    }, (err) => {
      
       this.verifyError.isError = true
    })
    }
  }


