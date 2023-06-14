<template>
    <frame-view></frame-view>
</template>
<script lang="ts" setup>
import getUrlkey from "@/utils/tools/get-url-key";

const router = useRouter();
onMounted(() => {
    router.replace(decodeURIComponent(getUrlkey("url")));
});
</script>
<style lang="scss" scoped></style>
