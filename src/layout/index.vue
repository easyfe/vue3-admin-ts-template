<template>
    <a-layout class="app-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <app-left v-model:collapsed="collapsed"></app-left>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="height: 64px" bordered>
                <app-header></app-header>
            </a-layout-header>
            <a-layout-content class="layout-content" style="top: 64px" :native-scrollbar="false">
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
    min-height: 100%;
}
</style>
