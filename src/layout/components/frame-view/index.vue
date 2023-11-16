<template>
    <div :class="['frame-view', $slots.bottom ? 'frame-view-pdm' : '', props.fixedHeight ? 'frame-fixed-height' : '']">
        <div :class="['frame-view-content', props.contentClass]">
            <slot></slot>
        </div>
        <div v-if="$slots.bottom" class="frame-view-bottom" :style="bottomStyle">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup name="FrameView">
import global from "@/config/pinia/global";

const props = withDefaults(
    defineProps<{
        contentClass?: string;
        fixedHeight?: boolean;
    }>(),
    {
        contentClass: "",
        fixedHeight: false
    }
);

const bottomStyle = computed(() => {
    return {
        width: global().collapsed ? "calc(100% - 48px)" : "calc(100% - 200px)"
    };
});
</script>
<style lang="scss" scoped>
.frame-view-pdm {
    padding-bottom: 60px;
}
.frame-fixed-height {
    height: calc(100vh - 94px);
    overflow: hidden;
    .frame-view-content {
        height: calc(100% - 40px);
    }
}
.frame-view {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100%;
    //height设置为100%会导致margin 底部的失效
    // height: 100%;

    .frame-view-content {
        background-color: var(--color-bg-2);
        flex: 1;
        padding: 24px;
        margin: 20px;
    }
    .frame-view-bottom {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background-color: var(--color-bg-2);
        border-top: 1px solid var(--color-border);
        z-index: 100;
    }
}
</style>
