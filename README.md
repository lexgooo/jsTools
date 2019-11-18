# jsTools

用来保存一些平时会用到的 js 工具函数文件集合

-   安装依赖

```shell
yarn
```

OR

```shell
npm install
```

-   如果在项目中使用，单独下载代码，根据情况添加依赖

---

## strictIDTest.js

![idNum](./images/id.jpg)

> 身份证号组成示意图，这是个假号码

-   用来验证身份证格式，严格版本：除了格式检验以外，还包含地区校验精确到省级，和加权因子校验

---

## publish.js

用于当项目没有在 jenkins 或 gitlab 里面集成自动打包功能，而本地打包上传到 git 服务器

### 使用

-   把 publish.js 文件下载放到项目的根目录。
-   在你的项目的 package.json 文件中的 scripts 中新增：

```json
"scripts": {
    "publish:dev": "node ./publish.js dev",
    "publish:prod": "node ./publish.js prod"
  }
```

-   运行

```bash
# dev 环境
npm run publish:dev

# 生产环境
npm run publish:prod
```

### TODO

-   [ ] 加入可自定义分支功能，目前只支持发布到 dev 分支
-   [ ] 加入可自定义提交的仓库名，目前只支持当前项目名加 "\_dist" 这种格式。

---

## vueWriteCode

还没想好用来做什么，想写一个可以自动添加一些重复量比较大的代码，比如：

-   自动在每个文件中引入特定的文件
-   自动根据文件夹内文件添加出一个 `router` 配置文件

### autoAddDependencies.js

-   目前的功能是在所有的 vue 文件的 `style` 中添加全局的变量文件。目前支持 `sass`
-   接收两个参数 `--target`，需要操作的文件夹，'--file'，将要被引入到 `.vue` 文件相应位置的文件路径,不要加上 `--target` 的路径前缀。
-   单独下载到项目中时，添加依赖

```shell
yarn add yarg -D
```

OR

```shell
npm install -D yarg
```

---

## CountDown

-   说明  
     获取验证码的倒计时组件

-   下载
  目前还没有做组件化封装，直接把 `countDown` 文件夹里的 `index.vue` 下载到本地项目并自己重命名为 `CountDown.vue`（示例下载到项目的 `src/components/`， 重命名为  `CountDown.vue`）
*   页面引用
    ```html
    <script>
        import CountDown from '@/components/CountDown'
        export default {
            ...
            components: {
                CountDown
            },
            data () {
                return {
                    counting: false
                }
            }
            ...
        }
    </script>
    <template>
        <count-down
            v-model="counting"
            @click-event="handleClickEvent"
            countingTxt="$time秒后可重发"
        />
    </template>
    ```
*   属性   

     | 属性名 | 数据类型 | 可接收值 | 默认值 | 说明 |
    | ----- | ------ | ------ | ----- | --- |
    | `value` | `Boolean` | `true`, `false` | `false` | 必选，使用 `v-model` 绑定，当前值为 `true` 时，开始倒计时 |
    | `countingTxt` | `Boolean`, `String` | `true` or `false` 或者任意字符串以及带有 `$time` 关键字的字符串 | `false` | 倒计时开始时显示的文字，当不传这个值时或为 `false` 时，只显示倒计时数字，当为 `true` 时，显示 `endTxt` 加倒计时（如：`重新获取(60)`），当传入带有 `$time` 的字符时，显示 `$time` 被替换为倒计时的字符串（如：`$time秒后可重发` -> `60秒后可重发`），当  传入不带 `$time` 关键字的字符串时，显示当前字符串加倒计时（如：`等待` -> `等待（60）`） |
    | `startNum` | `Number` | 任意数值 | `60` | 倒计时等待的秒数 |
    | `initTxt` | `String` | 任意字符 | `获取验证码` | 初始显示文字 |
    | `endTxt` | `String` | 任意字符 | `重新获取` | 倒计时结束后的文字 |
    | `color` | `String` | 任意 css 支持颜色值 | `#33B87E` | 默认文字显示颜色 |

-   事件  

    | 事件名 | 说明 | 回调参数 |
    | ----- | --- | ------- |
    | `@click-event` | 按钮的点击事件，只在未开始倒计时和倒计时结束时可点击 | - |

---
