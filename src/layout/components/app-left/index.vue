<template>
    <div class="app-left">
        <div class="app-left-menu">
            <div class="app-left-menu-top">
                <base-svg :name="activeMeta.icon" width="18" height="18"></base-svg>
                <div>{{ activeMeta.title }}</div>
            </div>
            <div
                v-for="(item, index) in routes"
                :key="index"
                class="app-left-menu-item"
                :class="{
                    'app-left-menu__active': leftMenuActive(item)
                }"
                @click="toRoute(item)"
            >
                {{ item.meta?.title }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="AppLeft">
import piniaRoutes from "@/config/pinia/routes";
import { RouteConfig } from "types";
const route = useRoute();
const router = useRouter();
const piniaRouteList = piniaRoutes().routes;
const routes = computed(() => {
    return piniaRouteList.find((item) => item.name === route.matched[route.matched.length - 2].name)?.children;
});
const activeMeta = computed(() => {
    const meta = route.matched[route.matched.length - 2].meta;
    return {
        title: meta.title as string,
        icon: meta.icon as string
    };
});
const leftMenuActive = (item: RouteConfig): boolean => {
    if (item.meta?.id) {
        return item.name === route.name && Number(item.meta.id) === Number(route?.query?.customPageId);
    }
    return item.name === route.name;
};
const toRoute = (item: RouteConfig): void => {
    if (item.name === "custom-decoration-page") {
        if (item?.meta?.id) {
            (item as any).query = {
                customPageId: item.meta.id
            };
        }
    }
    router.push(item);
};
</script>
<style lang="scss" scoped>
.app-left {
    .app-left-menu {
        margin: 17px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 144px;
        background: #ebf3ff;
        border-radius: 4px;
        padding-left: 42px;
        .app-left-menu-top {
            display: flex;
            align-items: center;
            color: #1966ff;
            font-weight: 500;
            margin-left: -25px;
            margin-top: 16px;
            margin-bottom: 16px;
            div {
                margin-left: 10px;
            }
        }
        .app-left-menu-item {
            user-select: none;
            cursor: pointer;
            margin: 12px 0;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #252931;
        }
        .app-left-menu__active {
            position: relative;
            font-weight: 500;
            color: #1966ff;
            &::before {
                position: absolute;
                content: "";
                left: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 2px;
                height: 9px;
                background: #1966ff;
            }
        }
    }
}
</style>
