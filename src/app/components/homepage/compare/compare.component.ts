import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  bDisplayAlert: boolean = false;
  sText: string ="";
  fileUrl: any;
@Output() EditorTab = new EventEmitter
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  CopyToClipBoard(inputElement : any)
  {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.bDisplayAlert = true
    this.sText = "Successful copied to clipboard"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }
  Compared()
  {
    this.bDisplayAlert = true
    this.sText = "Successful Compared. See the results in compare tab"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }
  NavigateToEditorTab()
  {
    this.EditorTab.emit()
  }
 

}
