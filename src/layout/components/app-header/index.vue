<template>
    <div class="app-header">
        <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
                <div v-if="checkDidsable(item, index)">{{ item.meta.title }}</div>
                <a-link v-else @click="onClick(item)"> {{ item.meta.title }}</a-link>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>
<script lang="ts" setup name="AppHeader">
import { RouteLocationMatched } from "vue-router";
const router = useRouter();
const route = useRoute();

const breadList = computed(() => {
    return route.matched.filter((item) => item.path !== "/" && item.meta.title);
});
const onClick = (item: RouteLocationMatched) => {
    router.push(item);
};

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
</script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-left: 20px;
}
</style>
