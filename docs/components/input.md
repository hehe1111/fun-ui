# 输入框 Input

## 代码演示

### 基础用法

<demo-input-1 />

## API

| 参数        | 说明                 | 类型                                            | 默认值 | 可选值       | 是否必选 |
| ----------- | -------------------- | ----------------------------------------------- | ------ | ------------ | -------- |
| value       | 输入框内展示的内容   | string                                          | -      | -            | 否       |
| disabled    | 禁用状态             | boolean                                         | false  | false / true | 否       |
| readonly    | 只读状态             | boolean                                         | false  | false / true | 否       |
| clearable   | 可清除输入框内的内容 | boolean                                         | false  | false / true | 否       |
| auto-focus  | 自动聚焦             | boolean                                         | -      | -            | 否       |
| hint        | 状态提示             | Object(e.g: { type: 'success', message: 'xx' }) | -      | -            | 否       |
| placeholder | 输入框占位符         | string                                          | -      | -            | 否       |

- 参数 `hint` 的 `type` 可选值有: `'success'` | `'error'` | `'warning'` | `'info'`
