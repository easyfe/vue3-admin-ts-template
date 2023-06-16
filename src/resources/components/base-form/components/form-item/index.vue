<template>
    <a-form-item v-bind="attrs">
        <div :style="getSlotStyle">
            <slot></slot>
        </div>
        <template v-if="attrs.inputTips" #extra>
            <form-extra :config="attrs"></form-extra>
        </template>
        <template v-if="attrs.labelTips" #label>
            {{ attrs.label }}
            <a-tooltip :content="attrs.labelTips">
                <icon-question-circle-fill />
            </a-tooltip>
        </template>
    </a-form-item>
</template>
<script setup lang="ts">
const attrs: Record<string, any> = useAttrs();

const getSlotStyle = computed(() => {
    const width = attrs.width;
    //如果传入了width，以传入的为准
    if (width) {
        return {
            width: isNaN(Number(width)) ? width : `${width}px`
        };
    }
    //如果没有传入width，并且是横向布局，宽度为100%
    if (attrs.layout === "row") {
        return;
    }
    //如果没有传入width，并且是纵向布局，设置默认宽度
    const defaultWidth: Record<string, string> = {
        input: "400px",
        inputNumber: "200px",
        date: "400px",
        time: "200px",
        editor: "800px",
        select: "400px"
    };
    return {
        width: defaultWidth[attrs.inputType] || "100%"
    };
});
</script>
<style scoped lang="scss">
:deep(.arco-form-item-label) {
    color: #898b8f !important;
}
:deep(.arco-picker) {
    width: 100%;
}
</style>
