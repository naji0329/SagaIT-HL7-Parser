import { Component, OnInit } from "@angular/core";
import { Field, Segment } from "src/app/type";

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
    lineNumber: number | 0;
    constructor(private oDataService: DataService) {

    }
    ngOnInit(): void {
        this.oDataService.oWordToSearch.subscribe(data => {

            this.segmentHeader = data.header
            this.HL7 = HL7VERSION2_9_1;

            this.lineNumber = data.lineNumber;

            let message = data.message || "";
            let fieldIndex = 1;
            let fields = message.split("|");

            console.log("Incomming word for segment editor: ==> ", fields);
            //get detail for segment editor
            this.data = this.getSegmentDetails(fields, fieldIndex)

        })
    }

    getSubDetails(message: any, field: Field): any {
        for (let data_type of this.HL7.data_types) {
            if (data_type.id == field.dataTypeName) {
                console.log("data type len", data_type?.fields?.length, field.dataTypeName, message)
                if (data_type.fields == undefined || data_type.fields.length == 1) break;
                let result = []
                let sub_fields = message.split("^")
                for (let i = 0; i < data_type.fields.length; i++) {
                    result.push({
                        value: sub_fields[i] || "",
                        r: "",
                        o: "",
                        len: String(sub_fields[i] || "").length,
                        type: data_type.fields[i].dataTypeName,
                        description: data_type.fields[i].name,
                        children: []
                    })
                }
                return result

            }
        }

    }



    getSegmentDetails(fields: any[], fieldIndex: number): any {
        let temp = []

        for (let field of this.HL7.fields) {
            if (fieldIndex > fields.length) break
            if (field.id == this.segmentHeader + "." + fieldIndex) {
                temp.push({
                    value: fields[fieldIndex - 1],
                    r: "",
                    o: "",
                    len: String(fields[fieldIndex - 1] || "").length,
                    type: field.dataTypeName,
                    description: field.name,
                    children: this.getSubDetails(fields[fieldIndex - 1], field)
                })
                fieldIndex++
            }
        }
        return temp;

    }
    toggleRow(index: number) {
        if (this.expandedRows.has(index)) {
            this.expandedRows.delete(index);
        } else {
            this.expandedRows.add(index);
        }
    }
    generateMessage(): void {
        const message = this.data.map(segment => {
            if (segment.children && segment.children.length > 1) {
                const childValues = segment.children?.map(child => child.value || "") || [];
                // Remove trailing empty values
                while (childValues.length > 0 && !childValues[childValues.length - 1]) {
                    childValues.pop();
                }
                const childString = childValues.join("^");
                return childString
            }
            else return segment.value
        }).join("|");

        this.oDataService.oUpdatedSegement.next({
            lineNumber: this.lineNumber,
            message: message
        })

    }
    onItemChange(index: number, newValue: any) {
        this.data[index].value = newValue;
        this.generateMessage();



        // Perform any additional actions here, such as updating other data or making API calls
    }
    onSubItemChange(index1: number, index2: number, newValue: any) {
        this.data[index1].children[index2].value = newValue;
        this.generateMessage();

        // Perform any additional actions here, such as updating other data or making API calls
    }


}