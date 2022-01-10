import { Component, OnInit ,PipeTransform } from '@angular/core';
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
  collectionSize = data.length;
  lSegments: any = data ;
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.lSegments = data
      .map((data:any, i:any) => ({id: i + 1, ...data}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 
}