<template>
    <the-draggable-container id="container" class="container" :grid="[15, 15]">
        <template v-for="item in list" :key="item.id">
            <div
                :style="getItemStyle(item)"
                draggable="true"
                @drag="ondrag(item, $event)"
                @mousedown="mousedown(item, $event)"
            ></div>
        </template>
    </the-draggable-container>
</template>
<script lang="ts" setup>
import genrateNanoid from "@/utils/tools/nanoid";
import { RefLine } from "./ref-line";

let infoClientRect = <DOMRect | null>null;
let mouseEl = <null | MouseEvent>null;

const list = ref([
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 100,
        y: 100,
        w: 100,
        h: 120,
        active: true,
        color: "red"
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
        color: "blue"
    }
]);

function ondrag(item: any, event: DragEvent) {
    if (!infoClientRect || !mouseEl) {
        return;
    }
    let leftNew = Math.ceil(event.clientX - infoClientRect.left - mouseEl.offsetX + window.scrollX);
    let topNew = Math.ceil(event.clientY - infoClientRect.top - mouseEl.offsetY + window.scrollY);
    //如果超出边界，则禁止拖动
    if (leftNew >= 0) {
        item.x = leftNew;
    }
    if (topNew >= 0) {
        item.y = topNew;
    }
}

function mousedown(item: any, event: MouseEvent) {
    event.stopPropagation();
    // list.value.forEach((item: any) => {
    //     item.active = false;
    // });
    item.active = true;
    mouseEl = event;
}

function getItemStyle(item: any): any {
    return {
        position: "absolute",
        width: `${item.w}px`,
        height: `${item.h}px`,
        transform: `translate3d(${item.x}px, ${item.y}px,0px)`,
        backgroundColor: item.color
    };
}

onMounted(() => {
    nextTick(() => {
        let info = document.getElementById("container")?.getBoundingClientRect();
        if (info) {
            infoClientRect = info;
            new RefLine();
        }
    });
});
</script>

<style lang="scss" scoped>
.container {
    width: calc(100% - 40px);
    margin: 20px;
    background-color: #fff;
}
</style>
