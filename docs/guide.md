# 指南

## 安装

```shell
npm install fun-ui
```

或

```shell
yarn add fun-ui
```

## 快速上手

- 样式文件需要单独引入

```vue
<template>
  <div id="app">
    <f-button>Click me</f-button>
  </div>
</template>

<script>
import { FButton } from "fun-ui";
import "fun-ui/dist/fun-ui.css";

export default {
  name: "app",
  components: { FButton },
};
</script>
```

## 完整组件列表以及引入方式

```vue
<script>
import {
  FButton,
  FCarousel,
  FCascader,
  FCollapse,
  FDate-picker,
  FGrid,
  FIcon,
  FInput,
  FLayout,
  FNav,
  FNagination,
  FPopover,
  FScroll,
  FScrollable-picker,
  FTab,
  FTable,
  FToast,
  FUpload
} from "fun-ui";

export default {
  components: {
    FButton,
    FCarousel,
    FCascader,
    FCollapse,
    FDate-picker,
    FGrid,
    FIcon,
    FInput,
    FLayout,
    FNav,
    FNagination,
    FPopover,
    FScroll,
    FScrollable-picker,
    FTab,
    FTable,
    FToast,
    FUpload
  }
}
</script>
```

## 文档中代码演示相关

### 公用 range 函数

```js
/**
 * return an array contains a range of sequential number between given params
 * @param {number} start
 * @param {number} end
 */
const range = (start, end) => {
  if (getTypeOf(start) !== 'number' || getTypeOf(end) !== 'number') {
    throw new Error('Param should be a number.');
  }
  const result = [];
  if (start < end) {
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(i);
    }
  }
  return result;
};
```

### 公用 SCSS 样式

```scss
$blue: #1890ff;
$duration: 0.4s;
$borderRadius: 4px;

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
