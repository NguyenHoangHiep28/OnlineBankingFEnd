import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import CarouselModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
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
  const token = window.sessionStorage.getItem('auth-token')
 return  token
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
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
