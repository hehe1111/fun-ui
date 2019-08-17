# 表格 Table

## 代码演示

### 基础用法

<demo-table-1 />

- [tableData](https://github.com/hehe1111/fun-ui/blob/master/docs/.vuepress/assets/js/table-data.js)
- 如果传入的数据中存在 `collapsibleContent` 字段，则表格会在**该行**最左边显示一个向右的箭头图标，点击图标即可看到折叠内容（`collapsibleContent` 字段的值）

### 固定表头

<demo-table-2 />

### 边框

<demo-table-3 />

### 条纹

- 默认带条纹
- 不带条纹 `:striped="false"`

<demo-table-4 />

### 紧凑型

<demo-table-5 />

### 显示 id

<demo-table-6 />

### 显示复选框

<demo-table-7 />

### 当前被选中项

- 某一项被选中时，组件会触发 `update:selectedIds` 事件

<demo-table-8 />

### 列对齐

<demo-table-9 />

### 自定义列模板

- 将自定义列模板包在一个 `<template>` 标签里
- 通过 `slot-scope` 可以拿到组件传出来的**当前行当前列**的值（value）以及**当前行所有列**的数据（`item`）

<demo-table-10 />

### 排序

<demo-table-11 />

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

| 事件名  | 说明                                           |
| ------- | ---------------------------------------------- |
| re-sort | 点击排序图标时触发，可将排序函数绑定到该事件上 |
