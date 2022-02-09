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
  nStartIndex: number;
  sStartString: any;
  sEndString: any;
  stri: string;
  nBarcount: number;
  nCarrotsCount: number;
  constructor(private oDataService : DataService) { }

  ngOnInit(): void 
  {
    this.EditorMainSectionComponent_UpdateEditedText()
  }
  
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
      this.stri = sIncommingTextArea.value.substring(0, nStartPosition);
      let startSubStr : string = sIncommingTextArea.value.substring(0, nStartPosition)
      let endSubStr: string = sIncommingTextArea.value.substring(nStartPosition, sIncommingTextArea.value.length)
      if((startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^')) == true)
      {
        this.nStartIndex = startSubStr.lastIndexOf('|');
        // console.log("The Start index is===>>>", this.nStartIndex);
        this.sStartString = sIncommingTextArea.value.substring(0, this.nStartIndex);
        // console.log("The start string is===>>>",this.sStartString);
        this.sEndString = sIncommingTextArea.value.substring(this.nStartIndex, sIncommingTextArea.value.length);
        // console.log("The end string is===>>>", this.sEndString);
      }
      else if((startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^')) == false)
      {
        this.nStartIndex = startSubStr.lastIndexOf('^');
        // console.log("The Start index is===>>>", this.nStartIndex);
        this.sStartString = sIncommingTextArea.value.substring(0, this.nStartIndex);
        // console.log("The start string is===>>>",this.sStartString);
        this.sEndString = sIncommingTextArea.value.substring(this.nStartIndex, sIncommingTextArea.value.length);
        // console.log("The end string is===>>>", this.sEndString);

      }
      let selectedWord = "";
      if(startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^'))
      {
        endSubStr=endSubStr+"|^";
        if(endSubStr.indexOf('|') > endSubStr.indexOf('^'))
        {
          selectedWord= startSubStr.substring(startSubStr.lastIndexOf('|')+1, startSubStr.length) + endSubStr.substring(0, endSubStr.indexOf('^'));
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
      this.EditorMainSectionComponent_CalculateBarLength(this.stri);
      this.oDataService.oWordToSearch.next({header : sHeader, word : this.oOriginalValue, bars: this.nBarcount, carrots: this.nCarrotsCount});
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
  EditorMainSectionComponent_PassValueToTreeView()
  {
    this.oDataService.sTreeViewData.next(this.sTextAreaValue);
  }
  EditorMainSectionComponent_UpdateEditedText()
  {
    this.oDataService.oWordToUpdate.subscribe(data=>
      {
        console.log("The Incomming Updtaed Word===>>", data)
        if(data.header!=="")
        {
          if(this.sEndString.includes(this.oOriginalValue))
          {
            this.sEndString = this.sEndString.replace(this.oOriginalValue, data.word);
          }
          this.sTextAreaValue = this.sStartString+this.sEndString;
        }
      });
  }
  EditorMainSectionComponent_CalculateBarLength(oIncommingData)
  {
    var str : any=[] = oIncommingData.split('\n');
    str = str[str.length-1];
    console.log("The list >>>>>", str);
    this.EditorMainSectionComponent_CountBars(str);
    this.EditorMainSectionComponent_CountCarrots(str);
  }
  EditorMainSectionComponent_CountBars(str)
  {
    this.nBarcount = 0;
    for(let i = 0; i< str.length; i++)
    {
      if(str.charAt(i) == '|')
      {
        this.nBarcount += 1;
      }
    }
    console.log("The Bar Length is>>>",this.nBarcount);
  }
  EditorMainSectionComponent_CountCarrots(oIncommingData)
  {
    var str: any=[] = oIncommingData.split('|');
    str = str[str.length-1];
    this.nCarrotsCount = 0;
    for(let i = 0; i< str.length; i++)
    {
      if(str.charAt(i) == '^')
      {
        this.nCarrotsCount += 1;
      }
    }
    console.log("The Carrotts are>>>",this.nCarrotsCount);
  }
}
