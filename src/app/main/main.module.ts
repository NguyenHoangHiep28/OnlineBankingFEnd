import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingComponent } from './components/saving/saving.component';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { MainComponent } from './main.component';
import { AccountlistComponent } from './components/accountlist/accountlist.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReprotComponent } from './components/reprot/reprot.component';
@NgModule({
  declarations: [
    SavingComponent,
    TransferComponent,
    MainComponent,
    IndexComponent,
    UserinfoComponent,
    AccountlistComponent,
    ReprotComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule, 
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule
  ],
  exports : [
    SavingComponent,
    TransferComponent,
    MainComponent,
    IndexComponent,
    TransferComponent
  ],
  providers : [
   
  ]
})
export class MainModule {}
