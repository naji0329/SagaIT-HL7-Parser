import { Component, OnInit ,PipeTransform } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})

export class SegmentsComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize;
  lSegments: any;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(){
    console.log("Data Types ==>>>",this.lSegments);
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.collectionSize = HL7Inspector.segments.length;
        this.lSegments = HL7Inspector.segments ; 
         break; 
      } 
      case '2' : { 
        this.collectionSize = HL7Inspector26.segments.length;
        this.lSegments = HL7Inspector26.segments ; 
         break; 
      }
      default :  {
        this.collectionSize = HL7Inspector.segments.length;
        this.lSegments = HL7Inspector.segments ; 
         break; 
      }
    }
  }
  refreshCountries() {
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.lSegments = HL7Inspector.segments
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      } 
      case '2' : { 
        this.lSegments = HL7Inspector26.segments
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
      default :  {
        this.lSegments = HL7Inspector.segments
        .map((data:any, i:any) => ({id: i + 1, ...data}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
         break; 
      }
    }
  } 
}