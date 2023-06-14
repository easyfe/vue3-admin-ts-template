<template>
    <a-layout class="app-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible style="z-index: 99">
            <app-left v-model:collapsed="collapsed"></app-left>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="height: 64px">
                <app-header></app-header>
            </a-layout-header>
            <app-tags></app-tags>
            <a-layout-content class="layout-content">
                <app-main></app-main>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup name="Layout">
const collapsed = ref(false);
</script>
<style lang="scss" scoped>
.app-layout {
    height: 100%;
    .layout-content {
        background-color: rgb(var(--gray-2));
    }
}
</style>
