<template>
    <m-form-item v-bind="$attrs">
        <template #label>
            {{ label }}
            <span class="tips">{{ model ? "显示" : "不显示" }}</span>
        </template>
        <div class="content">
            <m-switch v-model="model" class="show-switch" v-bind="$attrs" />
        </div>
    </m-form-item>
</template>
<script lang="ts" setup name="BaseShowBox">
const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    modelValue: {
        type: Boolean,
        default: true
    },
    defaultValue: {
        type: Boolean,
        default: true
    }
});
const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
</script>
<style lang="scss" scoped>
.tips {
    color: #55585c;
    margin-left: 16px;
    font-weight: 600;
}
.content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    :deep(.mo-checkbox-icon) {
        width: 16px;
        height: 16px;
        .mo-checkbox-icon-check {
            width: 10px;
        }
    }
}
.mo-form-item {
    margin-bottom: 12px !important;
}
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
</style>
