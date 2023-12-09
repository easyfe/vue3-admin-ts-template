<template>
    <frame-view>
        <a-button @click="onClick">打开二级页面</a-button>
    </frame-view>
</template>
<script lang="ts" setup>
const router = useRouter();
function onClick() {
    router.push({
        name: "dev-pages-lv2"
    });
}
</script>
<style lang="scss" scoped></style>
