<template>
    <m-form-item v-bind="$attrs">
        <div class="content">
            <span>{{ model ? "显示" : "不显示" }}</span>
            <m-switch v-model="model" class="show-switch" v-bind="$attrs" />
        </div>
    </m-form-item>
</template>
<script lang="ts" setup name="BaseShowBox">
const props = defineProps({
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
.content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    :deep(.mo-checkbox-icon) {
        width: 20px;
        height: 20px;
        .mo-checkbox-icon-check {
            width: 10px;
        }
    }
}
</style>
