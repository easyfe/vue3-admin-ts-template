<template>
    <frame-view>
        <count-up :end-val="100" :decimal-places="2">
            <template #suffix>
                <span>万</span>
            </template>
        </count-up>
    </frame-view>
</template>
<script lang="ts" setup>
import CountUp from "vue-countup-v3";
</script>
<style lang="scss" scoped></style>
