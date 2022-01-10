import { Component, OnInit } from '@angular/core';
declare var require: any;
const data: any = require('./fields.json');
@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize = data.length;
  lFields: any = data ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.lFields = data
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 

}
