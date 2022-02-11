import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { ThemesService } from 'src/app/services/themes.service';
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
  bToggleInputField : boolean = true
  addBorderClass: string;
  adjustHeight: string;
  bDisplayInputIcons : boolean = false;
  sSelectedHeader: any;
  nBarCount: number;
  nCrrotsCount: number;
  lFields: any;
  lDatatypes: any;
  oDatatype: any;
  bDatatype: boolean=false;
  oSelectedDatatypeSeg: any;
  bCheck: boolean=false;
  bTick: boolean=false;
  constructor(private oDataService : DataService, private oDatePipe : DatePipe, private oThemeService : ThemesService) { }

  ngOnInit(): void 
  {
    this.oThemeService.sSelectedThemeValue.subscribe(res=>{
      console.log("Theme",res);
      this.selectedTheme = localStorage.getItem('selectedTheme')
    })
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
  this.lFields =[];
  this.lSegments =[];
  this.lDatatypes =[];
  this.bCheck = oIncommingData.focus;
  this.bTick = false;
  this.sSelectedHeader = oIncommingData.header;
  this.sSelectedWord = oIncommingData.word;
  this.nBarCount = oIncommingData.bars;
  this.nCrrotsCount = oIncommingData.carrots;
  this.sDisplayWord = JSON.parse(JSON.stringify(this.sSelectedWord));
  let bSelectedProfile = localStorage.getItem('ProfileNumber');
  switch(bSelectedProfile) 
  { 
    case '2_3_1' : {
      if(this.nBarCount == 0 && this.nCrrotsCount == 0)
      {
        this.lSegments = HL7VERSION2_3_1.segments ; 
        this.SidebarComponent_MatchSegments();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount == 0)
      {
        this.lFields = HL7VERSION2_3_1.fields;
        this.SidebarComponent_MatchFields();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount>0)
      {
        this.lFields = HL7VERSION2_3_1.fields;
        this.oSelectedSegment = undefined;
        let nField = this.sSelectedHeader+"."+this.nBarCount;
        for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
        {
          if(this.lFields[nIndex].seg === nField)
          {
            this.oSelectedSegment = this.lFields[nIndex];
            console.log("Selected Field ===>>>",this.oSelectedSegment);
            break;
          }
        }
        this.SidebarComponent_MatchDatatypes();
      }
      break; 
    } 
    case '2_5_1' : {
      if(this.nBarCount == 0 && this.nCrrotsCount == 0)
      { 
      this.lSegments = HL7VERSION2_5_1.segments ; 
      this.SidebarComponent_MatchSegments();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount == 0)
      {
        this.lFields = HL7VERSION2_5_1.fields;
        this.SidebarComponent_MatchFields();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount>0)
      {
        this.lFields = HL7VERSION2_5_1.fields;
        this.oSelectedSegment = undefined;
        let nField = this.sSelectedHeader+"."+this.nBarCount;
        for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
        {
          if(this.lFields[nIndex].seg === nField)
          {
            this.oSelectedSegment = this.lFields[nIndex];
            console.log("Selected Field ===>>>",this.oSelectedSegment);
            break;
          }
        }
        this.SidebarComponent_MatchDatatypes();
      }
      break; 
    }
    case '2_7_1' : { 
      if(this.nBarCount == 0 && this.nCrrotsCount == 0)
      {
        this.lSegments = HL7VERSION2_7_1.segments ;
        this.SidebarComponent_MatchSegments();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount == 0)
      {
        this.lFields = HL7VERSION2_7_1.fields ;
        this.SidebarComponent_MatchFields();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount>0)
      {
        this.lFields = HL7VERSION2_7_1.fields ;
        this.oSelectedSegment = undefined;
        let nField = this.sSelectedHeader+"."+this.nBarCount;
        for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
        {
          if(this.lFields[nIndex].seg === nField)
          {
            this.oSelectedSegment = this.lFields[nIndex];
            console.log("Selected Field ===>>>",this.oSelectedSegment);
            break;
          }
        }
        this.SidebarComponent_MatchDatatypes();
      }
      break; 
    }
    default :  {
      if(this.nBarCount == 0 && this.nCrrotsCount == 0)
      {
        this.lSegments = HL7VERSION2_7_1.segments ;
        this.SidebarComponent_MatchSegments();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount == 0)
      {
        this.lFields = HL7VERSION2_7_1.fields;
        this.SidebarComponent_MatchFields();
      }
      else if(this.nBarCount>0 && this.nCrrotsCount>0)
      {
        this.lFields = HL7VERSION2_7_1.fields;
        this.oSelectedSegment = undefined;
        let nField = this.sSelectedHeader+"."+this.nBarCount;
        for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
        {
          if(this.lFields[nIndex].seg === nField)
          {
            this.oSelectedSegment = this.lFields[nIndex];
            console.log("Selected Field ===>>>",this.oSelectedSegment);
            break;
          }
        }
        this.SidebarComponent_MatchDatatypes();
      }
      break; 
    }
  }
 }
 SidebarComponent_MatchDatatypes()
 {
  this.bDatatype=true;
  this.oSelectedDatatypeSeg = undefined;
  let nField = this.sSelectedHeader+"."+this.nBarCount;
  for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
  {
    if(this.lFields[nIndex].seg === nField)
    {
    this.oDatatype = this.lFields[nIndex].datatype;
    }
  }
  console.log("The Data Type is>>>", this.oDatatype);
  this.lDatatypes = HL7VERSION2_3_1.datatypes;
  this.oSelectedDatatypeSeg = undefined;
  for(let nIndex = 0;nIndex < this.lDatatypes.length;nIndex++)
  {
    if(this.lDatatypes[nIndex].id === this.oDatatype)
    {
      this.oSelectedDatatypeSeg = this.lDatatypes[nIndex];
      console.log("Selected DataType ===>>>",this.oSelectedDatatypeSeg);
      if(this.lDatatypes[nIndex].fields.length>0)
      {
        this.SidebarComponent_MatchFieldsInDatatypes();
      }
      break;
    }
  }
}
SidebarComponent_MatchFieldsInDatatypes()
{
  let lfieldsinDataTypes = this.oSelectedDatatypeSeg.fields;
  // console.log("The fields of selected datatype>>>", lfieldsinDataTypes);
  for(let nIndex = 0;nIndex < lfieldsinDataTypes.length;nIndex++)
  {
    if(lfieldsinDataTypes[nIndex].id === this.oDatatype+"."+this.nCrrotsCount)
    {
      this.oSelectedDatatypeSeg = lfieldsinDataTypes[nIndex];
      break;
    }
  }
  console.log("Selected Datatype Field ===>>>",this.oSelectedDatatypeSeg);
}
 SidebarComponent_MatchFields()
 {
  this.bDatatype = false;
  this.oSelectedSegment = undefined;
  let nField = this.sSelectedHeader+"."+this.nBarCount;
  for(let nIndex = 0;nIndex < this.lFields.length;nIndex++)
  {
    if(this.lFields[nIndex].seg === nField)
    {
      this.oSelectedSegment = this.lFields[nIndex];
      console.log("Selected Field ===>>>",this.oSelectedSegment);
      break;
    }
  }
 }
 SidebarComponent_MatchSegments()
 {
  this.bDatatype = false;
  this.oSelectedSegment = undefined;
  for(let nIndex = 0;nIndex < this.lSegments.length;nIndex++)
  {
    if(this.lSegments[nIndex].seg === this.sSelectedHeader)
    {
      this.oSelectedSegment = this.lSegments[nIndex];
      console.log("Selected Segment ===>>>",this.oSelectedSegment);
      break;
    }
  }
 }
 SidebarComponent_ConvertIntoDateTime()
 {
  this.sDisplayWord = this.oDatePipe.transform(this.sSelectedWord,'EEE, d MMM y hh:mm:ss');
 }
 SidebarComponent_DisplayImageError()
 {
   this.bDisplayImageError = true;
 }
 SidebarComponent_DisplayPDFError()
 {
   this.bDisplayPDFError = true;
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
 SidebarComponent_EditFieldValue()
 {
   if(this.sDisplayWord && this.bCheck==false)
   {
    this.bToggleInputField = false;
    this.addBorderClass = 'border';
    this.adjustHeight = "field-value-height";
    this.bDisplayInputIcons = true
    this.bCheck = true;
   }
   }
   SidebarComponent_SendUpdatedText()
 {
   let obj = this.sDisplayWord;
   this.oDataService.oWordToUpdate.next({header : this.sSelectedHeader , word :obj});
   this.bToggleInputField = true;
   this.addBorderClass = "";
   this.adjustHeight = "";
   this.bDisplayInputIcons = false;
   this.bTick = true;
 }
 SidebarComponent_RevertToReadOnlyCross()
 {
  this.sDisplayWord= this.sSelectedWord;
  this.bToggleInputField = true;
  this.addBorderClass = "";
  this.adjustHeight = "";
  this.bDisplayInputIcons = false;
  this.bTick = true;
 }
}
