<template>
    <div class="content">
        <div class="drag-column">
            <div v-for="item in sourceList" :key="item.label" class="drag-item">
                {{ item.label }}
            </div>
        </div>
        <div class="target-coulumn">
            <DraggableContainer>
                <template v-for="(item, index) in targetList" :key="item.id">
                    <Vue3DraggableResizable
                        v-model:x="item.x"
                        v-model:y="item.y"
                        v-model:w="item.w"
                        v-model:h="item.h"
                        v-model:active="item.active"
                        :init-w="item.initW"
                        :init-h="item.initY"
                        :draggable="true"
                        :resizable="true"
                        :parent="true"
                        @click="onDraggableClick($event, index)"
                        @resizing="resizeEndHandle(item.id)"
                        @deactivated="onDeactivated(index)"
                    >
                        <div class="vdr-content">
                            <component :is="item.component" :id="item.id" />
                        </div>
                    </Vue3DraggableResizable>
                </template>
            </DraggableContainer>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Vue3DraggableResizable, { DraggableContainer } from "@/views/components/the-draggable-resizable";
import genrateNanoid from "@/utils/tools/nanoid";
import overview from "../echarts/components/overview.vue";
import line from "../echarts/components/line.vue";
import bar from "../echarts/components/bar.vue";
import { markRaw } from "vue";
import eventBus, { EVENT_CHART_RESIZE } from "@/utils/tools/event-bus";
const sourceList = [
    {
        label: "测试"
    }
];

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
        component: overview
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
        component: line
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
        component: bar
    }
]);

const ctrlClick = ref(false);

function onDraggableClick(e: MouseEvent, index: number) {
    nextTick(() => {
        // targetList.value[index].active = e.ctrlKey;
    });
}

function resizeEndHandle(id: string) {
    eventBus.emit(EVENT_CHART_RESIZE, id);
}

function onDeactivated(index: number) {
    nextTick(() => {
        // if (ctrlClick.value) {
        //     ctrlClick.value = false;
        //     targetList.value[index].active = true;
        // }
    });
}

// function logKey(e: MouseEvent) {
//     ctrlClick.value = e.ctrlKey;
// }

// onUnmounted(() => {
//     const ele = document.getElementById("target-coulumn");
//     if (!ele) return;
//     ele.removeEventListener("click", logKey);
// });

// onMounted(() => {
//     const ele = document.getElementById("target-coulumn");
//     if (!ele) return;
//     ele.addEventListener("click", logKey);
// });
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
    // width: 1920px;
    // height: 1080px;
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
