import { Component, OnInit } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedTheme: any;

  constructor(private oThemeService : ThemesService) { }

  ngOnInit(): void {
    this.oThemeService.sSelectedThemeValue.subscribe(res =>{
      this.selectedTheme = res
    })
  }
  ChangeTheme(event:any)
  {
    this.selectedTheme = event.target.value;
    this.oThemeService.sSelectedThemeValue.next(this.selectedTheme)
    if(this.selectedTheme === 'cyborg')
    {
     const body = document.getElementsByTagName('body')[0]
     body.classList.add('cyborg-body')
    }
    else
    {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('cyborg-body')
    }
  }

}
