<template>
    <div class="base-editor">
        <div class="title">{{ $attrs.label }}</div>
        <TinyEditor v-model="model" class="editor" :init="initEditor" />
    </div>
</template>
<script lang="ts" setup name="BaseEditor">
import tinymce from "tinymce/tinymce";
import TinyEditor from "@tinymce/tinymce-vue";
import "tinymce/models/dom";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import theFileManager from "@/views/components/the-file-manager";
import env from "@/utils/tools/env";
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: "请输入"
    }
});
const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});

const editorInstantce = ref<any>(null);
const baseUrl = env.get("VITE_APP_CDN_URL") + "/static/syy-business-center-ide-v2";
const initEditor = {
    language_url: `${baseUrl}/tinymce/langs/zh-Hans.js`,
    skin_url: `${baseUrl}/tinymce/skins/ui/oxide`,
    content_css: `${baseUrl}/tinymce/skins/ui/oxide/content.css`,
    language: "zh-Hans", //语言类型
    placeholder: "在这里输入文字", //textarea中的提示信息
    height: 500, //高度
    menubar: false,
    branding: false,
    plugins: "image advlist lists",
    toolbar: [
        "undo redo bold italic underline forecolor backcolor lineheight alignleft aligncenter alignright bullist numlist fontsize customImage"
    ],
    font_size_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
    setup: (editor: any): any => {
        editorInstantce.value = editor;
        editor.ui.registry.addToggleButton("customImage", {
            icon: "image",
            onAction: () => {
                theFileManager({ limit: 0, confirm: onFileConfirm });
            }
        });
    }
};

const onFileConfirm = (fileList: any): void => {
    for (const file of fileList) {
        const filePath = file?.filePath || false;
        if (filePath) {
            tinymce.activeEditor.execCommand("mceInsertContent", false, `<img src="${filePath}" />`);
        } else {
            MMessage.error("添加图片失败！");
        }
    }
};

onMounted(() => {
    tinymce.init({});
});

onBeforeUnmount(() => {
    editorInstantce.value?.destroy?.();
});
</script>
<style lang="scss" scoped>
.title {
    font-size: 14px;
    color: #252931;
    font-weight: Regular;
    height: 44px;
}
</style>
