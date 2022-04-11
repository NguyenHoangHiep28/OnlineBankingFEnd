import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    // set class active
    // lấy ra class list
    const listSideBarElement = document.querySelectorAll('.sidebar-item');

    // console.log(currentAcctive);
    for (let index = 0; index < listSideBarElement.length; index++) {
      listSideBarElement[index].addEventListener('click', (event) => {
        let currentAcctive = document.querySelector(
          '.sidebar-item.active-control'
        );
        currentAcctive?.classList.remove('active-control');
        listSideBarElement[index].classList.add('active-control');
      });
      if (index == 2) {
        listSideBarElement[index].classList.remove('active-control');
        break;
      }
    }
  }
}
