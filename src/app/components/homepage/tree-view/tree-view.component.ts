import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { saveAs as TreeSiewSectionComponent_DownloadResultAsJSON }  from 'save-as';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  
})
export class TreeViewComponent implements OnInit, OnDestroy {
  bDisplayAlert: boolean = false;
  sText: string = "";
  fileUrl: any = "";

  oIncommingTextSubscription : any;
  sIncommingText : any;
  lFirstLevelNesting : any = [];
  lSecondLevelNesting : any = [];
  lThirdLevelNesting : any = [];
  oIncomingFilterValue : any;
  oIncomingFilterText : any;
  filterData : any;
  lSecondLevelNestingCopy : any = [];
  constructor(private oDataService : DataService,) {  }


  ngOnInit(): void {
    this.TreeSiewSectionComponent_DrawTreeView();
    this.TreeSiewSectionComponent_FilterText();
  }
  fileDownload()
  {
    const link = document.createElement('a');
    link.href = this.fileUrl;
    link.setAttribute('download', 'message.hl7');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  TreeSiewSectionComponent_ExportFile()
  {
    let oResults = new Blob([this.sIncommingText], { type: 'text;charset=utf-8' })
    TreeSiewSectionComponent_DownloadResultAsJSON(oResults, 'message.hl7');
  }
  TreeSiewSectionComponent_CopyToClipBoard()
  {
    navigator.clipboard.writeText(this.sIncommingText);
    this.bDisplayAlert = true;
    this.sText = "Successful copied to clipboard";
    setTimeout(() => {this.bDisplayAlert = false}, 3000);
  }
  TreeSiewSectionComponent_ImportFile(event : any)
  {
    let file = event.target.files[0];
    if(file)
    {
      const reader = new FileReader();
      reader.onload = (e)=>
      {
        let file = e.target.result;
        this.sIncommingText = file;
        this.oDataService.sTreeViewData.next(this.sIncommingText);
      }
      reader.readAsText(file);
    }
  }
  ngOnDestroy(){
    this.oIncommingTextSubscription.unsubscribe();
    this.oIncomingFilterText.unsubscribe();
  }
  TreeSiewSectionComponent_DrawTreeView()
  {
    this.oIncommingTextSubscription = this.oDataService.sTreeViewData.subscribe(data=> 
    {
      this.lSecondLevelNesting=[];
      this.sIncommingText = data;
      this.lFirstLevelNesting = this.sIncommingText.split('\n');
      for (let nTreeNodeIndex = 0; nTreeNodeIndex < this.lFirstLevelNesting.length; nTreeNodeIndex++) 
      {
        const parent = this.lFirstLevelNesting[nTreeNodeIndex];
        if(parent !== "")
        {
          let obj = 
          { 
            parentNode :  "" , childNodes : []
          };
          obj.parentNode = parent;
          const child = this.splitBasedOnBar(parent);
          for (let nChildIndex = 0; nChildIndex < child.length; nChildIndex++) 
          {
            const currentChild = child[nChildIndex];
            const grandChild = this.splitBasedOnCap(currentChild);
            obj.childNodes.push({ node : currentChild, grandChildNodes : grandChild })
          }
  
          this.lSecondLevelNesting.push(obj);
          this.lSecondLevelNestingCopy = this.lSecondLevelNesting;
        }
      }
      console.log("First level Nesting + Second Level Nesting : ==> ",this.lSecondLevelNesting);
      
    })
  }
  toggleDisplay(sIncommingObjectID : string)
  {
    let item = document.getElementById(sIncommingObjectID);
    if(item.classList.contains('d-none'))
    {
      item.classList.remove('d-none');
    }
    else
    {
      item.classList.add('d-none');
    }
    console.log("Incomming Element ID : ==> ", sIncommingObjectID);
  }
  splitBasedOnBar(sIncommingText : any)
  {
    let lSplittedList =  sIncommingText.split('|');
    for (let nChildIndex = 0; nChildIndex < lSplittedList.length; nChildIndex++) 
    {
      if(lSplittedList[nChildIndex] == "")
      {
        lSplittedList[nChildIndex] = "|";
      }
    }
    return lSplittedList;
  }
  splitBasedOnCap(sIncommingText : any)
  {
    let lSplittedList = sIncommingText.split('^');
    for (let nGrandChildIndex = 0; nGrandChildIndex < lSplittedList.length; nGrandChildIndex++) 
    {
      if(lSplittedList[nGrandChildIndex] == "|" || lSplittedList[nGrandChildIndex] == "")
      {
        lSplittedList[nGrandChildIndex] = "[empty]";
      }
    }
    return lSplittedList;
  }
  // Filter Text 
  TreeSiewSectionComponent_FilterText()
  {
    this.oIncomingFilterText = this.oDataService.oWordToFilter.subscribe(data=> 
    {
      this.oIncomingFilterValue = data;
      console.log("Filtering The Value : ==> ", this.oIncomingFilterValue);
      this.search(this.oIncomingFilterValue);
    })
  }
  search(term: any) {
    if(!term) {
      this.lSecondLevelNesting = this.lSecondLevelNestingCopy;
    } else {
      term = term.toLowerCase();
      this.filterData = this.lSecondLevelNesting.filter(element => element.parentNode.toLowerCase().includes(term));
      this.lSecondLevelNesting = this.filterData;
    }
  }
  CalculateHeaders(sIncommingHeader : string ,sIncommingWord : string ,nIncommingBarsCount : number ,nIncommignCarrotsCount : number,nIncommingSelectedLineIndex : number, bIncommingFocus  : boolean)
  {
    let word = sIncommingWord.includes("|") || sIncommingWord.includes("^") || sIncommingWord.includes("[empty]")?"":sIncommingWord;
    this.oDataService.oWordToSearch.next({header : sIncommingHeader, word : word, bars: nIncommingBarsCount, carrots: nIncommignCarrotsCount, focus: bIncommingFocus});
    localStorage.setItem("lsSelectedView", 'treeview');
    if(!bIncommingFocus)
    {
      this.SetStringIndexes(nIncommingSelectedLineIndex,nIncommingBarsCount,nIncommignCarrotsCount,sIncommingWord);
    }
  }

  SetStringIndexes(nIncommingSelectedLineIndex : number,nIncommingBarsCount : number,nIncommignCarrotsCount : number, sIncommingWord : string)
  {
    let nBreakPointIndex = 0;
    let lSplittedList = this.sIncommingText.split('\n');
    const sSelectedLine = lSplittedList[nIncommingSelectedLineIndex];
    console.log("Selected Line : ==> ", sSelectedLine);
    // console.log("Selected Line Length : ==> ", sSelectedLine.length);
    //Find cursor position of selected line
    for (let nStringToSplitIndex = 0; nStringToSplitIndex <= sSelectedLine.length; nStringToSplitIndex++) 
    {
      if(nIncommingBarsCount == 0 && nIncommignCarrotsCount == 0){break;}
      const sCurrentCharacter = sSelectedLine[nStringToSplitIndex];
      if(sCurrentCharacter=="|"){nIncommingBarsCount==0?nIncommingBarsCount:nIncommingBarsCount--;}
      if(sCurrentCharacter=="^"){nIncommignCarrotsCount==0?nIncommignCarrotsCount:nIncommignCarrotsCount--;}
      // console.log("BAr count : ==> ",nIncommingBarsCount)
      // console.log("Carrots count : ==> ",nIncommignCarrotsCount)
      nBreakPointIndex++;
    }
    console.log("Break point index : ==> ", nBreakPointIndex);
    //calculate cursor position in all lines
    let nFirstStringIndex = 0;
    for (let nConcatStringIndex = 0; nConcatStringIndex < nIncommingSelectedLineIndex; nConcatStringIndex++) 
    {
      const nCurrentLineLength = this.lFirstLevelNesting[nConcatStringIndex].length+1;
      // console.log("Curent line index : ==> ", nCurrentLineLength);
      nFirstStringIndex = nFirstStringIndex + nCurrentLineLength;
    }
    nFirstStringIndex = nFirstStringIndex + nBreakPointIndex;
    // console.log("First string index : ==> ", nFirstStringIndex);
    localStorage.setItem('lsOriginalWord', sIncommingWord);
    localStorage.setItem('lsStartIndex', JSON.stringify(nFirstStringIndex));
    // let sStartString = this.sIncommingText.substring(0, nFirstStringIndex);
    // let sEndString= this.sIncommingText.substring(nFirstStringIndex, this.sIncommingText.length);
    // console.log("Start String : ==> ",sStartString);
    // console.log("End String : ==> ",sEndString);
  }
}
