<template>
    <frame-view>
        <h2>这是三级页面，试试缓存</h2>
        <a-input v-model="value"></a-input>
    </frame-view>
</template>
<script lang="ts" setup name="DevPagesLv3">
import { Message } from "@arco-design/web-vue";
const value = ref("");
onActivated(() => {
    Message.success("激活了三级页面onActivated");
});
</script>
<style lang="scss" scoped></style>
