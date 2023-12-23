<template>
    <div
        ref="myself"
        class="the-draggable-item"
        :style="itemStyle"
        draggable="true"
        @dragstart="ondragstart"
        @drag="ondrag"
        @dragend="ondragend"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @dragenter="ondragenter"
        @dragove="ondragove"
    >
        <div v-show="props.active" :class="[props.active && 'active']">
            <div
                v-for="item in handleList"
                :key="item.name"
                class="handle"
                :style="item.style"
                @mousedown.stop.prevent="handleDown($event, item.name)"
            ></div>
        </div>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup name="TheDraggableItem">
import { MatchedLine, Position, SetMatchedLine } from "../the-draggable-container/type";

//吸附阈值
const adsorbValue = 10;

const props = withDefaults(
    defineProps<{
        id: string;
        w: number; //宽度
        h: number; //高度
        x: number; //x坐标
        y: number; //y坐标
        minW?: number; //最小宽度
        minH?: number; //最小高度
        active?: boolean; //是否激活
    }>(),
    {
        minH: 10,
        minW: 10,
        active: false
    }
);

const allList = ref(inject<Position[]>("list"));

const setMatchedLine = inject<SetMatchedLine>("setMatchedLine");

const myself = ref<HTMLElement | null>(null);

let parentClientRect = <DOMRect | null>null;
let mouseEl = <MouseEvent | null>null;
let scrollRect = <Element | null>null;
let parentDom = <HTMLElement | null>null;

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
        // overflow: "hidden",
        width,
        height,
        transform: `translate3d(${x}, ${y}, 0px)`
    };
});

const handleList = computed(() => {
    return [
        {
            name: "tl",
            style: {
                top: "0",
                left: "0",
                cursor: "nwse-resize",
                transform: "translate(-50%, -50%)"
            }
        },
        {
            name: "tm",
            style: {
                top: "0",
                left: "50%",
                cursor: "ns-resize",
                transform: "translate(-50%, -50%)"
            }
        },
        {
            name: "tr",
            style: {
                top: "0",
                right: "0",
                cursor: "nesw-resize",
                transform: "translate(50%, -50%)"
            }
        },
        {
            name: "ml",
            style: {
                top: "50%",
                left: "0",
                cursor: "ew-resize",
                transform: "translate(-50%, -50%)"
            }
        },
        {
            name: "mr",
            style: {
                top: "50%",
                right: "0",
                cursor: "ew-resize",
                transform: "translate(50%, -50%)"
            }
        },
        {
            name: "bl",
            style: {
                bottom: "0",
                left: "0",
                cursor: "nesw-resize",
                transform: "translate(-50%, 50%)"
            }
        },
        {
            name: "bm",
            style: {
                bottom: "0",
                left: "50%",
                cursor: "ns-resize",
                transform: "translate(-50%, 50%)"
            }
        },
        {
            name: "br",
            style: {
                bottom: "0",
                right: "0",
                cursor: "nwse-resize",
                transform: "translate(50%, 50%)"
            }
        }
    ];
});

//控制柄位置
let handleAction = "";

const selfAnchorPoint = computed(() => {
    return {
        x: [props.x, props.x + props.w / 2, props.x + props.w],
        y: [props.y, props.y + props.h / 2, props.y + props.h]
    };
});

watch(
    () => props,
    () => {
        if (!allList.value) return;
        const index = allList.value.findIndex((item: any) => item._id === props.id);
        if (index !== -1) {
            allList.value[index].w = props.w;
            allList.value[index].h = props.h;
            allList.value[index].x = props.x;
            allList.value[index].y = props.y;
            allList.value[index].active = props.active;
        } else {
            allList.value.push({
                _id: props.id,
                w: props.w,
                h: props.h,
                x: props.x,
                y: props.y,
                active: props.active
            });
        }
    },
    {
        immediate: true,
        deep: true
    }
);

function ondragstart(event: DragEvent) {
    var img = new Image();
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
    event?.dataTransfer?.setDragImage(img, 0, 0);
}

async function ondrag(event: DragEvent) {
    if (!parentClientRect || !mouseEl || !event.clientX || !event.clientY) {
        return;
    }
    const scrollTop = scrollRect?.scrollTop || 0;
    const scrollLeft = scrollRect?.scrollLeft || 0;
    let leftNew = Math.ceil(event.clientX - parentClientRect.left - mouseEl.offsetX) + scrollLeft;
    let topNew = Math.ceil(event.clientY - parentClientRect.top - mouseEl.offsetY) + scrollTop;
    //如果超出父元素边界，则禁止拖动
    if (leftNew >= 0 && leftNew + Number(props.w) <= parentClientRect.width) {
        emits("update:x", leftNew);
    }
    if (topNew >= 0 && topNew + Number(props.h) <= parentClientRect.height) {
        emits("update:y", topNew);
    }
    nextTick(() => {
        checkSnap();
    });
}

