<template>
    <frame-view>
        <div class="empty">
            <img :src="emptyImage" />
            <a-button type="primary" @click="handleRetry">返回首页</a-button>
        </div>
    </frame-view>
</template>

<script setup lang="ts">
import emptyImage from "@/assets/images/empty/404.png";
import { getDefaultRoute } from "@/packages/vue-router";
const router = useRouter();
const handleRetry = (): void => {
    const defaultPage = getDefaultRoute();
    if (!defaultPage) {
        return;
    }
    router.replace(defaultPage);
};
</script>
<style lang="scss" scoped>
.empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 40%;
        height: 40%;
    }
}
</style>
