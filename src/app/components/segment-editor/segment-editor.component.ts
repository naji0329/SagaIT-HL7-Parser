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
            this.scrollToAndExpandTarget(data.word)
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
        let isHeader = this.lineNumber == 0 && this.segmentHeader == "MSH"
        if (isHeader) {
            fields.unshift(this.segmentHeader);
            fields[1] = "|";
        }
        for (let field of this.HL7.fields) {
            if (fieldIndex > fields.length) break
            if (field.id == this.segmentHeader + "." + fieldIndex) {
                let index = fieldIndex
                temp.push({
                    value: fields[index],
                    r: "",
                    o: "",
                    len: String(fields[index] || "").length,
                    type: field.dataTypeName,
                    description: field.name,
                    children: this.getSubDetails(fields[index] || "", field)
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
    scrollToAndExpandTarget(targetValue: string): void {
        // Check main rows first
        let targetIndex = this.data.findIndex(item => item.value === targetValue);

        if (targetIndex !== -1) {
            this.expandedRows.clear()
            this.expandedRows.add(targetIndex); // Expand the main row

            this.oDataService.oField.next(this.data[targetIndex])
            // Scroll to the main row
            setTimeout(() => {
                const mainRowElement = document.querySelector(`tr[data-index='${targetIndex}']`);
                if (mainRowElement) {
                    mainRowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 0);
        } else {
            // Check subtable rows if not found in main rows
            this.data.forEach((item, mainIndex) => {
                if (item.children && item.children.length > 0) {
                    const subIndex = item.children.findIndex(subItem => subItem.value === targetValue);
                    if (subIndex !== -1) {
                        this.expandedRows.clear()
                        this.expandedRows.add(mainIndex); // Ensure the main row is expanded
                        this.oDataService.oField.next(this.data[mainIndex].children[subIndex])
                        // Scroll to the subtable row
                        setTimeout(() => {
                            const subRowElement = document.querySelector(`tr[data-main-index='${mainIndex}'][data-sub-index='${subIndex}']`);
                            if (subRowElement) {
                                subRowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }, 0);
                    }
                }
            });
        }
    }


}