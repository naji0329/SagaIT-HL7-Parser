import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import exportFromJSON from 'export-from-json'
import * as HL7Inspector from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
import { ThemesService } from 'src/app/services/themes.service';
declare var $ : any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bDisplayImprintOption: boolean = true;
  bDisplayProfileOptions: boolean = true;
  selectedTheme: any = "";
  oProfileName : any;

  constructor(private  oRouter : Router , private oThemeService : ThemesService) 
  {
    if(this.oRouter.url === '/imprint')
    {
      this.bDisplayImprintOption = false
    }
    if(this.oRouter.url === '/profile' || this.oRouter.url === '/settings')
    {
     this.bDisplayProfileOptions = false
    }
  }

  ngOnInit(): void {
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
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
    // this.HeaderComponent_LoadProfileHL7Version2_5();
    // let bLoadProfile = 
    // {
    //   bSelectLoadProfile : true
    // }
    // localStorage.setItem('lSelectedLoadProfile', JSON.stringify(bLoadProfile));
    // this.oProfileName = HL7Inspector.meta.name; 
    this.oThemeService.sSelectedThemeValue.subscribe(res =>{
    this.selectedTheme = localStorage.getItem("selectedTheme")
    })
    if(this.selectedTheme === 'cyborg')
    {
      console.log("workingggggg");
      $(function() {
          $("body").addClass("cyborg-body");
          console.log("Class Should be Added")
        })
     const body = document.getElementsByTagName('body')[0]
     body.classList.add('cyborg-body')
    }
    else
    {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('cyborg-body')
    }
    if(this.selectedTheme === 'slate')
    {
      $(function() {
          $("body").addClass("slate-body");
        })
     const body = document.getElementsByTagName('body')[0]
     body.classList.add('slate-body')
    }
    else
    {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('slate-body')
    }
  }
  ExportAsJson()
  {
    const data = [{ foo: 'foo'}, { bar: 'bar' }]
    const fileName = 'download'
    const exportType = 'json'

    exportFromJSON({ data, fileName, exportType })
  }
  HeaderComponent_LoadProfileHL7Version2_5()
  {
    // let bLoadProfile = 
    // {
    //   bSelectLoadProfile : true
    // }
    localStorage.setItem('ProfileNumber','1');
    this.oProfileName = HL7Inspector.meta.name; 
  }
  HeaderComponent_LoadProfileHL7Version2_6()
  {
    // let bLoadProfile = 
    // {
    //   bSelectLoadProfile : false
    // }
    localStorage.setItem('ProfileNumber', '2')
    this.oProfileName = HL7Inspector26.meta.name; 
  }

}
