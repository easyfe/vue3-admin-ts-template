<template>
    <n-layout position="absolute" style="top: 0; bottom: 0" has-sider>
        <n-layout-sider
            content-style="max-width:200px;"
            :native-scrollbar="false"
            :bordered="false"
            class="layout-sider"
            :collapsed="collapsed"
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            show-trigger="arrow-circle"
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
            <app-left v-model:collapsed="collapsed"></app-left>
        </n-layout-sider>
        <n-layout :native-scrollbar="false">
            <n-layout-header style="height: 64px" bordered position="absolute">
                <app-header></app-header>
            </n-layout-header>
            <n-layout-content class="layout-content" position="absolute" style="top: 64px" :native-scrollbar="false">
                <app-main></app-main>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>
<script lang="ts" setup name="Layout">
const collapsed = ref(false);
</script>
<style lang="scss" scoped>
.layout-content {
    :deep(.n-scrollbar-content) {
        background-color: #f5f7f9;
        min-height: 100%;
        padding: 10px;
    }
}
</style>
