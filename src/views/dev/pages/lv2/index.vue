<template>
    <frame-view>
        <h2>这是二级级页面</h2>
        <h4>面包屑和菜单Active适用于列表进入详情场景</h4>
        <h4>进入三级页面试试缓存</h4>
        <a-button @click="onClick">打开三级页面</a-button>
    </frame-view>
</template>
<script lang="ts" setup>
const router = useRouter();
function onClick() {
    router.push({
        name: "dev-pages-lv3"
    });
}
</script>
<style lang="scss" scoped></style>
