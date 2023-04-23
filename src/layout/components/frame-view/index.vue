<template>
    <div class="frame-view">
        <div class="frame-view-content">
            <slot></slot>
        </div>
        <div v-if="$slots.bottom" class="frame-view-bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup name="FrameView"></script>
<style lang="scss" scoped>
.frame-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .frame-view-content {
        flex: 1;
        padding: 24px 48px;
        overflow-y: auto;
        @include scroll-y;
    }
    .frame-view-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    }
}
</style>
