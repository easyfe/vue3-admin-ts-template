/* eslint-disable */
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "vue-plyr";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
