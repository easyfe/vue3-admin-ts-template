<template>
    <div class="app-header">
        <div class="left-side">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
                    <div class="bre-item">
                        <base-svg v-if="item.meta?.icon" :name="item.meta.icon" :width="20" :height="20"></base-svg>
                        <div v-if="checkDidsable(item, index)">{{ item.meta.title }}</div>
                        <a-link v-else @click="onClick(item)"> {{ item.meta.title }}</a-link>
                    </div>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="right-side">
            <div class="side-item">
                <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
                        <template #icon>
                            <icon-moon-fill v-if="theme === 'dark'" />
                            <icon-sun-fill v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </div>
            <div class="side-item">
                <a-popover trigger="click">
                    <a-tooltip content="切换主题色">
                        <a-button class="nav-btn" type="outline" :shape="'circle'">
                            <template #icon>
                                <icon-skin />
                            </template>
                        </a-button>
                    </a-tooltip>
                    <template #content>
                        <div class="skin-content">
                            <div
                                v-for="item in skinList"
                                :key="item.name"
                                class="skin-item"
                                @click="handleToggleSkin(item)"
                            >
                                <div class="skin-item-color" :style="{ backgroundColor: item.color }"></div>
                            </div>
                        </div>
                    </template>
                </a-popover>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="AppHeader">
import { RouteLocationMatched } from "vue-router";
import global from "@/config/pinia/global";
import { Svg as BaseSvg } from "@easyfe/admin-component";
const router = useRouter();
const route = useRoute();

const skinList = [
    { name: "arcoblue", color: "#165dff" },
    { name: "green", color: "#00b42a" },
    { name: "orange", color: "#ff7d00" },
    { name: "red", color: "#f53f3f" },
    { name: "orangered", color: "#f77234" },
    { name: "gold", color: "#f7ba1e" },
    { name: "yellow", color: "#fadc19" },
    { name: "lime", color: "#fadc19" },
    { name: "cyan", color: "#14c9c9" },
    { name: "blue", color: "#3491fa" },
    { name: "purple", color: "#722ed1" },
    { name: "pinkpurple", color: "#d91ad9" },
    { name: "magenta", color: "#f5319d" }
];

const breadList = computed(() => {
    return route.matched.filter((item) => item.path !== "/" && item.meta.title);
});
const theme = computed(() => {
    return global().theme;
});
const onClick = (item: RouteLocationMatched) => {
    router.push(item);
};

const isDark = useDark({
    selector: "body",
    attribute: "arco-theme",
    valueDark: "dark",
    valueLight: "light",
    storageKey: "arco-theme",
    onChanged(dark: boolean) {
        global().toggleTheme(dark);
    }
});

const toggleTheme = useToggle(isDark);

function handleToggleTheme() {
    toggleTheme();
}

function checkDidsable(item: RouteLocationMatched & { permission?: () => boolean }, index: number) {
    if (index === breadList.value.length - 1) {
        return true;
    }
    if (!item.children?.length) {
        return false;
    }
    //如果子路由全部都是隐藏的，则认为没有子路由
    const hideRouters = item.children.filter((v: any) => v.meta?.hidden === true || v.permission?.() === false);
    if (hideRouters.length === item.children.length) {
        return false;
    }
    return true;
}

function handleToggleSkin(item: { name: string; color: string }) {
    Array.from({ length: 10 }).forEach((_, index) => {
        document.body.style.setProperty(`--primary-${index + 1}`, `var(--${item.name}-${index + 1})`);
    });
}
</script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 20px;
    background-color: var(--color-bg-2);
    .left-side {
        user-select: none;
        .arco-breadcrumb-item a:hover {
            color: $main;
        }
        .bre-item {
            display: flex;
            align-items: center;
            .svg-icon {
                margin-right: 4px;
            }
        }
    }
    .right-side {
        display: flex;
        align-items: center;
        .side-item {
            display: flex;
            align-items: center;
            padding: 0 10px;
        }

        .nav-btn {
            border-color: rgb(var(--gray-2));
            color: rgb(var(--gray-8));
            font-size: 16px;
        }
    }
}
.skin-content {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    .skin-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        .skin-item-color {
            width: 30px;
            height: 30px;
            cursor: pointer;
            border-radius: 4px;
        }
    }
}
</style>
