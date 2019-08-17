# 标签页 Tab

## 代码演示

### 基础用法

- 默认横向

<ClientOnly>
  <demo-tab-1 />
</ClientOnly>

### 纵向

<ClientOnly>
  <demo-tab-2 />
</ClientOnly>

## Tab API

| 参数     | 说明              | 类型            | 默认值 | 可选值       | 是否必选 |
| -------- | ----------------- | --------------- | ------ | ------------ | -------- |
| selected | 被选中的 tab item | string / number | -      | -            | 是       |
| vertical | 支持纵向          | boolean         | false  | false / true | 否       |

## Tab-Nav API

| 参数   | 说明         | 类型     | 默认值 | 可选值 | 是否必选 |
| ------ | ------------ | -------- | ------ | ------ | -------- |
| action | 操作配置数组 | Object[] | []     | -      | 否       |

- `action` 属性的值：数组，可以包含多个对象，每个对象必须要有 `callback` 和 `text` 属性，`small` 属性可选
  - `callback`: Function. Rquired.
  - `text`: string. Rquired.
  - `small`: boolean. Optional.

## Tab-Nav-Item API

| 参数     | 说明                    | 类型            | 默认值 | 可选值       | 是否必选 |
| -------- | ----------------------- | --------------- | ------ | ------------ | -------- |
| name     | 区分每一个 tab nav item | string / number | -      | -            | 是       |
| disabled | 禁用状态                | boolean         | false  | false / true | 否       |

## Tab-Body-Item API

| 参数 | 说明                                                | 类型            | 默认值 | 可选值 | 是否必选 |
| ---- | --------------------------------------------------- | --------------- | ------ | ------ | -------- |
| name | 区分每一个 tab body item，对应 tab nav item 的 name | string / number | -      | -      | 是       |
