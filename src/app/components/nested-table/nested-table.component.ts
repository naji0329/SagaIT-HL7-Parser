import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Segment } from 'src/app/type';

@Component({
    selector: 'app-tree',
    templateUrl: './nested-table.component.html',
    styleUrls: ['./nested-table.component.scss']
})
export class TreeComponent implements OnInit {
    @Input() treeData: Segment[] = [];
    @Input() onItemChange: (depth: number[], event: any) => void;
    expandedRows = new Set<number>();
    selectedDepth: number[] = [];
    lineNumber: number | 0;
    constructor(private oDataService: DataService) {

    }

    ngOnInit(): void {
        this.oDataService.oWordToSearch.subscribe(data => {
            try {
                this.expandedRows.clear()
                let depth = []
                if (data.word) {
                    console.log("!!!", data)
                    this.lineNumber = data.lineNumber
                    if (data.carrots == 0) {
                        depth = [data.bars]
                        this.oDataService.oField.next(this.treeData[data.bars])
                    }
                    else {
                        depth = [data.bars, data.carrots - 1]
                        this.oDataService.oField.next(this.treeData[data.carrots - 1])
                    }



                    setTimeout(() => {
                        const element = document.querySelector(`div[data-index='${depth.join(',')}']`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        this.selectRow(depth)
                    }, 0);
                }
            } catch (err) {

            }

        })
    }
    toggleRow(event: Event, index: number): void {
        event.stopPropagation()
        if (this.expandedRows.has(index)) {
            this.expandedRows.delete(index);
        } else {
            this.expandedRows.add(index);
        }
    }

    isEven(depth: number[]): boolean {
        return depth.reduce((prev, current) => prev + current + 1, 0) % 2 == 0
    }

    isSelected(depth: number[]): boolean {
        return (depth.join(',') == this.selectedDepth.join(','))
    }


    //selectRow
    selectRow(depth: number[]): void {
        this.selectedDepth = depth
        for (let i = 0; i < this.treeData.length; i++) {
            if (depth.join(',').includes(this.treeData[i].depth.join(',')))
                this.expandedRows.add(i)
        }
    }



}
