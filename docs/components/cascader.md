# 级联选择器 Cascader

- 组件弹出层的 `z-index` 值默认为 1

## 代码演示

### 静态加载数据

<demo-cascader-1 />

### 动态加载数据

<demo-cascader-2 />

- [db](https://github.com/hehe1111/fun-ui/blob/master/tests/fixture/db.js)
- [db 数据来源](https://github.com/eduosi/district/blob/master/district-full.csv)

## API

| 参数          | 说明                                                                                          | 类型                 | 默认值 | 可选值 | 是否必选 |
| ------------- | --------------------------------------------------------------------------------------------- | -------------------- | ------ | ------ | -------- |
| source        | 数据来源                                                                                      | object[]             | -      | -      | 否       |
| selected      | 当前所有展开层级的被选中项                                                                    | object[]             | -      | -      | 否       |
| column-width  | 弹出层的列宽                                                                                  | string               | 8em    | -      | 否       |
| column-height | 弹出层的列高                                                                                  | string               | 14em   | -      | 否       |
| loadData      | 告知组件如何动态加载每一层的数据。id 是被选中项的 id，fn 接受新的数据，以更新传入组件的数据源 | Function({ id }, fn) | -      | -      | 否       |
