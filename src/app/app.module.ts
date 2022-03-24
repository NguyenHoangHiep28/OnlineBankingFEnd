import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './dashboard/default/default.module';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter () {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FormsModule,
    MainModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:4200"],
        disallowedRoutes : [],
        throwNoTokenError :true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
