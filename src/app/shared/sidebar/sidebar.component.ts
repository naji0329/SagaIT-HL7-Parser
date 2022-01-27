import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { saveAs as UploadFilesComponent_DownloadResultAsJSON }  from 'save-as';
// import * as HL7Inspector from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
// import * as HL7Inspector26 from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
import * as HL7VERSION2_3_1 from '../../../assets/standard_profiles/version_2_3_1.json';
import * as HL7VERSION2_5_1 from '../../../assets/standard_profiles/version_2_5_1.json';
import * as HL7VERSION2_7_1 from '../../../assets/standard_profiles/version_2_7_1.json';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedTheme: any = "";
  bDisplayPreviewPanel = false
  sOverlay : string = ""
  bDisplayPdfPanal = false
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  lSegments : any; 
  oSelectedSegment : any;
  sSelectedWord : string;
  sDisplayWord : string;
  bDisplayPDFError : boolean = false;
  bDisplayImageError : boolean = false;
  constructor(private oDataService : DataService, private oDatePipe : DatePipe, private oSanitizer: DomSanitizer) { }

  ngOnInit(): void 
  {
    this.selectedTheme = localStorage.getItem('selectedTheme')
    this.oDataService.oWordToSearch.subscribe(data=>
    {
      console.log("Incomming word : ==> ", data);
      if(data.header!=="")
      {
        this.SidebarComponent_ExtractHeaderDetails(data);
        this.bDisplayPDFError = false;
        this.bDisplayImageError = false;
      }
    })
  }

  SidebarComponent_DisplayPreviewModal()
  {
    this.bDisplayPreviewPanel = true;
    this.sOverlay = "overlay-fade";
  }
  SidebarComponent_DisplaypdfFile()
  {
    this.bDisplayPdfPanal = true;
    this.sOverlay = "overlay-fade";
  }
  SidebarComponent_DismissPreviewPanel()
  {
    this.bDisplayPreviewPanel = false;
    this.bDisplayPdfPanal = false;
    this.sOverlay = '';
  }
  SidebarComponent_ExtractHeaderDetails(oIncommingData : any)
 {
  this.sSelectedWord = oIncommingData.word;
  this.sDisplayWord = JSON.parse(JSON.stringify(this.sSelectedWord));
  let bSelectedProfile = localStorage.getItem('ProfileNumber');
  switch(bSelectedProfile) 
  { 
    case '2_3_1' : { 
      this.lSegments = HL7VERSION2_3_1.segments ; 
      break; 
    } 
    case '2_5_1' : { 
      this.lSegments = HL7VERSION2_5_1.segments ; 
      break; 
    }
    case '2_7_1' : { 
      this.lSegments = HL7VERSION2_7_1.segments ; 
      break; 
    }
    default :  {
      this.lSegments = HL7VERSION2_7_1.segments ; 
      break; 
    }
  }
  for(let nIndex = 0;nIndex < this.lSegments.length;nIndex++)
  {
    if(this.lSegments[nIndex].seg === oIncommingData.header)
    {
      this.oSelectedSegment = this.lSegments[nIndex];
      console.log("Selected Segment ===>>>",this.oSelectedSegment);
      break;
    }
  }
 }
 SidebarComponent_ConvertIntoDateTime()
 {
  this.sDisplayWord = this.oDatePipe.transform(this.sSelectedWord,'EEE, d MMM y hh:mm:ss')
 }
 SidebarComponent_DisplayImageError()
 {
   this.bDisplayImageError = true;
 }
 SidebarComponent_DisplayPDFError()
 {
   this.bDisplayPDFError = true;
 }
 SidebarComponent_CopyToClipBoard()
 {
  navigator.clipboard.writeText(this.sSelectedWord);
  console.log(navigator.clipboard.writeText(this.sSelectedWord));
 }
 SidebarComponent_DownloadTXTFile()
 {
  let oJobResults = new Blob([JSON.stringify(this.sSelectedWord, null, 2)], { type: 'text;charset=utf-8' })
  UploadFilesComponent_DownloadResultAsJSON(oJobResults, 'message.txt');
 }
 SidebarComponent_DownloadImageFile()
 {
  const source = `data:image/png;base64,${this.sSelectedWord}`;
  const link = document.createElement("a");
  link.href = source;
  link.download = 'hl7.pdf';
  link.click();
 }
 SidebarComponent_DownloadPDFFile()
 {
  const source = `data:application/pdf;base64,${this.sSelectedWord}`;
  const link = document.createElement("a");
  link.href = source;
  link.download = 'hl7.pdf';
  link.click();
 }
}
