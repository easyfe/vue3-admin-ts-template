export default {
    /**
     * 获取主要色
     * @returns
     */
    getPrimary(): string {
        const rootStyles = getComputedStyle(document.documentElement);
        return rootStyles.getPropertyValue("--van-primary-color").trim();
    },
    /**
     * 自定义变量
     * @param data
     */
    setCustom(data: Record<string, string>): void {
        for (const key in data) {
            document.documentElement.style.setProperty(key, data[key]);
        }
    },
    /**
     * 设置主要色
     * @param color
     */
    setPrimary(color: string): void {
        document.documentElement.style.setProperty("--van-primary-color", color);
    }
};
