import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "copy-message",
  templateUrl: "./copy-message.component.html",
  styleUrls: ["./copy-message.component.scss"],
})
export class CopyMessageComponent implements OnInit {
  sTextAreaValue: any = "";
  bDisplayAlert: boolean = false;
  sText: string = "";

  constructor(private oDataService: DataService) {}

  ngOnInit(): void {}

  EditorMainSectionComponent_CopyToClipBoard() {
    console.log("CopyToClipBoard", this.sTextAreaValue);
    navigator.clipboard.writeText(this.sTextAreaValue);
    this.bDisplayAlert = true;
    this.sText = "Successful copied to clipboard";
    setTimeout(() => {
      this.bDisplayAlert = false;
    }, 3000);
  }
}
