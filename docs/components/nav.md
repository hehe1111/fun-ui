# 导航菜单 Nav

- 横向时，支持两种方式开关子菜单：鼠标悬浮（`hover` 默认方式 ）和单击（`click`）。
- 纵向时，目前暂时只支持单击方式。

## 代码演示

### 横向

- 鼠标悬浮打开/关闭子菜单（默认触发方式）

<ClientOnly>
  <demo-nav-1 />
</ClientOnly>

- 鼠标单击打开/关闭子菜单

<ClientOnly>
  <demo-nav-2 />
</ClientOnly>

### 纵向

<ClientOnly>
  <demo-nav-3 />
</ClientOnly>

## API

| 参数     | 说明                 | 类型    | 默认值 | 可选值        | 是否必选 |
| -------- | -------------------- | ------- | ------ | ------------- | -------- |
| name     | 区分各个 nav item    | string  | -      | -             | 是       |
| selected | 当前被选中项         | string  | -      | -             | 否       |
| vertical | 是否是纵向           | boolean | false  | false / true  | 否       |
| trigger  | 横向时如何打开子菜单 | string  | hover  | hover / click | 否       |
