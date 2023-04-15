<template>
    <a-form-item v-bind="$attrs">
        <a-input-number v-model:value="model" v-bind="$attrs" :min="min" :max="max"></a-input-number>
    </a-form-item>
</template>

<script lang="ts" setup name="BaseInputNumber">
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
        min: Number
    },
    placeholder: {
        type: String,
        default: "请输入"
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 99999
    },
    tips: {
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
