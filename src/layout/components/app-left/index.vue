<template>
    <a-menu v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" class="app-menu">
        <menu-item v-for="item in routeList" :key="item.path" :route="item" />
    </a-menu>
</template>
<script lang="ts" setup name="AppLeft">
import routes from "@/config/pinia/routes";
import MenuItem from "./menu-item.vue";
const route = useRoute();

const routeList = computed(() => {
    return routes().routes;
});

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

watch(
    () => route.path,
    () => {
        const matched = route.matched.map((item) => item.path);
        openKeys.value = matched;
        selectedKeys.value = matched;
    },
    {
        immediate: true
    }
);
</script>
<style lang="scss" scoped>
.app-menu {
    user-select: none;
}
</style>
