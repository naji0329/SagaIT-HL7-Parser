import { Component, OnInit } from '@angular/core';
// import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  // onResizeEnd(event: ResizeEvent): void {
  //   console.log('Element was resized', event);
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
