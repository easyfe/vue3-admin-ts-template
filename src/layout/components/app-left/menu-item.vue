<template>
    <template v-if="checkVisible()">
        <a-sub-menu v-if="showSubMenu()" :key="props.route.path">
            <template #icon
                ><base-svg
                    v-if="route.meta && route.meta.icon"
                    :name="route.meta.icon"
                    :width="20"
                    :height="20"
                ></base-svg
            ></template>
            <template #title>
                <span>{{ route.meta?.title || "" }}</span>
            </template>
            <menu-item v-for="child in route.children" :key="child.path" :route="child" />
        </a-sub-menu>
        <a-menu-item v-if="!showSubMenu()" :key="props.route.path" @click="onJump">
            <template #icon
                ><base-svg
                    v-if="route.meta && route.meta.icon"
                    :name="route.meta.icon"
                    :width="20"
                    :height="20"
                ></base-svg
            ></template>
            <span>{{ route.meta?.title || "" }}</span>
        </a-menu-item>
    </template>
</template>
<script setup lang="ts" name="MenuItem">
import { RouteConfig } from "types";
import { Svg as BaseSvg } from "@easyfe/admin-component";

const router = useRouter();

const props = withDefaults(
    defineProps<{
        route: RouteConfig;
    }>(),
    {}
);

/** 获取是否存在子路由 */
const hasChild = computed(() => {
    if (!props.route.children?.length) {
        return false;
    }
    //如果子路由全部都是隐藏的，则认为没有子路由
    const hideRouters = props.route.children.filter(
        (item) => item.meta?.hidden === true || item.permission?.() === false
    );
    if (hideRouters.length === props.route.children.length) {
        return false;
    }
    return true;
});

function showSubMenu() {
    //如果没有子路由，不显示submenu
    if (!hasChild.value) {
        return false;
    }
    return true;
}

function checkVisible() {
    if (props.route.meta?.hidden) {
        return false;
    }
    if (props.route.permission?.() === false) {
        return false;
    }
    return true;
}

function onJump() {
    router.push(props.route);
}
</script>
