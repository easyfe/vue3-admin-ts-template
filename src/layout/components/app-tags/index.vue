<template>
    <div class="app-tags">
        <div class="tab-bar-box">
            <div class="tab-bar-scroll">
                <draggable :list="tagList" class="tags-wrap" item-key="path" animation="200">
                    <template #item="{ element, index }">
                        <app-tag-item :data="element" :index="index" />
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="AppTags">
import draggable from "vuedraggable";
import routes from "@/config/pinia/routes";
import AppTagItem from "./tag-item.vue";

const tagList = computed(() => {
    return routes().navTags;
});
</script>
<style lang="scss" scoped>
.app-tags {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
        display: flex;
        padding: 0 0 0 20px;
        background-color: var(--color-bg-2);
        border-bottom: 1px solid var(--color-border);
        height: 100%;
        .tab-bar-scroll {
            flex: 1;
            overflow: hidden;
            .tags-wrap {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                height: 100%;
                white-space: nowrap;
                overflow-x: auto;
                overflow-y: hidden;
                @include scroll-x;

                :deep(.tag-item) {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 6px;
                    flex-shrink: 0;
                    cursor: pointer;
                    &:first-child {
                        .arco-tag-close-btn {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
