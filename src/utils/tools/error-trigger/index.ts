let timer = 0;

// 定位错误位置提示到指定元素
export function triggError(params: {
    id?: string;
    class?: string;
    el?: Element;
    parentEle?: string;
    scrollOptons?: ScrollIntoViewOptions;
}): void {
    nextTick(() => {
        clearTimeout(timer);
        let pel: Element | null = window.document.body;
        let el: Element | null = null;
        if (params.parentEle) {
            pel = document?.querySelector(params.parentEle);
        }
        if (params.el) {
            el = params.el;
        } else if (params.class) {
            el = pel?.querySelector(params.class) || null;
        } else if (params.id) {
            el = pel?.querySelector(params.id) || null;
        }
        if (!params.scrollOptons) {
            params.scrollOptons = { block: "center", behavior: "smooth" };
        }
        el && el.scrollIntoView(params.scrollOptons);
        const currClass = el?.getAttribute("class") || "";
        if (!currClass?.includes("trigg-error")) el?.setAttribute("class", currClass.concat(" trigg-error"));
        timer = window.setTimeout(() => {
            const afterClass = (el?.getAttribute("class") || "")?.replace(/\s*trigg-error/g, "");
            el?.setAttribute("class", afterClass);
        }, 2000);
    });
}
