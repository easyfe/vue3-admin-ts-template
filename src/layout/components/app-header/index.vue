<template>
    <div class="app-header">
        <div class="left-side">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
                    <div class="bre-item">
                        <Svg v-if="item.meta?.icon" :name="String(item.meta.icon)" :width="20" :height="20"></Svg>
                        <div v-if="checkDidsable(item, index)">{{ $t(item.meta.title) }}</div>
                        <a-link v-else @click="onClick(item)"> {{ $t(item.meta.title) }}</a-link>
                    </div>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="right-side">
            <div class="side-item">
                <a-dropdown @select="changeLocale">
                    <div class="nav-btn">
                        <a-tooltip :content="$t('语言')">
                            <a-button class="nav-btn" type="outline" :shape="'circle'">
                                <template #icon>
                                    <icon-language />
                                </template>
                            </a-button>
                        </a-tooltip>
                    </div>
                    <template #content>
                        <a-doption v-for="item in LOCALE_OPTIONS" :key="item.value" :value="item.value">
                            <icon-check :style="{ opacity: item.value === currentLocale ? 1 : 0 }" />
                            {{ item.label }}
                        </a-doption>
                    </template>
                </a-dropdown>
            </div>
            <div class="side-item">
                <a-dropdown @select="handleThemeChange">
                    <div class="nav-btn">
                        <a-tooltip :content="$t('主题模式')">
                            <a-button class="nav-btn" type="outline" :shape="'circle'">
                                <template #icon>
                                    <icon-moon-fill v-if="currentThemeMode === 'dark'" />
                                    <icon-sun-fill v-if="currentThemeMode === 'light'" />
                                    <icon-desktop v-if="currentThemeMode === 'auto'" />
                                </template>
                            </a-button>
                        </a-tooltip>
                    </div>
                    <template #content>
                        <a-doption v-for="item in themeModeOptions" :key="item.value" :value="item.value">
                            <icon-check :style="{ opacity: item.value === currentThemeMode ? 1 : 0 }" />
                            {{ $t(item.label) }}
                        </a-doption>
                    </template>
                </a-dropdown>
            </div>
            <div class="side-item">
                <a-popover trigger="click">
                    <a-tooltip :content="$t('主题色')">
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
            <a-divider direction="vertical" />
            <a-dropdown trigger="hover">
                <a-link>Admin</a-link>
                <template #content>
                    <a-doption @click="changepassword"><icon-edit style="margin-right: 6px" />修改密码</a-doption>
                    <a-doption @click="logout"><icon-import style="margin-right: 6px" />退出登录</a-doption>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>
<script lang="ts" setup name="AppHeader">
import { RouteLocationMatched } from "vue-router";
import { ArcoModalFormShow, Svg, formHelper } from "@easyfe/admin-component";
import { LOCALE_OPTIONS } from "@/locales";
import { useLocale } from "@/hooks/useLocale";
import { Modal } from "@arco-design/web-vue";
import storage from "@/utils/tools/storage";
import { useTheme } from "@/hooks/useTheme";

const { themeModeOptions, currentThemeMode, handleThemeChange } = useTheme();

const { changeLocale, currentLocale } = useLocale();

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
    { name: "cyan", color: "#14c9c9" },
    { name: "blue", color: "#3491fa" },
    { name: "purple", color: "#722ed1" },
    { name: "pinkpurple", color: "#d91ad9" },
    { name: "magenta", color: "#f5319d" }
];

const breadList = computed(() => {
    return route.matched.filter((item) => item.path !== "/" && item.meta.title);
});

const onClick = (item: RouteLocationMatched) => {
    router.push(item);
};

function checkDidsable(item: RouteLocationMatched, index: number) {
    if (index === breadList.value.length - 1) {
        return true;
    }
    if (!item.children?.length) {
        return false;
    }
    //如果子路由全部都是隐藏的，则认为没有子路由
    const hideRouters = item.children.filter((v: any) => v.meta?.hidden === true || v.meta?.permission?.() === false);
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

function logout() {
    Modal.confirm({
        title: "提示",
        content: "确定退出登录吗？",
        onOk: () => {
            storage.setToken("");
            router.replace({
                path: "/login"
            });
        }
    });
}

function changepassword() {
    ArcoModalFormShow({
        modalConfig: {
            title: "修改密码"
        },
        formConfig: [
            formHelper.input("原密码", "oldPassword", {
                rules: [{ required: true, message: "请输入原密码" }]
            }),
            formHelper.input("新密码", "newPassword", {
                rules: [{ required: true, message: "请输入新密码" }]
            }),
            formHelper.input("确认密码", "confirmPassword", {
                rules: [{ required: true, message: "请输入确认密码" }]
            })
        ]
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
