<template>
    <m-form-item v-bind="$attrs">
        <div class="upload-pic">
            <div class="pic-box">
                <div class="pic">
                    <img v-if="modelValue" :src="modelValue" alt="" />
                    <div v-if="!modelValue" class="img-seat upload" @click="fileMangerVisiable = true">+</div>
                    <div v-if="modelValue" class="label" @click="fileMangerVisiable = true">更换图片</div>
                    <img
                        v-if="modelValue && remove"
                        class="close-icon"
                        src="@/assets/images/member/close-icon@2x.png"
                        alt=""
                        @click="removeIcon"
                    />
                </div>
                <div class="tips">{{ tips }}</div>
            </div>
        </div>
    </m-form-item>
    <the-file-manager v-model="fileMangerVisiable" :limit="limit" @confirm="onFileConfirm"></the-file-manager>
</template>

<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    tips: {
        type: String,
        default: ""
    },
    limit: {
        type: Number,
        default: 1
    },
    remove: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();
const fileMangerVisiable = ref(false);
const onFileConfirm = (list: any): void => {
    emits("update:modelValue", list[0].filePath);
};

const removeIcon = (): void => {
    emits("update:modelValue", "");
};
</script>

<style lang="scss" scoped>
.upload-pic {
    display: flex;
    flex-shrink: 0;
    .title {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
    }
    .pic-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .pic {
            width: 64px;
            height: 64px;
            position: relative;
            border-radius: 3px;
            img {
                width: 100%;
                height: 100%;
            }
            .label {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background: rgba($color: #000000, $alpha: 0.5);
                color: #fff;
                font-size: 12px;
                z-index: 2;
                cursor: pointer;
            }
            .close-icon {
                width: 16px;
                height: 16px;
                position: absolute;
                top: -8px;
                right: -8px;
                cursor: pointer;
            }
            .img-seat {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                bottom: 0;
                border: 1px dashed #c0ccda;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #c0ccda;
                cursor: pointer;
                &:hover {
                    border-color: #1890ff;
                    color: #1890ff;
                }
            }
        }
        .tips {
            margin-top: 8px;
            color: #898b8f;
            font-size: 14px;
            line-height: 20px;
        }
    }
}
</style>
