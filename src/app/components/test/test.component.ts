import { Component, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ThemesService } from 'src/app/services/themes.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  bDisplayChild1: boolean = false;
 
  constructor(private service : ThemesService) {}
  
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  ngOnInit(): void {
    this.items = this.service.getBooks();
}
  onFilterChange(value: string) {
    console.log('filter:', value);
}
DisplayChild1()
{
  this.bDisplayChild1 =  !this.bDisplayChild1
}
}
