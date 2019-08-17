# 折叠面板 Collapse

## 代码演示

### 基础用法

- 默认多选

<demo-collapse-1 />

### 单选

<demo-collapse-2 />

### 监听 `update:opened` 事件

<demo-collapse-3 />

## API

| 参数          | 说明                                           | 类型     | 默认值 | 可选值       | 是否必选 |
| ------------- | ---------------------------------------------- | -------- | ------ | ------------ | -------- |
| multiple      | 多选                                           | boolean  | true   | true / false | 否       |
| opened        | 包含所有被打开的 item 的数组                   | string[] | ['']   | -            | 否       |
| update:opened | item 被打开时触发的事件，可以获取被打开的 item | Event    | -      | -            | 否       |

## Collapse-Item API

| 参数  | 说明            | 类型   | 默认值 | 可选值 | 是否必选 |
| ----- | --------------- | ------ | ------ | ------ | -------- |
| title | 标题            | string | -      | -      | 是       |
| name  | 区分每一个 item | string | -      | -      | 是       |
