<template>
    <a-spin style="width: 100%">
        <a-card title="折线图" class="general-card">
            <the-chart :id="props.id" :option="option" height="200px"></the-chart>
        </a-card>
    </a-spin>
</template>
<script lang="ts" setup>
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
                data: [150, 230, 224, 218, 135, 147, 260],
                type: "line",
                smooth: true
            }
        ]
    };
    return v;
});
</script>
<style lang="scss" scoped></style>
