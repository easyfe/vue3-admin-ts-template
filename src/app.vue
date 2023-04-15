<template>
    <a-config-provider>
        <router-view></router-view>
    </a-config-provider>
</template>
<script lang="ts" setup>
import { clearRequest } from "@/packages/request";
const route = useRoute();

watch(
    () => route.path,
    () => {
        /**路由切换时，删除请求队列*/
        clearRequest();
        /** 路由切换的时候清除相关提示 */
    }
);
</script>
<style lang="scss" scoped></style>
