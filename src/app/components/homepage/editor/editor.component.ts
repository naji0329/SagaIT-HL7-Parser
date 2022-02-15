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
  sTextAreaValue : any="";
  nStartIndex: number;
  sStartString: any;
  sEndString: any;
  nBarcount: number;
  nCarrotsCount: number;
  sStartStringtoCalculateBars: string;
  constructor(private oDataService : DataService) { }

  ngOnInit(): void 
  {
    this.EditorMainSectionComponent_UpdateEditedText()
  }
  
  EditorMainSectionComponent_ExportFile()
  {
    let oResults = new Blob([this.sTextAreaValue], { type: 'text;charset=utf-8' })
    EditorMainSectionComponent_DownloadResultAsJSON(oResults, 'message.hl7');
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
      this.sStartStringtoCalculateBars = sIncommingTextArea.value.substring(0, nStartPosition);
      // pick selected word
      let startSubStr : string = sIncommingTextArea.value.substring(0, nStartPosition)
      let startStr1 = startSubStr.split('\n');
      let startStr2 = startStr1[startStr1.length-1].split('|');
      this.nBarcount = startStr2.length-1;
      // console.log("str 1 bar count:",startStr2.length-1);
      
      let startStr3 = startStr2[startStr2.length-1].split("^");
      this.nCarrotsCount = startStr3.length-1;
      // console.log("str 1 cart count:",startStr3.length-1);
      let firstWord = startStr3[startStr3.length-1];

      let endSubStr: string = sIncommingTextArea.value.substring(nStartPosition, sIncommingTextArea.value.length)
      let endStr1 = endSubStr.split('\n');
      let endStr2 = endStr1[0].split('|');
      let endStr3 = endStr2[0].split("^");
      let lastWord = endStr3[0];
      let completeWord =  firstWord+lastWord;
      console.log("complete word:",completeWord.trim());
      
      // pick selected header
      let headerTemp = startSubStr.split("\n");
      let segHeader= headerTemp[headerTemp.length-1].split('|')[0];
      if(!headerTemp[headerTemp.length-1].includes('|'))
      {
        segHeader = segHeader + lastWord;
      }

      if(startSubStr.lastIndexOf('|') > startSubStr.lastIndexOf('^'))
      {
        this.nStartIndex = startSubStr.lastIndexOf('|');
      }
      else
      {
        this.nStartIndex = startSubStr.lastIndexOf('^');
      }
      this.sStartString = sIncommingTextArea.value.substring(0, this.nStartIndex);
      this.sEndString = sIncommingTextArea.value.substring(this.nStartIndex, sIncommingTextArea.value.length);
      console.log("header =",segHeader)
      this.oOriginalValue  = completeWord;
      this.oDataService.oWordToSearch.next({header : segHeader, word : this.oOriginalValue, bars: this.nBarcount, carrots: this.nCarrotsCount, focus: false});
      localStorage.setItem("lsSelectedView", 'editview');
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
        this.sTextAreaValue = file;
        this.EditorMainSectionComponent_PassValueToTreeView();
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
      const sSelectedView = localStorage.getItem('lsSelectedView');
      if(data.header!=="")
      {
        if(sSelectedView=='treeview')
        {
          //Update start and end string
          this.oOriginalValue = localStorage.getItem("lsOriginalWord");
          this.nStartIndex =  JSON.parse(localStorage.getItem("lsStartIndex"));
          this.sStartString = this.sTextAreaValue.substring(0, this.nStartIndex);
          this.sEndString = this.sTextAreaValue.substring(this.nStartIndex, this.sTextAreaValue.length);
        }
        if(this.sEndString.includes(this.oOriginalValue))
        {
          console.log("Origianl value : ==> ", this.oOriginalValue);
          this.sEndString = this.sEndString.replace(this.oOriginalValue, data.word);
          console.log("End String : ==> ", this.sEndString);
        }
        this.sTextAreaValue = this.sStartString+this.sEndString;
        this.EditorMainSectionComponent_PassValueToTreeView();
      }
    });
  }
  
}
