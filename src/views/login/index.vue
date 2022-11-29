<template>
    <div class="login">
        <img class="info" src="@/assets/images/login/login.png" />
        <div class="content">
            <h3>管理系统 - 登录</h3>
            <base-form ref="form" v-model="formData" :config="formConfig" :show-label="false"></base-form>
            <n-button type="primary" style="width: 100%" :loading="loading" :disabled="loading" @click="handleSubmit"
                >登录</n-button
            >
            <!-- <n-form :model="formState" :auto-label-width="true" @submit="handleSubmit">
                <n-form-item field="username" :rules="[{ required: true, message: '请输入用户名' }]">
                    <n-input v-model="formState.username" placeholder="请输入用户名" />
                </n-form-item>
                <n-form-item field="password" :rules="[{ required: true, message: '请输入密码' }]">
                    <n-input v-model="formState.password" placeholder="请输入密码" />
                </n-form-item>
                <n-form-item style="margin-top: 10px; line-height: 20px">
                    登录页面可根据项目具体的需求，进行自定义配置
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" long html-type="submit" :loading="loading" :disabled="loading"
                        >登录</n-button
                    >
                </n-form-item>
            </n-form> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { login, autoLogin } from "@/config/apis/login";
import storage from "@/utils/tools/storage";
import cookie from "@/utils/tools/cookie";
import formHelper from "@/utils/helper/form";
import ruleHelper from "@/utils/helper/rule";
import sleep from "@/utils/tools/sleep";
const message = useMessage();
const router = useRouter();

// 清空本地存储
storage.clear();
cookie.set("X-Token", "");

const loading = ref(false);

const formData = ref({
    username: "testTshopMaxpre101",
    password: "Zhendao2020"
});
const formConfig = computed(() => {
    return [
        formHelper.input("", "username", {
            placeholder: "用户名",
            rules: [ruleHelper.require("必填")]
        }),
        formHelper.input("", "password", {
            placeholder: "密码"
        })
    ];
});
const form = ref();
const handleSubmit = async (res: any): Promise<any> => {
    await formHelper.validate(form.value);
    loading.value = true;
    await sleep(3000);
    message.success("登录成功");
    loading.value = false;
    // if (!res?.errors) {
    //     /**
    //      * 开发环境调用登录接口
    //      */
    //     try {
    //         loading.value = true;
    //         const xToken = await login(formData);
    //         if (xToken) {
    //             cookie.set("X-Token", xToken);
    //             /**
    //              * 手动登录之后
    //              * 换取 acccess_token
    //              */
    //             autoLogin({
    //                 token: xToken,
    //                 isFalse: 1
    //             })
    //                 .then((res) => {
    //                     storage.setToken(res.access_token);
    //                     storage.setUserInfo(res.user_info);
    //                     useMessage().success("登录成功");
    //                     loading.value = false;
    //                     router.push({
    //                         name: "store-decoration-fine"
    //                     });
    //                 })
    //                 .catch((err) => {
    //                     loading.value = false;
    //                     console.log(err);
    //                 });
    //         }
    //     } catch (error: any) {
    //         loading.value = false;
    //         useMessage().error(error.message);
    //     }
    // }
};
</script>

<style scoped lang="scss">
.login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("@/assets/images/login/login-bg.png") center no-repeat;
    background-size: cover;
    .info {
        width: 650px;
        position: fixed;
        top: 11%;
        right: 55%;
        animation: turn 100s linear infinite;
    }

    .content {
        position: fixed;
        top: 50%;
        right: 22%;
        width: 300px;
        margin: -200px 0 0 0;
        padding: 24px 24px 14px 24px;
        border-radius: 8px;
        background-color: #ffffff;
        z-index: 9999;
        h3 {
            margin: 0 0 32px 0;
            font-size: 22px;
            font-weight: 600;
        }
        input {
            width: 100%;
        }
    }
    :deep(.mo-form-item-label-col.mo-form-item-label-col-flex) {
        display: none;
    }
}
@keyframes turn {
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
</style>
