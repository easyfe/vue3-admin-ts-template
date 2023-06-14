import { RouteLocation, RouteMeta } from "vue-router";

//类型覆盖方法，后面覆盖前面的
export type Override<P, S> = Omit<P, keyof S> & S;

interface RouteMetaAll extends RouteMeta {
    sort?: number;
    hidden?: boolean;
    title?: string;
    icon?: string;
    keepAliveName?: string;
}

export interface RouteConfig {
    path: string;
    name?: string | symbol;
    children?: RouteConfig[];
    redirect?: string | RouteLocation;
    alias?: string | string[];
    meta?: RouteMetaAll;
    hash?: string;
    fullPath?: RouteLocation["fullPath"];
    query?: RouteLocation["query"];
    params?: RouteLocation["params"];
    component?: any;
    permission?: () => boolean;
}

export type _TouchEvent = TouchEvent & {
    _isScroller?: boolean;
};

/** base-list组件使用 */
export type BaseListReq = {
    fn: (params: BaseListReqPrams) => Promise<any>;
    params?: BaseListReqPrams;
};
export type BaseListReqPrams = Record<string, any> & {
    type?: number;
    page?: number;
    size?: number;
};

/** base-tabs组件使用 */
export type BaseTab = {
    label: string | number;
    value: string | number;
};

/** base-card组件使用 */
export interface CardProp {
    wrapperClass?: IProp;
    header?: Header;
    columns: CellProps;
}
interface IProp {
    [key: string]: any;
}

type CellProps = Array<CellItem>;

interface CellItem {
    height?: string | number;
    isPhone?: boolean;
    label?: string;
    value?: string;
    tag?: string;
    labelClass?: IProp;
    valueClass?: IProp;
    longValue?: boolean;
    icon?: IconProp;
    button?: string;
    buttonClass?: IProp;
    buttonCallBack?: () => void;
}

interface IconProp {
    url: string;
    width: string | number;
    height: string | number;
}

interface Header {
    title: string;
    icon?: IconProp;
    tip?: string;
    height?: string | number;
}

export interface GeoLocationType {
    module?: string;
    latlng: {
        lat: number;
        lng: number;
    };
    poiaddress?: string;
    poiname?: string;
    cityname?: string;
}
export interface TabProp {
    id: string | number | null;
    name: string;
}
