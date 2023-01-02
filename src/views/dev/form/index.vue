<template>
    <frame-view>
        <base-form v-model="formData" :config="formConfig"></base-form>
    </frame-view>
</template>
<script lang="ts" setup>
import formHelper from "@/utils/helper/form";

const formConfig = computed(() => {
    return [
        formHelper.input("文本", "key1"),
        formHelper.checkbox("多选框", "key2", [
            { label: "label1", value: 1 },
            { label: "label2", value: 2 }
        ]),
        formHelper.radio(
            "单选框",
            "key3",
            [
                { label: "label1", value: 1 },
                { label: "label2", value: 2 }
            ],
            {
                type: "radio"
            }
        ),
        formHelper.inputNumber("数字输入框", "key4"),
        formHelper.select("下拉框", "key5", [
            { label: "label1", value: 1 },
            { label: "label2", value: 2 }
        ]),
        formHelper.switch("切换", "key7"),
        formHelper.editor("富文本", "key6")
    ];
});
const formData = ref({});
</script>
