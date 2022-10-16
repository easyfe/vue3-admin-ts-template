<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <div class="root">
                        <router-view v-if="route.meta.keepAlive" v-slot="{ Component }">
                            <transition>
                                <keep-alive>
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>
                        <router-view v-else v-slot="{ Component }">
                            <transition>
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </div>
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
<style lang="scss" scoped>
.root {
    background-color: #ffffff;
    height: 100%;
    overflow-y: auto;
}
</style>
