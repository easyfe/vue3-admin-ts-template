## BaseIcon 组件

显示 svg 图片

### 场景

页面上的小图标都可以使用 svg

    | 参数        | 说明    |  类型  |
    | --------   | -----:   | :----: |
    | name        | svg图片的名称     |   string   |
    | width        | 图片宽度     |   string   |
    | heigth        | 图片高度     |   string   |
    | color        | svg颜色     |   string   |
    | class        | 支持定义class类名     |   string   |

### 注意事项

直接给 base-svg 组件设置 color 往往不会生效，这个时候可以运行 npm run svgo 命令
前提是需要将 svg 格式的图片放到对应的文件夹里面 src/assets/svg
但是对应某些 svg 图片使用 npm run svgo 命令可能会适得其反,需要根据情况使用

### 示例

```javascript
       <base-svg name="eye" width="20" height="20" color="red"></base-svg>
       <base-svg name="jian" width="20" height="20"  class="test"></base-svg>
```
