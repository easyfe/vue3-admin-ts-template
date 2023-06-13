<template>
    <form-item>
        <a-input-number v-model:value="model" v-bind="$attrs"></a-input-number>
    </form-item>
</template>

<script lang="ts" setup name="BaseInputNumber">
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
        min: Number
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
