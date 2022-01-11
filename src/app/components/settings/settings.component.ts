import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
declare var $ : any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedTheme: any;
  lThemeOptions : any = [
    {name:"Default" , value:'default'},
    {name:"Cerulean" , value:'cerulean'},
    {name:"Cyborg" , value:'cyborg'},
    {name:"Cosmo" , value:'cosmo'},
    {name:"Slate" , value:'slate'},
    {name:"Yeti" , value:'yeti'},
  ]
  constructor(private oThemeService : ThemesService) { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem("selectedTheme") 
    // this.oThemeService.sSelectedThemeValue.subscribe(res =>{
    //   this.selectedTheme = res
    // })
  }
  ChangeTheme(event:any)
  {
    this.selectedTheme = event.target.value;
    // this.oThemeService.sSelectedThemeValue.next(this.selectedTheme)
    localStorage.setItem("selectedTheme" , this.selectedTheme)
    console.log("selected theme is :::>>",this.selectedTheme);
    this.oThemeService.sSelectedThemeValue.next(this.selectedTheme)
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

}
