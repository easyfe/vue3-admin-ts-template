import router from "@/packages/vue-router/index";
import { dush } from "@/utils/tools/event-bus";
let timer: any = null;

// 定位错误位置提示到指定元素
export function triggError(id: string, parentEle = ".the-right"): void {
    nextTick(() => {
        clearTimeout(timer);
        const el = document?.querySelector(parentEle)?.querySelector(id) as HTMLElement;
        el && el.scrollIntoView({ block: "center" });
        const currClass = el?.getAttribute("class") || "";
        if (!currClass?.includes("trigg-error")) el?.setAttribute("class", currClass.concat(" trigg-error"));
        timer = setTimeout(() => {
            const afterClass = (el?.getAttribute("class") || "")?.replace(/\s*trigg-error/g, "");
            el?.setAttribute("class", afterClass);
        }, 2000);
    });
}
