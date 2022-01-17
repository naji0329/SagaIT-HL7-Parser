import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  bDisplayAlert: boolean = false;
  sText: string = "";
  fileUrl: any = "";

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.ResizePanels()
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  CopyToClipBoard()
  {
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
 
  ResizePanels()
  {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.text = `
    /*Make resizable div by Hung Nguyen*/
    function makeResizableDiv(div) {
      const element = document.querySelector(div);
      let resizers = document.querySelectorAll(div + ' .re-panel')
      const minimum_size = 20;
      let original_height = 0;
      let original_y = 0;
      let original_mouse_y = 0;
      for (let i = 0;i < resizers.length; i++) {
        let currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function(e) {
          e.preventDefault()
          original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
          original_y = element.getBoundingClientRect().top;
          original_mouse_y = e.pageY;
          window.addEventListener('mousemove', resize)
          window.addEventListener('mouseup', stopResize)
        })        
        function resize(e) {
          if (currentResizer.classList.contains('bottom-right')) {
            const height = original_height + (e.pageY - original_mouse_y)
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          }
        }
        function stopResize() {
          window.removeEventListener('mousemove', resize)
        }
      }
    }
    makeResizableDiv('.resize-edit-panels')
    
    `;
    document.body.appendChild(chatScript);
  }

}
