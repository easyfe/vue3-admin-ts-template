<template>
    <a-menu
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
        class="app-menu"
        :mode="props.mode"
        :collapsed="props.collapsed"
        @collapse="onCollapseChange"
    >
        <template v-for="item in menuItems" :key="item.path">
            <menu-item :route="item" />
        </template>
    </a-menu>
</template>
<script lang="ts" setup name="AppMenu">
import MenuItem from "./menu-item.vue";
import { getRouteParent } from "@/packages/vue-router";
import { RouteConfig } from "types";

interface AppMenuProps {
    mode?: "vertical" | "horizontal";
    collapsed?: boolean;
    routeList?: RouteConfig[];
}

const props = withDefaults(defineProps<AppMenuProps>(), {
    mode: "vertical",
    collapsed: false,
    routeList: () => []
});

const emit = defineEmits<{
    (e: "collapse", value: boolean): void;
}>();

const route = useRoute();

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

// 使用传入的 routeList 或空数组
const menuItems = computed(() => {
    return props.routeList;
});

watch(
    () => route.path,
    () => {
        const matched = getRouteParent();
        openKeys.value = matched.map((item) => item.path);
        selectedKeys.value = matched.map((item) => item.path);
    },
    {
        immediate: true
    }
);

function onCollapseChange(value: boolean) {
    emit("collapse", value);
}
</script>
<style lang="scss" scoped>
.app-menu {
    user-select: none;
    height: 100%;
    width: 100%;
}
</style>
