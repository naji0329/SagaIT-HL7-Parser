import { Component, OnInit } from '@angular/core';
interface Country {
  segment: string;
  name: string;
  }

const COUNTRIES: Country[] = [
  {
    segment: 'LRL',
    name: 'Location Relationship',
    
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  },
  {
    segment: 'LRL',
    name: 'Location Relationship',
  }
];
@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})

export class SegmentsComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries!: Country[];
  constructor() {
    this.refreshCountries();
   }

  ngOnInit(): void {
  }
  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}


