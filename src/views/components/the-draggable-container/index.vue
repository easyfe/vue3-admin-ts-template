<template>
    <div
        id="the-draggable-container"
        :class="['the-draggable-container', props.grid && 'the-draggable-grid']"
        :style="containerStyle"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts" setup name="TheDraggableContainer">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        grid?: [number, number];
    }>(),
    {
        grid: undefined
    }
);

const containerStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.grid) {
        style.backgroundImage =
            "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)";
        style.backgroundSize = `${props.grid[0]}px ${props.grid[1]}px`;
    }
    return style;
});
</script>
<style lang="scss" scoped>
.the-draggable-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.the-draggable-grid {
    // background-image: linear-gradient(to right, #ccc 1px, transparent 1px),
    //     linear-gradient(to bottom, #ccc 1px, transparent 1px);
    // background-size: 40px 80px;
}
</style>
