<template>
    <frame-view>
        <a-space>
            <a-button @click="formVisible1 = true">打开表单</a-button>
        </a-space>
        <a-row>
            {{ formData }}
        </a-row>
        <base-modal-form
            v-model:visible="formVisible1"
            :value="formData"
            :modal-config="{ title: '测试', width: '50%' }"
            :form-config="formConfig"
            @ok="save1"
        >
        </base-modal-form>
    </frame-view>
</template>
<script lang="ts" setup>
import formHelper from "@/utils/helper/form";
import ruleHelper from "@/utils/helper/rule";

const formVisible1 = ref(false);

const formConfig = computed(() => {
    return [
        formHelper.section("基础信息"),
        formHelper.span("介绍", "text"),
        formHelper.input("文本", "key1", {
            maxLength: 20,
            showWordLimit: true,
            rules: [ruleHelper.require("必填", "blur")],
            inputTips: `示文案这是示文案是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案`
        }),
        formHelper.checkbox("多选框", "key2", [
            {
                label: "label1",
                value: 1
            },
            { label: "label2", value: 2 }
        ]),
        formHelper.radio(
            "单选框",
            "key3",
            [
                { label: "label1", value: 1, disabled: true },
                { label: "label2", value: 2 }
            ],
            {
                type: "radio"
            }
        ),
        formHelper.inputNumber("数字输入框", "key4", {}),
        formHelper.select("下拉框", "key5", [
            { label: "label1", value: 1, disabled: true },
            { label: "label2", value: 2 }
        ]),
        formHelper.switch("切换", "key7"),
        formHelper.datePicker("日期", "key10", {
            type: "date"
        }),
        formHelper.time("时间", "key11"),
        formHelper.editor("富文本", "key6")
    ];
});
const formData = ref({
    key5: [],
    key6: "",
    text: `这是一段介绍文字<font style='color:red;padding-left:10px;font-weight:bold'>支持HTML</font>`
});

function save1(v: any) {
    console.log("save1:", v);
    formData.value = v;
    formVisible1.value = false;
}
</script>
<style lang="scss" scoped></style>
