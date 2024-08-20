import { Component, Input } from '@angular/core';
import { Segment } from 'src/app/type';

@Component({
    selector: 'app-tree',
    templateUrl: './nested-table.component.html',
    styleUrls: ['./nested-table.component.scss']
})
export class TreeComponent {
    @Input() treeData: Segment[] = [];
    expandedRows = new Set<number>();
    currentRow: number | null = null;
    currentSubRow: number = -1;

    toggleRow(index: number): void {
        if (this.expandedRows.has(index)) {
            this.expandedRows.delete(index);
        } else {
            this.expandedRows.add(index);
        }
        this.currentRow = index;
    }

    onItemChange(index: number, event: any): void {
        // Implement logic to handle changes to the input field
        console.log(`Item at index ${index} changed to: ${event} ${this.treeData[index].header}`);
    }
}
