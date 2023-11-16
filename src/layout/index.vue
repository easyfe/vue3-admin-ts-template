<template>
    <a-layout class="app-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible style="z-index: 200" @collapse="onCollapse">
            <div class="logo" @click="toDefaultPage">
                <Svg name="vue" width="36" height="36"></Svg>
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
import global from "@/config/pinia/global";
import { Svg } from "@easyfe/admin-component";
const collapsed = ref(global().collapsed);

function onCollapse(e: boolean) {
    global().collapsed = e;
}

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
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        cursor: pointer;
        user-select: none;
        &:hover {
            opacity: 0.6;
        }
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
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        @include scroll-y(6);
        background-color: rgb(var(--gray-2));
    }
}
</style>
