import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { saveAs as TreeViewSectionComponent_DownloadResultAsJSON }  from 'save-as';

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
  sSelectedTextId : string;
  constructor(private oDataService : DataService,) {  }


  ngOnInit(): void {
    this.sSelectedTextId="";
    this.TreeViewSectionComponent_DrawTreeView();
    this.TreeViewSectionComponent_FilterText();
  }
  TreeViewSectionComponent_ExportFile()
  {
    let oResults = new Blob([this.sIncommingText], { type: 'text;charset=utf-8' })
    TreeViewSectionComponent_DownloadResultAsJSON(oResults, 'message.hl7');
  }
  TreeViewSectionComponent_CopyToClipBoard()
  {
    navigator.clipboard.writeText(this.sIncommingText);
    this.bDisplayAlert = true;
    this.sText = "Successful copied to clipboard";
    setTimeout(() => {this.bDisplayAlert = false}, 3000);
  }
  TreeViewSectionComponent_ImportFile(event : any)
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
  TreeViewSectionComponent_DrawTreeView()
  {
    this.oIncommingTextSubscription = this.oDataService.sTreeViewData.subscribe(data=> 
    {
      this.sSelectedTextId="";
      this.lSecondLevelNesting=[];
      this.sIncommingText = data;
      this.lFirstLevelNesting = this.sIncommingText.split('\n');
      for (let nTreeNodeIndex = 0; nTreeNodeIndex < this.lFirstLevelNesting.length; nTreeNodeIndex++) 
      {
        const parent = this.lFirstLevelNesting[nTreeNodeIndex];
        if(parent !== "")
        {
          let oParentObject = 
          { 
            parentNode :  { collapsed : "", expanded: "" ,isCollapsed : true} ,  childNodes : []
          };
          oParentObject.parentNode.collapsed = parent;
          const child = this.TreeViewSectionComponent_SplitBasedOnBar(parent);

          for (let nChildIndex = 0; nChildIndex < child.length; nChildIndex++) 
          {
            if(nChildIndex==0)
            {
              oParentObject.parentNode.expanded = child[nChildIndex];
            }

            let oChildObject = 
            { 
              collapsed : "", expanded: "", isCollapsed : true,grandChild : [] 
            };
            const currentChild = child[nChildIndex];

            oChildObject.collapsed = currentChild;
            const grandChild = this.TreeViewSectionComponent_SplitBasedOnCap(currentChild);
            if(grandChild.length>1)
            {
              oChildObject.expanded = grandChild[0];
              oChildObject.grandChild = grandChild;
              //remove first grand child
              oChildObject.grandChild.splice(0,1);
            }
            else
            {
              oChildObject.expanded = currentChild;
              oChildObject.grandChild = [];
            }
            oParentObject.childNodes.push(oChildObject)
          }
          //remove first child
          oParentObject.childNodes.splice(0,1);
          this.lSecondLevelNesting.push(oParentObject);
        }
      }
      this.lSecondLevelNestingCopy = JSON.parse(JSON.stringify(this.lSecondLevelNesting));
      console.log("First level Nesting + Second Level Nesting : ==> ",this.lSecondLevelNesting);
      
    })
  }
  ToggleParentCollapsed(oIncommingParentNodeIndex : number)
  {
    this.lSecondLevelNesting[oIncommingParentNodeIndex].parentNode.isCollapsed = !this.lSecondLevelNesting[oIncommingParentNodeIndex].parentNode.isCollapsed;
  }
  ToggleChildCollapsed(oIncommingParentNodeIndex : number, oIncommingChildNodeIndex : number)
  {
    this.lSecondLevelNesting[oIncommingParentNodeIndex].childNodes[oIncommingChildNodeIndex].isCollapsed = !this.lSecondLevelNesting[oIncommingParentNodeIndex].childNodes[oIncommingChildNodeIndex].isCollapsed;
  }
  ToggleDisplay(sIncommingObjectID : string)
  {
    let item = document.getElementById(sIncommingObjectID);
    if(item)
    {
      if(item.classList.contains('d-none'))
      {
        item.classList.remove('d-none');
      }
      else
      {
        item.classList.add('d-none');
      }
    }
    console.log("Incomming Element ID : ==> ", sIncommingObjectID);
  }
  TreeViewSectionComponent_SplitBasedOnBar(sIncommingText : any)
  {
    let lSplittedList =  sIncommingText.split('|');
    for (let nChildIndex = 0; nChildIndex < lSplittedList.length; nChildIndex++) 
    {
      if(lSplittedList[nChildIndex] == "")
      {
        lSplittedList[nChildIndex] = "[empty]";
      }
    }
    return lSplittedList;
  }
  TreeViewSectionComponent_SplitBasedOnCap(sIncommingText : any)
  {
    let lSplittedList = sIncommingText.split('^');
    for (let nGrandChildIndex = 0; nGrandChildIndex < lSplittedList.length; nGrandChildIndex++) 
    {
      if(lSplittedList[nGrandChildIndex] == "")
      {
        lSplittedList[nGrandChildIndex] = "[empty]";
      }
    }
    return lSplittedList;
  }
  // Filter Text 
  TreeViewSectionComponent_FilterText()
  {
    this.oIncomingFilterText = this.oDataService.oWordToFilter.subscribe(data=> 
    {
      this.oIncomingFilterValue = data;
      console.log("Filtering The Value : ==> ", this.oIncomingFilterValue);
      this.TreeViewSectionComponent_DrawTreeView();
      this.TreeViewSectionComponent_Search(this.oIncomingFilterValue);
    })
  }
  TreeViewSectionComponent_Search(term: any) 
  {
    if(!term) 
    {
      this.lSecondLevelNesting = this.lSecondLevelNestingCopy;
    } 
    else 
    {
      term = term.toLowerCase();
      const lFilteredRecord = this.lSecondLevelNesting.filter(element => element.parentNode.collapsed.toLowerCase().includes(term));
      let lFirstLevelFiltering = lFilteredRecord;
      if(lFirstLevelFiltering)
      {
        for (let nFirstLevelFilterIndex = 0; nFirstLevelFilterIndex < lFirstLevelFiltering.length; nFirstLevelFilterIndex++) 
        {
          let currentNode = lFirstLevelFiltering[nFirstLevelFilterIndex];
          for (let nChildNodesFilterIndex = 0; nChildNodesFilterIndex < currentNode.childNodes.length; nChildNodesFilterIndex++) 
          {
            let currentChildNode = currentNode.childNodes[nChildNodesFilterIndex];
            // console.log("Child : ==> ", currentChildNode);
            if(currentChildNode.collapsed.toLowerCase().includes(term))
            {
              // console.log("Child Node Found : ==> ", currentChildNode);
              for (let nGrandChildFilterIndex = 0; nGrandChildFilterIndex < currentChildNode.grandChild.length; nGrandChildFilterIndex++) 
              {
                let currentGrandChildNode = currentChildNode.grandChild[nGrandChildFilterIndex];
                // console.log("Grand Child Node : ==> ", currentGrandChildNode);
                if (currentGrandChildNode.toLowerCase().includes(term)) 
                {
                  // console.log("Grand child found : ==> ", currentGrandChildNode);
                }
                else
                {
                  lFirstLevelFiltering[nFirstLevelFilterIndex].childNodes[nChildNodesFilterIndex].grandChild[nGrandChildFilterIndex] = "";
                }
              }
            }
            else
            {
              lFirstLevelFiltering[nFirstLevelFilterIndex].childNodes[nChildNodesFilterIndex]=[];
            }
          }
        }
        console.log("First level filtering",lFirstLevelFiltering);
        this.lSecondLevelNesting = lFirstLevelFiltering;
      }
    }
  }
  TreeViewSectionComponent_CalculateHeaders(sIncommingHeader : string ,sIncommingWord : string ,nIncommingBarsCount : number ,nIncommignCarrotsCount : number,nIncommingSelectedLineIndex : number, bIncommingFocus  : boolean)
  {
    let word = sIncommingWord.includes("|") || sIncommingWord.includes("^") || sIncommingWord.includes("[empty]")?"":sIncommingWord;
    this.oDataService.oWordToSearch.next({header : sIncommingHeader, word : word, bars: nIncommingBarsCount, carrots: nIncommignCarrotsCount, focus: bIncommingFocus});
    localStorage.setItem("lsSelectedView", 'treeview');
    if(!bIncommingFocus)
    {
      this.TreeViewSectionComponent_SetStringIndexes(nIncommingSelectedLineIndex,nIncommingBarsCount,nIncommignCarrotsCount,sIncommingWord);
    }
  }

  TreeViewSectionComponent_SetStringIndexes(nIncommingSelectedLineIndex : number,nIncommingBarsCount : number,nIncommignCarrotsCount : number, sIncommingWord : string)
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
