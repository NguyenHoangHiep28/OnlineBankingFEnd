import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errMessage ?= ''
  supMessage = '';
  constructor(private router: Router,
            private authSerice : AuthService,
            private tokenStorage : TokenStorageService) { }
  ngOnInit(): void {

    this.router.navigate(["/dashboard"]);
  }

  onLogin(loginForm: NgForm) : void {
    this.authSerice.login(loginForm.value.phone, loginForm.value.password).subscribe(
      (data : any) => {
        const logginModalElement = document.getElementById('loginModal');
        
        
        if(data.errors){
          this.errMessage = JSON.stringify(data.errors)       
          console.log(this.errMessage)
          if((this.errMessage).includes('locked!')){
            this.supMessage = 'Please contact support center'
          }  
          if (logginModalElement) {
          
            var myModal = new bootstrap.Modal( logginModalElement, {keyboard : false})
            myModal.show();
          }                    
        } else { 
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data.id);
          this.tokenStorage.savePhoneNumber(data.phone)
          this.router.navigate(["/dashboard/account-list"]);
        }
      }
    );

  }

}
