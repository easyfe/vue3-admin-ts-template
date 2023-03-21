<template>
    <n-form-item v-bind="$attrs">
        <base-rich-text :content="model"></base-rich-text>
    </n-form-item>
</template>
<script lang="ts" setup name="BaseInput">
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    defaultValue: {
        type: String,
        default: ""
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
// :deep(.n-form-item-blank) {
//     flex-direction: column;
// }
</style>
