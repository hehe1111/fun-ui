# 滚动 Scroll

- 自定义滚动组件，滚动条**不会**影响容器元素的实际宽/高。适用于需要自定义滚动条时。
- 支持用鼠标滚轮滚动
- 支持用键盘上的方向按键滚动
- 支持用鼠标拖动滚动条滚动

## 代码演示

### 基础用法

- 默认纵向
- 需要指定 height 属性

<ClientOnly>
  <demo-scroll-1 />
</ClientOnly>

### 横向

- 需要指定 width 属性

<ClientOnly>
  <demo-scroll-2 />
</ClientOnly>

### 无限滚动

- 只有 FScrollVertical 组件支持无限滚动

<ClientOnly>
  <demo-scroll-3 />
</ClientOnly>

## API

- 适用于无限滚动功能

| 参数                  | 说明                                                                 | 类型     | 默认值 | 可选值       | 是否必选 |
| --------------------- | -------------------------------------------------------------------- | -------- | ------ | ------------ | -------- |
| load-data             | 数据加载函数                                                         | Function | -      | -            | 否       |
| load-data-immediately | 是否在一开始就立即执行加载函数，防止内容无法撑满组件容器导致无滚动条 | boolean  | false  | false / true | 否       |
| delay                 | 两次触发执行加载函数的时间间隔，单位为 ms                            | number   | 200    | -            | 否       |
| distance              | 触发加载函数执行的离底距离，单位为 px                                | number   | 0      | -            | 否       |
