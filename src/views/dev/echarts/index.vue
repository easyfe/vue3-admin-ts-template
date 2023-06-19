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
                    <!-- <UserActions style="margin-bottom: 16px" />
                    <ContentTypeDistribution /> -->
                </a-grid-item>
            </a-grid>
            <!-- <DataChainGrowth />
            <ContentPublishingSource /> -->
        </a-space>
    </frame-view>
</template>
<script lang="ts" setup>
import lineChart from "./components/line.vue";
import DataOverview from "./components/overview.vue";
import BarChart from "./components/bar.vue";
import mapChart from "./components/map.vue";
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
