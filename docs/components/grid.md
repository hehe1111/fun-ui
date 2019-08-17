# 网格系统 Grid

## 代码演示

### 基础用法

<demo-grid-1 />

### gutter

<demo-grid-2 />

### offset

<demo-grid-3 />

### 响应式

- 默认：0 - 576
- tablet：576 - 768
- smallPc：768 - 992
- pc：992 - 1200
- largePc：1200 -
- 参考自 [Ant Design](https://ant.design/components/grid-cn/#Col)

<demo-grid-4 />

## Row API

| 参数   | 说明                     | 类型            | 默认值 | 可选值 | 是否必选 |
| ------ | ------------------------ | --------------- | ------ | ------ | -------- |
| gutter | 同一行两个栅格之间的间隔 | string / number | -      | -      | 否       |

## Col API

| 参数     | 说明                              | 类型            | 默认值                 | 可选值 | 是否必选 |
| -------- | --------------------------------- | --------------- | ---------------------- | ------ | -------- |
| span     | 栅格占据的列数                    | string / number | 0                      | -      | 否       |
| offset   | 栅格偏移                          | string / number | 0                      | -      | 否       |
| tablet   | 栅格属性对象，适用于 576 - 768px  | Object          | { span: 0, offset: 0 } | -      | 否       |
| small-pc | 栅格属性对象，适用于 768 - 992px  | Object          | { span: 0, offset: 0 } | -      | 否       |
| pc       | 栅格属性对象，适用于 992 - 1200px | Object          | { span: 0, offset: 0 } | -      | 否       |
| large-pc | 栅格属性对象，适用于 1200px 以上  | Object          | { span: 0, offset: 0 } | -      | 否       |
