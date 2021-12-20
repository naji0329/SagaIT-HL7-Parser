import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openNav()
  {
     
     (<HTMLInputElement>document.getElementById('sidebar')).style.width = '250px';
     (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "250px";

  }
  closeNav()
  {
    (<HTMLInputElement>document.getElementById('sidebar')).style.width = '0';
    (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "0";
  }
}
