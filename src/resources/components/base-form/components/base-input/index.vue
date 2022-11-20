<template>
    <n-form-item v-bind="$attrs">
        <div class="content">
            <n-input v-model:value.trim="model" v-bind="$attrs" class="input"></n-input>
            <div v-if="defaultValue" class="reset" @click="reset">重置</div>
        </div>
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

const reset = (): void => {
    emits("update:modelValue", props.defaultValue);
};
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;
    width: 100%;
    .reset {
        width: 40px;
        font-size: 14px;
        color: #1966ff;
        margin-left: 16px;
        cursor: pointer;
    }
}
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
</style>
