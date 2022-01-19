import { Component, OnInit ,PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  fEditSegmentForm : FormGroup
  constructor(private oFormBuilder : FormBuilder) {
    this.refreshCountries();
   }

  ngOnInit(){
    this.SegmentsComponent_InitializeEditSegmentForm()
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
  SegmentsComponent_InitializeEditSegmentForm()
  {
    this.fEditSegmentForm = this.oFormBuilder.group({
      segment: '',
      name: ''
    })
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
  SegmentsComponent_PatchSelectedRowValues(segment)
  {
    console.log("Selected Row Values ==> ",segment);
    this.fEditSegmentForm.patchValue({
      segment: segment.seg.seg,
      name: segment.seg.name
    })
    
  }
}