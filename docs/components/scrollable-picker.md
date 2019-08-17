# Scrollable Picker

## 代码演示

### 基础用法

<demo-scrollable-picker-1 />

### 横向

- 纵向（默认）

<demo-scrollable-picker-2 />

### 循环

<demo-scrollable-picker-3 />

## API

| 参数             | 说明                      | 类型                                    | 默认值   | 可选值                | 是否必选 |
| ---------------- | ------------------------- | --------------------------------------- | -------- | --------------------- | -------- |
| values           | 要展示的值                | Array                                   | -        | -                     | 是       |
| selected         | 当前被选中的值            | number / string                         | -        | -                     | 是       |
| width-and-height | 容器的宽高                | Object（必须包含 width 和 height 属性） | -        | -                     | 是       |
| direction        | 方向                      | string                                  | vertical | vertical / horizontal | 否       |
| loop             | 循环                      | boolean                                 | false    | false / true          | 否       |
| errorMessage     | 用于提示用户已经到顶/底了 | string                                  | 没有了   | -                     | 否       |
