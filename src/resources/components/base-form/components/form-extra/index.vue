<template>
    <div class="form-extra">
        <p class="tips">{{ props.config.tips }}</p>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        config: any;
    }>(),
    {
        config: {}
    }
);
</script>
<style lang="scss" scoped>
.form-extra {
    width: 100%;
    text-align: left;
    .tips {
        width: 100%;
        font-size: 12px;
        color: #c0c4cc;
        text-align: left;
        margin-top: 4px;
    }
}
</style>
