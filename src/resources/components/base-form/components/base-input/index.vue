<template>
    <n-form-item v-bind="$attrs">
        <n-input v-model:value.trim="model" v-bind="$attrs" class="input"></n-input>
        <slot name="extra"></slot>
        <!-- <p v-if="$attrs.tips" class="tips">{{ $attrs.tips }}</p> -->
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
// .tips {
//     width: 100%;
//     font-size: 12px;
//     color: #c0c4cc;
//     text-align: left;
//     margin-top: 4px;
// }
</style>
