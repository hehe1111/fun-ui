# 走马灯 Carousel

- 鼠标移入时会停止自动播放，移出时恢复自动播放

## 代码演示

### 自动播放

<ClientOnly>
  <demo-carousel-1 />
</ClientOnly>

### 禁止自动播放

<ClientOnly>
  <demo-carousel-2 />
</ClientOnly>

### 允许用箭头指示器切换

<ClientOnly>
  <demo-carousel-3 />
</ClientOnly>

### 允许配置圆点的位置

- `left`/`right` 时 `enableArrow` 无效

<ClientOnly>
  <demo-carousel-4 />
</ClientOnly>

## API

| 参数         | 说明                                       | 类型              | 默认值 | 可选值                      | 是否必选 |
| ------------ | ------------------------------------------ | ----------------- | ------ | --------------------------- | -------- |
| auto-play    | 布尔值：自动播放；数值：自动播放的时间间隔 | boolean 或 number | 2      | -                           | 否       |
| enable-arrow | 是否显示箭头                               | boolean           | false  | false / true                | 否       |
| dot-position | 圆点位置                                   | string            | bottom | left / right / top / bottom | 否       |

## Carousel-Item API

| 参数 | 说明            | 类型   | 默认值 | 可选值 | 是否必选 |
| ---- | --------------- | ------ | ------ | ------ | -------- |
| name | 区分每一个 item | string | -      | -      | 是       |
