import { ObjectDirective } from "vue";
import { usePermission } from "@/hooks/usePermission";

const PermissionFunction: ObjectDirective = {
    mounted(el: HTMLButtonElement, binding) {
        if (binding.value == undefined) return;
        const code = binding.value;
        const { hasPermission } = usePermission();
        // 将获取到的值传到权限判断函数中，如果函数返回false，删除dom
        if (!hasPermission(code)) {
            el.parentNode?.removeChild(el);
            // el.remove();
        }
    }
};

export default PermissionFunction;
