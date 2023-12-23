<template>
    <div
        ref="baseChart"
        class="base-chart"
        :style="{
            width: props.width,
            height: props.height
        }"
    ></div>
</template>
<script lang="ts" setup name="TheChart">
import echarts from "@/config/echarts/index";
import chinaJSON from "@/config/echarts/map/chinaChange.json";
import eventBus, { EVENT_CHART_RESIZE } from "@/utils/tools/event-bus";
import theme from "@/views/utils/theme";
import { cloneDeepWith, isString, debounce } from "lodash-es";
import i18n from "@/locales";
import { useLocale } from "@/hooks/useLocale";
import { useTheme } from "@/hooks/useTheme";

const { currentLocale } = useLocale();
const { currentTheme } = useTheme();

const props = withDefaults(
    defineProps<{
        option: Record<string, any>;
        width?: string | number;
        height?: string | number;
        isMap?: boolean;
        isDark?: boolean;
        id?: string;
    }>(),
    {
        width: "100%",
        height: "100%",
        isMap: false,
        isDark: undefined,
        id: ""
    }
);

const baseChart = ref(null);
let charts = <echarts.ECharts | null>null;

const emits = defineEmits<{
    (e: "init", value: echarts.ECharts): void;
    (e: "click", value: any): void;
}>();

watch(
    [() => props.option, baseChart],
    (v1) => {
        if (v1[0] && v1[1]) {
            nextTick(() => {
                initChart();
            });
        }
    },
    {
        deep: true,
        immediate: true
    }
);

const resizeChart = debounce(() => {
    charts?.resize();
}, 150);

function initChart() {
    if (!props.option) {
        return;
    }
    /**
     * 根据 chartsType 判断是当前图表类型是否是地图(map)
     * 注意：该动作必须放在 init 之前执行
     */
    if (props.isMap) {
        //初始化地图
        echarts.registerMap("china", chinaJSON);
    }

    // 基于准备好的dom，初始化echarts实例
    if (!baseChart.value) {
        console.error("base-chart元素不存在");
        return;
    }
    if (charts) {
        charts.dispose?.();
    }
    let themeMode = "";
    if (props.isDark !== undefined) {
        themeMode = props.isDark ? "dark" : "light";
    } else {
        themeMode = currentTheme.value;
    }
    charts = echarts.init(baseChart.value, themeMode, { renderer: "svg" });
    const cloneOption = cloneDeepWith(props.option, (v, k) => {
        if (isString(v) && v.startsWith("var(--")) {
            return theme.getCustom(v.replaceAll("var(", "").replaceAll(")", ""));
        }
        if (isString(v) && v.startsWith("$t(")) {
            const regex = /\$t\('(.+?)'\)/;
            const match = v.match(regex);
            if (match) {
                const result = match[1]; // 获取匹配到的第一个括号内的内容
                return i18n.global.t(result);
            }
        }
        if (isString(k) && ["name"].includes(k)) {
            return i18n.global.t(v);
        }
    });
    charts.setOption(cloneOption);
    charts.on("click", (e) => {
        emits("click", e);
    });
    emits("init", charts);

    //ECharts自适应宽度(resize)
    // 监听窗口变化 - 多个图表同时刷新
    window.addEventListener("resize", resizeChart);
}

//监听图表宽高变化，一般由vue-draggable-resizable组件触发
eventBus.on(EVENT_CHART_RESIZE, (id: string) => {
    if (id && id === props.id) {
        //这里取消了防抖，优化体验
        charts?.resize();
        // resizeChart();
    }
});

watch([() => currentTheme.value, () => currentLocale.value], () => {
    nextTick(() => {
        initChart();
    });
});

defineExpose({
    setOption: (option: any) => {
        if (charts) {
            charts.setOption(option);
        }
    }
});

onUnmounted(() => {
    window.removeEventListener("resize", resizeChart);
});
</script>
<style lang="scss" scoped></style>
