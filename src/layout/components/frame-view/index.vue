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
    height: calc(100vh - 64px);
    position: relative;
    .frame-view-content {
        background-color: var(--color-bg-2);
        flex: 1;
        padding: 24px;
        margin: 20px;
        overflow-y: auto;
        @include scroll-y;
    }
    .frame-view-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background-color: var(--color-bg-2);
    }
}
</style>
