<template>
    <a-config-provider :locale="locale" :global="true">
        <router-view></router-view>
    </a-config-provider>
</template>
<script lang="ts" setup>
import { clearRequest } from "@/packages/request";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import { useLocale } from "@/hooks/useLocale";
const route = useRoute();

const { currentLocale } = useLocale();
const locale = computed(() => {
    switch (currentLocale.value) {
        case "zh-CN":
            return zhCN;
        case "en-US":
            return enUS;
        default:
            return enUS;
    }
});

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
