import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarOptions : any = ['item','item','item','item','item',]
  addActiveClass: any;
  constructor() { }

  ngOnInit(): void {
  }
  AddActiveClass(item:any){
    console.log("Item", item);
    this.addActiveClass = item
  }
 
}
