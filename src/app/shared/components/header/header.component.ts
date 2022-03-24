import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../dashboard/default/default.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route:Router) { }

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if(token) {
      return true;
    }
    else {
      return false;
    }
  }
  
  logOut() {
    localStorage.removeItem("jwt")
    this.route.navigate(["/"]);   
  }
  ngOnInit(): void {
    
  }
}
