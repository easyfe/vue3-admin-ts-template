import { RouteLocation, RouteMeta, RouteRecordName } from "vue-router";

//类型覆盖方法，后面覆盖前面的
export type Override<P, S> = Omit<P, keyof S> & S;

interface RouteMetaAll extends RouteMeta {
    sort?: number;
    hidden?: boolean;
    title?: string;
    icon?: string;
    keepAliveName?: string;
    key?: string;
    navTag?: boolean;
    cache?: boolean;
    parentName?: string;
    permission?: () => boolean;
}

export interface RouteConfig {
    path: string;
    name?: RouteRecordName | null;
    children?: RouteConfig[];
    redirect?: string | RouteLocation;
    alias?: string | string[];
    meta?: RouteMetaAll;
    hash?: string;
    fullPath?: RouteLocation["fullPath"];
    query?: RouteLocation["query"];
    params?: RouteLocation["params"];
    component?: any;
}

export type _TouchEvent = TouchEvent & {
    _isScroller?: boolean;
};
