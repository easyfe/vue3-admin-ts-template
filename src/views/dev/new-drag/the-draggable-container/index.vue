<template>
    <div
        id="the-draggable-container"
        :class="['the-draggable-container', props.grid && 'the-draggable-grid']"
        :style="containerStyle"
    >
        <slot></slot>
        <!--辅助线-->
        <span
            v-for="(item, index) in matchedRows"
            :key="index"
            :style="{
                width: item.width + 'px',
                height: '0',
                left: item.left + 'px',
                top: item.top + 'px',
                borderTop: `2px solid red`,
                position: 'absolute'
            }"
        ></span>
        <span
            v-for="(item, index) in matchedCols"
            :key="index"
            :style="{
                width: '0',
                height: item.height + 'px',
                top: item.top + 'px',
                left: item.left + 'px',
                borderLeft: `2px solid red`,
                position: 'absolute'
            }"
        ></span>
        <!--辅助线END-->
    </div>
</template>
<script lang="ts" setup name="TheDraggableContainer">
import { computed } from "vue";
import { MatchedLine, Position, SetMatchedLine } from "./type";

const list = ref<Position[]>([]);

const state = reactive<{
    matchedLine: MatchedLine | null;
}>({
    matchedLine: null
});

const setMatchedLine: SetMatchedLine = (matchedLine: MatchedLine | null) => {
    state.matchedLine = matchedLine;
};

const matchedRows = computed(() => state.matchedLine && state.matchedLine.row);
const matchedCols = computed(() => state.matchedLine && state.matchedLine.col);

const props = withDefaults(
    defineProps<{
        grid?: [number, number];
    }>(),
    {
        grid: undefined
    }
);

// const coordsList = computed(() => {
//     return list.value.map((item) => {
//         const topLeft = {
//             x: item.x,
//             y: item.y
//         };
//         const topRight = {
//             x: item.x + item.w,
//             y: item.y
//         };
//         const bottomLeft = {
//             x: item.x,
//             y: item.y + item.h
//         };
//         const bottomRight = {
//             x: item.x + item.w,
//             y: item.y + item.h
//         };
//         const center = {
//             x: item.x + item.w / 2,
//             y: item.y + item.h / 2
//         };
//         return {
//             topLeft,
//             topRight,
//             bottomLeft,
//             bottomRight,
//             center
//         };
//     });
// });

const containerStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.grid) {
        style.backgroundImage =
            "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)";
        style.backgroundSize = `${props.grid[0]}px ${props.grid[1]}px`;
    }
    return style;
});

provide("list", list);
provide("setMatchedLine", setMatchedLine);
// provide("coordsList", coordsList);
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
