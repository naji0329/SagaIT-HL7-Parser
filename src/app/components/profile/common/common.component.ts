import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
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
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    console.log("Incoming Boolean ==> ",bSelectedProfile);
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        this.oProfileName = HL7Inspector.meta.name; 
         break; 
      } 
      case '2' : { 
        this.oProfileName = HL7Inspector26.meta.name; 
         break; 
      } 
      default: { 
        this.oProfileName = HL7Inspector.meta.name; 
         break; 
      } 
    }
  }

}
