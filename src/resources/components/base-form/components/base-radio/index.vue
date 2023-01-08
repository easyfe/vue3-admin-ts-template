<template>
    <n-form-item v-bind="$attrs">
        <n-space direction="vertical" size="large">
            <n-radio-group v-model:value="model" class="radio" :type="type" v-bind="$attrs">
                <template v-if="props.type === 'button'">
                    <n-radio-button
                        v-for="(item, index) in props.options"
                        v-bind="item"
                        :key="index"
                        :value="item[props.valueKey]"
                        :disabled="item.disabled"
                        >{{ item[props.labelKey] }}</n-radio-button
                    ></template
                >
                <template v-else>
                    <n-radio
                        v-for="(item, index) in props.options"
                        v-bind="item"
                        :key="index"
                        :value="item[props.valueKey]"
                        :disabled="item.disabled"
                        >{{ item[props.labelKey] }}</n-radio
                    >
                </template>
            </n-radio-group>
        </n-space>
    </n-form-item>
</template>
<script lang="ts" setup name="BaseRadio">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue: number | string | boolean;
        options?: Record<string, any>[];
        type?: "button" | "radio";
    }>(),
    {
        modelValue: "",
        labelKey: "label",
        valueKey: "value",
        type: "radio",
        options: [] as any
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
