import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  selectedTheme: any="";
  
  constructor(private oThemeService : ThemesService)
  {}

  ngOnInit(): void {
     this.oThemeService.sSelectedThemeValue.subscribe(res =>{
      this.selectedTheme = localStorage.getItem("selectedTheme")
   })
  }

}
