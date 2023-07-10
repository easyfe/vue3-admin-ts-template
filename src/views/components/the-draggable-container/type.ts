export type SetMatchedLine = (matchedLine: MatchedLine | null) => void;

export interface MatchedLine {
    row: { top: number; left: number; width: number }[];
    col: { top: number; left: number; height: number }[];
}

export interface Position {
    _id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    active: boolean;
}

export interface PositionStore {
    [propName: string]: Position;
}

export type UpdatePosition = (id: string, position: Position) => void;

export type GetPositionStore = (excludeId?: string) => PositionStore;

export interface ContainerProvider {
    updatePosition: UpdatePosition;
    getPositionStore: GetPositionStore;
    setMatchedLine: SetMatchedLine;
    disabled: Ref<boolean>;
    adsorbParent: Ref<boolean>;
    adsorbCols: number[];
    adsorbRows: number[];
}

export interface CoordsDetail {
    topLeft: {
        x: number;
        y: number;
    };
    topRight: {
        x: number;
        y: number;
    };
    bottomLeft: {
        x: number;
        y: number;
    };
    bottomRight: {
        x: number;
        y: number;
    };
    center: {
        x: number;
        y: number;
    };
}
