# 弹出框 Toast

## 代码演示

```js
import Vue from "vue";
import { FToast } from "fun-ui";
Vue.use(FToast);
```

### 基础用法

<ClientOnly>
  <demo-toast-1 />
</ClientOnly>

### 可手动关闭

<ClientOnly>
  <demo-toast-2 />
</ClientOnly>

### 关闭后调用回调

<ClientOnly>
  <demo-toast-3 />
</ClientOnly>

### 自定义多久后关闭

<ClientOnly>
  <demo-toast-4 />
</ClientOnly>

### 允许传入 HTML

<ClientOnly>
  <demo-toast-5 />
</ClientOnly>

### state

<ClientOnly>
  <demo-toast-6 />
</ClientOnly>

## API

```js
this.$toast(message, options);
```

| 参数    | 说明     | 类型   | 默认值 | 可选值 | 是否必选 |
| ------- | -------- | ------ | ------ | ------ | -------- |
| message | 弹出消息 | string | -      | -      | 是       |
| options | 配置对象 | Object | -      | -      | 否       |

### options

| 参数           | 说明                          | 类型     | 默认值   | 可选值                                        | 是否必选 |
| -------------- | ----------------------------- | -------- | -------- | --------------------------------------------- | -------- |
| position       | 弹出框的位置                  | string   | top      | top / middle / bottom                         | 否       |
| closeIcon      | 开启手动关闭功能              | boolean  | false    | false / true                                  | 否       |
| onClose        | 需要在弹出框关闭时执行的回调  | Function | () => {} | -                                             | 否       |
| autoCloseDelay | 多久后关闭弹出框，单位：秒    | number   | 3        |                                               | 否       |
| enableHTML     | 将 message 当作 HTML 进行渲染 | boolean  | false    | false / true                                  | 否       |
| state          | 弹出消息的状态                | string   | default  | default / success / warning / error / primary | 否       |
