import { Component, OnInit } from '@angular/core';
import * as HL7Inspector from '../../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.5.1-Profile.json';
import * as HL7Inspector26 from '../../../../../assets/standard_profiles/HL7InspectorNEO-HL7_V2.6-Profile.json';

@Component({
  selector: 'app-editor-main-section',
  templateUrl: './editor-main-section.component.html',
  styleUrls: ['./editor-main-section.component.scss']
})
export class EditorMainSectionComponent implements OnInit {
  fileUrl: any = "";
  lSegments : any; 
  oSelectedSegment : any;
  oOriginalValue : any;
  oStringToBase64 : any;
  bshowOriginalValue : boolean = true;
  bPDFValue : boolean = false;
  bImage : boolean = true;
  ValuePresenterDisplayOptions : any = [
    { name: 'Original Value' , value: 'original'},
    { name: 'Decoded Base64 PDF Document' , value: 'base64-pdf'},
    { name: 'Decoded Base64 Image' , value: 'base64-image'}
  ]
  selectedValue: any = 'original';
  constructor() { }

  ngOnInit(): void {
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
    console.log("Lsegments List ===>>>",this.lSegments);
  }
  alphafunction(sIncommingTextArea : any)
  {
    let nStartPosition = sIncommingTextArea.selectionStart;
    let nEndPosition = sIncommingTextArea.selectionEnd;
    if(nStartPosition == nEndPosition)
    {
      let startSubStr : string = sIncommingTextArea.value.substring(0, nStartPosition)
      let endSubStr: string = sIncommingTextArea.value.substring(nStartPosition, sIncommingTextArea.value.length)
      let selectedWord = "";
      if(startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^')){
        endSubStr=endSubStr+"|^";
        if(endSubStr.indexOf('|') > endSubStr.indexOf('^')){
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('|')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('^'))
        }
        else{
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('|')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('|'))
        }

      }
      // -----------------------------------
      else{
        endSubStr=endSubStr+"|^";
        if(endSubStr.indexOf('|') > endSubStr.indexOf('^')){
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('^')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('^'))
        }
        else{
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('^')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('|'))
        }

      }
      if(selectedWord.search('\n')>0)
        selectedWord=selectedWord.substring(0,selectedWord.indexOf('\n'))
        this.oOriginalValue = selectedWord;
      console.log("final word=", selectedWord);
      // console.log("Originall word=", this.oOriginalValue);
      // let encoded : string = btoa(this.oOriginalValue);
      // console.log("Incoming Encoded Value ==>>",encoded);
      // this.oStringToBase64 = encoded;
      // -----------------------------------
      

      let header:string ='';
      if(startSubStr.lastIndexOf('\n') < startSubStr.indexOf('|'))
      {
        header = startSubStr.substring(startSubStr.lastIndexOf('\n') , startSubStr.indexOf('|')).trim()
      }
      else
      {
        header = sIncommingTextArea.value.substring(startSubStr.lastIndexOf('\n'), endSubStr.indexOf('|')+startSubStr.length).trim()
        header = header.substring(0, header.indexOf('|')).trim()
      }
      if(header==''){
        header = selectedWord.trim();
      }
      console.log("header =",header);
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
        if(this.lSegments[nIndex].seg.seg === header)
        {
          this.oSelectedSegment = this.lSegments[nIndex].seg;
          console.log("Selected Header ===>>>",this.oSelectedSegment)
        }
      }
    }
    else
    {
      console.log("Selected text from ("+ nStartPosition +" to "+ nEndPosition + " of " + sIncommingTextArea.value.length + ")");
      console.log(sIncommingTextArea.value.substring(nStartPosition,nEndPosition));
    }
  }
  SelectDisplayOptions(options:any) 
  {
    this.selectedValue = options.target.value
    console.log(this.selectedValue);
  }
}
