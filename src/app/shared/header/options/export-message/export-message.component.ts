import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemesService } from "src/app/services/themes.service";
import { DataService } from "src/app/services/data.service";

import { saveAs as EditorMainSectionComponent_DownloadResultAsJSON } from "save-as";

@Component({
  selector: "export-message",
  templateUrl: "./export-message.component.html",
  styleUrls: ["./export-message.component.scss"],
})
export class ExportMessageComponent implements OnInit {
  sTextAreaValue: any = "";

  constructor(
    private oRouter: Router,
    private oThemeService: ThemesService,
    private oDataService: DataService
  ) {
    console.log("export-message");
  }

  ngOnInit(): void {
    console.log("export-message");
  }

  EditorMainSectionComponent_ExportFile() {
    let oResults = new Blob([this.sTextAreaValue], {
      type: "text;charset=utf-8",
    });
    EditorMainSectionComponent_DownloadResultAsJSON(oResults, "message.hl7");
  }
}
