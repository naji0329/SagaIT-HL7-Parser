import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { saveAs as EditorMainSectionComponent_DownloadResultAsJSON }  from 'save-as';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  bDisplayAlert: boolean = false;
  sText: string = "";
  fileUrl: any = "";
  oOriginalValue : any;
  sTextAreaValue : string;

  constructor(private oDataService : DataService) { }

  ngOnInit(): void {}
  
  EditorMainSectionComponent_ExportFile()
  {
    let oJobResults = new Blob([JSON.stringify(this.sTextAreaValue, null, 2)], { type: 'text;charset=utf-8' })
    EditorMainSectionComponent_DownloadResultAsJSON(oJobResults, 'message.hl7');
  }
  EditorMainSectionComponent_CopyToClipBoard()
  {
    navigator.clipboard.writeText(this.sTextAreaValue);
    this.bDisplayAlert = true;
    this.sText = "Successful copied to clipboard";
    setTimeout(() => {this.bDisplayAlert = false}, 3000);
  }
  EditorMainSectionComponent_CalculateHeaders(sIncommingTextArea : any)
  {
    let nStartPosition = sIncommingTextArea.selectionStart;
    let nEndPosition = sIncommingTextArea.selectionEnd;
    if(nStartPosition == nEndPosition)
    {
      let startSubStr : string = sIncommingTextArea.value.substring(0, nStartPosition)
      let endSubStr: string = sIncommingTextArea.value.substring(nStartPosition, sIncommingTextArea.value.length)
      let selectedWord = "";
      if(startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^'))
      {
        endSubStr=endSubStr+"|^";
        if(endSubStr.indexOf('|') > endSubStr.indexOf('^'))
        {
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('|')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('^'))
        }
        else
        {
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('|')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('|'))
        }

      }
      else
      {
        endSubStr=endSubStr+"|^";
        if(endSubStr.indexOf('|') > endSubStr.indexOf('^'))
        {
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('^')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('^'))
        }
        else
        {
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('^')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('|'))
        }

      }
      if(selectedWord.search('\n')>0)
      {
        selectedWord=selectedWord.substring(0,selectedWord.indexOf('\n'));
      }
      this.oOriginalValue = selectedWord;
      let sHeader:string ='';
      if(startSubStr.lastIndexOf('\n') < startSubStr.indexOf('|'))
      {
        sHeader = startSubStr.substring(startSubStr.lastIndexOf('\n') , startSubStr.indexOf('|')).trim()
      }
      else
      {
        sHeader = sIncommingTextArea.value.substring(startSubStr.lastIndexOf('\n'), endSubStr.indexOf('|')+startSubStr.length).trim()
        sHeader = sHeader.substring(0, sHeader.indexOf('|')).trim()
      }
      if(sHeader=='')
      {
        sHeader = selectedWord.trim();
      }
      // console.log("sHeader =",sHeader);
      this.oDataService.oWordToSearch.next({header : sHeader, word : this.oOriginalValue});
    }
  }
  EditorMainSectionComponent_ImportFile(event : any)
  {
    let file = event.target.files[0];
    if(file)
    {
      const reader = new FileReader();
      reader.onload = (e)=>
      {
        let file = e.target.result;
        this.sTextAreaValue = file.toString();
      }
      reader.readAsText(file);
    }
  }
}
