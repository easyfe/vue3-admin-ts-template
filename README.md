# H5 基础框架

## 简介

该框架旨在帮助开发者方便、规范的进行业务逻辑开发，能够开箱使用。

基于vue3.2(使用setup语法)+ typescript+pinia状态库+eslint 校验+vant3组件库。

> 基于当前框架，作为开发者只需要关心以下目录：
>
> **src/assets：** 存放图片资源
>
> **src/config/api：** 接口请求存放
>
> **src/config/pinia：** pinia状态机存放，每个文件代表一个模块
>
> **src/config/router：** 路由配置存放，会自动引入多个路由文件
>
> **src/views：** 视图开发目录

## Node版本

`node v14+`

## 命令

```bash
npm ci				依赖安装
npm run start 		开发环境
npm run build:test	测试环境
npm run build:prod	生产环境
npm run svgo		svg图片处理
npm run lint:error	仅检查error级别错误
npm run lint --fix	eslint检查
```

## 开发规范

### 常用命名

-   **大驼峰：**BaseButton
-   **小驼峰：**baseButton
-   **中划线：**base-button
-   **下划线：**base_button
-   **常量：**BASE_BUTTON,BASEBUTTON

### 全局规范

文件夹命名：**中划线**

### 路由和文件夹命名

路由命名需要简短，并能准确定位到对应的视图目录中。

-   **路由 path：**/order/list

-   **路由 name：**order-list

-   **路由对应文件夹：**/views/order/list

### 组件命名

组件 name 全部以大坨峰命名，组件引入全部以大坨峰引入，组件在 template 模板中使用全部以中划线引入。

**src\resources\components**和**src\views\components**下的组件可以直接使用，无需手动引入。

```javascript
<template>
    <base-list>
        xxx
    </base-list>
</template>
```

-   **基础组件(可脱离当前项目使用)：**放置在 src\resources\components 目录下，以 base-xxx 命名，同时需要补充 README 文件，描述组件内容、参数、文档。

-   **全局业务组件：**放置在 src\views\components 目录下，以 the-xxx 命名。

-   **模块组件：**在对应 views 模块下，建立 components 目录存放，目录命名规格：中划线。

### API 接口

接口请求全部放在 src\config\apis 目录下，按照模块增加对应的接口文件。

接口请求需要严格定义**入参格式**和**返回格式**，入参在**3**个以内的，可以拼接的方式，**超过 3 个**，请以对象的方式接收参数。

**接口入参和返回值禁止使用 any**。

接口请求需要严格添加注释，描述当前接口作用，以及对应的 yapi 路径。

```javascript
/**
 * 获取代理商资料填写字段
 * http://yapi.syy.dongchali.cn/project/631/interface/api/25882
 * @param brandId 品牌ID
 * @param inviteCode 邀请码
 * @returns
 */
export function getAgentDataField(brandId: string, id: string): Promise<_AgentDataField> {
    return request({
        url: `/agent_factor/invite/${brandId}/getFormConfig`,
        params: {
            id
        }
    });
}
```

### git 提交规范

