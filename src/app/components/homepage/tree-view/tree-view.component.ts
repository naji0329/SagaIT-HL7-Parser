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
  sIncommingText : string;
  lFirstLevelNesting : any = [];
  lSecondLevelNesting : any = [];
  lThirdLevelNesting : any = [];
  
  constructor(private oDataService : DataService,) {  }


  ngOnInit(): void {
    this.TreeSiewSectionComponent_DrawTreeView();
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
          }
  
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
    console.log("Toggle display : ==> ", item);
  }
  splitBasedOnBar(sIncommingText : any)
  {
    return sIncommingText.split('|');
  }
  splitBasedOnCap(sIncommingText : any)
  {
    return sIncommingText.split('^');

  }
}
