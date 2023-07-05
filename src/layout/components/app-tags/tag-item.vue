<template>
    <div class="tag-item">
        <a-dropdown trigger="contextMenu" :popup-max-height="false" @select="actionSelect">
            <span
                class="arco-tag arco-tag-size-medium arco-tag-checked"
                :class="{ 'link-activated': props.data.fullPath === route.fullPath }"
                @click="goto(props.data)"
            >
                <span class="tag-link">
                    {{ props.data.meta?.title }}
                </span>
                <span
                    class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
                    @click.stop="tagClose(props.data, props.index)"
                >
                    <icon-close />
                </span>
            </span>
            <template #content>
                <a-doption :disabled="disabledReload" :value="Eaction.reload">
                    <icon-refresh />
                    <span>重新加载</span>
                </a-doption>
                <a-doption class="sperate-line" :disabled="disabledCurrent" :value="Eaction.current">
                    <icon-close />
                    <span>关闭当前标签页</span>
                </a-doption>
                <a-doption :disabled="disabledLeft" :value="Eaction.left">
                    <icon-to-left />
                    <span>关闭左侧标签页</span>
                </a-doption>
                <a-doption class="sperate-line" :disabled="disabledRight" :value="Eaction.right">
                    <icon-to-right />
                    <span>关闭右侧标签页</span>
                </a-doption>
                <a-doption :value="Eaction.others">
                    <icon-swap />
                    <span>关闭其它标签页</span>
                </a-doption>
                <a-doption :value="Eaction.all">
                    <icon-folder-delete />
                    <span>关闭全部标签页</span>
                </a-doption>
            </template>
        </a-dropdown>
    </div>
</template>
<script lang="ts" setup name="AppTagItem">
import routes from "@/config/pinia/routes";
import { getDefaultRoute } from "@/packages/vue-router";
import { Message } from "@arco-design/web-vue";
import { RouteConfig } from "types";
import "@arco-design/web-vue/es/tag/style/css.js";

enum Eaction {
    reload = "reload",
    current = "current",
    left = "left",
    right = "right",
    others = "others",
    all = "all"
}

const props = withDefaults(
    defineProps<{
        index: number;
        data: RouteConfig;
    }>(),
    {}
);

const router = useRouter();
const route = useRoute();

const tagList = computed(() => {
    return routes().navTags;
});

const goto = (tag: RouteConfig) => {
    router.push(tag);
};

const disabledReload = computed(() => {
    return props.data.fullPath !== route.fullPath;
});

const disabledCurrent = computed(() => {
    return props.index === 0;
});

const disabledLeft = computed(() => {
    return !tagList.value[props.index - 1];
});

const disabledRight = computed(() => {
    return !tagList.value[props.index + 1];
});

const tagClose = (tag: RouteConfig, idx: number) => {
    routes().DELETE_NAVTAG(idx);
    if (props.data.fullPath === route.fullPath) {
        const latest = tagList.value[idx - 1]; // 获取队列的前一个tab
        router.push(latest);
    }
};

const findCurrentRouteIndex = () => {
    return tagList.value.findIndex((el) => el.fullPath === route.fullPath);
};

const actionSelect = async (value: any) => {
    const { data, index } = props;
    if (value === Eaction.current) {
        tagClose(data, index);
    } else if (value === Eaction.left) {
        const currentRouteIdx = findCurrentRouteIndex();
        tagList.value.splice(1, props.index - 1);
        if (currentRouteIdx < index) {
            router.push(data);
        }
    } else if (value === Eaction.right) {
        const currentRouteIdx = findCurrentRouteIndex();
        tagList.value.splice(props.index + 1);

        if (currentRouteIdx > index) {
            router.push(data);
        }
    } else if (value === Eaction.others) {
        const filterList = tagList.value.filter((el, idx) => {
            return idx === 0 || idx === props.index;
        });
        routes().navTags = filterList;
        router.push(data);
    } else if (value === Eaction.reload) {
        const name = props.data.meta?.keepAliveName || props.data.name;
        if (name) {
            routes().cachedTags = routes().cachedTags.filter((el) => el !== name);
        }
        router.replace({
            name: "redirect",
            query: {
                url: encodeURIComponent(route.fullPath)
            }
        });
    } else {
        routes().CLEAR_NAVTAGS();
        const defaultRoutes = getDefaultRoute();
        if (!defaultRoutes) {
            Message.error("没有可用的路由");
            return;
        }
        router.push(defaultRoutes);
    }
};
</script>
<style scoped lang="scss">
.tag-link {
    color: var(--color-text-2);
    text-decoration: none;
    user-select: none;
}
.link-activated {
    color: $main;
    .tag-link {
        color: $main;
    }
    & + .arco-tag-close-btn {
        color: $main;
    }
}
:deep(.arco-dropdown-option-content) {
    span {
        margin-left: 10px;
    }
}
.arco-dropdown-open {
    .tag-link {
        color: rgb(var(--danger-6));
    }
    .arco-tag-close-btn {
        color: rgb(var(--danger-6));
    }
}
.sperate-line {
    border-bottom: 1px solid var(--color-neutral-3);
}
</style>
