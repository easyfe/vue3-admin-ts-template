<template>
    <div class="frame-view">
        <div class="frame-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup name="FrameView"></script>
<style lang="scss" scoped>
.frame-view {
    background-color: #fff;
    .frame-content {
        padding: 24px 48px;
    }
}
</style>
