import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {
  selectedTheme: any ="";

  constructor() { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('selectedTheme')
  }

}
