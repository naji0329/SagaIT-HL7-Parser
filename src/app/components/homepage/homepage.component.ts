import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  sAddOverlay: string = "";
  bDisplayToggleBtn : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  openNav()
  {
    (<HTMLInputElement>document.getElementById('sidebar')).style.width = '250px';
    (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "250px";
    this.sAddOverlay = "overlay";
    this.bDisplayToggleBtn = false;

  }
  closeNav()
  {
    (<HTMLInputElement>document.getElementById('sidebar')).style.width = '0';
    (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "0";
    this.sAddOverlay = "";
    this.bDisplayToggleBtn = true;
  }
}
