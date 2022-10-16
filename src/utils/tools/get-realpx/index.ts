/**
 * 获取真实像素大小
 * @param px 传入设计稿标注大小(iphone6为标准)，如果是vant组件，请按照设计稿除以2，因为vant的根字体大小为37.5
 * @returns
 */
export default function getRealPx(px: number): number {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth > 800) {
        screenWidth = 375;
    }
    return (screenWidth / 750) * px;
}
