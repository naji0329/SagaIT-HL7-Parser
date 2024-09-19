import { Component, OnInit } from "@angular/core";
import { ThemesService } from "src/app/services/themes.service";
declare var $: any;

@Component({
  selector: "theme-changer",
  templateUrl: "./theme-changer.component.html",
  styleUrls: ["./theme-changer.component.scss"],
})
export class ThemeChangerComponent implements OnInit {
  selectedTheme: any = "";
  bToggleSwitch: boolean;

  constructor(private oThemeService: ThemesService) {}

  ngOnInit(): void {
    this.oThemeService.sSelectedThemeValue.subscribe((res) => {
      this.selectedTheme = localStorage.getItem("selectedTheme");
    });
    if (this.selectedTheme === "cyborg") {
      this.bToggleSwitch = true;
    }

    if (this.selectedTheme === "cyborg") {
      $(function () {
        $("body").addClass("cyborg-body");
      });
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("cyborg-body");
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("cyborg-body");
    }
    if (this.selectedTheme === "slate") {
      $(function () {
        $("body").addClass("slate-body");
      });
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("slate-body");
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("slate-body");
    }
  }

  ToggleTheme(event) {
    console.log("Event", event.target.checked);
    if (event.target.checked) {
      localStorage.setItem("selectedTheme", "cyborg");
      this.selectedTheme = localStorage.getItem("selectedTheme");
      this.oThemeService.sSelectedThemeValue.next(this.selectedTheme);
      if (this.selectedTheme === "cyborg") $("body").addClass("cyborg-body");

      const body = document.getElementsByTagName("body")[0];
      body.classList.add("cyborg-body");
    } else {
      localStorage.setItem("selectedTheme", "default");
      this.selectedTheme = "default";
      this.oThemeService.sSelectedThemeValue.next(this.selectedTheme);
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("cyborg-body");
    }
  }
}
