<template>
    <a-spin style="width: 100%">
        <a-card title="数据总览" class="general-card">
            <a-row justify="space-between">
                <a-col v-for="(item, idx) in renderData" :key="idx" :span="6">
                    <a-statistic :title="item.title" :value="item.value" show-group-separator :value-from="0" animation>
                        <template #prefix>
                            <span class="statistic-prefix" :style="{ background: item.prefix.background }">
                                <component :is="item.prefix.icon" :style="{ color: item.prefix.iconColor }" />
                            </span>
                        </template>
                    </a-statistic>
                </a-col>
            </a-row>
            <the-chart :id="props.id" :option="option" height="500px"></the-chart>
        </a-card>
    </a-spin>
</template>
<script lang="ts" setup>
import echartsHelper from "@/utils/helper/echarts";
import { EChartsOption, LineSeriesOption } from "echarts";

const props = withDefaults(
    defineProps<{
        id?: string;
    }>(),
    {
        id: ""
    }
);

const renderData = computed(() => [
    {
        title: "内容生产量",
        value: 1902,
        prefix: {
            icon: "icon-edit",
            background: "#FFE4BA",
            iconColor: "#F77234"
        }
    },
    {
        title: "内容点击量",
        value: 2445,
        prefix: {
            icon: "icon-thumb-up",
            background: "#E8FFFB",
            iconColor: "#33D1C9"
        }
    },
    {
        title: "内容曝光量",
        value: 3034,
        prefix: {
            icon: "icon-heart",
            background: "#E8F3FF",
            iconColor: "#165DFF"
        }
    },
    {
        title: "活跃用户数",
        value: 1275,
        prefix: {
            icon: "icon-user",
            background: "#F5E8FF",
            iconColor: "#722ED1"
        }
    }
]);

const option = computed(() => {
    const v: EChartsOption = {
        tooltip: {
            trigger: "axis"
        },
        // legend: {
        //     data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
        // },
        grid: {
            left: "5%",
            right: "4%",
            top: "40",
            bottom: "40"
        },
        // grid: {
        //     left: "3%",
        //     right: "4%",
        //     bottom: "3%",
        //     containLabel: true
        // },
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "Email",
                type: "line",
                stack: "Total",
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: "Union Ads",
                type: "line",
                stack: "Total",
                smooth: true,
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: "Video Ads",
                type: "line",
                stack: "Total",
                smooth: true,
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: "Direct",
                type: "line",
                stack: "Total",
                smooth: true,
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: "Search Engine",
                type: "line",
                stack: "Total",
                smooth: true,
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    return echartsHelper.option(v);
});

const generateSeries = (name: string, lineColor: string, itemBorderColor: string, data: number[]): LineSeriesOption => {
    return {
        name,
        data,
        stack: "Total",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
            color: lineColor
        },
        emphasis: {
            focus: "series",
            itemStyle: {
                color: lineColor,
                borderWidth: 2,
                borderColor: itemBorderColor
            }
        },
        lineStyle: {
            width: 2,
            color: lineColor
        },
        showSymbol: false,
        areaStyle: {
            opacity: 0.1,
            color: lineColor
        }
    };
};
</script>
<style lang="scss" scoped>
:deep(.arco-statistic) {
    .arco-statistic-title {
        color: rgb(var(--gray-10));
        font-weight: bold;
    }
    .arco-statistic-value {
        display: flex;
        align-items: center;
    }
}
.statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
}
</style>
