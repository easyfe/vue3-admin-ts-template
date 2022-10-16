import storeDecoration from "@/config/pinia/store-decoration";
import router from "@/packages/vue-router/index";
import { dush } from "@/utils/tools/event-bus";
let timer: any = null;

// 跳转并显示可视化组件 edit 组件
export function redirectToComponent(componentId: string): void {
    const route = router?.currentRoute?.value;
    if (storeDecoration().GET_SCENE_COMPONENT_CHOOSED(componentId)) {
        // 如果当前组件已选中，直接触发回调。
        dush.emit("chooseItem", componentId);
        dush.emit("triggError");
    } else {
        // 否则（跳转并）选中组件, 后续在组件生命周期中触发回调
        // 判断组件所在位置
        for (let i = 0; i < storeDecoration().kshData.length; i++) {
            const component = storeDecoration().kshData[i];
            if (component?.id === componentId) {
                router.push({
                    name: "store-decoration",
                    query: {
                        ...route.query,
                        componentId: componentId
                    }
                });
                dush.emit("chooseItem", componentId);
                return;
            }
        }
        for (let i = 0; i < storeDecoration().customDecorationData.length; i++) {
            const page = storeDecoration().customDecorationData[i];
            const content = page?.content || [];
            for (let ii = 0; ii < content.length; ii++) {
                const component = content[ii];
                if (component?.id === componentId) {
                    const customPageId = String(page.id);
                    router.push({
                        name: "custom-decoration-page",
                        query: {
                            ...route.query,
                            customPageId,
                            componentId: componentId
                        }
                    });
                    dush.emit("chooseItem", componentId);
                    return;
                }
            }
        }
    }
}

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
