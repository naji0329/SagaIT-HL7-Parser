import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "toggle-view-mode",
  templateUrl: "./toggle-view-mode.component.html",
  styleUrls: ["./toggle-view-mode.component.scss"],
})
export class ToggleViewModeComponent implements OnInit {
  constructor(private oDataService: DataService) {}

  ngOnInit(): void {}

  // Toggle responsive view
  ToggleResponsiveView() {
    this.oDataService.oResponsiveView.next(
      !this.oDataService.oResponsiveView.value
    );
  }
}
