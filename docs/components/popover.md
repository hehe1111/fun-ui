# 悬浮气泡 Popover

## 代码演示

- 基础用法

<ClientOnly>
  <demo-popover-1 />
</ClientOnly>

- 自定义弹出位置

<ClientOnly>
  <demo-popover-2 />
</ClientOnly>

- 气泡内含有关闭按钮
  - `close` 函数是组件内置提供的，直接通过 `slot-scope` 特性直接解构使用即可

<ClientOnly>
  <demo-popover-3 />
</ClientOnly>

- 鼠标悬浮方式触发弹出

<ClientOnly>
  <demo-popover-4 />
</ClientOnly>

## API

| 参数     | 说明                                                       | 类型     | 默认值 | 可选值                      | 是否必选 |
| -------- | ---------------------------------------------------------- | -------- | ------ | --------------------------- | -------- |
| position | 气泡弹出位置                                               | string   | top    | top / bottom / left / right | 否       |
| trigger  | 气泡弹出的触发方式                                         | string   | click  | click / hover               | 否       |
| close    | 组件通过 slot-scope 提供的关闭函数，用于在气泡内部关闭气泡 | function | -      | -                           | 否       |
