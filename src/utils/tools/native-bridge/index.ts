import uaHelper from "@/utils/helper/ua";
class NativeBridge {
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     */
    handleMethods(name: string): void;
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     * @param callback 回调
     */
    handleMethods(name: string, callback: (res: any) => void): void;
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     * @param params 参数
     */
    handleMethods(name: string, params: any): void;
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     * @param params 参数
     * @param callback 回调
     */
    handleMethods(name: string, params: any, callback: (res: any) => void): void;
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     * @param params 参数
     * @param callback 回调
     */
    handleMethods(name: string, params?: any, callback?: (res: any) => void): void {
        try {
            // 解决如果二个参数是 callback 的情况，变量交换
            if (typeof params === "function" && !callback) {
                callback = params;
                params = {};
            }
            const functionName = `${name}${new Date().getTime()}`;
            params.callback = functionName;
            if (uaHelper.isAndroidApp || uaHelper.isIosApp) {
                if (callback) {
                    // 注册回调
                    Reflect.defineProperty(window, functionName, {
                        enumerable: false,
                        value: function (res: any) {
                            callback && callback(res);
                            Reflect.deleteProperty(window, functionName);
                        }
                    });
                }
                console.log(`调用${name}方法,参数${JSON.stringify(params)}`);
                if (uaHelper.isAndroidApp) {
                    (window as any).syy_app_h5[name](JSON.stringify(params));
                } else if (uaHelper.isIosApp) {
                    // ios 将方法名当作参数传递
                    params.key = name;
                    (window as any).webkit.messageHandlers.syy_app_h5.postMessage(params);
                }
            } else {
                console.warn("此功能需要访问 APP 才能使用");
            }
        } catch (e) {
            console.error(`调用${name}方法失败,参数${JSON.stringify(params)}`, e);
        }
    }
    /**
     * H5注册全局方法 供APP调用
     * @param name
     * @param callback
     */
    registerWindowEvent(name: string, callback: () => void): void;
    /**
     * H5注册全局方法 供APP调用
     * @param name
     * @param callback 方法名称
     * @param autoDestoryed 回调后是否立即销毁该方法,默认:true
     */
    registerWindowEvent(name: string, callback: () => void, autoDestoryed: boolean): void;
    /**
     * H5注册全局方法 供APP调用
     * @param name
     * @param callback 方法名称
     * @param autoDestoryed 回调后是否立即销毁该方法,默认:true
     */
    registerWindowEvent(name: string, callback: (res?: any) => void, autoDestoryed = true): void {
        try {
            Reflect.defineProperty(window, name, {
                enumerable: false,
                value: function (res: any) {
                    callback(res);
                    autoDestoryed && Reflect.deleteProperty(window, name);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new NativeBridge();
