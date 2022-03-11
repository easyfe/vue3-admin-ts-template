const { defineConfig } = require("eslint-define-config");
module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended"
    ],

    rules: {
        "vue/script-setup-uses-vars": "error",
        //禁止存在未使用的变量
        "no-unused-vars": "error",
        //禁止使用eval
        "no-eval": "error",
        //允许使用any类型
        "@typescript-eslint/no-explicit-any": "off",
        //函数必须添加返回类型
        "@typescript-eslint/explicit-function-return-type": "error",
        //允许require引入
        "@typescript-eslint/no-var-requires": "off",
        //perttier错误
        "prettier/prettier": "error"
    }
});
