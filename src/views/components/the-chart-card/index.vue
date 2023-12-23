<template>
    <div class="the-chart-card">
        <div class="top">
            <div class="left">
                {{ props.title }}
            </div>
            <div class="right">
                <a-space>
                    <a-radio-group v-model="dateType" type="button">
                        <a-radio value="hour">按小时</a-radio>
                        <a-radio value="day">按天</a-radio>
                        <a-radio value="month">按月</a-radio>
                    </a-radio-group>
                    <a-date-picker v-if="dateType === 'hour'"></a-date-picker>
                    <a-month-picker v-if="dateType === 'day'"></a-month-picker>
                    <a-year-picker v-if="dateType === 'month'"></a-year-picker>
                </a-space>
            </div>
        </div>
        <div class="chart-body">
            <template v-if="props.chartConfig">
                <the-chart v-bind="props.chartConfig" ref="theChart" class="chart-detail" @init="initChart"></the-chart>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup name="TheChartCard">
import TheChart from "../the-chart/index.vue";
type ChartType = InstanceType<typeof TheChart>["$props"];
const props = withDefaults(
    defineProps<{
        chartConfig?: ChartType;
        title?: string;
    }>(),
    {
        chartConfig: undefined,
        title: ""
    }
);
const dateType = ref("hour");

const theChart = ref<InstanceType<typeof TheChart> | null>(null);

const emits = defineEmits<{
    (e: "init", value: echarts.ECharts): void;
}>();

function initChart(v: any) {
    emits("init", v);
}
</script>
<style lang="scss" scoped>
.the-chart-card {
    background-color: $bg2;
    width: 100%;
    padding: 24px;
    margin-top: 20px;
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        .left {
            font-size: 18px;
            font-weight: 700;
            position: relative;
            padding-left: 18px;
            &::before {
                position: absolute;
                top: 50%;
                left: 0;
                width: 8px;
                height: 8px;
                background-color: #315efb;
                border: 1px solid #b4c0da;
                transform: translateY(-50%);
                content: " ";
            }
        }
    }
}
</style>
