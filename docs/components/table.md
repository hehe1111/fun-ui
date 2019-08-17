# 表格 Table

## 代码演示

### 基础用法

<ClientOnly>
  <demo-table-1 />
</ClientOnly>

- [tableData](https://github.com/hehe1111/fun-ui/blob/master/docs/.vuepress/assets/js/table-data.js)
- 如果传入的数据中存在 `collapsibleContent` 字段，则表格会在**该行**最左边显示一个向右的箭头图标，点击图标即可看到折叠内容（`collapsibleContent` 字段的值）

### 固定表头

<ClientOnly>
  <demo-table-2 />
</ClientOnly>

### 边框

<ClientOnly>
  <demo-table-3 />
</ClientOnly>

### 条纹

- 默认带条纹
- 不带条纹 `:striped="false"`

<ClientOnly>
  <demo-table-4 />
</ClientOnly>

### 紧凑型

<ClientOnly>
  <demo-table-5 />
</ClientOnly>

### 显示 id

<ClientOnly>
  <demo-table-6 />
</ClientOnly>

### 显示复选框

<ClientOnly>
  <demo-table-7 />
</ClientOnly>

### 当前被选中项

- 某一项被选中时，组件会触发 `update:selectedIds` 事件

<ClientOnly>
  <demo-table-8 />
</ClientOnly>

### 列对齐

<ClientOnly>
  <demo-table-9 />
</ClientOnly>

### 自定义列模板

- 将自定义列模板包在一个 `<template>` 标签里
- 通过 `slot-scope` 可以拿到组件传出来的**当前行当前列**的值（value）以及**当前行所有列**的数据（`item`）

<ClientOnly>
  <demo-table-10 />
</ClientOnly>

### 排序

<ClientOnly>
  <demo-table-11 />
</ClientOnly>

## API

| 参数                | 说明                       | 类型     | 默认值       | 可选值                         | 是否必选 |
| ------------------- | -------------------------- | -------- | ------------ | ------------------------------ | -------- |
| data-source         | 数据源                     | Object   | -            | -                              | 是       |
| height              | 表格高度，同时会使表头固定 | number   | -            | -                              | 否       |
| bordered            | 是否显示边框               | boolean  | false        | false / true                   | 否       |
| striped             | 是否显示条纹               | boolean  | true         | false / true                   | 否       |
| small               | 是否紧凑型                 | boolean  | false        | false / true                   | 否       |
| is-id-visible       | id 是否可见                | boolean  | false        | false / true                   | 否       |
| is-checkbox-visible | 复选框是否可见             | boolean  | false / true | -                              | 否       |
| selected-ids        | 包含当前被选中项的数组     | string[] | -            | -                              | 否       |
| align               | 列对齐方式                 | string   | left         | left / center / centre / right | 否       |
| sort-rules          | 排序规则                   | Object   | -            | -                              | 否       |
| loading             | 是否正在加载数据中         | boolean  | false        | false / true                   | 否       |

- `sort-rules`
  - 键名：要进行排序的列的列名
  - 键值可选值有：
    - `ascend`（升序）
    - `descend`（降序）
    - `true`（不排序）

## 事件

| 事件名  | 说明                                                 |
| ------- | ---------------------------------------------------- |
| re-sort | 点击排序图标时触发，可将排序函数绑定到该事件上 |
