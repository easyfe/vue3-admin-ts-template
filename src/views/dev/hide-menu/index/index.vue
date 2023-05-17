<template>
    <frame-view>
        <a-button @click="onClick">打开详情页</a-button>
    </frame-view>
</template>
<script lang="ts" setup>
const router = useRouter();
function onClick() {
    router.push({
        name: "dev-hide-menu-detail"
    });
}
</script>
<style lang="scss" scoped></style>
