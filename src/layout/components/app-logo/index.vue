<template>
    <div class="logo" :style="{ maxWidth: !collapsed ? `${LAYOUT_SIZE.SIDER_WIDTH}px` : '' }" @click="toDefaultPage">
        <Svg name="vue" width="36" height="36"></Svg>
        <h2 v-show="!collapsed" class="title">Easyfe Admin</h2>
    </div>
</template>
<script lang="ts" setup name="AppLogo">
import router, { getDefaultRoute } from "@/packages/vue-router";
import global from "@/config/pinia/global";
import { Svg } from "@easyfe/admin-component";
import { LAYOUT_SIZE } from "@/layout/constants";

const collapsed = computed(() => global().collapsed);

function toDefaultPage() {
    const defaultPage = getDefaultRoute();
    if (!defaultPage) {
        return;
    }
    router.push(defaultPage);
}
</script>
<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    cursor: pointer;
    user-select: none;
    background-color: var(--color-menu-light-bg);
    img {
        width: 50%;
    }
    &:hover {
        opacity: 0.6;
    }
    .title {
        font-size: 16px;
        margin-left: 8px;
    }
}
</style>
