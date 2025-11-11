<template>
    <a-layout style="height: 100vh">
        <a-layout-header
            :style="{
                height: `${LAYOUT_SIZE.HEADER_HEIGHT}px`,
                backgroundColor: 'var(--color-bg-2)',
                borderBottom: '1px solid var(--color-border)',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }"
        >
            <div style="display: flex; align-items: center; flex: 1">
                <app-logo />
                <!-- 顶部菜单 -->
                <div style="margin-left: 24px; flex: 1">
                    <app-menu mode="horizontal" :route-list="routeList" />
                </div>
            </div>
            <app-header-right />
        </a-layout-header>

        <a-layout>
            <a-layout-content
                :style="{
                    backgroundColor: 'rgb(var(--gray-2))',
                    overflow: 'auto'
                }"
            >
                <app-bread style="margin-left: 20px; margin-top: 20px"></app-bread>
                <app-main></app-main>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup name="LayoutTop">
import AppLogo from "../app-logo/index.vue";
import AppMenu from "../app-menu/index.vue";
import AppHeaderRight from "../app-header-right/index.vue";
import AppMain from "../app-main/index.vue";
import AppBread from "../app-bread/index.vue";
import routes from "@/config/pinia/routes";
import { LAYOUT_SIZE } from "@/layout/constants";

// 顶部布局显示所有路由
const routeList = computed(() => {
    return routes().routes;
});
</script>
<style lang="scss" scoped></style>
