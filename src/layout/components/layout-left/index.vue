<template>
    <a-layout style="height: 100vh">
        <a-layout-sider
            v-model:collapsed="collapsed"
            collapsible
            :style="{
                zIndex: 200,
                width: siderWidth
            }"
            @collapse="onCollapse"
        >
            <app-logo></app-logo>
            <div class="menu-wrapper">
                <app-menu mode="vertical" :collapsed="collapsed" :route-list="routeList" @collapse="onCollapse" />
            </div>
        </a-layout-sider>
        <a-layout>
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
                <app-bread></app-bread>
                <app-header-right></app-header-right>
            </a-layout-header>
            <a-layout-content
                :style="{
                    backgroundColor: 'rgb(var(--gray-2))',
                    overflow: 'auto'
                }"
            >
                <app-tags></app-tags>
                <app-main></app-main>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup name="LayoutLeft">
import AppLogo from "../app-logo/index.vue";
import AppMenu from "../app-menu/index.vue";
import AppMain from "../app-main/index.vue";
import AppBread from "../app-bread/index.vue";
import AppHeaderRight from "../app-header-right/index.vue";
import AppTags from "../app-tags/index.vue";
import global from "@/config/pinia/global";
import routes from "@/config/pinia/routes";
import { LAYOUT_SIZE } from "@/layout/constants";

const collapsed = ref(global().collapsed);

// 左侧布局显示所有路由
const routeList = computed(() => {
    return routes().routes;
});

const siderWidth = computed(() => {
    if (collapsed.value) {
        return `${LAYOUT_SIZE.SIDER_COLLAPSED_WIDTH}px`;
    }
    return `${LAYOUT_SIZE.SIDER_WIDTH}px`;
});

function onCollapse(e: boolean) {
    global().collapsed = e;
}
</script>
<style lang="scss" scoped>
:deep(.arco-layout-sider-children) {
    @include scroll-y();
}

.menu-wrapper {
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    @include scroll-y();
}
</style>
