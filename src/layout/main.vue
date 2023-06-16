<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="keepList">
            <component :is="Component" :key="$route.fullPath"> </component>
        </keep-alive>
    </router-view>
</template>
<script lang="ts">
const name = window.location.pathname.split("/").join("_");
export default {
    name
};
</script>
<script setup lang="ts">
import routes from "@/config/pinia/routes";
const keepList = computed(() => {
    return routes().cachedTags;
});
</script>
