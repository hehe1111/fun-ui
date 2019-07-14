# 分页 Pagination

## 代码演示

- `total`：总页码。必选

<ClientOnly>
  <demo-pagination-1 />
</ClientOnly>

```vue
<template>
  <f-pagination :total="total" />
</template>

<script>
data() {
  return {
    total: 10,
  }
}
</script>
```

- `current`：传入一开始要显示的当前页码。可选，默认值为 1
- 可以通过监听 `update:current` 事件获取最新页码。可以使用简写 `.sync` 语法： `:current.sync="current"`

<ClientOnly>
  <demo-pagination-2 />
</ClientOnly>

```vue
<template>
  <f-pagination :total="total" />
  <f-pagination :current="current1" :total="total" />
  <f-pagination :current.sync="current2" :total="total" />

  <div>第三个分页器当前页码：{{ current2 }}</div>
</template>

<script>
data() {
  return {
    current1: 5,
    current2: 5,
    total: 10,
  }
}
</script>
```

- `hide-on-single-page`：是否在只有一页时隐藏分页器。默认值 `false`

<ClientOnly>
  <demo-pagination-3 />
</ClientOnly>

```vue
<template>
  <f-pagination :total="total" hide-on-single-page />
</template>

<script>
data() {
  return {
    total: 1,
  }
}
</script>
```

- `no-gutter`：页码按钮之间是否有空隙。默认值 `false`

<ClientOnly>
  <demo-pagination-4 />
</ClientOnly>

```vue
<template>
  <f-pagination :total="total" no-gutter />
</template>

<script>
data() {
  return {
    total: 10,
  }
}
</script>
```

- `on-page-change`：在页码发生改变时调用的回调。可以获取到一个参数：改变后的最新页码

<ClientOnly>
  <demo-pagination-5 />
</ClientOnly>

```vue
<template>
  <f-pagination :total="total" :on-page-change="onPageChange" />
  <span>当前页码：{{ newPage }}</span>
</template>

<script>
data() {
  return {
    total: 10,
    newPage: 1,
  }
},
methods: {
  onPageChange(newPage) {
    this.newPage = newPage
  }
}
</script>
```

## API

| 参数                | 说明                       | 类型     | 默认值   | 可选值       | 是否必选 |
| ------------------- | -------------------------- | -------- | -------- | ------------ | -------- |
| total               | 总页码                     | number   | -        | -            | 是       |
| current             | 当前页码                   | number   | 1        | -            | 否       |
| hide-on-single-page | 是否在只有一页时隐藏分页器 | boolean  | false    | false / true | 否       |
| no-gutter           | 页码按钮之间是否无空隙     | boolean  | false    | false / true | 否       |
| on-page-change      | 在页码发生改变时调用的回调 | function | (newPage) => {} | -            | 否       |
