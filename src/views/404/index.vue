<template>
    <frame-view>
        <base-empty type="error" desc="这是一个404页面">
            <van-button round type="danger" class="error-button" @click="handleRetry">回到首页</van-button>
        </base-empty>
    </frame-view>
</template>

<script setup lang="ts">
const router = useRouter();
const handleRetry = (): void => {
    router.replace({
        path: "/"
    });
};
</script>
<style lang="scss" scoped>
.error-button {
    width: 320px;
    height: 80px;
}
</style>
