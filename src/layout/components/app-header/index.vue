<template>
    <div class="app-header"></div>
</template>
<script setup lang="ts" name="AppHeader"></script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 1px solid #eeeeee;
    .app-header-left {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #898b8f;
        display: flex;
        align-items: center;
        div {
            margin-left: 8px;
        }
        &:hover {
            color: #1966ff;
            .item-svg-class {
                color: #1966ff !important;
            }
        }
    }
    .app-header-menu {
        display: flex;
        align-items: center;
        height: 100%;
        .app-header-menu-item {
            display: flex;
            align-items: center;
            height: 100%;
            user-select: none;
            cursor: pointer;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #55585c;
            margin-right: 32px;
        }
        .app-header-menu-item__active {
            color: #1966ff;
            font-weight: 600;
            position: relative;
            &::after {
                position: absolute;
                content: "";
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 64px;
                height: 3px;
                background: #1966ff;
                border-radius: 2px;
            }
        }
    }
    .app-header-right {
        width: 200px;
    }
    :deep(.mo-space-align-center) {
        justify-content: flex-end;
    }
}
</style>
