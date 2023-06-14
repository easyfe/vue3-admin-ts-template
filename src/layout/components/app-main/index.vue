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
import global from "@/config/pinia/global";
const keepList = computed(() => {
    return global().keepaliveList;
});
</script>
