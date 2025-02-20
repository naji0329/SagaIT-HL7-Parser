import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ThemesService } from "src/app/services/themes.service";
import { saveAs as EditorMainSectionComponent_DownloadResultAsJSON } from "save-as";
import { environment } from "src/environments/environment";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TEST_MESSAGE } from "src/app/constants";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  @ViewChild("msgtextarea") msgtextarea: ElementRef;
  @ViewChild("coloredEditor") coloredEditor: ElementRef;

  bDisplaySpinner: boolean = false;
  bDisplayFHIRPanel: boolean = false;
  sFHIRResult: string = "";
  bDisplayAlert: boolean = false;
  sText: string = "";
  fileUrl: any = "";
  oOriginalValue: any;
  sTextAreaValue: any = "";
  sColoredTextValue: any = "";
  nStartIndex: number;
  sStartString: any;
  sEndString: any;
  nBarcount: number;
  nLineCount: number;
  nCarrotsCount: number;
  sStartStringtoCalculateBars: string;
  textarea: any = null;
  ctrlKeyDown: boolean = false;
  responsiveView: boolean = false;
  fieldSeparator: string = "|";
  encodingCharacter: string = "^~\\&";
  wordWrap = false;

  sectionWidth = "calc(100vw - 400px - 30px)";

  constructor(
    private oDataService: DataService,
    private sanitizer: DomSanitizer,
    private oThemesService: ThemesService
  ) {}

  ngOnInit(): void {
    if (!environment.production) {
      this.sTextAreaValue = TEST_MESSAGE;

      this.EditorMainSectionComponent_GetColoredText();
    }

    this.oDataService.oResponsiveView.subscribe((data) => {
      this.responsiveView = data;
    });

    this.oDataService.oUpdatedSegement.subscribe((data) => {
      // update the text area value from segment editor

      if (data) {
        const text: string[] = this.sTextAreaValue.split("\n");
        text[data.lineNumber] = data.message;
        let str = text.join("\n");
        console.log("Value Changed", data, str);
        this.sTextAreaValue = str;
      }
    });

    this.oThemesService.sidebarWidth.subscribe((data) => {
      console.log("sidebar width", data);
      this.sectionWidth = "calc(100vw - " + data + "px  - 30px)";
    });

    this.EditorMainSectionComponent_PassValueToTreeView();
    this.EditorMainSectionComponent_UpdateEditedText();
    this.EditorMainSectionComponent_GetTreeValue();
  }

  ngAfterViewInit() {
    // Initial synchronization if needed
    this.syncScroll();
  }

  EditorMainSectionComponent_ConvertToFHIR() {
    this.bDisplayFHIRPanel = true;
    this.bDisplaySpinner = true;
    this.oDataService
      .convertHL7ToFHIR(this.sTextAreaValue)
      .subscribe((data) => {
        this.bDisplaySpinner = false;
        this.sFHIRResult = data; //JSON.stringify(data, null, 2);
      });
  }

  EditorMainSectionComponent_DismissFHIRPanel() {
    this.bDisplayFHIRPanel = false;
    this.sFHIRResult = "";
  }

  EditorMainSectionComponent_ExportFile() {
    let oResults = new Blob([this.sTextAreaValue], {
      type: "text;charset=utf-8",
    });
    EditorMainSectionComponent_DownloadResultAsJSON(oResults, "message.hl7");
  }
  EditorMainSectionComponent_CopyToClipBoard() {
    navigator.clipboard.writeText(this.sTextAreaValue);
    this.bDisplayAlert = true;
    this.sText = "Successful copied to clipboard";
    setTimeout(() => {
      this.bDisplayAlert = false;
    }, 3000);
  }
  EditorMainSectionComponent_GetPosition(
    line: number,
    bar: number,
    carrot: number
  ) {
    const value = this.textarea.value;
    const lines = value.split("\n");
    let startPosition = 0,
      endPosition = 0;
    for (let i = 0; i < line; i++) {
      startPosition += lines[i].length + 1;
    }
    const pipes = lines[line].split(this.fieldSeparator);
    for (let i = 0; i < bar; i++) {
      startPosition += pipes[i].length + 1;
    }
    if (carrot >= 0) {
      const segs = pipes[bar].split("^");
      for (let i = 0; i < carrot - 1; i++) {
        startPosition += segs[i].length + 1;
      }
    }
    for (
      endPosition = startPosition;
      endPosition < value.length &&
      value[endPosition] !== this.fieldSeparator &&
      value[endPosition] !== "\n" &&
      !(value[endPosition] === "^" && carrot >= 0);
      endPosition++
    );
    return {
      startPosition,
      endPosition,
    };
  }
  EditorMainSectionComponent_CalculateHeaders(
    sIncommingTextArea: any,
    isDoubleClick: boolean = false
  ) {
    console.log("position: ", { isDoubleClick }, this.textarea);
    if (
      this.sTextAreaValue.substring(0, 3) == "MSH" &&
      this.sTextAreaValue.length >= 5
    ) {
      this.fieldSeparator = this.sTextAreaValue.substring(3, 4);
      this.encodingCharacter =
        this.sTextAreaValue.split(this.fieldSeparator)[1] || "^";
    }

    if (!this.textarea) {
      this.textarea = sIncommingTextArea;
      this.textarea.addEventListener("dblclick", () => {
        this.EditorMainSectionComponent_CalculateHeaders(
          sIncommingTextArea,
          true
        );
      });
    }
    let nStartPosition = sIncommingTextArea.selectionStart;
    let nEndPosition = sIncommingTextArea.selectionEnd;
    if (nStartPosition == nEndPosition || isDoubleClick) {
      this.sStartStringtoCalculateBars = sIncommingTextArea.value.substring(
        0,
        nStartPosition
      );
      // pick selected word
      let startSubStr: string = sIncommingTextArea.value.substring(
        0,
        nStartPosition
      );
      let startStr1 = startSubStr.split("\n");
      let startStr2 = startStr1[startStr1.length - 1].split(
        this.fieldSeparator
      );
      this.nLineCount = startStr1.length - 1;
      this.nBarcount = startStr2.length - 1;
      // this.nBarcount = startStr2.length;
      // console.log("str 1 bar count:",startStr2.length-1);

      //selecting carrots
      let startStr3 = startStr2[startStr2.length - 1].split("^");
      // this.nCarrotsCount = startStr3.length-1;
      this.nCarrotsCount = startStr3.length;
      console.log({ startSubStr, startStr1, startStr2, startStr3 });
      // console.log("str 1 cart count:",startStr3.length-1);
      let firstWord = startStr3[startStr3.length - 1];

      let endSubStr: string = sIncommingTextArea.value.substring(
        nStartPosition,
        sIncommingTextArea.value.length
      );
      let endStr1 = endSubStr.split("\n");
      let endStr2 = endStr1[0].split(this.fieldSeparator);
      let endStr3 = endStr2[0].split("^");
      //with carrots complete word
      let sCarrotStr = startStr2[startStr2.length - 1] + endStr2[0];
      console.log("the value is ====>>>", sCarrotStr);
      //last word
      let lastWord = endStr3[0];
      let completeWord = firstWord + lastWord;
      console.log("complete word:", completeWord.trim());
      // pick selected header
      let headerTemp = startSubStr.split("\n");
      let segHeader = headerTemp[headerTemp.length - 1].split(
        this.fieldSeparator
      )[0];
      if (!headerTemp[headerTemp.length - 1].includes(this.fieldSeparator)) {
        segHeader = segHeader + lastWord;
      }
      if (
        startSubStr.lastIndexOf(this.fieldSeparator) >
        startSubStr.lastIndexOf("^")
      ) {
        this.nStartIndex = startSubStr.lastIndexOf(this.fieldSeparator);
      } else {
        this.nStartIndex = startSubStr.lastIndexOf("^");
      }
      this.sStartString = sIncommingTextArea.value.substring(
        0,
        this.nStartIndex
      );
      this.sEndString = sIncommingTextArea.value.substring(
        this.nStartIndex,
        sIncommingTextArea.value.length
      );
      console.log("header =", segHeader);
      this.oOriginalValue = completeWord;
      if (!sCarrotStr.includes("^")) {
        this.nCarrotsCount = 0;
      }
      // if(this.oOriginalValue === '~\\&')
      // {
      //   this.nCarrotsCount=0;
      // }
      if (segHeader === this.oOriginalValue) {
        this.nBarcount = 0;
        this.nCarrotsCount = 0;
      }
      //MSH HANDLING//
      //MSH HANDLING//

      const position = this.EditorMainSectionComponent_GetPosition(
        this.nLineCount,
        this.nBarcount,
        isDoubleClick ? -1 : this.nCarrotsCount
      );

      //if MSH>1 Bar = bar+1
      if (segHeader == "MSH" && this.nBarcount > 1) {
        this.nBarcount = this.nBarcount + 1;
      }
      //if MSH1.1 bar 1 , carrot 0
      if (
        segHeader == "MSH" &&
        this.nBarcount == 1 &&
        this.nCarrotsCount == 1
      ) {
        this.nBarcount = 1;
        this.nCarrotsCount = 0;
      }
      //if MSH1.2 bar 2 , carrot 0
      if (
        segHeader == "MSH" &&
        this.nBarcount == 1 &&
        this.nCarrotsCount == 2
      ) {
        this.nBarcount = 2;
        this.nCarrotsCount = 0;
      }

      this.oDataService.oWordToSearch.next({
        header: segHeader,
        word: this.oOriginalValue,
        bars: this.nBarcount,
        carrots: this.nCarrotsCount,
        focus: false,
        message: this.sTextAreaValue.split("\n")[this.nLineCount] || "",
        lineNumber: this.nLineCount,
      });

      this.textarea.setSelectionRange(
        position.startPosition,
        position.endPosition
      );
      localStorage.setItem("lsSelectedView", "editview");
    }
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

  EditorMainSectionComponent_FlashView() {
    const viewButton = document.getElementById("pills-home-tab");
    if (viewButton) {
      viewButton.classList.add("flash");
      setTimeout(() => {
        viewButton.classList.remove("flash");
      }, 6000);
    }
  }

  EditorMainSectionComponent_PassValueToTreeView() {
    this.oDataService.sTreeViewData.next(this.sTextAreaValue);
    this.EditorMainSectionComponent_GetColoredText();
  }

  EditorMainSectionComponent_InputTextArea() {
    this.EditorMainSectionComponent_GetColoredText();
  }

  EditorMainSectionComponent_GetTreeValue() {
    this.oDataService.sTreeViewData.subscribe((data) => {
      this.sTextAreaValue = data;
    });
  }

  EditorMainSectionComponent_UpdateEditedText() {
    this.oDataService.oWordToUpdate.subscribe((data) => {
      console.log("The Incomming Updtaed Word===>>", data);
      const sSelectedView = localStorage.getItem("lsSelectedView");
      if (data.header !== "") {
        if (sSelectedView == "treeview") {
          //Update start and end string
          this.oOriginalValue = localStorage.getItem("lsOriginalWord");
          this.nStartIndex = JSON.parse(localStorage.getItem("lsStartIndex"));
          this.sStartString = this.sTextAreaValue.substring(
            0,
            this.nStartIndex
          );
          this.sEndString = this.sTextAreaValue.substring(
            this.nStartIndex,
            this.sTextAreaValue.length
          );
        }
        if (this.sEndString.includes(this.oOriginalValue)) {
          console.log("Origianl value : ==> ", this.oOriginalValue);
          this.sEndString = this.sEndString.replace(
            this.oOriginalValue,
            data.word
          );
          console.log("End String : ==> ", this.sEndString);
        }
        this.sTextAreaValue = this.sStartString + this.sEndString;
        this.EditorMainSectionComponent_PassValueToTreeView();
      }
    });
  }

  // Color formatted text area
  EditorMainSectionComponent_GetColoredText() {
    let lines = this.sTextAreaValue.split("\n");
    let result = [];

    for (let line of lines) {
      let colored_line = [];
      let words = line.split(this.fieldSeparator);

      console.log("!!", words);

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (i === 0 && words.length > 2)
          colored_line.push(`<span style="color:red;">${word}</span>|`);
        else if (word.indexOf("^") > 0) {
          let fields = word.split("^");
          for (let j = 0; j < fields.length; j++) {
            colored_line.push(
              `<span style="color:orange;">${
                fields[j]
              }</span><span style="color:purple;">${
                j < fields.length - 1
                  ? "^"
                  : i < words.length - 1
                  ? this.fieldSeparator
                  : ""
              }</span>`
            );
          }
        } else
          colored_line.push(
            `<span style="color:cyan;">${word}</span>${
              i < words.length - 1 ? '<span style="color:purple;">|</span>' : ""
            }`
          );
      }
      result.push(`${colored_line.join("")}`);
    }
    this.sColoredTextValue = this.sanitizer.bypassSecurityTrustHtml(
      result.join("<br/>")
    );
  }

  //Toggle Wrap mode
  ToggleWrap() {
    this.wordWrap = !this.wordWrap;
  }

  // Toggle responsive view
  ToggleResponsiveView() {
    this.oDataService.oResponsiveView.next(
      !this.oDataService.oResponsiveView.value
    );
  }

  // Responsive View css
  getMainAreaStyles() {
    return this.responsiveView
      ? {
          height: "400px",
        }
      : {};
  }

  onScroll(event: Event) {
    console.log("scrolling");
    this.syncScroll();
  }

  syncScroll() {
    const textarea = this.msgtextarea.nativeElement;
    const coloredEditor = this.coloredEditor.nativeElement;

    // Synchronize scroll positions
    coloredEditor.scrollTop = textarea.scrollTop;
    coloredEditor.scrollLeft = textarea.scrollLeft;
  }
}
