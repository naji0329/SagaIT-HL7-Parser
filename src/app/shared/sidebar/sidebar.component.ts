import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as HL7Inspector from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // sidebarOptions : any = ['ADT^A08 with UTF8 Sample','ADT^A01 Sample','ORU^R01 with PDF Sample','ADT^A02 Sample','MDM^T02 with JPG Sample',]
  addActiveClass: any;
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
  constructor(private oDataService : DataService, private oDatePipe : DatePipe) { }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('selectedTheme')
    this.oDataService.oWordToSearch.subscribe(data=>
    {
      console.log("Incomming word : ==> ", data);
      if(data.header!=="")
      {
        this.alphaFunction(data);
        this.bDisplayPDFError = false;
        this.bDisplayImageError = false;
      }
    })
  }
  AddActiveClass(item:any){
    console.log("Item", item);
    this.addActiveClass = item
  }

  DisplayPreviewModal()
  {
    this.bDisplayPreviewPanel = true;
    this.sOverlay = "overlay-fade";
  }
  DisplaypdfFile()
  {
    console.log("work");
    
    this.bDisplayPdfPanal = true;
    this.sOverlay = "overlay-fade";
  }
  
  DismissPreviewPanel()
  {
    this.bDisplayPreviewPanel = false;
    this.bDisplayPdfPanal = false;
    this.sOverlay = '';
  }
 alphaFunction(oIncommingData : any)
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
      break;
    }
  }
  console.log("Selected Segment ===>>>",this.oSelectedSegment);
 }
 ConvertIntoDateTime()
 {
  this.sDisplayWord = this.oDatePipe.transform(this.sSelectedWord,'EEE, d MMM y hh:mm:ss')
 }
 DisplayImageError()
 {
   this.bDisplayImageError = true;
 }
 DisplayPDFError()
 {
   this.bDisplayPDFError = true;
 }
 CopyToClipBoard()
 {
  navigator.clipboard.writeText(this.sSelectedWord);
  console.log(navigator.clipboard.writeText(this.sSelectedWord));
 }
 DownloadFile()
 {
   if(this.bDisplayPDFError)
   {
     //download as a image file
   }
   if(this.bDisplayImageError)
   {
     //download as a pdf file
   }
   else
   {
     //download as a text file

   }
 }
}
