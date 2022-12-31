<template>
    <frame-view>
        <base-form v-model="formData" :config="formConfig"></base-form>
    </frame-view>
</template>
<script lang="ts" setup>
import formHelper from "@/utils/helper/form";

const formConfig = computed(() => {
    return [formHelper.input("数字", "key1")];
});
const formData = ref({});
</script>
