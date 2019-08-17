# 上传 Upload

## 代码演示

### 基础用法

- `this.$toast()` 的使用请参考 [Toast](./toast.md) 组件

<demo-upload-1 />

### 限制上传文件的大小

<demo-upload-2 />

### 限制上传文件的类型

- `accept` 可能的值请参考 [accept - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)

<demo-upload-3 />

### 通过 fileList 属性获取被上传的文件信息

<demo-upload-4 />

### `listType: picture` 图片加文字

- `listType` 属性共有三种可选值，`text`（默认）、`picture`、`picture-card`

<demo-upload-5 />

### `listType: picture-card` 仅图片

<demo-upload-6 />

### 多文件上传

<demo-upload-7 />

### 拖曳上传

<demo-upload-8 />

### 手动上传

1. 设置 `:autoUpload="false"`
2. 必须向名为 'submit' 的插槽传入一个标签（任何标签均可），如：`<div slot="submit">确认上传</div>`，点击该标签即可手动上传

<demo-upload-9 />

## API

| 参数          | 说明                                          | 类型                                   | 默认值 | 可选值                        | 是否必选 |
| ------------- | --------------------------------------------- | -------------------------------------- | ------ | ----------------------------- | -------- |
| method        | 请求方法                                      | string                                 | post   | -                             | 否       |
| action        | 文件上传的目标服务器地址                      | string                                 | -      | -                             | 是       |
| name          | 与后端协商好的 input 标签的 name 值           | string                                 | -      | -                             | 是       |
| parseResponse | 从服务器返回的响应中解析出文件信息            | Function (response) => ({ name, url }) | -      | -                             | 是       |
| maxSize       | 文件大小的最大值                              | number                                 | -      | -                             | 否       |
| accept        | 允许上传的文件类型                            | string                                 | -      | -                             | 否       |
| fileList      | 已上传文件的信息数组                          | array                                  | -      | -                             | 否       |
| listType      | 文件列表样式                                  | string                                 | text   | text / picture / picture-card | 否       |
| multiple      | 多文件上传                                    | boolean                                | false  | false / true                  | 否       |
| draggable     | 拖曳上传                                      | boolean                                | false  | false / true                  | 否       |
| autoUpload    | 自动上传                                      | boolean                                | true   | false / true                  | 否       |
| success       | 上传完成时触发                                | event                                  | -      | -                             | 否       |
| error         | 上传过程出错或者是文件大小超过 maxSize 时触发 | event                                  | -      | -                             | 否       |
| remove        | 删除已上传文件时触发                          | event                                  | -      | -                             | 否       |
