<template>
    <the-draggable-container id="container" class="container" :grid="[15, 15]">
        <template v-for="item in list" :key="item.id">
            <div :style="getItemStyle(item)" draggable="true" @drag="ondrag"></div>
        </template>
    </the-draggable-container>
</template>
<script lang="ts" setup>
import genrateNanoid from "@/utils/tools/nanoid";

const infoClientRect = ref<DOMRect | null>(null);

const list = ref([
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 100,
        y: 100,
        w: 100,
        h: 120,
        active: true
    },
    {
        id: genrateNanoid(),
        initW: 100,
        initY: 100,
        x: 250,
        y: 100,
        w: 100,
        h: 120,
        active: false
    }
]);

function ondrag(event: DragEvent) {
    if (!infoClientRect.value) {
        return;
    }
    let leftNew = Math.ceil(event.clientX - infoClientRect.value.left);
    let topNew = Math.ceil(event.clientY - infoClientRect.value.top);
    console.log(leftNew, topNew);
}

function getItemStyle(item: any): any {
    return {
        position: "absolute",
        width: `${item.w}px`,
        height: `${item.h}px`,
        transform: `translate3d(${item.x}px, ${item.y}px,0px)`,
        backgroundColor: randomColor()
    };
}
function randomColor() {
    const color = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "A",
        "B",
        "C",
        "D",
        "E",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
    ];
    // 三位和六位，都是有用的二进制颜色  设置type为奇数就是3，偶数就是6位
    const type = ~~(Math.random() * 10 + 1);
    // 循环的长度
    let len = type % 2 == 0 ? 3 : 6;
    // 存放结果
    let ans = "";
    for (let i = 0; i < len; i++) {
        //这里循环随机得到数组下标
        let index = ~~(Math.random() * color.length);
        ans += color[index];
    }
    return "#" + ans;
}

onMounted(() => {
    nextTick(() => {
        let info = document.getElementById("container")?.getBoundingClientRect();
        if (info) {
            infoClientRect.value = info;
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
