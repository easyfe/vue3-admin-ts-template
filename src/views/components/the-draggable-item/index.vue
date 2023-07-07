<template>
    <div
        class="the-draggable-item"
        :style="itemStyle"
        draggable="true"
        @drag="ondrag"
        @dragend="ondragend"
        @mousedown="mousedown"
        @dragenter="ondragenter"
        @dragove="ondragove"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts" setup name="TheDraggableItem">
const props = withDefaults(
    defineProps<{
        w: string | number; //宽度
        h: string | number; //高度
        x: string | number; //x坐标
        y: string | number; //y坐标
        minW?: string | number; //最小宽度
        minH?: string | number; //最小高度
        active?: boolean; //是否激活
    }>(),
    {
        minH: 0,
        minW: 0,
        active: false
    }
);

let parentClientRect = <DOMRect | null>null;
let mouseEl = <MouseEvent | null>null;
let scrollRect = <Element | null>null;

const emits = defineEmits<{
    (e: "update:active", data: boolean): void;
    (e: "update:x", data: number): void;
    (e: "update:y", data: number): void;
    (e: "update:w", data: number): void;
    (e: "update:h", data: number): void;
}>();

const itemStyle = computed<Record<string, any>>(() => {
    const width = isNaN(Number(props.w)) ? props.w : props.w + "px";
    const height = isNaN(Number(props.h)) ? props.h : props.h + "px";
    const x = isNaN(Number(props.x)) ? props.x : props.x + "px";
    const y = isNaN(Number(props.y)) ? props.y : props.y + "px";
    return {
        position: "absolute",
        overflow: "hidden",
        width,
        height,
        transform: `translate3d(${x}, ${y}, 0px)`
    };
});

function ondrag(event: DragEvent) {
    if (!parentClientRect || !mouseEl || !event.clientX || !event.clientY) {
        return;
    }
    const scrollTop = scrollRect?.scrollTop || 0;
    const scrollLeft = scrollRect?.scrollLeft || 0;
    let leftNew = Math.ceil(event.clientX - parentClientRect.left - mouseEl.offsetX);
    let topNew = Math.ceil(event.clientY - parentClientRect.top - mouseEl.offsetY);
    //如果超出边界，则禁止拖动
    if (leftNew >= 0 && leftNew + scrollLeft + Number(props.w) <= parentClientRect.width) {
        emits("update:x", leftNew + scrollLeft);
    }
    if (topNew >= 0 && topNew + scrollTop + Number(props.h) <= parentClientRect.height) {
        emits("update:y", topNew + scrollTop);
    }
    console.log(props.x, props.y);
}

function ondragend(event: DragEvent) {
    event.stopPropagation();
    mouseEl = null;
}

function ondragenter(event: DragEvent) {
    event.preventDefault();
}

function ondragove(event: DragEvent) {
    event.preventDefault();
}

function mousedown(event: MouseEvent) {
    event.stopPropagation();
    emits("update:active", true);
    mouseEl = event;
}

onMounted(() => {
    nextTick(() => {
        parentClientRect = document.getElementById("the-draggable-container")?.getBoundingClientRect() || null;
        scrollRect = document.getElementsByClassName("layout-content")[0];
    });
});

onBeforeUnmount(() => {
    // window.removeEventListener("scroll", handleScroll, true);
});
</script>
<style lang="scss" scoped>
.the-draggable-item {
}
</style>
