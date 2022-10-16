<template>
    <div class="app-body">
        <app-header class="app-header"></app-header>
        <div class="app-content">
            <div class="app-left"><app-left></app-left></div>
            <div class="app-main"><app-main></app-main></div>
        </div>
    </div>
</template>
<script lang="ts" setup name="Layout"></script>
<style lang="scss" scoped>
.app-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    .app-header {
        width: 100%;
        height: 56px;
        min-height: 56px;
        background-color: #ffffff;
    }
    .app-content {
        display: flex;
        flex: 1;
        overflow: hidden;
        .app-left {
            width: 160px;
            border-right: 1px solid #eeeeee;
        }
        .app-main {
            background-color: #f5f7fb;
            flex: 1;
        }
    }
}
</style>
