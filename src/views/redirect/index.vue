<template>
    <frame-view></frame-view>
</template>
<script lang="ts" setup>
import qs from "@/utils/tools/qs";

const router = useRouter();
onMounted(() => {
    router.replace(decodeURIComponent(qs.getUrlkey("url")));
});
</script>
<style lang="scss" scoped></style>
