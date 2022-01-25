import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import * as HL7Inspector from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';
import { saveAs as UploadFilesComponent_DownloadResultAsJSON }  from 'save-as';

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
    case '1' : { 
      this.lSegments = HL7Inspector.segments ; 
      break; 
    } 
    case '2' : { 
      this.lSegments = HL7Inspector26.segments ; 
      break; 
    }
    default :  {
      this.lSegments = HL7Inspector.segments ; 
      break; 
    }
  }
  for(let nIndex = 0;nIndex < this.lSegments.length;nIndex++)
  {
    if(this.lSegments[nIndex].seg.seg === oIncommingData.header)
    {
      this.oSelectedSegment = this.lSegments[nIndex].seg;
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
 SidebarComponent_DownloadFile()
 {
   if(this.bDisplayPDFError)
   {
    console.log("//download as a image file")
   }
   if(this.bDisplayImageError)
   {   
     console.log("//download as a pdf file")
   }
   else
   {
     console.log("//download as a text file")
     //download as a text file
    //  const blob = new Blob([this.sSelectedWord], { type: 'application/octet-stream' });
    //  let url : any = this.oSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    //  const link = document.createElement('a');
    //  link.href = url;
    //  link.setAttribute('download', 'message.txt');
    //  document.body.appendChild(link);
    //  link.click();
    //  document.body.removeChild(link);

     let oJobResults = new Blob([JSON.stringify(this.sSelectedWord, null, 2)], { type: 'text;charset=utf-8' })
     UploadFilesComponent_DownloadResultAsJSON(oJobResults, 'message.txt');
   }
 }
}
