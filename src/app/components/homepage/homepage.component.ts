import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  sAddOverlay: string = "";
  bDisplayToggleBtn : boolean = true;
  addActiveClassToEditorTab: string ="";
  removeActiveClassFromOtherTabs: string = "";
  selectedTheme: any = "";
  constructor(private oThemeService : ThemesService) { }

  ngOnInit(): void {
    this.openNav()
    this.oThemeService.sSelectedThemeValue.subscribe(res =>{
      this.selectedTheme =res;
      this.selectedTheme = localStorage.getItem("selectedTheme")
    })
  }
  openNav()
  {
    (<HTMLInputElement>document.getElementById('sidebar')).style.width = '410px';
    (<HTMLInputElement>document.getElementById("main")).style.marginRight = "410px";
    this.sAddOverlay = "overlay";
    this.bDisplayToggleBtn = false;

  }
  closeNav()
  {
    (<HTMLInputElement>document.getElementById('sidebar')).style.width = '0';
    (<HTMLInputElement>document.getElementById("main")).style.marginRight = "0";
    this.sAddOverlay = "";
    this.bDisplayToggleBtn = true;
  }
  EditorTabNavigation()
  {
    let element = document.querySelectorAll('.nav-link');
    console.log("element::",element);
    this.addActiveClassToEditorTab = "show active"
    this.removeActiveClassFromOtherTabs = ""
  }
}
