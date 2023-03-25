<template>
    <n-form-item v-bind="$attrs">
        <n-input v-model:value.trim="model" v-bind="$attrs" class="input"></n-input>
        <slot name="extra"></slot>
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
<style lang="scss" scoped></style>
