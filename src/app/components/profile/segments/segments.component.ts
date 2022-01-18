import { Component, OnInit ,PipeTransform } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
declare var require: any;
const data: any = require('./segments.json');
@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})

export class SegmentsComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collectionSize = HL7Inspector.segments.length;
  lSegments: any = HL7Inspector.segments ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.lSegments = HL7Inspector.segments
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 
}