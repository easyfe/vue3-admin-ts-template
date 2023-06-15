<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
            <keep-alive :include="keepList">
                <component :is="Component" :key="$route.name"> </component>
            </keep-alive>
        </transition>
    </router-view>
</template>
<script setup lang="ts" name="AppMain">
import routes from "@/config/pinia/routes";
const keepList = computed(() => {
    return routes().cachedTags;
});
</script>
