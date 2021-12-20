import { Component, OnInit } from '@angular/core';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

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
