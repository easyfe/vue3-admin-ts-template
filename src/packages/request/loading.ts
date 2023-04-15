let reqNum = 0;
const loading = {
    showToast(err: any): void {
        MMessage.error(err.message || err.msg || err);
    },
    showLoading(): void {
        if (reqNum === 0) {
            console.log("loading");
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
        console.log("结束loading");
    }
};
/** 关闭loading */
function closeLoading(): void {
    if (reqNum <= 0) {
        return;
    }
    reqNum--;
    if (reqNum === 0) {
        console.log("结束loading");
        // Toast.clear();
    }
}

export default loading;
