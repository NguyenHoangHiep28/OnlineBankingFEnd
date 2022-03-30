import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingComponent } from './components/saving/saving.component';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { MainComponent } from './main.component';
import { AccountlistComponent } from './components/accountlist/accountlist.component';

@NgModule({
  declarations: [
    SavingComponent,
    TransferComponent,
    MainComponent,
    IndexComponent,
    UserinfoComponent,
    AccountlistComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SavingComponent,
    TransferComponent,
    MainComponent,
    IndexComponent,
    TransferComponent,
  ],
})
export class MainModule {}
