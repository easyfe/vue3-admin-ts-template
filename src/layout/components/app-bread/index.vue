<template>
    <div class="app-bread-list">
        <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
                <div class="bre-item">
                    <Svg v-if="item.meta?.icon" :name="String(item.meta.icon)" :width="20" :height="20"></Svg>
                    <div v-if="checkDidsable(item, index)">{{ $t(item.meta?.title || "") }}</div>
                    <a-link v-else @click="onClick(item)"> {{ $t(item.meta?.title || "") }}</a-link>
                </div>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>
<script lang="ts" setup>
import router, { getRouteParent } from "@/packages/vue-router/index";
import { Svg } from "@easyfe/admin-component";
import { RouteConfig } from "types";
const breadList = computed(() => {
    return getRouteParent();
});

function checkDidsable(item: RouteConfig, index: number) {
    if (index === breadList.value.length - 1) {
        return true;
    }
    if (!item.children?.length) {
        return false;
    }
    //如果子路由全部都是隐藏的，则认为没有子路由
    const hideRouters = item.children.filter((v: any) => v.meta?.hidden === true || v.meta?.permission?.() === false);
    if (hideRouters.length === item.children.length) {
        return false;
    }
    return true;
}

const onClick = (item: RouteConfig) => {
    router.push(item);
};
</script>
<style lang="scss" scoped>
.app-bread-list {
    user-select: none;
    .arco-breadcrumb-item a:hover {
        color: $main;
    }
    .bre-item {
        display: flex;
        align-items: center;
        .svg-icon {
            margin-right: 4px;
        }
    }
}
</style>
