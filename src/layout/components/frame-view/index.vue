<template>
    <div class="frame-view">
        <div v-if="$slots.left" class="frame-view-left">
            <slot name="left"></slot>
        </div>
        <div class="frame-view-main">
            <div id="homePreviewMain" class="preview">
                <div v-if="!customNavbar" class="preview-header" :style="getHeaderStyle">
                    <div class="preview-header-nav-status"></div>
                    <div class="preview-header-title">{{ props.previewTitle }}</div>
                </div>
                <div
                    class="preview-body"
                    :style="`height:${customNavbar ? '774px;' : '686px;'}
                    background-color: ${previewBgColor};`"
                >
                    <slot name="preview"></slot>
                </div>
                <div v-if="tabbar" class="preview-footer">
                    <tabbar></tabbar>
                </div>
            </div>
        </div>

        <div class="frame-view-right" :style="`width: ${rightWidth}px`">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup name="FrameView">
import getRangeColor from "@/utils/tools/range-color/index";
import iphoneHeader from "@/assets/images/zx/iphone_header@2x.png";
import tabbar from "../tabbar/index.vue";

const props = withDefaults(
    defineProps<{
        previewTitle?: string;
        rightWidth?: number;
        customNavbar?: boolean;
        tabbar?: boolean;
        previewTopStyle?: {
            //1：填充色，2：渐变色，3：背景图
            type: 1 | 2 | 3;
            color: string;
            rangeColor: Record<string, any>;
            image: string;
        } | null;
        previewBgColor?: string;
    }>(),
    {
        previewTitle: "默认标题",
        rightWidth: 360,
        customNavbar: false,
        tabbar: true,
        previewTopStyle: null
    }
);

const getHeaderStyle = computed(() => {
    if (!props.previewTopStyle) {
        return "";
    }
    if (props.previewTopStyle.type === 1) {
        return {
            background: `${props.previewTopStyle.color}`
        };
    }
    if (props.previewTopStyle.type === 2) {
        return {
            background: `url(${iphoneHeader}) no-repeat 100% 100%,${getRangeColor(props.previewTopStyle.rangeColor)}`,
            backgroundSize: "100%"
        };
    }
    if (props.previewTopStyle.type === 3) {
        return { background: `url(${props.previewTopStyle.image}) no-repeat 100% 100%`, backgroundSize: "100%" };
    }
});
</script>
<style lang="scss" scoped>
.frame-view {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .frame-view-main {
        display: flex;
        justify-content: center;
        flex: 1;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 4px;
            height: 10px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #999;
        }

        &::-webkit-scrollbar-track {
            background: #f2f2f2;
        }
        .preview {
            margin-top: 68px;
            position: relative;
            width: 375px;
            height: 774px;
            margin-bottom: 24px;
            .preview-header {
                width: 100%;
                height: 88px;
                position: relative;
                .preview-header-nav-status {
                    height: 100%;
                    background-image: url("@/assets/images/zx/iphone_header@2x.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                .preview-header-title {
                    position: absolute;
                    top: 55px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 17px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.85);
                }
            }
            .preview-body {
                width: 100%;
                height: 686px;
                background-color: #fafafa;
                flex: 1;
                padding-bottom: 50px;
            }
            .preview-footer {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #ffffff;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 50px;
                z-index: 999;
            }
        }
    }
    .frame-view-left {
        width: 288px;
        overflow-x: hidden;
        z-index: 9;
    }
    .frame-view-right {
        width: 360px;
        padding: 0 12px;
    }

    .frame-view-left,
    .frame-view-right {
        background-color: #ffffff;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 4px;
            height: 10px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #999;
        }

        &::-webkit-scrollbar-track {
            background: #f2f2f2;
        }
    }
    @media screen and (max-width: 1300px) {
        .frame-view-left {
            width: 208px;
        }
    }
}
</style>
