<template>
    <frame-view>
        <div>index</div>
        <a-input v-model="test"></a-input>
    </frame-view>
</template>
<script setup lang="ts" name="AppIndex">
const test = ref("test");
</script>
