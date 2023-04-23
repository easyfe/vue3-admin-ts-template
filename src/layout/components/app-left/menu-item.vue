<template>
    <a-sub-menu v-if="hasChild && !hidden" :key="props.route.path">
        <template #icon
            ><base-svg v-if="route.meta && route.meta.icon" :name="route.meta.icon" :width="20" :height="20"></base-svg
        ></template>
        <template #title>
            <span>{{ route.meta?.title || "" }}</span>
        </template>
        <menu-item v-for="child in route.children" :key="child.path" :route="child" />
    </a-sub-menu>
    <a-menu-item v-else :key="props.route.path" @click="onJump">
        <template #icon
            ><base-svg v-if="route.meta && route.meta.icon" :name="route.meta.icon" :width="20" :height="20"></base-svg
        ></template>
        <span>{{ route.meta?.title || "" }}</span>
    </a-menu-item>
</template>
<script setup lang="ts" name="MenuItem">
import { RouteConfig } from "types";

const router = useRouter();

const props = withDefaults(
    defineProps<{
        route: RouteConfig;
    }>(),
    {}
);

const hidden = computed(() => {
    return props.route.meta?.hidden;
});

/** 获取是否存在子路由 */
const hasChild = computed(() => {
    if (!props.route.children?.length) {
        return false;
    }
    //如果子路由全部都是隐藏的，则认为没有子路由
    const hideRouters = props.route.children.filter((item) => item.meta?.hidden === true);
    if (hideRouters.length === props.route.children.length) {
        return false;
    }
    return true;
});

function onJump(): void {
    router.push(props.route);
}
</script>
