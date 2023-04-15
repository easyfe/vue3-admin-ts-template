<template>
    <a-form-item v-bind="$attrs">
        <a-input v-model.trim="model" v-bind="$attrs" class="input"></a-input>
        <template v-if="$attrs.extra" #extra>
            <form-extra :config="$attrs"></form-extra>
        </template>
    </a-form-item>
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
