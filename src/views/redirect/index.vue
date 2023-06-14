<script lang="ts" setup>
import getUrlkey from "@/utils/tools/get-url-key";

const router = useRouter();
router.replace({ path: getUrlkey("url") });
</script>
<style lang="scss" scoped></style>
