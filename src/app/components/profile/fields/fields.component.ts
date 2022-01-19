import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize;
  lFields: any;
  fEditFieldForm : FormGroup;
  constructor(private oFormBuilder : FormBuilder) {
    this.refreshCountries();
   }
  ngOnInit(){
    this.FieldsComponent_InitializeEditFieldForm()
    console.log("Data Types ==>>>",this.lFields);
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.collectionSize = HL7Inspector.fields.length;
        this.lFields = HL7Inspector.fields ; 
         break; 
      } 
      case '2' : { 
        this.collectionSize = HL7Inspector26.fields.length;
        this.lFields = HL7Inspector26.fields ; 
         break; 
      }
      default :  {
        this.collectionSize = HL7Inspector.fields.length;
        this.lFields = HL7Inspector.fields ; 
         break; 
      }
    }
  }
  refreshCountries() {
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.lFields = HL7Inspector.fields
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      } 
      case '2' : { 
        this.lFields = HL7Inspector26.fields
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
      default :  {
        this.lFields = HL7Inspector.fields
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
    }
  } 
  FieldsComponent_InitializeEditFieldForm()
  {
    this.fEditFieldForm = this.oFormBuilder.group({
      segment: '',
      sequence: '',
      name: ''
    })
  }
  FieldsComponent_PatchSelectedRowValues(field)
  {
   console.log("Selected row values ===> ",field);
   this.fEditFieldForm.patchValue({
     segment: field.item.seg,
     sequence: field.item.seq,
     name: field.item.name
   })
   
  }

}
