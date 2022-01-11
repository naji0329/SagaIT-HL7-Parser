import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedTheme: any = "";

  constructor() { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem("selectedTheme")
  }

}
