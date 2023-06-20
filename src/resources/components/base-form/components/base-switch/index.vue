<template>
    <form-item>
        <a-switch v-model="model" v-bind="$attrs" class="switch" />
    </form-item>
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
    (e: "update:modelValue", data: boolean): void;
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
    color: #898b8f !important;
}
</style>
