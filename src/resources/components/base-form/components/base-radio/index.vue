<template>
    <m-form-item v-bind="$attrs">
        <div v-if="pixel" class="pixel">{{ model }}px</div>
        <m-space direction="vertical" size="large">
            <m-radio-group v-model="model" class="radio" :type="type" :disabled="disabled" @change="change">
                <m-radio
                    v-for="(item, index) in props.options"
                    :key="index"
                    :value="item[props.valueKey]"
                    :disabled="item.disabled"
                    >{{ item[props.labelKey] }}</m-radio
                >
            </m-radio-group>
        </m-space>
    </m-form-item>
</template>
<script lang="ts" setup name="BaseRadio">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        show?: boolean;
        modelValue: number | string | boolean;
        options: Record<string, any>[];
        type: "button" | "radio";
        pixel?: boolean;
        disabled?: boolean;
        change?: (value: string | number | boolean, ev: Event) => any;
    }>(),
    {
        modelValue: "",
        labelKey: "label",
        valueKey: "value",
        show: true,
        pixel: false,
        disabled: false,
        change: (value, ev) => undefined
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
:deep(.mo-form-item-content) {
    .pixel {
        flex: 1;
        font-size: 14px;
        color: #55585c;
        font-weight: bold;
    }
}
:deep(.mo-form-item-label-col-left) {
    flex: none !important;
}
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
</style>
