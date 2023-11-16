<template>
    <div class="login">
        <img class="info" src="@/assets/images/login/login.png" />
        <div class="content">
            <h3>管理系统 - 登录</h3>
            <arco-form ref="baseForm1" v-model="formData" :config="formConfig" size="medium"></arco-form>
            <a-button type="primary" long :loading="loading" :disabled="loading" @click="handleSubmit">登录</a-button>
        </div>
    </div>
</template>
<script setup lang="ts">
// import { login, autoLogin } from "@/config/apis/login";
import storage from "@/utils/tools/storage";
import cookie from "@/utils/tools/cookie";
import { ArcoForm, formHelper, ruleHelper } from "@easyfe/admin-component";
import sleep from "@/utils/tools/sleep";
import { Message } from "@arco-design/web-vue";
import { getDefaultRoute } from "@/packages/vue-router";
const router = useRouter();

// 清空本地存储
storage.clear();
cookie.set("X-Token", "");

const loading = ref(false);

const formData = ref({
    username: "",
    password: ""
});
const formConfig = computed(() => {
    return [
        formHelper.input("", "username", {
            onPressEnter: handleSubmit,
            hideLabel: true,
            placeholder: "用户名",
            span: 24,
            rules: [ruleHelper.require("用户名必填", "blur")]
        }),
        formHelper.input("", "password", {
            onPressEnter: handleSubmit,
            hideLabel: true,
            span: 24,
            type: "password",
            placeholder: "密码",
            inputTips: "用户名admin，密码dmin"
        })
    ];
});
const baseForm1 = ref();
const handleSubmit = async (): Promise<any> => {
    const v = await baseForm1.value.validate();
    if (v) return;
    loading.value = true;
    await sleep(3000);
    Message.success("登录成功");
    loading.value = false;
    router.push(getDefaultRoute());

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
        top: 30%;
        right: 15%;
        width: 400px;
        padding: 60px 30px;
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
