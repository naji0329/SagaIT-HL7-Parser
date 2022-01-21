import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-main-section',
  templateUrl: './editor-main-section.component.html',
  styleUrls: ['./editor-main-section.component.scss']
})
export class EditorMainSectionComponent implements OnInit {
  fileUrl: any = "";
  constructor() { }

  ngOnInit(): void {
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
      console.log("final word=", selectedWord);
      
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
      console.log("header =",header)
    }
    else
    {
      console.log("Selected text from ("+ nStartPosition +" to "+ nEndPosition + " of " + sIncommingTextArea.value.length + ")");
      console.log(sIncommingTextArea.value.substring(nStartPosition,nEndPosition));

    }
  }
}
