import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
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
  collectionSize = HL7Inspector.dataTypes.length;
  lDataTypes: any = HL7Inspector.dataTypes ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(){
    console.log("Data Types ==>>>",this.lDataTypes);
  }
  refreshCountries() {
    this.lDataTypes = HL7Inspector.dataTypes
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 

}
