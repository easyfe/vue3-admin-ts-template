<template>
    <a-form-item v-bind="attrs">
        <slot></slot>
        <template v-if="attrs.inputTips" #extra>
            <form-extra :config="attrs"></form-extra>
        </template>
        <template v-if="attrs.labelTips" #label>
            {{ attrs.label }}
            <a-tooltip :content="attrs.labelTips">
                <icon-question-circle-fill />
            </a-tooltip>
        </template>
    </a-form-item>
</template>
<script setup lang="ts">
const attrs: Record<string, any> = useAttrs();
</script>
<style scoped lang="scss">
:deep(.arco-form-item-label) {
    color: #898b8f !important;
}
</style>
