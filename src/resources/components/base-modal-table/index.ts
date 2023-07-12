import { Modal } from "@arco-design/web-vue";
import { render, h } from "vue";
import mainVue from "./index.vue";
import BaseTable from "@/resources/components/base-table/index.vue";
type Options = {
    modalConfig?: InstanceType<typeof Modal>["$props"];
    tableConfig?: InstanceType<typeof BaseTable>["$props"];
    defaultSelected?: any[];
    ok?: (data: any[]) => Promise<void>;
} & Record<string, any>;
const modalTable = (opt: Options) => {
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, document.body);
    };
    // 使用 h 函数创建 vnode
    const vnode = h(mainVue, {
        ...opt,
        visible: true,
        destroy: handleDestroy
    });
    // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
    render(vnode, document.body);
};

export default modalTable;
