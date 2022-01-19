import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import exportFromJSON from 'export-from-json'
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
    const data = [{ foo: 'foo'}, { bar: 'bar' }]
    const fileName = 'download'
    const exportType = 'json'

    exportFromJSON({ data, fileName, exportType })
  }

}
