import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bDisplayImprintOption: boolean = true;
  bDisplayProfileOptions: boolean = true;

  constructor(private  oRouter : Router) 
  {
    if(this.oRouter.url === '/imprint')
    {
      this.bDisplayImprintOption = false
    }
    if(this.oRouter.url === '/profile')
    {
     this.bDisplayProfileOptions = false
    }
  }

  ngOnInit(): void {
  }
  ExportAsJson()
  {
    const data = [{ foo: 'foo'}, { bar: 'bar' }]
    const fileName = 'download'
    const exportType = 'json'

    exportFromJSON({ data, fileName, exportType })
  }

}
