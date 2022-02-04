import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tree-view-section',
  templateUrl: './tree-view-section.component.html',
  styleUrls: ['./tree-view-section.component.scss']
})
export class TreeSiewSectionComponent implements OnInit, OnDestroy {
  bDisplayAlert: boolean = false;
  sText: string = "";
  messageHeaderPane: any = "No segement selected";
  badgeData: any;
  message: any;
  pane1 : any = "No file selected or unknown"
  fileUrl: any = "";

  oIncommingTextSubscription : any;
  sIncommingText : string;
  lFirstLevelNesting : any = [];
  lSecondLevelNesting : any = [];
  lThirdLevelNesting : any = [];



  constructor( private oDataService : DataService,) { }
  
  ngOnInit(): void {
    this.TreeSiewSectionComponent_DrawTreeView();
  }
  ngOnDestroy(){this.oIncommingTextSubscription.unsubscribe();}
  TreeSiewSectionComponent_DrawTreeView()
  {
    this.oIncommingTextSubscription = this.oDataService.sTreeViewData.subscribe(data=> 
    {
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
            
            // obj.grandChildNodes = grandChild;
          }
          // obj.childNodes.unshift()
          // for (let nGrandChildIndex = 0; nGrandChildIndex < child.length; nGrandChildIndex++) 
          // {
          //   const currentChild = child[nGrandChildIndex];
          //   const grandChild = this.splitBasedOnCap(currentChild);
          //   obj.grandChildNodes = grandChild;
          // }
  
          this.lSecondLevelNesting.push(obj);
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
    console.log("Taggle display : ==> ", item);
  }
  splitBasedOnBar(sIncommingText : any)
  {
    // console.log("Selected text : ==>", sIncommingText);
    return sIncommingText.split('|');
    // console.log("Text after split  : ==>", split);

  }
  splitBasedOnCap(sIncommingText : any)
  {
    // console.log("Selected text : ==>", sIncommingText);
    return sIncommingText.split('^');
    // console.log("Text after split  : ==>", split);

  }

  CopyToClipBoard()
  {
    this.bDisplayAlert = true
    this.sText = "Successful copied to clipboard"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }

}
