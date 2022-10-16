/**
 * 功能描述：自定义复制指令
 * 参数说明 Options：
 *  @param {string} value 需要复制的内容
 * @param {string} onSuccess 【非必传】成功的回调，回调参数: {e}  注：默认使用vant Toast 轻提示,该方法里面可以自定义交互
 * @param {string} onError 【非必传】失败的回调，回调参数: {e}  注：默认使用vant Toast 轻提示,该方法里面可以自定义交互
 *  使用方法：v-copy="Options"
 */
import { ObjectDirective } from "vue";
import typeHelper from "@/utils/helper/type/index";
import handlerCopy from "@/utils/tools/copy";

// 注册一个全局自定义复制指令 `v-copy`
const CopyHookFunction: ObjectDirective = {
    mounted: function (el, binding) {
        const { value = null, onSuccess = null, onError = null } = { ...binding.value };
        el.$value = value; //el实例上存放传给指令的值
        el.copyHandler = (): void => {
            handlerCopy(el.$value)
                .then((res: any) => {
                    if (typeHelper.isFunction(onSuccess)) {
                        onSuccess(res);
                    } else {
                        useMessage().success(res);
                    }
                })
                .catch((err: any) => {
                    if (typeHelper.isFunction(onError)) {
                        onError(err);
                    } else {
                        useMessage().error(err);
                    }
                });
        };
        el.addEventListener("click", el.copyHandler); // 绑定点击事件
    },
    // 当传进来的值更新的时候触发
    updated(el: any, binding) {
        const { value = null } = { ...binding.value };
        el.$value = value;
    },
    // 指令与元素解绑的时候，移除事件绑定
    unmounted(el: any) {
        el.removeEventListener("click", el.copyHandler);
    }
};

export default CopyHookFunction;
