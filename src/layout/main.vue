<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="keepList">
            <component :is="Component" :key="$route.fullPath"> </component>
        </keep-alive>
    </router-view>
</template>
<script setup lang="ts" name="LayoutMain">
import routes from "@/config/pinia/routes";
defineOptions({
    name: "1231321"
});
const keepList = computed(() => {
    return routes().cachedTags;
});
</script>
