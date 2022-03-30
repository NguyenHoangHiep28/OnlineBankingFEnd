import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../dashboard/default/default.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route:Router, private tokenStorage: TokenStorageService) { }
  userName = "User Name";

  logOut() {
    this.tokenStorage.signOut()
    this.route.navigate(["/"]);
  }
  ngOnInit(): void {

  }
}
