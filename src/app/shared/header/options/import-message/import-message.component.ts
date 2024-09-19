import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemesService } from "src/app/services/themes.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "import-message",
  templateUrl: "./import-message.component.html",
  styleUrls: ["./import-message.component.scss"],
})
export class ImportMessageComponent implements OnInit {
  sTextAreaValue: any = "";

  constructor(
    private oRouter: Router,
    private oThemeService: ThemesService,
    private oDataService: DataService
  ) {
    console.log("ImportMessageComponent");
  }

  ngOnInit(): void {
    console.log("ImportMessageComponent");
  }

  EditorMainSectionComponent_ImportFile(event: any) {
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let file = e.target.result;
        this.sTextAreaValue = file;
        this.EditorMainSectionComponent_PassValueToTreeView();
      };
      reader.readAsText(file);
    }
  }

  EditorMainSectionComponent_PassValueToTreeView() {
    this.oDataService.sTreeViewData.next(this.sTextAreaValue);
  }
}
