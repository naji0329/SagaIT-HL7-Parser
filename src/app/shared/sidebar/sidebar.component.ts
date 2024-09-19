import { DatePipe } from "@angular/common";
import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "src/app/services/data.service";
import { ThemesService } from "src/app/services/themes.service";

import HL7VERSION2_9 from "../../../assets/standard_profiles/version_2_9/version_2_9.json";
import HL7VERSION2_9_TABLE from "../../../assets/standard_profiles/version_2_9/tables_2_9.json";
import HL7VERSION2_9_SECTION from "../../../assets/standard_profiles/version_2_9/sections_2_9.json";

import { HL7_Event, Segment, Table } from "src/app/type";
import { getAnchor, isValidBase64Image, isValidBase64PDF } from "src/app/utils";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  private resizeObserver: ResizeObserver;

  selectedTheme: any = "";
  bDisplayPreviewPanel = false;
  sOverlay: string = "";
  bDisplayPdfPanal = false;
  pdfSrc = ""; //"https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  lSegments: any;
  oSelectedSegment: any;
  sSelectedWord: string;
  sDisplayWord: string;
  bDisplayPDFError: boolean = true;
  bDisplayImageError: boolean = true;
  bToggleInputField: boolean = true;
  addBorderClass: string;
  adjustHeight: string;
  bDisplayInputIcons: boolean = false;
  sSelectedHeader: any;
  nBarCount: number;
  nCrrotsCount: number;
  lFields: any;
  lDatatypes: any;
  oDatatype: any;
  bDatatype: boolean = false;
  oSelectedDatatypeSeg: any;
  userInput: any;
  bEnableTextarea: boolean = true;
  bCheck: boolean = false;
  bTick: boolean = false;
  bSelectedProfile: string;
  tableData: Table;
  chapterLink: string;
  selectedField: Segment;
  eventData: HL7_Event;
  openEventModal: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private oDataService: DataService,
    private oDatePipe: DatePipe,
    private oThemeService: ThemesService
  ) {}

  ngOnInit(): void {
    this.oThemeService.sSelectedThemeValue.subscribe((res) => {
      console.log("Theme", res);
      this.selectedTheme = localStorage.getItem("selectedTheme");
    });
    this.oDataService.oField.subscribe((data: Segment) => {
      this.selectedField = data;
      this.tableData = null;
      if (!data) {
        return;
      }

      this.bSelectedProfile = localStorage.getItem("ProfileNumber");
      let hl7VersionTable = HL7VERSION2_9_TABLE;
      let hl7Data = HL7VERSION2_9;
      let hl7Section: any = HL7VERSION2_9_SECTION;
      switch (this.bSelectedProfile) {
        case "2_9": {
          this.chapterLink = "https://www.hl7.eu/HL7v2x/v29/std29/";
          hl7VersionTable = HL7VERSION2_9_TABLE;
          hl7Data = HL7VERSION2_9;
          hl7Section = HL7VERSION2_9_SECTION;
          break;
        }
        default: {
          this.chapterLink = "https://www.hl7.eu/HL7v2x/v29/std29/";
          hl7VersionTable = HL7VERSION2_9_TABLE;
          hl7Data = HL7VERSION2_9;
          hl7Section = HL7VERSION2_9_SECTION;
          break;
        }
      }
      // if(data.description == "Trigger Event"){
      //   for(let event of hl7Data.events) {
      //     if(event.event_code == data.value)
      //     {
      //       this.se
      //     }
      //   }
      // }
      let section_number = null;
      for (let data_structure of hl7Data.data_structs) {
        if (data_structure.data_structure == data.type) {
          section_number = data_structure.section;

          const contents = [];
          for (let section_item of hl7Section.sections) {
            if (section_item.section == section_number) {
              contents.push(section_item);
            }
          }

          const sorted = contents.sort((a, b) => a.paragraph - b.paragraph);
          let str_contents = sorted.map((a) => a.contents).join(" ");
          this.selectedField.contents = str_contents;
          break;
        }
      }
      console.log("selected field:-----------------", this.selectedField);
      if (this.selectedField?.description == "Trigger Event") {
        for (let i = 0; i < hl7Data.event_message_types.length; i++) {
          const event_message = hl7Data.event_message_types[i];
          const event_message_detail = hl7Data.events[i];
          if (event_message.event_code == this.selectedField.value) {
            this.eventData = {
              ...event_message,
              ...event_message_detail,
            };
          }
        }
      }
      for (let tdata of hl7VersionTable) {
        if (tdata.display_name == data.tableName) {
          this.tableData = tdata;
          let result = [];
          for (let item of tdata.table_values) {
            const d = getAnchor(hl7Data, item.table_value);
            result.push({
              table_value: item.table_value,
              display_name: item.display_name,
              anchor: d ? d.anchor : null,
            });
          }

          this.tableData.table_values = result;

          break;
        }
      }
    });
    this.oDataService.oWordToSearch.subscribe((data) => {
      if (data.header !== "") {
        this.SidebarComponent_ExtractHeaderDetails(data);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        this.oThemeService.sidebarWidth.next(entry.contentRect.width);
      }
    });

    this.resizeObserver.observe(
      this.elementRef.nativeElement.querySelector("#sidebar")
    );
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  SidebarComponent_ToggleEventModal() {
    this.openEventModal = !this.openEventModal;
  }
  SidebarComponent_DisplayPreviewModal() {
    if (this.bDisplayImageError == false) {
      this.bDisplayPreviewPanel = true;
      this.sOverlay = "overlay-fade";
    }
  }
  SidebarComponent_DisplaypdfFile() {
    if (this.bDisplayPDFError == false) {
      this.bDisplayPdfPanal = true;
      this.sOverlay = "overlay-fade";
    }
  }

  SidebarComponent_DismissPreviewPanel() {
    this.bDisplayPreviewPanel = false;
    this.bDisplayPdfPanal = false;
    this.sOverlay = "";
  }

  async SidebarComponent_CheckBase64(base64Data: string) {
    this.bDisplayImageError = !(await isValidBase64Image(base64Data));
    this.bDisplayPDFError = !(await isValidBase64PDF(base64Data));
  }

  SidebarComponent_ExtractHeaderDetails(oIncommingData: any) {
    this.lFields = [];
    this.lSegments = [];
    this.lDatatypes = [];
    this.bCheck = oIncommingData.focus;

    this.bTick = false;
    this.sSelectedHeader = oIncommingData.header;
    this.sSelectedWord = oIncommingData.word;

    // check base 64 validity
    this.SidebarComponent_CheckBase64(oIncommingData.word);

    this.nBarCount = oIncommingData.bars;
    this.nCrrotsCount = oIncommingData.carrots;
    this.sDisplayWord = JSON.parse(JSON.stringify(this.sSelectedWord));
    this.bSelectedProfile = localStorage.getItem("ProfileNumber");
    let hl7Version = HL7VERSION2_9;
    switch (this.bSelectedProfile) {
      case "2_9": {
        hl7Version = HL7VERSION2_9;
        break;
      }
      default: {
        hl7Version = HL7VERSION2_9;
        break;
      }
    }

    if (this.nBarCount == 0 && this.nCrrotsCount == 0) {
      this.lSegments = hl7Version.segments;
      this.SidebarComponent_MatchSegments();
    } else if (this.nBarCount > 0 && this.nCrrotsCount == 0) {
      this.lFields = hl7Version.fields;
      this.SidebarComponent_MatchFields();
    } else if (this.nBarCount > 0 && this.nCrrotsCount > 0) {
      this.lFields = hl7Version.fields;
      this.oSelectedSegment = undefined;
      let nField = this.sSelectedHeader + "." + this.nBarCount;
      for (let nIndex = 0; nIndex < this.lFields.length; nIndex++) {
        if (this.lFields[nIndex].seg === nField) {
          this.oSelectedSegment = this.lFields[nIndex];
          console.log("Selected Field", this.oSelectedSegment);
          break;
        }
      }
      // this.SidebarComponent_MatchDatatypes();
    }
  }
  SidebarComponent_MatchDatatypes() {
    this.bDatatype = true;
    this.oSelectedDatatypeSeg = undefined;
    let nField = this.sSelectedHeader + "." + this.nBarCount;
    for (let nIndex = 0; nIndex < this.lFields.length; nIndex++) {
      if (this.lFields[nIndex].seg === nField) {
        this.oDatatype = this.lFields[nIndex].dataTypeName;
        break;
      }
    }
    console.log("The Data Type is>>>", this.oDatatype);
    if (this.bSelectedProfile === "2_9") {
      this.lDatatypes = HL7VERSION2_9.data_types;
    }
    this.oSelectedDatatypeSeg = undefined;
    for (let nIndex = 0; nIndex < this.lDatatypes.length; nIndex++) {
      if (this.lDatatypes[nIndex].id === this.oDatatype) {
        this.oSelectedDatatypeSeg = this.lDatatypes[nIndex];
        console.log("Selected DataType ===>>>", this.oSelectedDatatypeSeg);
        if (this.lDatatypes[nIndex].fields.length > 0) {
          this.SidebarComponent_MatchFieldsInDatatypes();
        }
        break;
      }
    }
  }
  SidebarComponent_MatchFieldsInDatatypes() {
    let lfieldsinDataTypes = this.oSelectedDatatypeSeg.fields;
    // console.log("The fields of selected datatype>>>", lfieldsinDataTypes);
    for (let nIndex = 0; nIndex < lfieldsinDataTypes.length; nIndex++) {
      if (
        lfieldsinDataTypes[nIndex].id ===
        this.oDatatype + "." + this.nCrrotsCount
      ) {
        this.oSelectedDatatypeSeg = lfieldsinDataTypes[nIndex];
        break;
      }
    }
    console.log("Selected Datatype Field ===>>>", this.oSelectedDatatypeSeg);
  }
  SidebarComponent_MatchFields() {
    this.bDatatype = false;
    this.oSelectedSegment = undefined;
    let nField = this.sSelectedHeader + "." + this.nBarCount;
    for (let nIndex = 0; nIndex < this.lFields.length; nIndex++) {
      if (this.lFields[nIndex].seg === nField) {
        this.oSelectedSegment = this.lFields[nIndex];
        console.log("Selected Field ===>>>", this.oSelectedSegment);
        break;
      }
    }
  }
  SidebarComponent_MatchSegments() {
    this.bDatatype = false;
    this.oSelectedSegment = undefined;
    for (let nIndex = 0; nIndex < this.lSegments.length; nIndex++) {
      if (this.lSegments[nIndex].seg_code === this.sSelectedHeader) {
        this.oSelectedSegment = this.lSegments[nIndex];
        console.log("Selected Segment ===>>>", this.oSelectedSegment);
        break;
      }
    }
  }
  SidebarComponent_ConvertIntoDateTime() {
    this.sDisplayWord = this.oDatePipe.transform(
      this.sSelectedWord,
      "EEE, d MMM y hh:mm:ss"
    );
  }
  SidebarComponent_DisplayImageError() {
    this.bDisplayImageError = true;
  }
  SidebarComponent_DisplayPDFError() {
    this.bDisplayPDFError = true;
  }
  SidebarComponent_DownloadImageFile() {
    const source = `data:image/png;base64,${this.sSelectedWord}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = "image.png";
    link.click();
  }
  SidebarComponent_DownloadPDFFile() {
    const source = `data:application/pdf;base64,${this.sSelectedWord}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = "hl7.pdf";
    link.click();
  }
  SidebarComponent_EditFieldValue() {
    if (this.sDisplayWord && this.bCheck == false) {
      this.bEnableTextarea = false;
      this.bToggleInputField = false;
      this.addBorderClass = "border";
      this.adjustHeight = "field-value-height";
      this.bDisplayInputIcons = true;
      this.bCheck = true;
    }
  }
  SidebarComponent_SendUpdatedText() {
    let obj = this.sDisplayWord;
    this.oDataService.oWordToUpdate.next({
      header: this.sSelectedHeader,
      word: obj,
    });
    this.bToggleInputField = true;
    this.addBorderClass = "";
    this.adjustHeight = "";
    this.bDisplayInputIcons = false;
    this.bEnableTextarea = true;
    this.bTick = true;
    this.Testarea_focusout();
  }
  SidebarComponent_RevertToReadOnlyCross() {
    this.sDisplayWord = this.sSelectedWord;
    this.bToggleInputField = true;
    this.addBorderClass = "";
    this.adjustHeight = "";
    this.bDisplayInputIcons = false;
    this.bEnableTextarea = true;
    this.bTick = true;
    this.Testarea_focusout();
  }
  Testarea_focusout() {
    this.bEnableTextarea = true;
    this.bDisplayInputIcons = false;
  }
}
