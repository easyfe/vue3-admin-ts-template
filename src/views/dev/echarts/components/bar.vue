<template>
    <a-spin style="width: 100%">
        <a-card title="柱状图" class="general-card">
            <the-chart :id="props.id" :option="option" height="200px"></the-chart>
        </a-card>
    </a-spin>
</template>
<script lang="ts" setup>
import echartsHelper from "@/utils/helper/echarts";
import { EChartsOption } from "echarts";

const props = withDefaults(
    defineProps<{
        id?: string;
    }>(),
    {
        id: ""
    }
);

const option = computed(() => {
    const v: EChartsOption = {
        tooltip: {
            trigger: "axis"
        },
        grid: {
            // left: "10%",
            // right: "4%",
            top: "20",
            bottom: "20"
        },
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [],
                type: "bar",
                barWidth: 7
            }
        ]
    };
    const dataArr = [150, 230, 224, 218, 135, 147, 260];
    if (!Array.isArray(v.series)) {
        return v;
    }
    v.series[0].data = dataArr.map((item, idx) => {
        return {
            value: item,
            itemStyle: {
                color: idx % 2 ? "#468DFF" : "#86DF6C"
            }
        };
    });
    return echartsHelper.option(v);
});
</script>
<style lang="scss" scoped></style>
