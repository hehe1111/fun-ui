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

```js
import Vue from "vue";
import funUI from "fun-ui";
import "fun-ui/dist/fun-ui.css";
Vue.use(funUI);
```

## 所有组件

- `FButton`
- `FButtonGroup`
- `FCarousel`
- `FCarouselItem`
- `FCascader`
- `FCol`
- `FCollapse`
- `FCollapseItem`
- `FContent`
- `FDatePicker`
- `FFooter`
- `FHeader`
- `FIcon`
- `FInput`
- `FLayout`
- `FNav`
- `FNavItem`
- `FPagination`
- `FPopover`
- `FRow`
- `FScrollablePicker`
- `FScrollHorizontal`
- `FScrollVertical`
- `FSidebar`
- `FSticky`
- `FSubNav`
- `FTab`
- `FTabBody`
- `FTabBodyItem`
- `FTable`
- `FTableColumn`
- `FTabNav`
- `FTabNavItem`
- `FTransition`
- `FUpload`

## 文档中代码演示相关

### 公用 range 函数

```js
/**
 * return an array contains a range of sequential number between given params
 * @param {number} start
 * @param {number} end
 */
const range = (start, end) => {
  if (getTypeOf(start) !== "number" || getTypeOf(end) !== "number") {
    throw new Error("Param should be a number.");
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
$borderColor: #999;

.extra-margin {
  margin: 1em 0;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
