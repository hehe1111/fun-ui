# 快速上手

## 其他

### 代码演示中使用到的

- 公用 range 函数

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

- 公用 SCSS 样式

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
