import { Component, OnInit } from "@angular/core";
import { Segment } from "src/app/type";

import HL7VERSION2_9_1 from '../../../assets/standard_profiles/version_2_9_1/version_2_9_1.json';
import { DataService } from "src/app/services/data.service";


@Component({
    selector: "segment-editor",
    templateUrl: "./segment-editor.component.html",
    styleUrls: ["./segment-editor.component.scss"]
})

export class SegmentEditorCompoent implements OnInit {
    HL7: any;
    data: Segment[];
    segmentHeader: string;
    expandedRows: Set<number> = new Set();

    constructor(private oDataService: DataService) {
        // this.segmentHeader = "MSH"
        // this.data = [
        //     {
        //         value: "|",
        //         r: "",
        //         o: "",
        //         len: 0,
        //         description: "Field Separator",
        //     },
        //     {
        //         value: "20090101010000",
        //         r: "",
        //         o: "",
        //         len: 0,
        //         description: "Street",
        //         children: [
        //             {
        //                 value: "20090101010000",
        //                 r: "",
        //                 o: "",
        //                 len: 0,
        //                 description: "Street",
        //             },
        //             {
        //                 value: "20090101010000",
        //                 r: "",
        //                 o: "",
        //                 len: 0,
        //                 description: "Street",
        //             }
        //         ]
        //     }
        // ]
    }
    // getSegmentDetails(field)
    ngOnInit(): void {
        this.oDataService.oWordToSearch.subscribe(data => {
            console.log("Incomming word : ==> ", data);
            this.segmentHeader = data.header
            this.HL7 = HL7VERSION2_9_1;

            let message = data.message;
            let fieldIndex = 1;
            let fields = message.split("|");
            for (let field of this.HL7.fields) {
                if (fieldIndex > fields.length) break;
                if (field.id == this.segmentHeader + "." + fieldIndex) {

                }
            }


            // if (data.header !== "") {
            //     this.SidebarComponent_ExtractHeaderDetails(data);
            //     this.bDisplayPDFError = false;
            //     this.bDisplayImageError = false;
            // }
        })
    }

    toggleRow(index: number) {
        if (this.expandedRows.has(index)) {
            this.expandedRows.delete(index);
        } else {
            this.expandedRows.add(index);
        }
    }
}