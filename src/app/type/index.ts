export type Segment = {
    value: string | undefined;
    r: string | undefined;
    o: string | undefined;
    len: number | 0;
    description: string | 0;
    type: string;
    children?: Segment[] | undefined;
    tableName?: string;
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
}

export type UpdatedSegment = {
    lineNumber: number | 0;
    message: string | undefined;
}
export type Table_Value = {
    table_value: string;
    display_name: string;
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