import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../services/token-storage.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
    nav: false
  }
}
