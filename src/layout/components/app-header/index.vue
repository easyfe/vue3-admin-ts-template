<template>
    <div class="app-header">
        <a-breadcrumb>
            <a-breadcrumb-item v-for="item in breadList" :key="item.name" @click="onClick(item)">{{
                item.meta.title
            }}</a-breadcrumb-item>
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
