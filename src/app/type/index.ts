export type Segment = {
    value: string | undefined;
    r: string | undefined;
    o: string | undefined;
    len: number | 0;
    description: string | 0;
    children?: Segment[] | undefined;
}