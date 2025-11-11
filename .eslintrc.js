module.exports = {
    extends: ["@easyfe/eslint-config-vue3ts"],
    plugins: ["@syyfe"],
    rules: {
        //检验路由命名规则
        "@syyfe/validate-router": "warn",
        //禁止使用any类型
        "@typescript-eslint/no-explicit-any": "warn"
    }
};
