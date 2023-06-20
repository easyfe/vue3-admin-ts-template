<template>
    <frame-view>
        <div class="empty">
            <img :src="emptyImage" />
            <a-space>
                <a-button type="primary" @click="handleBack">返回上一页</a-button>
                <a-button @click="handleRetry">返回首页</a-button>
            </a-space>
        </div>
    </frame-view>
</template>

<script setup lang="ts">
import emptyImage from "@/assets/images/empty/404.png";
import { getDefaultRoute } from "@/packages/vue-router";
const router = useRouter();

function handleRetry() {
    const defaultPage = getDefaultRoute();
    if (!defaultPage) {
        return;
    }
    router.replace(defaultPage);
}

function handleBack() {
    router.back();
}
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
