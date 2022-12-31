<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <keep-alive :include="keepList">
                <component :is="Component" :key="route.name" />
            </keep-alive>
        </transition>
    </router-view>
</template>
<script setup lang="ts" name="AppMain">
import global from "@/config/pinia/global";
const route = useRoute();
const keepList = computed(() => {
    return global().keepaliveList;
});
</script>
