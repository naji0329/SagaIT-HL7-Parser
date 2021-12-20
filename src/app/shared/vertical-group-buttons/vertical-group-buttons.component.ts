import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-group-buttons',
  templateUrl: './vertical-group-buttons.component.html',
  styleUrls: ['./vertical-group-buttons.component.scss']
})
export class VerticalGroupButtonsComponent implements OnInit {
  bDisplayAlert: boolean = false;
  sText: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  CopyToClipBoard()
  {
    this.bDisplayAlert = true
    this.sText = "Successful copied to clipboard"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }
  Compared()
  {
    this.bDisplayAlert = true
    this.sText = "Successful Compared. See the results in compare tab"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }

}
