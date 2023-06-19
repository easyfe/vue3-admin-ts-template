<template>
    <a-layout class="app-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible style="z-index: 99">
            <div class="log" @click="toDefaultPage">
                <base-svg name="vue" width="36" height="36"></base-svg>
                <h2 v-show="!collapsed" class="title">Easyfe Admin</h2>
            </div>
            <app-left v-model:collapsed="collapsed"></app-left>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-header">
                <app-header></app-header>
                <app-tags></app-tags>
            </a-layout-header>
            <a-layout-content class="layout-content">
                <app-main></app-main>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup name="Layout">
import AppLeft from "./components/app-left/index.vue";
import AppHeader from "./components/app-header/index.vue";
import AppMain from "./components/app-main/index.vue";
import router, { getDefaultRoute } from "@/packages/vue-router";
const collapsed = ref(false);

function toDefaultPage() {
    const defaultPage = getDefaultRoute();
    if (!defaultPage) {
        return;
    }
    router.push(defaultPage);
}
</script>
<style lang="scss" scoped>
.app-layout {
    height: 100%;
    :deep(.arco-layout-sider-children) {
        @include scroll-y;
    }
    .log {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        cursor: pointer;
        user-select: none;
        .title {
            font-size: 16px;
            margin-left: 8px;
        }
    }
    .layout-header {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 100;
        .app-header {
            height: 60px;
        }
        .app-tags {
            height: 34px;
        }
    }
    .layout-content {
        background-color: rgb(var(--gray-2));
        .frame-view {
            height: calc(100vh - 94px);
        }
    }
}
</style>
