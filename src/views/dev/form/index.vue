<template>
    <frame-view>
        <base-form ref="form" v-model="formData" :config="formConfig"></base-form>
        <template #bottom>
            <a-button type="primary" @click="save">保存</a-button>
        </template>
    </frame-view>
</template>
<script lang="ts" setup name="DevForm">
import formHelper from "@/utils/helper/form";
import ruleHelper from "@/utils/helper/rule";
import { Message } from "@arco-design/web-vue";

const formConfig = computed(() => {
    return [
        formHelper.section("基础信息"),
        formHelper.span("介绍", "text"),
        formHelper.input("文本", "key1", {
            maxLength: 20,
            showWordLimit: true,
            rules: [ruleHelper.require("必填", "blur")],
            labelTips: `提示内容第一点`,
            inputTips: `示文案这是示文案是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案`
        }),
        formHelper.color("颜色", "key8"),
        formHelper.checkbox(
            "多选框",
            "key2",
            [
                {
                    label: "label1",
                    value: 1
                },
                { label: "label2", value: 2 }
            ],
            {
                rules: [ruleHelper.require("必选", "blur")]
            }
        ),
        formHelper.uploadPic("图片", "key12", {
            remove: true,
            inputTips: "推荐使用400*400的图片"
        }),
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
        formHelper.inputNumber("数字输入框", "key4"),
        formHelper.select("下拉框", "key5", [
            { label: "label1", value: 1, disabled: true },
            { label: "label2", value: 2 }
        ]),
        formHelper.switch("切换", "key7"),
        formHelper.rangePicker("日期", "key10", {
            type: "date",
            placeholder: ["开始时间1", "结束时间1"]
        }),
        formHelper.time("时间", "key11"),
        formHelper.editor("富文本", "key6")
    ];
});
const formData = ref({
    key12: "https://cdn.v2ex.com/avatar/1b4e/0a2d/614153_xlarge.png?m=1681735508",
    key1: "这是input组件value",
    key8: "#fff",
    key5: [],
    key6: "",
    text: `这是一段介绍文字<font style='color:red;padding-left:10px;font-weight:bold'>支持HTML</font>`
});

const form = ref();

function save() {
    formHelper
        .validate(form.value)
        .then(() => {
            Message.success("保存成功");
        })
        .catch((err) => {
            console.log("error", err);
        });
}
</script>
