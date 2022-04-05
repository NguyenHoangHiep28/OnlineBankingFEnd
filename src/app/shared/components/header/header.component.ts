import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { windowToggle } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../dashboard/default/default.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: Router,
    private tokenStorage: TokenStorageService
  ) { }
  userName = 'User Name';
  // <span class="material-icons" >
  // keyboard_arrow_down
  // < /span>
  stringArrow = 'keyboard_arrow_down';
  // stringArrowUp = 'keyboard_arrow_down';
  logOut() {
    this.tokenStorage.signOut();
    this.route.navigate(['/']);
  }
  ngOnInit(): void {
    const listServiceElement = document.querySelectorAll('.dropdown-item');
    // let spanArrow = document.getElementById('settingService')?.textContent;
    // const listSideBar = document.querySelectorAll('.sidebar-item');
    // // listSideBar[2].addEventListener('click', () => {
    // //   this.stringArrow = 'keyboard_arrow_down';
    // // });
    for (let index = 0; index < listServiceElement.length; index++) {
      listServiceElement[index].addEventListener('click', (event) => {
        const currentActive = document.querySelector('.active-service');
        currentActive?.classList.remove('active-service');
        listServiceElement[index].classList.add('active-service');
        const showElement = document.querySelector('.dropdown-menu.show');
        window.addEventListener('click', () => {
          if (!showElement?.classList.contains('show')) {
            listServiceElement[index].classList.remove('active-service');
          }
        });
      });
    }
  }
}
