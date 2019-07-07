# 走马灯 Carousel

## 代码演示

- 自动播放

  <ClientOnly>
    <demo-carousel-1 />
  </ClientOnly>

- 禁止自动播放

  ```vue
  :auto-play="false"
  ```

  <ClientOnly>
    <demo-carousel-2 />
  </ClientOnly>

- 允许用箭头指示器切换

  ```vue
  :enable-arrow="true"
  ```

  <ClientOnly>
    <demo-carousel-3 />
  </ClientOnly>

- 允许配置圆点的位置

  - 可选值：`top`/`bottom`/`left`/`right`
  - 默认值：`bottom`
  - **注意：`left`/`right` 时 `enableArrow` 无效**

  ```vue
  dot-position="left"
  ```

  <ClientOnly>
    <demo-carousel-4 />
  </ClientOnly>

## API
