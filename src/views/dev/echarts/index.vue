<template>
    <frame-view class="chart">
        <a-space direction="vertical" :size="16" fill>
            <a-grid :cols="24" :col-gap="16" :row-gap="16">
                <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 18, xl: 18, xxl: 18 }">
                    <DataOverview />
                </a-grid-item>
                <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6 }">
                    <a-row style="flex-direction: column; justify-content: space-between">
                        <line-chart style="margin-bottom: 16px"></line-chart>
                        <bar-chart></bar-chart>
                    </a-row>
                </a-grid-item>
                <a-grid-item :span="24">
                    <the-chart-card title="设备消息" :chart-config="chatConfig"></the-chart-card>
                </a-grid-item>
            </a-grid>
        </a-space>
    </frame-view>
</template>
<script lang="ts" setup>
import lineChart from "./components/line.vue";
import DataOverview from "./components/overview.vue";
import BarChart from "./components/bar.vue";
import echartsHelper from "@/utils/helper/echarts";
import { graphic } from "echarts";

const chatConfig = computed(() => {
    return {
        width: "100%",
        height: "500px",
        option: echartsHelper.option({
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["设备消息"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    smooth: true,
                    showSymbol: false, // 只有在 tooltip hover 的时候显示symbol
                    lineStyle: {
                        color: "#bed9ff"
                    },
                    areaStyle: {
                        // 区域面积
                        opacity: 0.8,
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#d2e5ff"
                            },
                            {
                                offset: 1,
                                color: "#fcfeff"
                            }
                        ])
                    },
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: "line"
                }
            ]
        })
    };
});
</script>
<style lang="scss" scoped>
.chart {
    :deep(.frame-view-content) {
        padding: 0;
        background-color: transparent !important;
    }
    :deep(.general-card) {
        border-radius: 4px;
        border: none;
        & > .arco-card-header {
            height: auto;
            padding: 20px;
            border: none;
        }
        & > .arco-card-body {
            padding: 0 20px 20px 20px;
        }
    }
}
</style>
