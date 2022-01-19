import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';

@Component({
  selector: 'app-data-types',
  templateUrl: './data-types.component.html',
  styleUrls: ['./data-types.component.scss']
})
export class DataTypesComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize;
  lDataTypes: any;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(){
    console.log("Data Types ==>>>",this.lDataTypes);
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.collectionSize = HL7Inspector.dataTypes.length;
        this.lDataTypes = HL7Inspector.dataTypes ; 
         break; 
      } 
      case '2' : { 
        this.collectionSize = HL7Inspector26.dataTypes.length;
        this.lDataTypes = HL7Inspector26.dataTypes ; 
         break; 
      }
      default :  {
        this.collectionSize = HL7Inspector.dataTypes.length;
        this.lDataTypes = HL7Inspector.dataTypes ; 
         break; 
      }
    }
  }
  refreshCountries() {
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.lDataTypes = HL7Inspector.dataTypes
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      } 
      case '2' : { 
        this.lDataTypes = HL7Inspector26.dataTypes
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
      default :  {
        this.lDataTypes = HL7Inspector.dataTypes
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
    }
  } 

}
