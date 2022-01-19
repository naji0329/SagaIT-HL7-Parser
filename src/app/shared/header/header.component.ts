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
  currentSession: any;
  sAboutModalTitle: string = "";

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
    this.oThemeService.sSelectedThemeValue.subscribe(res =>{
    this.selectedTheme = localStorage.getItem("selectedTheme")
    })
    if(this.selectedTheme === 'cyborg')
    {
      $(function() {
          $("body").addClass("cyborg-body");
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
    this.sAboutModalTitle ="Welcome to the HL7 Inspector Neo"
    this.currentSession = sessionStorage.getItem("currentSession")
    if(this.currentSession != '1')
    {
      $('#about').modal('show')
    }

  }
  ChangeModalTitle()
  {
    this.sAboutModalTitle = "HL7 Inspector Neo"
  }
  DismissModal()
  {
    sessionStorage.setItem("currentSession","1")
    
  }
  ExportAsJson()
  {
    let bSelectedProfile = localStorage.getItem('ProfileNumber');
    switch(bSelectedProfile) 
    { 
      case '1' : { 
        const data = HL7Inspector
        const fileName = HL7Inspector.meta.name
        const exportType = 'json'
        exportFromJSON({ data, fileName, exportType })
        // this.oProfileName = HL7Inspector.meta.name; 
         break; 
      } 
      case '2' : { 
        const data = HL7Inspector26
        const fileName = HL7Inspector26.meta.name
        const exportType = 'json'
        exportFromJSON({ data, fileName, exportType })
        // this.oProfileName = HL7Inspector26.meta.name; 
        break; 
      } 
      default: { 
        const data = HL7Inspector
        const fileName = HL7Inspector.meta.name
        const exportType = 'json'
        exportFromJSON({ data, fileName, exportType }) 
        break; 
      } 
    }
  }
  HeaderComponent_LoadProfileHL7Version2_5()
  {
    localStorage.setItem('ProfileNumber','1');
    this.oProfileName = HL7Inspector.meta.name; 
  }
  HeaderComponent_LoadProfileHL7Version2_6()
  {
    localStorage.setItem('ProfileNumber', '2')
    this.oProfileName = HL7Inspector26.meta.name; 
  }

}
