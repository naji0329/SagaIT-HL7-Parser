export type Segment = {
    value: string | undefined;
    r: string | undefined;
    o: string | undefined;
    len: string | undefined;
    description: string | 0;
    type: string;
    children?: Segment[] | undefined;
    tableName?: string;
    anchor?: string | null;
    expanded: boolean
    dataTypeName?: string | null
    contents?: string | null,
    header?: string | null,
    depth?: number[] | [],


}

export type Field = {
    id: string;
    name: string;
    type: string;
    seg: string;
    length: number | 0;
    datatype: string;
    desc: string;
    dataTypeName: string;
    tableId: string | null;
    tableName: string | null;
    anchor: string | null;
}

export type UpdatedSegment = {
    lineNumber: number | 0;
    message: string | undefined;
}

export type UpdateValue = {
    newValue: string | undefined;
    depth: number[] | []
}

export type Table_Value = {
    table_value: string;
    display_name: string;
    anchor?: string | null;
}
export type Table = {
    table_id: string;
    table_name: string;
    type: string;
    anchor: string;
    section: string;
    table_values: Table_Value[

    ]
}

export type HL7_Event = {
    event_code: string,
    seq_no: number | string,
    message_typ_snd: string,
    message_typ_return: string,
    message_structure_snd: string,
    message_structure_return: string,
    section: string,
    description: string,
    anchor: string,
}
