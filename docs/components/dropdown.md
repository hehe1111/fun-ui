# 下拉菜单 Dropdown

- 基于 [FPopover](./popover.md) 组件进行二次封装

## 代码演示

### 基础用法

- 默认鼠标悬浮触发弹框

<ClientOnly>
  <demo-dropdown-1 />
</ClientOnly>

### 默认选中某一项后就隐藏菜单

<ClientOnly>
  <demo-dropdown-2 />
</ClientOnly>

### 禁用状态

<ClientOnly>
  <demo-dropdown-3 />
</ClientOnly>

## API

| 参数          | 说明                   | 类型    | 默认值 | 可选值        | 是否必选 |
| ------------- | ---------------------- | ------- | ------ | ------------- | -------- |
| trigger       | 触发方式               | string  | hover  | hover / click | 否       |
| hide-on-click | 选中某一项后就隐藏菜单 | boolean | true   | true / false  | 否       |

## Dropdown-Item API

| 参数       | 说明               | 类型    | 默认值 | 可选值       | 是否必选 |
| ---------- | ------------------ | ------- | ------ | ------------ | -------- |
| disabled   | 禁用状态           | boolean | false  | false / true | 否       |
| item-style | 弹出框某一项的样式 | Object  | -      | -            | 否       |

- 弹出框每一项的默认样式：

```scss
padding: 0.5em 1em;
cursor: pointer;
user-select: none;
```
