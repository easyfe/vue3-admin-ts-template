import { Message } from "@arco-design/web-vue";
import i18n from "@/locales";

let reqNum = 0;
const loading = {
    showToast(err: any): void {
        Message.error(err.message || err.msg || err);
    },
    showLoading(): void {
        if (reqNum === 0) {
            Message.loading({
                content: i18n.global.t("加载中..."),
                duration: 0
            });
        }
        reqNum++;
    },
    clearLoading(): Promise<boolean> {
        /** 合并loading */
        return new Promise((resolve) => {
            setTimeout(() => {
                closeLoading();
                resolve(true);
            }, 300);
        });
    },
    clearToast(): void {
        Message.clear();
    }
};
/** 关闭loading */
function closeLoading(): void {
    if (reqNum <= 0) {
        return;
    }
    reqNum--;
    if (reqNum === 0) {
        Message.clear();
    }
}

export default loading;
