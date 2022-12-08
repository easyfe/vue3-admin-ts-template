// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
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
    plugins: ["@syyfe"],
    rules: {
        //检验路由命名规则
        "@syyfe/validate-router": "error",
        //禁止使用var
        "vue/script-setup-uses-vars": "error",
        //禁止存在未使用的变量
        "no-unused-vars": [
            "error",
            // we are only using this rule to check for unused arguments since TS
            // catches unused variables but not args.
            { varsIgnorePattern: ".*", args: "none" }
        ],
        //禁止使用eval
        "no-eval": "error",
        //允许使用any类型
        "@typescript-eslint/no-explicit-any": "off",
        //函数必须添加返回类型
        "@typescript-eslint/explicit-function-return-type": "off",
        //perttier错误
        "prettier/prettier": "error"
    }
};
