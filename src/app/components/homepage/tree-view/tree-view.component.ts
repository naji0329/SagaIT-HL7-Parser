import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
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
  CopyToClipBoard()
  {
    this.bDisplayAlert = true
    this.sText = "Successful copied to clipboard"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
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
  CalculateHeaders(sIncommingHeader : string ,sIncommingWord : string ,nIncommingBarsCount : number ,nIncommignCarrotsCount : number)
  {
    let word = sIncommingWord.includes("|") || sIncommingWord.includes("^") || sIncommingWord.includes("[empty]")?"":sIncommingWord;
    this.oDataService.oWordToSearch.next({header : sIncommingHeader, word : word, bars: nIncommingBarsCount, carrots: nIncommignCarrotsCount, focus: false});
    localStorage.setItem("lsSelectedView", 'treeview');
  }
}
