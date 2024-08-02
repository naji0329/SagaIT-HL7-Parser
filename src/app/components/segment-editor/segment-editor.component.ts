import { Component, OnInit } from "@angular/core";

@Component({
    selector: "segment-editor",
    templateUrl: "./segment-editor.component.html",
    styleUrls: ["./segment-editor.component.scss"]
})
export class SegmentEditorCompoent implements OnInit {
    data: any = [];
    expandedRows: Set<number> = new Set();

    constructor() {
        this.data = [{
            col1: 'Row 1 Col 1',
            col2: 'Row 1 Col 2',
            col3: 'Row 1 Col 3',
            children: [
                { detail: 'Row 1 Sub-row 1' },
                { detail: 'Row 1 Sub-row 2' }
            ]
        },
        {
            col1: 'Row 2 Col 1',
            col2: 'Row 2 Col 2',
            col3: 'Row 2 Col 3',
            children: [
                { detail: 'Row 2 Sub-row 1' },
                { detail: 'Row 2 Sub-row 2' }
            ]
        },
        {
            col1: 'Row 3 Col 1',
            col2: 'Row 3 Col 2',
            col3: 'Row 3 Col 3',
            children: [
                { detail: 'Row 3 Sub-row 1' },
                { detail: 'Row 3 Sub-row 2' }
            ]
        }
        ];
    }

    ngOnInit(): void {

    }
    toggleRow(index: number) {
        if (this.expandedRows.has(index)) {
            this.expandedRows.delete(index);
        } else {
            this.expandedRows.add(index);
        }
    }
}