<template>
    <div class="app-header">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="item in breadList" :key="item.name" @click="onClick(item)">{{
                item.meta.title
            }}</n-breadcrumb-item>
        </n-breadcrumb>
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
</script>
<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
</style>
