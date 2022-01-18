import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
  oProfileName : any;

    constructor(){
      console.log("Data",HL7Inspector)
    }

  ngOnInit() {
    this.oProfileName = HL7Inspector.meta.name; 
  }

}
