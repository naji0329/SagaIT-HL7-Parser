import { Component, OnInit } from "@angular/core";
import { Field, Segment } from "src/app/type";

import HL7VERSION2_9 from "../../../assets/standard_profiles/version_2_9/version_2_9.json";
import { DataService } from "src/app/services/data.service";
import { getAnchor } from "src/app/utils";

@Component({
  selector: "segment-editor",
  templateUrl: "./segment-editor.component.html",
  styleUrls: ["./segment-editor.component.scss"],
})
export class SegmentEditorCompoent implements OnInit {
  HL7: any;
  data: Segment[];
  segmentHeader: string;
  expandedRows: Set<number> = new Set();
  lineNumber: number | 0;
  currentRow: number;
  currentSubRow: number;
  constructor(private oDataService: DataService) {
    this.currentRow = -1;
    this.currentSubRow = -1;
  }
  ngOnInit(): void {
    this.oDataService.oWordToSearch.subscribe((data) => {
      this.segmentHeader = data.header;
      this.HL7 = HL7VERSION2_9;

      this.lineNumber = data.lineNumber;

      let message = data.message || "";
      let fieldIndex = 1;
      let fields = message.split("|");

      console.log("Incomming word for segment editor: ==> ", fields);
      //get detail for segment editor
      this.data = this.getSegmentDetails(fields, fieldIndex);
      // this.scrollToAndExpandTarget(data.word)
    });
  }

  getSubDetails(message: any, field: Field, depth: number[]): any {
    for (let data_type of this.HL7.data_types) {
      if (data_type.id == field.dataTypeName) {
        if (data_type.fields == undefined || data_type.fields.length <= 1) {
          // console.log("Segment details: break;", data_type.fields);
          break;
        }

        let result = [];
        let sub_fields = message.split("^");
        for (let i = 0; i < data_type.fields.length; i++) {
          const d = getAnchor(this.HL7, data_type.fields[i].dataTypeName);
          // console.log(
          //   "Segment details:return;",
          //   message,
          //   i,
          //   sub_fields[i] || "",
          //   data_type.fields[i].dataTypeName
          // );
          const new_depth = [...depth, i];
          result.push({
            value: sub_fields[i] || "",
            r: "",
            o: "",
            // len: String(sub_fields[i] || "").length,
            type: data_type.fields[i].dataTypeName,
            description: data_type.fields[i].name,
            children:
              data_type.id == data_type.fields[i].dataTypeName
                ? []
                : this.getSubDetails(
                    sub_fields[i] || "",
                    data_type.fields[i],
                    new_depth
                  ),
            // children: [],
            header: field.dataTypeName,
            tableName: data_type.fields[i].tableName,
            anchor: d ? d.anchor : null,
            depth: new_depth,
          });
        }
        return result;
      }
    }
  }

  getSegmentDetails(fields: any[], fieldIndex: number): any {
    let temp = [];
    let isHeader = this.lineNumber == 0 && this.segmentHeader == "MSH";
    if (isHeader) {
      fields.unshift(this.segmentHeader);
      fields[1] = "|";
    }
    for (let field of this.HL7.fields) {
      if (fieldIndex > fields.length) break;
      if (field.id == this.segmentHeader + "." + fieldIndex) {
        let index = fieldIndex;
        let d = getAnchor(this.HL7, field.dataTypeName);
        temp.push({
          value: fields[index],
          r: field.req_opt == "R" ? "R" : null,
          o: field.req_opt == "O" ? "O" : null,
          type: field.dataTypeName,
          description: field.name,
          children: this.getSubDetails(fields[index] || "", field, [
            fieldIndex,
          ]),
          tableName: field.tableName,
          anchor: d ? d.anchor : null,
          header: this.segmentHeader,
          depth: [fieldIndex],
          len:
            field.min_length && field.max_length
              ? `${field.min_length}...${field.max_length}`
              : null,

          req_opt: field.req_opt,
        });
        fieldIndex++;
      }
    }
    console.log("Segment details", temp);
    return temp;
  }

  generateMessage(): void {
    const t = [...this.data];
    if (this.segmentHeader == "MSH") t.shift();

    const message = t
      .map((segment) => {
        if (segment.children && segment.children.length >= 1) {
          const childValues =
            segment.children?.map((child) => child.value || "") || [];
          // Remove trailing empty values
          while (
            childValues.length > 0 &&
            !childValues[childValues.length - 1]
          ) {
            childValues.pop();
          }
          const childString = childValues.join("^");
          return childString;
        } else return segment.value;
      })
      .join("|");

    this.oDataService.oUpdatedSegement.next({
      lineNumber: this.lineNumber,
      message: this.segmentHeader + "|" + message,
    });
  }
  onItemChange = (depth: number[], event: any): void => {
    if (depth.length > 0) {
      depth[0] = depth[0] - 1;
      console.log("!!!", depth, event.target.value, this.data);
      let t_data = this.data;
      let i = 0;
      for (i = 0; i < depth.length - 1; i++) {
        t_data = t_data[depth[i]].children;
      }
      t_data[depth[i]].value = event.target.value;

      this.generateMessage();
    }
  };
}
