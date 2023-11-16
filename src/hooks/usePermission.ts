import { ref } from "vue";

export function usePermission() {
    const permissions = ref<any[]>([]);
    function hasPermission(code?: string | number): boolean {
        // 如果没有code，直接返回true
        if (!code) return true;
        if (permissions.value?.length > 0) {
            // 判断传过来的值是否在获取的权限中，在就返回true，否则返回false
            return permissions.value.includes(code);
        }
        return false;
    }
    return { hasPermission, permissions };
}
