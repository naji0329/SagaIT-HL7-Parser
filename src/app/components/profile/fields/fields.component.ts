import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
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
  collectionSize = HL7Inspector.fields.length;
  lFields: any = HL7Inspector.fields ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.lFields = HL7Inspector.fields
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 

}
