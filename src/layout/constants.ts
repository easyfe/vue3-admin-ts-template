/**
 * 布局常量配置
 * 统一管理布局相关的尺寸和样式
 */

// 布局尺寸
export const LAYOUT_SIZE = {
    /** 侧边栏宽度 */
    SIDER_WIDTH: 200,
    /** 侧边栏折叠后宽度 */
    SIDER_COLLAPSED_WIDTH: 48,
    /** 顶部 Header 高度 */
    HEADER_HEIGHT: 60,
    /** 标签页高度 */
    TAGS_HEIGHT: 34
} as const;

// 计算内容区域高度的辅助函数
export const getContentHeight = () => {
    return `calc(100vh - ${LAYOUT_SIZE.HEADER_HEIGHT}px - ${LAYOUT_SIZE.TAGS_HEIGHT}px)`;
};
