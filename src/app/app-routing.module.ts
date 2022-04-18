import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './dashboard/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { IndexComponent } from './main/components/index/index.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardServiceService } from './auth/auth-guard-service.service';
import { AccountlistComponent } from './main/components/accountlist/accountlist.component';
import { TransferComponent } from './main/components/transfer/transfer.component';
import { ReprotComponent } from './main/components/reprot/reprot.component';
import { ListHistoryComponent } from './main/components/list-history/list-history.component';
import { ListSavingComponent } from './main/components/list-saving/list-saving.component';
import { SavingComponent } from './main/components/saving/saving.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardServiceService],
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'saving',
        component: SavingComponent,
      },
      {
        path: 'account-list',
        component: AccountlistComponent,
      },
      {
        path: 'transfer',
        component: TransferComponent,
      },
      {
        path: 'list-history',
        component: ListHistoryComponent,
      },
      {
        path: 'list-saving',
        component: ListSavingComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
