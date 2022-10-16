<template>
    <m-form-item v-bind="$attrs">
        <m-switch v-model="model" class="switch" />
    </m-form-item>
</template>
<script lang="ts" setup name="BaseSwitch">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    show: {
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
:deep(.mo-form-item-label) {
    white-space: nowrap;
}
</style>
