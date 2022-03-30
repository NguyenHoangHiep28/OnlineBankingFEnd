import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private tokenStorage: TokenStorageService , private jwtHelper: JwtHelperService) { }

  isLoggin = false 

  ngOnInit(): void {
    
    const token = this.tokenStorage.getToken()
    if(token && this.jwtHelper.isTokenExpired(token)) {
        this.isLoggin = true    
    }
  }
}
