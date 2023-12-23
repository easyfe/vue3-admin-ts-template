<template>
    <!--辅助线-->
    <span
        v-for="(item, index) in lineValue.vLine"
        v-show="item.display"
        :key="index"
        class="ref-line v-line"
        :style="{ left: item.position, top: item.origin, height: item.lineLength }"
    ></span>
    <span
        v-for="(item, index) in lineValue.hLine"
        v-show="item.display"
        :key="index"
        class="ref-line h-line"
        :style="{ top: item.position, left: item.origin, width: item.lineLength }"
    ></span>
    <!--辅助线END-->
</template>
<script lang="ts" setup>
import { useDragLine } from "./hook";
const { lineValue } = useDragLine();
</script>
<style lang="scss" scoped>
.ref-line {
    position: absolute;
    background-color: rgb(255, 0, 204);
    z-index: 9999;
}
.v-line {
    width: 1px;
}
.h-line {
    height: 1px;
}
</style>
