<template>
    <div class="frame-view" :style="{ height: frameViewHeight, paddingBottom: $slots.footer ? '60px' : '0' }">
        <div ref="myFrameContent" :class="['frame-view-content', props.contentClass]">
            <a-page-header v-if="pageHeader" v-bind="pageHeader" @back="routerHelper.back()" />
            <slot></slot>
        </div>
        <div v-if="$slots.footer" class="frame-view-footer" :style="footerStyle">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup name="FrameView">
import global from "@/config/pinia/global";
import routerHelper from "@/utils/helper/router";
import { LAYOUT_SIZE } from "@/layout/constants";
import { PageHeader } from "@arco-design/web-vue";

const props = withDefaults(
    defineProps<{
        contentClass?: string;
        pageHeader?: InstanceType<typeof PageHeader>["$props"];
        footer?: boolean;
    }>(),
    {
        contentClass: "",
        pageHeader: undefined,
        footer: false
    }
);

const route = useRoute();

const myFrameContent = ref();

// 计算 frame-view 的高度：100vh - Header高度 - Tags高度
const frameViewHeight = computed(() => {
    return `calc(100vh - ${LAYOUT_SIZE.HEADER_HEIGHT}px - ${LAYOUT_SIZE.TAGS_HEIGHT}px)`;
});

const footerStyle = computed(() => {
    const { SIDER_WIDTH, SIDER_COLLAPSED_WIDTH } = LAYOUT_SIZE;
    return {
        width: global().collapsed ? `calc(100% - ${SIDER_COLLAPSED_WIDTH}px)` : `calc(100% - ${SIDER_WIDTH}px)`
    };
});

onActivated(() => {
    nextTick(() => {
        let $content = myFrameContent.value;
        if (route.meta?.scrollId) {
            $content = document.querySelector(`${route.meta?.scrollId}`);
        }
        if ($content && route.name) {
            $content.scrollTop = global().scrollTop[route.name.toString()] || 0;
        }
    });
});
</script>
<style lang="scss" scoped>
.frame-view {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    overflow-x: hidden;

    .frame-view-content {
        background-color: var(--color-bg-2);
        flex: 1;
        padding: 24px;
        margin: 20px;
        overflow: visible; // 不需要滚动
    }

    .frame-view-footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-bg-2);
        height: 60px;
        border-top: 1px solid var(--color-border);
        flex-shrink: 0; // 防止footer被压缩
        z-index: 10;
    }
}
</style>
