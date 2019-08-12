# 图标 Icon

- 必须通过 `name` 属性传入图标名称
- 可以通过 `size` 和 `color` 属性自定义图标的大小和颜色
- 也可以直接通过 CSS 类名定义外部样式或者内联样式来自定义图标的大小和颜色

## 代码演示

### 基础用法

<ClientOnly>
  <demo-icon-1 />
</ClientOnly>

### 自定义图标大小

<ClientOnly>
  <demo-icon-2 />
</ClientOnly>

### 自定义图标颜色

<ClientOnly>
  <demo-icon-3 />
</ClientOnly>

## API

| 参数  | 说明 | 类型   | 默认值       | 可选值 | 是否必选 |
| ----- | ---- | ------ | ------------ | ------ | -------- |
| name  | 名称 | string | -            | -      | 是       |
| size  | 大小 | string | 1em          | -      | 否       |
| color | 颜色 | string | currentColor | -      | 否       |
