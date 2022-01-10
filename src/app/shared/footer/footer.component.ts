import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  selectedTheme: string="";
  
  constructor(private oThemeService : ThemesService)
  {
   this.oThemeService.sSelectedThemeValue.subscribe(res =>{
     this.selectedTheme = res;
     console.log("working");
     
   })
  }

  ngOnInit(): void {
  }

}
