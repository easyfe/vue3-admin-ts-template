export default {
    /**
     * 获取主要色
     * @returns
     */
    getPrimary(): string {
        const rootStyles = getComputedStyle(document.body);
        return rootStyles.getPropertyValue("--primary-6").trim();
    },
    /**
     * 获取主要色
     * @returns
     */
    getCustom(key: string): string {
        const rootStyles = getComputedStyle(document.body);
        return rootStyles.getPropertyValue(key).trim();
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
        document.documentElement.style.setProperty("--primary-6", color);
    }
};
