/**
 * 获取formItem的span
 * @param span
 * @returns
 */
export function getItemWidth(span: any) {
    const style: Record<string, any> = {};
    style.width = ((span || 24) / 24) * 100 + "%";
    return style;
}
