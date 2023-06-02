<template>
    <div class="content">
        <div class="drag-column">
            <div v-for="item in sourceList" :key="item.label" class="drag-item">
                {{ item.label }}
            </div>
        </div>
        <div class="target-coulumn">
            <template v-for="(item, index) in targetList" :key="item.id">
                <the-draggable-resizable
                    v-model:x="item.x"
                    v-model:y="item.y"
                    v-model:w="item.w"
                    v-model:h="item.h"
                    v-model:active="item.active"
                    :grid="[2, 2]"
                    :init-w="item.initW"
                    :init-h="item.initY"
                    :draggable="true"
                    :resizable="true"
                    :parent="true"
                    :is-conflict-check="false"
                    :snap="true"
                    :snap-tolerance="10"
                    @dragging="(left:number, top:number) => onDragging(index, left, top)"
                    @dragstop="(left:number, top:number) => onDragstop(index, left, top)"
                    @resizing="resizeEndHandle(item.id)"
                    @deactivated="onDeactivated($event, index)"
                    @refLineParams="useDragLine().setValue"
                >
                    <div class="vdr-content">
                        <component :is="item.component" :id="item.id" />
                    </div>
                </the-draggable-resizable>
            </template>
            <the-draggable-line></the-draggable-line>
        </div>
    </div>
</template>
<script lang="ts" setup>
import genrateNanoid from "@/utils/tools/nanoid";
import { ChartBar, ChartLine, ChartOverview } from "../echarts/components/index";
import eventBus, { EVENT_CHART_RESIZE } from "@/utils/tools/event-bus";
import { useDragLine } from "@/views/components/the-draggable-line/hook";

const sourceList = [
    {
        label: "测试"
    }
];

const getMultiple = computed(() => {
    return targetList.value.filter((item) => item.active).length > 1;
});
const targetList = ref([
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 100,
        y: 100,
        w: 100,
        h: 120,
        active: true,
        component: shallowRef(ChartOverview)
    },
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 250,
        y: 100,
        w: 100,
        h: 120,
        active: false,
        component: shallowRef(ChartLine)
    },
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 400,
        y: 100,
        w: 100,
        h: 120,
        active: false,
        component: shallowRef(ChartBar)
    }
]);

const prevOffsetX = ref(0);
const prevOffsetY = ref(0);

function resizeEndHandle(id: string) {
    eventBus.emit(EVENT_CHART_RESIZE, id);
}

function getDeltaX(offsetX: number) {
    const ret = offsetX - prevOffsetX.value;

    prevOffsetX.value = offsetX;

    return ret;
}
function getDeltaY(offsetY: number) {
    const ret = offsetY - prevOffsetY.value;

    prevOffsetY.value = offsetY;

    return ret;
}

function onDragging(index: number, left: number, top: number) {
    if (!getMultiple.value) {
        return;
    }

    const offsetX = left - targetList.value[index].x;
    const offsetY = top - targetList.value[index].y;

    const deltaX = getDeltaX(offsetX);
    const deltaY = getDeltaY(offsetY);

    targetList.value.forEach((v, i) => {
        if (v.active && i !== index) {
            v.x += deltaX;
            v.y += deltaY;
        }
    });
}

function onDragstop(index: number, left: number, top: number) {
    console.log("=======", left);
    prevOffsetX.value = 0;
    prevOffsetY.value = 0;
}

function onDeactivated(e: MouseEvent, index: number) {
    nextTick(() => {
        if (!e) {
            return;
        }
        if (e?.ctrlKey) {
            targetList.value[index].active = true;
        }
        if (getMultiple.value && e?.target?.className !== "target-coulumn") {
            targetList.value[index].active = true;
        }
    });
}
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    height: 100%;
}
.drag-column {
    width: 200px;
    background-color: #fff;
    margin: 20px;
    .drag-item {
        padding: 10px;
        border-bottom: 1px solid #e8e8e8;
    }
}
.target-coulumn {
    position: relative;
    margin: 20px 20px 20px 0;
    flex: 1;
    background-color: #fff;
    user-select: none;
    .vdr-content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
}
</style>
