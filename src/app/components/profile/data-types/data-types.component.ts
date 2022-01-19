import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  fEditDataTypeForm : FormGroup;
  constructor(private oFormBuilder : FormBuilder) {
    this.refreshCountries();
   }

  ngOnInit(){
    this.DataTypesComponent_InitializeEditDataTypeForm()
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
  DataTypesComponent_InitializeEditDataTypeForm()
  {
    this.fEditDataTypeForm = this.oFormBuilder.group({
      datatype: '',
      index: '',
      indexDatatype: '',
      name: ''
    })
  }
  DataTypesComponent_PatchSelectedRowValues(data)
  {
    console.log("Selected Row Values ===>",data);
    this.fEditDataTypeForm.patchValue({
    datatype: data.dt.parent,
    index: data.dt.idx,
    indexDatatype: data.dt.datatype,
    name: data.dt.parentName
    })
  }

}
