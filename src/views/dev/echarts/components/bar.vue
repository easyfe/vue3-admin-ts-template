<template>
    <a-spin style="width: 100%">
        <a-card title="柱状图" class="general-card">
            <base-chart :option="option" height="200px"></base-chart>
        </a-card>
    </a-spin>
</template>
<script lang="ts" setup>
import { EChartsOption } from "echarts";

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
                //150, 230, 224, 218, 135, 147, 260
                data: [],
                type: "bar",
                barWidth: 7
            }
        ]
    };
    const dataArr = [150, 230, 224, 218, 135, 147, 260];
    if (!Array.isArray(v.series)) {
        return;
    }
    v.series[0].data = dataArr.map((item, idx) => {
        return {
            value: item,
            itemStyle: {
                color: idx % 2 ? "#468DFF" : "#86DF6C"
            }
        };
    });
    return v;
});
</script>
<style lang="scss" scoped></style>
