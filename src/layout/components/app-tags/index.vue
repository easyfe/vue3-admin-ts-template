<template>
    <div class="tab-bar-container">
        <a-affix ref="affixRef" :offset-top="offsetTop">
            <div class="tab-bar-box">
                <div class="tab-bar-scroll">
                    <div class="tags-wrap">
                        <app-tag-item v-for="(tag, index) in tagList" :key="tag.path" :data="tag" :index="index" />
                    </div>
                </div>
                <div class="tag-bar-operation"></div>
            </div>
        </a-affix>
    </div>
</template>
<script lang="ts" setup name="AppTags">
import routes from "@/config/pinia/routes";
import AppTagItem from "./tag-item.vue";

const tagList = computed(() => {
    return routes().navTags;
});
const affixRef = ref();

const offsetTop = computed(() => {
    return 60;
});

watch(
    () => tagList.value,
    () => {
        affixRef.value.updatePosition();
    }
);
</script>
<style lang="scss" scoped>
.tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
        display: flex;
        padding: 0 0 0 20px;
        background-color: var(--color-bg-2);
        border-bottom: 1px solid var(--color-border);
        .tab-bar-scroll {
            height: 32px;
            flex: 1;
            overflow: hidden;
            .tags-wrap {
                padding: 4px 0;
                height: 48px;
                white-space: nowrap;
                overflow-x: auto;

                :deep(.arco-tag) {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 6px;
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

    .tag-bar-operation {
        width: 100px;
        height: 32px;
    }
}
</style>
