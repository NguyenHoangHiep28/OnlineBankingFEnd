import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidPassword = '1'
  invalidPhone  = '1'
  errMessage = ''
  supMessage = ''

  constructor(private router: Router,
            private http: HttpClient,
            private jwtHelper: JwtHelperService) { }


  ngOnInit(): void {
    this.router.navigate(["/dashboard"]);
  }

  onLogin(loginForm: NgForm) {
    if(!loginForm.valid) {
      if(loginForm.controls['phone'].value) {
          this.invalidPassword = ''
      } 
       if (loginForm.controls['password'].value) {
        this.invalidPhone = ''
      }
    } 
      const credentials =  {
        'phone': loginForm.value.phone,
        'password': loginForm.value.password
      }
      this.http.post("https://localhost:44367/controller/authenticate", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }).subscribe((response : any) => {
      
        if(response.errors) {
          this.errMessage = response.errors
        if((response.errors.toString().includes('locked!'))) {
          this.supMessage ='Vui long lien he CSKH'
        }  
        
        } else {
        const token = response.token;
        localStorage.setItem("jwt", token);
        loginForm.resetForm() 
        this.router.navigate(["/dashboard"]);
      }
    });        
  }

}
