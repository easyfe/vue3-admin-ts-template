<template>
    <a-layout style="height: 100vh">
        <!-- 顶部 Header -->
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
                <!-- 顶部一级菜单 -->
                <div style="margin-left: 24px; flex: 1">
                    <app-menu mode="horizontal" :route-list="topMenuList" />
                </div>
            </div>
            <app-header-right />
        </a-layout-header>

        <a-layout>
            <!-- 左侧 Sider -->
            <a-layout-sider
                v-if="siderMenuList.length > 0"
                v-model:collapsed="collapsed"
                collapsible
                :trigger="null"
                :width="LAYOUT_SIZE.SIDER_WIDTH"
                :collapsed-width="LAYOUT_SIZE.SIDER_COLLAPSED_WIDTH"
                @collapse="onCollapse"
            >
                <div class="menu-wrapper">
                    <app-menu
                        mode="vertical"
                        :collapsed="collapsed"
                        :route-list="siderMenuList"
                        @collapse="onCollapse"
                    />
                </div>
            </a-layout-sider>

            <!-- 内容区 -->
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
    </a-layout>
</template>
<script lang="ts" setup name="LayoutMix">
import { cloneDeep } from "lodash-es";
import AppLogo from "../app-logo/index.vue";
import AppMenu from "../app-menu/index.vue";
import AppHeaderRight from "../app-header-right/index.vue";
import AppMain from "../app-main/index.vue";
import AppBread from "../app-bread/index.vue";
import global from "@/config/pinia/global";
import routes from "@/config/pinia/routes";
import { getRouteParent } from "@/packages/vue-router";
import { LAYOUT_SIZE } from "@/layout/constants";

const collapsed = ref(global().collapsed);

// 顶部菜单：只显示一级菜单（不包含children）
const topMenuList = computed(() => {
    // 移除所有子菜单，只保留一级菜单项
    const tempList = cloneDeep(routes().routes);
    const list = tempList.map((item) => {
        if (item.children?.length) {
            delete item.children;
        }
        return item;
    });
    return list;
});

// 左侧菜单：显示当前一级路由的子路由
const siderMenuList = computed(() => {
    const matched = getRouteParent();
    // 获取第一级路由（顶部菜单对应的路由）
    const firstLevelRoute = matched[0];

    if (!firstLevelRoute) {
        return [];
    }

    // 从原始路由数据中找到完整的一级路由（包含children）
    const fullRoute = routes().routes.find((r) => r.path === firstLevelRoute.path);

    if (!fullRoute || !fullRoute.children || fullRoute.children.length === 0) {
        return [];
    }

    // 如果第一个子路由是隐藏的，返回空数组
    if (fullRoute.children[0]?.meta?.hidden) {
        return [];
    }

    // 返回一级路由的所有子路由（二级及以下）
    return fullRoute.children;
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
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    @include scroll-y();
}
</style>