-   feat (新特性\新功能增加)
-   fix (bug 修复)
-   docs (文档)
-   style (代码格式化的修改, 比如加分号\空格等)
-   refactor (重构老的代码)
-   test (测试相关代码)
-   perf (性能、代码、样式、用户体验等方面的优化)
-   build (影响构建系统或外部依赖项的更改,例如 webpack\package.json 相关的修改
-   temp (临时的代码暂存性提交,尽量少,功能未完成前尽量不要提交)
-   revert (回滚某次提交)

## 目录结构

```bash

配置：
│  .editorconfig	                    #编辑器格式配置
│  .env.development	                    #开发环境配置
│  .env.production	                    #生产环境配置
│  .env.test		                    #测试环境配置
│  .eslintrc.js		                    #eslint配置
│  .gitignore		                    #git忽略文件
│  .prettierrc		                    #prettier配置
│  babel.config.js	                    #babel配置
│  package.json		                    #依赖文件
│  postcss.config.js	                #postcss配置
│  README.md		                    #说明文件
│  tsconfig.json	                    #ts配置
│  vite.config.ts	                    #vite配置文件
│  index.html	                   		#入口页
├─.vscode
│     settings.json		                #vscode项目配置
├─src
│  │  app.vue
│  │  main.ts
│  │  shims-tsx.d.ts
│  │  shims-vue.d.ts
│  ├─assets			                    #静态资源目录
│  │  ├─images		                    #图片静态资源
│  │  └─svg			                    #用于icon的svg图片
│  ├─config			                    #配置目录
│  │  │  dictonary.ts	                #字典配置
│  │  │  enum.ts		                #枚举配置
│  │  │  oss.js			                #oss配置
│  │  │  svgo.js		                #svg配置
│  │  │  tabbar.ts		                #底部tabbar配置
│  │  ├─apis		                    #接口请求文件夹
│  │  ├─router		                    #路由配置文件夹
│  │  └─pinia		                    #pinia状态机文件
│  │  └─vite		                    #vite插件文件夹
│  ├─layout			                    #布局公共文件夹
│  ├─packages
│  │  ├─request		                    #请求库配置
│  │  ├─vue-router	                    #路由核心配置
│  │  └─init		                    #初始化文件
│  ├─resources		                    #核心资源文件夹
│  │  ├─components		                #基础组件库（可脱离业务使用），基于base开头，非基础组件请勿存放在该目录下
│  │  │  ├─base-back		            #返回控件
│  │  │  ├─base-button		            #按钮
│  │  │  ├─base-card		            #卡片
│  │  │  ├─base-collapse	            #折叠框
│  │  │  ├─base-dialog-form	            #提示框
│  │  │  ├─base-empty		            #空状态页面
│  │  │  ├─base-footer		            #底部栏（非tabbar）
│  │  │  ├─base-form		            #表单封装
│  │  │  ├─base-format-money	        #金额格式化
│  │  │  ├─base-list		            #流式加载
│  │  │  ├─base-loading		            #加载状态
│  │  │  ├─base-page-visible	        #页面状态监听
│  │  │  ├─base-product-card	        #商品卡片
│  │  │  ├─base-progress	            #进度条
│  │  │  ├─base-svg			            #svg试用
│  │  │  ├─base-swiper		            #更丰富的banner
│  │  │  ├─base-tabbar		            #底部tabbar
│  │  │  ├─base-table		            #表格
│  │  │  ├─base-tabs		            #顶部tab
│  │  │  ├─base-wx-subscribe	        #微信订阅标签
│  │  │  └─base-wx-weapp		        #微信小程序标签
│  │  ├─directive	                    #自定义指令文件夹
│  │  │  └─copy				            #复制
│  ├─styles		                        #样式文件夹
│  │  │  index.scss			            #全局基础样式
│  │  │  vant-ui.scss		            #覆盖vant样式
│  │  └─utils			                #样式工具
│  ├─utils		                        #公共方法文件夹
│  │  ├─helper	                        #帮助工具
│  │  │  ├─date		                    #日期处理
│  │  │  ├─type		                    #类型判断
│  │  │  ├─ua		                    #ua判断
│  │  │  └─validator	                #验证器
│  │  │  └─float	                	#浮点运算
│  │  └─tools		                    #工具库
│  │      ├─back		                #路由返回
│  │      ├─canvas		                #画图工具
│  │      ├─copy		                #复制
│  │      ├─env		                	#开发、生产、测试环境判断
│  │      ├─geolocation		            #原生地理位置信息
│  │      ├─get-realpx	                #px根据屏幕自适应
│  │      ├─lodash	                	#lodash相关功能，防抖、节流、深拷贝...
│  │      ├─nanoid	                	#唯一ID获取
│  │      ├─native-bridge	            #app交互
│  │      ├─qs	                		#qs相关处理，链接参数获取
│  │      ├─retry		                #promise重试
│  │      ├─session		                #session处理
│  │      ├─sleep		                #睡眠
│  │      ├─storage		                #storage处理
│  │      ├─theme		                #主题设置
│  │      └─wx			                #微信相关方法
│  └─views	                            #视图文件夹
└─types	                                #类型定义文件夹
```
