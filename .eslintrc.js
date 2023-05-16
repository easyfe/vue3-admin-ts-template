module.exports = {
    extends: ["@easyfe/eslint-config-vue3ts"],
    plugins: ["@syyfe"],
    rules: {
        //检验路由命名规则
        "@syyfe/validate-router": "error"
    }
};
