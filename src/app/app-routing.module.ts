import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './dashboard/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { UserinfoComponent } from './main/components/userinfo/userinfo.component';
import { IndexComponent } from './main/components/index/index.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardServiceService } from './auth/auth-guard-service.service';
import { AccountlistComponent } from './main/components/accountlist/accountlist.component';

const routes: Routes = [{
  path : '',
  component : HomeComponent
},{
  path :'dashboard',
  component : DefaultComponent, canActivate : [AuthGuardServiceService] ,
  children : [{
    path: '',
    component: IndexComponent
  },{
    path :'profile',
    component : UserinfoComponent
  }, {
    path : 'account-list',
    component : AccountlistComponent
  }]
},
  {
    path : 'login',
    component: LoginComponent
  }]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
