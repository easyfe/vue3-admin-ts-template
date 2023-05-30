import { reactive } from "vue";

const lineValue = reactive({
    vLine: <any[]>[],
    hLine: <any[]>[]
});

const setValue = async (v: any) => {
    lineValue.vLine = v.vLine;
    lineValue.hLine = v.hLine;
};

export const useDragLine = () => ({
    lineValue,
    setValue
});
