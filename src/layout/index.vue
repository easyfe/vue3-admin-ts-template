<template>
    <a-layout class="app-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible style="z-index: 99">
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
const collapsed = ref(false);
</script>
<style lang="scss" scoped>
.app-layout {
    height: 100%;
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
