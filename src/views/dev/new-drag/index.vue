<template>
    <the-draggable-container class="container" :grid="[15, 15]">
        <template v-for="item in list" :key="item.id">
            <the-draggable-item
                :id="item.id"
                v-model:h="item.h"
                v-model:w="item.w"
                v-model:x="item.x"
                v-model:y="item.y"
                v-model:active="item.active"
            >
                <div :style="getItemStyle(item)"></div>
            </the-draggable-item>
        </template>
    </the-draggable-container>
</template>
<script lang="ts" setup>
import genrateNanoid from "@/utils/tools/nanoid";
import TheDraggableContainer from "./the-draggable-container/index.vue";
import TheDraggableItem from "./the-draggable-item/index.vue";

const list = ref([
    {
        id: genrateNanoid(),
        x: 100,
        y: 100,
        w: 100,
        h: 120,
        active: true,
        color: "black"
    },
    {
        id: genrateNanoid(),
        x: 250,
        y: 200,
        w: 100,
        h: 120,
        active: false,
        color: "blue"
    },
    {
        id: genrateNanoid(),
        x: 450,
        y: 300,
        w: 100,
        h: 120,
        active: false,
        color: "yellow"
    }
]);

function getItemStyle(item: any): any {
    return {
        wdith: "100%",
        height: "100%",
        backgroundColor: item.color
    };
}
</script>

<style lang="scss" scoped>
.container {
    width: calc(100% - 40px);
    margin: 20px;
    background-color: #fff;
}
</style>
