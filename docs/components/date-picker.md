# 日期选择器 Date Picker

## 代码演示

### 基础用法

<ClientOnly>
  <demo-date-picker-1 />
</ClientOnly>

### 从周日开始

- 默认从周一开始

<ClientOnly>
  <demo-date-picker-2 />
</ClientOnly>

## API

| 参数          | 说明                   | 类型             | 默认值                                         | 可选值                       | 是否必选 |
| ------------- | ---------------------- | ---------------- | ---------------------------------------------- | ---------------------------- | -------- |
| value         | 当前被选中项           | Date 或者是 null | new Date()                                     | Date / null                  | 否       |
| start-week-on | 星期从周一还是周日开始 | number / string  | 1（周一）                                      | 1 / 0 / '1' / '0'            | 否       |
| separator     | 年月日之间的分隔符     | string           | ' / '                                          | '-' 或 '/' 或 ' / ' 或 ' - ' | 否       |
| scope         | 可选的时间范围         | Array            | [new Date(1900, 0, 1), new Date(2100, 11, 31)] | -                            | 否       |
