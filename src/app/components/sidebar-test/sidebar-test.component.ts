import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ThemesService } from "src/app/services/themes.service";

@Component({
  selector: "app-sidebar-test",
  templateUrl: "./sidebar-test.component.html",
  styleUrls: ["./sidebar-test.component.scss"],
})
export class SidebarTestComponent implements OnInit {
  sAddOverlay: string = "";
  bDisplayToggleBtn: boolean = true;
  addActiveClassToEditorTab: string = "";
  removeActiveClassFromOtherTabs: string = "";
  selectedTheme: any = "";
  runItPlease: string;
  responsiveView: boolean = false;

  constructor(private oThemeService: ThemesService, private oDataService: DataService) { }

  ngOnInit(): void {
    // this.openNav()
    this.oThemeService.sSelectedThemeValue.subscribe((res) => {
      this.selectedTheme = res;
      this.selectedTheme = localStorage.getItem("selectedTheme");
    });
    this.oDataService.oResponsiveView.subscribe(data => {
      this.responsiveView = data;
    })
  }

  // openNav()
  // {
  //   (<HTMLInputElement>document.getElementById('sidebar')).style.width = '410px';
  //   (<HTMLInputElement>document.getElementById("main")).style.marginRight = "410px";
  //   this.sAddOverlay = "overlay";
  //   this.bDisplayToggleBtn = false;

  // }
  // closeNav()
  // {
  //   (<HTMLInputElement>document.getElementById('sidebar')).style.width = '0';
  //   (<HTMLInputElement>document.getElementById("main")).style.marginRight = "0";
  //   this.sAddOverlay = "";
  //   this.bDisplayToggleBtn = true;
  // }
  EditorTabNavigation() {
    let element = document.querySelectorAll(".nav-link");
    console.log("element::", element);
    this.addActiveClassToEditorTab = "show active";
    this.removeActiveClassFromOtherTabs = "";
  }



  openItPlease() {
    this.runItPlease = "d-block";
    this.bDisplayToggleBtn = true;
  }
  closeItPlease() {
    this.runItPlease = "d-none";
    this.bDisplayToggleBtn = false;
  }

  // Responsive View css
  getMainAreaStyles() {
    return this.responsiveView ? {
      "flex-direction": "column"
    } : {

    };
  }
}
