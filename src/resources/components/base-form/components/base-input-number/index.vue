<template>
    <m-form-item v-bind="$attrs">
        <div>
            <m-input-number v-model="model" class="input-number" :min="min" :max="max"></m-input-number>
            <div v-if="tips" class="tips">{{ tips }}</div>
        </div>
    </m-form-item>
</template>

<script lang="ts" setup name="BaseInput">
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
<style lang="scss" scoped>
:deep(.mo-form-item-wrapper-col) {
    width: 100px;
    flex-grow: 0 !important;
}
.mo-form-item {
    justify-content: space-between;
}
.tips {
    font-size: 12px;
    color: #bcbdc0;
    line-height: 17px;
    margin-top: 8px;
    text-align: right;
}
.input-number.mo-input-wrapper {
    margin-bottom: 0;
}
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
</style>
