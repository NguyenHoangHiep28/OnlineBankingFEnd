import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountListService } from 'src/app/services/account-list.service';

@Component({
  selector: 'app-dialog-locked',
  templateUrl: './dialog-locked.component.html',
  styleUrls: ['./dialog-locked.component.css']
})
export class DialogLockedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private accountService : AccountListService,
  private dialogRef : MatDialogRef<DialogLockedComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(islocked : boolean) {
    this.dialogRef.close(islocked)
  }


  onConfirm() {
    if(this.data.acc_number){
      const req = {
        accountNumber : this.data.acc_number
      }
      this.accountService.lockAccount(req).subscribe(respone => {
          console.log(respone)
          alert('The account is   locked successly')
          this.closeDialog(true)
      })
    }

  }
  onNotConfirm() {
    this.closeDialog(false)
  }

}
