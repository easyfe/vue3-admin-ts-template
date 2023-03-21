<template>
    <div v-dompurify-html="content"></div>
</template>

<script lang="ts" setup name="BaseRichText">
defineProps({
    content: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss" scoped>
:deep(img) {
    max-width: 100%;
}
</style>
