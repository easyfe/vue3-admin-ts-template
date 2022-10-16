const userAgent = navigator.userAgent;
const uaHelper = {
    /** 微信浏览器 */
    isWechat: /MicroMessenger/i.test(userAgent) && !/miniprogram/i.test(userAgent),
    /** 企业微信浏览器 */
    isEntWechat: /MicroMessenger/i.test(userAgent) && /wxwork/i.test(userAgent) && !/miniprogram/i.test(userAgent),
    /** 微信小程序 */
    isWemp: /MicroMessenger/i.test(userAgent) && /miniprogram/i.test(userAgent),
    /** 苹果系统 */
    isIos: /(iPhone|iPad|iPod)/.test(userAgent),
    /** 安卓系统 */
    isAndroid: !/(iPhone|iPad|iPod)/.test(userAgent),
    /** 移动端 */
    isMobile:
        !!userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        ) || window.matchMedia("(max-width: 750px)").matches,
    /** 商业云安卓app */
    isAndroidApp: /android_syy_app/.test(userAgent),
    /** 商业云苹果app */
    isIosApp: /ios_syy_app/.test(userAgent),
    /** 商业云app */
    inApp: /android_syy_app/.test(userAgent) || /ios_syy_app/.test(userAgent)
};

export default uaHelper;
