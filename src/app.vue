<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <RouterView />
                </n-message-provider>
            </n-notification-provider> </n-dialog-provider
    ></n-loading-bar-provider>
</template>
<script lang="ts" setup>
import { clearRequest } from "@/packages/request";
import { NDialogProvider, NNotificationProvider, NMessageProvider, NLoadingBarProvider } from "naive-ui";
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