//检查辅助线和吸附
function checkSnap() {
    if (!setMatchedLine) {
        return;
    }
    const list = allList.value?.filter((item: any) => item._id !== props.id);
    const matchedLine: MatchedLine = {
        row: [],
        col: []
    };
    if (!list) {
        return;
    }
    const anchorPointList = list.map((item) => {
        const anchorPoint = {
            x: [item.x, item.x + item.w / 2, item.x + item.w],
            y: [item.y, item.y + item.h / 2, item.y + item.h]
        };
        return anchorPoint;
    });
    //x表示竖向线条，有3条线
    selfAnchorPoint.value.x.forEach((v1) => {
        //用于存储匹配的x坐标
        let matchX: Record<number, number[]> = {};
        //遍历其他元素所有的锚点
        anchorPointList.forEach((v2, i2) => {
            v2.x.forEach((v3) => {
                const abs = v1 - v3;
                if (Math.abs(abs) <= adsorbValue) {
                    emits("update:x", props.x - abs);
                    //如果有匹配的x坐标，则存储
                    if (!matchX[v3]) {
                        matchX[v3] = [...anchorPointList[i2].y, ...selfAnchorPoint.value.y];
                    } else {
                        matchX[v3].push(...anchorPointList[i2].y, ...selfAnchorPoint.value.y);
                    }
                }
            });
        });
        //如果有匹配的x坐标，则计算最小值和最大值，存储到matchedLine中
        Object.keys(matchX).forEach((key) => {
            const min = Math.min(...matchX[Number(key)]);
            const max = Math.max(...matchX[Number(key)]);
            matchedLine.col.push({
                top: min,
                left: Number(key),
                height: max - min
            });
        });
    });
    //y表示横向线条，有3条线
    selfAnchorPoint.value.y.forEach((v1) => {
        let matchY: Record<number, number[]> = {};
        anchorPointList.forEach((v2, i2) => {
            v2.y.forEach((v3) => {
                const abs = v1 - v3;
                if (Math.abs(abs) <= adsorbValue) {
                    emits("update:y", props.y - abs);
                    if (!matchY[v3]) {
                        matchY[v3] = [...anchorPointList[i2].x, ...selfAnchorPoint.value.x];
                    } else {
                        matchY[v3].push(...anchorPointList[i2].x, ...selfAnchorPoint.value.x);
                    }
                }
            });
        });
        Object.keys(matchY).forEach((key) => {
            const min = Math.min(...matchY[Number(key)]);
            const max = Math.max(...matchY[Number(key)]);
            matchedLine.row.push({
                top: Number(key),
                left: min,
                width: max - min
            });
        });
    });
    setMatchedLine(matchedLine);
}

function ondragend(event: DragEvent) {
    event.stopPropagation();
    mouseEl = null;
    if (setMatchedLine) {
        setMatchedLine(null);
    }
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
    if (allList.value?.length) {
        for (let item of allList.value) {
            if (item._id !== props.id) {
                item.active = false;
            }
        }
    }
    mouseEl = event;
}

//开始控制柄操作
function handleDown(event: MouseEvent, direction: string) {
    handleAction = direction;
    mouseEl = event;
    event.stopPropagation();
    parentDom?.addEventListener("mousemove", handleMove, true);
    parentDom?.addEventListener("mouseup", handleUp, true);
}
//结束控制柄操作
function handleUp(event: MouseEvent) {
    handleAction = "";
    event.stopPropagation();
    parentDom?.removeEventListener("mousemove", handleMove, true);
    parentDom?.removeEventListener("mouseup", handleUp, true);
    if (setMatchedLine) {
        // setMatchedLine(null);
    }
}
//控制柄移动
function handleMove(event: MouseEvent) {
    event.stopPropagation();
    if (!mouseEl) {
        console.warn("鼠标移动事件未触发");
        return;
    }
    const { clientX, clientY } = event;
    const { clientX: mouseClientX, clientY: mouseClientY } = mouseEl;
    const x = clientX - mouseClientX;
    const y = clientY - mouseClientY;
    if (handleAction === "tl") {
        //左上角
        emits("update:x", props.x + x);
        emits("update:y", props.y + y);
        emits("update:w", props.w - x);
        emits("update:h", props.h - y);
    } else if (handleAction === "tm") {
        //上中
        emits("update:y", props.y + y);
        emits("update:h", props.h - y);
    } else if (handleAction === "tr") {
        //右上角
        emits("update:y", props.y + y);
        emits("update:w", props.w + x);
        emits("update:h", props.h - y);
    } else if (handleAction === "mr") {
        //右中
        emits("update:w", props.w + x);
    } else if (handleAction === "br") {
        //右下角
        emits("update:w", props.w + x);
        emits("update:h", props.h + y);
    } else if (handleAction === "bm") {
        //下中
        emits("update:h", props.h + y);
    } else if (handleAction === "bl") {
        //左下角
        emits("update:x", props.x + x);
        emits("update:w", props.w - x);
        emits("update:h", props.h + y);
    } else if (handleAction === "ml") {
        //左中
        emits("update:x", props.x + x);
        emits("update:w", props.w - x);
    }
    mouseEl = event;
    nextTick(() => {
        // checkSnap();
    });
}

function mouseup(event: MouseEvent) {
    console.log("触发mouseup");
    event.stopPropagation();
    // emits("update:active", false);
    mouseEl = null;
}

onMounted(() => {
    nextTick(() => {
        parentDom = document.getElementById("the-draggable-container");
        parentClientRect = parentDom?.getBoundingClientRect() || null;
        scrollRect = document.getElementsByClassName("layout-content")[0];
        if (parentDom) {
            parentDom.ondragover = function (e) {
                // 禁止默认行为,才能看到拖动元素的光标样式与effectAllowed的值对应
                e.preventDefault();
            };
        }
    });
});

onBeforeUnmount(() => {
    // window.removeEventListener("scroll", handleScroll, true);
});
</script>
<style lang="scss" scoped>
.the-draggable-item {
    position: relative;
    user-select: none;
    cursor: default;
    .active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px dashed #f2f3f5;
        .handle {
            position: absolute;
            background-color: #fff;
            border: 1px solid #333;
            box-shadow: 0 0 2px #bbb;
            z-index: 1;
            width: 8px;
            height: 8px;
            display: "block";
        }
    }
}
</style>
