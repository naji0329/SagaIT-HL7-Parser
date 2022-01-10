import { Component, OnInit } from '@angular/core';
declare var require: any;
const data: any = require('./data.json');
@Component({
  selector: 'app-data-types',
  templateUrl: './data-types.component.html',
  styleUrls: ['./data-types.component.scss']
})
export class DataTypesComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize = data.length;
  lDataTypes: any = data ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.lDataTypes = data
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 

}
