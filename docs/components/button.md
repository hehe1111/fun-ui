# 按钮 Button

## 代码演示

### 基础用法

- type
- round
- small

<ClientOnly>
  <demo-button-1 />
</ClientOnly>

### 禁用状态

<ClientOnly>
  <demo-button-2 />
</ClientOnly>

### 带图标的按钮

<ClientOnly>
  <demo-button-3 />
</ClientOnly>

### 按钮组

<ClientOnly>
  <demo-button-group />
</ClientOnly>

## API

| 参数          | 说明     | 类型    | 默认值  | 可选值                                                | 是否必选 |
| ------------- | -------- | ------- | ------- | ----------------------------------------------------- | -------- |
| icon          | 图标名称 | string  | -       | -                                                     | 否       |
| icon-position | 图标位置 | string  | left    | left / right                                          | 否       |
| type          | 按钮颜色 | string  | default | default / primary / info / success / warning / danger | 否       |
| round         | 圆角按钮 | boolean | false   | false / true                                          | 否       |
| small         | 小按钮   | boolean | false   | false / true                                          | 否       |
| disabled      | 禁用按钮 | boolean | false   | false / true                                          | 否       |
