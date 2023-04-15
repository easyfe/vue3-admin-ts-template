<template>
    <a-form-item v-bind="$attrs">
        <a-time-picker v-model:value="model" v-bind="$attrs" />
    </a-form-item>
</template>
<script lang="ts" setup name="BaseTime">
const props = withDefaults(
    defineProps<{
        modelValue?: any;
    }>(),
    {
        modelValue: null
    }
);
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
.n-time-picker {
    width: 100%;
}
</style>
