import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // sidebarOptions : any = ['ADT^A08 with UTF8 Sample','ADT^A01 Sample','ORU^R01 with PDF Sample','ADT^A02 Sample','MDM^T02 with JPG Sample',]
  addActiveClass: any;
  selectedTheme: any = "";
  constructor() { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('selectedTheme')
  }
  AddActiveClass(item:any){
    console.log("Item", item);
    this.addActiveClass = item
  }
 
}
