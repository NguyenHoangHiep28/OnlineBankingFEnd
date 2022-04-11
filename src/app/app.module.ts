import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import CarouselModule
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './dashboard/default/default.module';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './_helper/auth.interceptor';
export function tokenGetter () {
  const token = window.sessionStorage.getItem('auth-token')
 return  token
}
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    DefaultModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:4200"],
        disallowedRoutes : [],
        throwNoTokenError :true
      }
    }),
  ],
  providers: [authInterceptorProviders,],
  bootstrap: [AppComponent]
})
export class AppModule {}
