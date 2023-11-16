import CopyHookFunction from "./copy/index";
import PermissionFunction from "./permission";

const directive: Record<string, any> = {
    copy: CopyHookFunction,
    permission: PermissionFunction
};

export default directive;
