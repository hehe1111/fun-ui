(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{776:function(t,v,_){"use strict";_.r(v);var e=_(1),a=Object(e.a)({},function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"表格-table"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#表格-table","aria-hidden":"true"}},[t._v("#")]),t._v(" 表格 Table")]),t._v(" "),_("h2",{attrs:{id:"代码演示"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#代码演示","aria-hidden":"true"}},[t._v("#")]),t._v(" 代码演示")]),t._v(" "),_("h3",{attrs:{id:"基础用法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#基础用法","aria-hidden":"true"}},[t._v("#")]),t._v(" 基础用法")]),t._v(" "),_("ClientOnly",[_("demo-table-1")],1),t._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://github.com/hehe1111/fun-ui/blob/master/docs/.vuepress/assets/js/table-data.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("tableData"),_("OutboundLink")],1)]),t._v(" "),_("li",[t._v("如果传入的数据中存在 "),_("code",[t._v("collapsibleContent")]),t._v(" 字段，则表格会在"),_("strong",[t._v("该行")]),t._v("最左边显示一个向右的箭头图标，点击图标即可看到折叠内容（"),_("code",[t._v("collapsibleContent")]),t._v(" 字段的值）")])]),t._v(" "),_("h3",{attrs:{id:"固定表头"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#固定表头","aria-hidden":"true"}},[t._v("#")]),t._v(" 固定表头")]),t._v(" "),_("ClientOnly",[_("demo-table-2")],1),t._v(" "),_("h3",{attrs:{id:"边框"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#边框","aria-hidden":"true"}},[t._v("#")]),t._v(" 边框")]),t._v(" "),_("ClientOnly",[_("demo-table-3")],1),t._v(" "),_("h3",{attrs:{id:"条纹"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#条纹","aria-hidden":"true"}},[t._v("#")]),t._v(" 条纹")]),t._v(" "),_("ul",[_("li",[t._v("默认带条纹")]),t._v(" "),_("li",[t._v("不带条纹 "),_("code",[t._v(':striped="false"')])])]),t._v(" "),_("ClientOnly",[_("demo-table-4")],1),t._v(" "),_("h3",{attrs:{id:"紧凑型"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#紧凑型","aria-hidden":"true"}},[t._v("#")]),t._v(" 紧凑型")]),t._v(" "),_("ClientOnly",[_("demo-table-5")],1),t._v(" "),_("h3",{attrs:{id:"显示-id"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#显示-id","aria-hidden":"true"}},[t._v("#")]),t._v(" 显示 id")]),t._v(" "),_("ClientOnly",[_("demo-table-6")],1),t._v(" "),_("h3",{attrs:{id:"显示复选框"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#显示复选框","aria-hidden":"true"}},[t._v("#")]),t._v(" 显示复选框")]),t._v(" "),_("ClientOnly",[_("demo-table-7")],1),t._v(" "),_("h3",{attrs:{id:"当前被选中项"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#当前被选中项","aria-hidden":"true"}},[t._v("#")]),t._v(" 当前被选中项")]),t._v(" "),_("ul",[_("li",[t._v("某一项被选中时，组件会触发 "),_("code",[t._v("update:selectedIds")]),t._v(" 事件")])]),t._v(" "),_("ClientOnly",[_("demo-table-8")],1),t._v(" "),_("h3",{attrs:{id:"列对齐"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#列对齐","aria-hidden":"true"}},[t._v("#")]),t._v(" 列对齐")]),t._v(" "),_("ClientOnly",[_("demo-table-9")],1),t._v(" "),_("h3",{attrs:{id:"自定义列模板"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#自定义列模板","aria-hidden":"true"}},[t._v("#")]),t._v(" 自定义列模板")]),t._v(" "),_("ul",[_("li",[t._v("将自定义列模板包在一个 "),_("code",[t._v("<template>")]),t._v(" 标签里")]),t._v(" "),_("li",[t._v("通过 "),_("code",[t._v("slot-scope")]),t._v(" 可以拿到组件传出来的"),_("strong",[t._v("当前行当前列")]),t._v("的值（value）以及"),_("strong",[t._v("当前行所有列")]),t._v("的数据（"),_("code",[t._v("item")]),t._v("）")])]),t._v(" "),_("ClientOnly",[_("demo-table-10")],1),t._v(" "),_("h3",{attrs:{id:"排序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#排序","aria-hidden":"true"}},[t._v("#")]),t._v(" 排序")]),t._v(" "),_("ClientOnly",[_("demo-table-11")],1),t._v(" "),_("h2",{attrs:{id:"api"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#api","aria-hidden":"true"}},[t._v("#")]),t._v(" API")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("默认值")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("是否必选")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("data-source")]),t._v(" "),_("td",[t._v("数据源")]),t._v(" "),_("td",[t._v("Object")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("是")])]),t._v(" "),_("tr",[_("td",[t._v("height")]),t._v(" "),_("td",[t._v("表格高度，同时会使表头固定")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("bordered")]),t._v(" "),_("td",[t._v("是否显示边框")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("false")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("striped")]),t._v(" "),_("td",[t._v("是否显示条纹")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("true")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("small")]),t._v(" "),_("td",[t._v("是否紧凑型")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("false")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("is-id-visible")]),t._v(" "),_("td",[t._v("id 是否可见")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("false")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("is-checkbox-visible")]),t._v(" "),_("td",[t._v("复选框是否可见")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("selected-ids")]),t._v(" "),_("td",[t._v("包含当前被选中项的数组")]),t._v(" "),_("td",[t._v("string[]")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("align")]),t._v(" "),_("td",[t._v("列对齐方式")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("left")]),t._v(" "),_("td",[t._v("left / center / centre / right")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("sort-rules")]),t._v(" "),_("td",[t._v("排序规则")]),t._v(" "),_("td",[t._v("Object")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("否")])]),t._v(" "),_("tr",[_("td",[t._v("loading")]),t._v(" "),_("td",[t._v("是否正在加载数据中")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("false")]),t._v(" "),_("td",[t._v("false / true")]),t._v(" "),_("td",[t._v("否")])])])]),t._v(" "),_("ul",[_("li",[_("code",[t._v("sort-rules")]),t._v(" "),_("ul",[_("li",[t._v("键名：要进行排序的列的列名")]),t._v(" "),_("li",[t._v("键值可选值有：\n"),_("ul",[_("li",[_("code",[t._v("ascend")]),t._v("（升序）")]),t._v(" "),_("li",[_("code",[t._v("descend")]),t._v("（降序）")]),t._v(" "),_("li",[_("code",[t._v("true")]),t._v("（不排序）")])])])])])]),t._v(" "),_("h2",{attrs:{id:"事件"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事件","aria-hidden":"true"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("事件名")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("re-sort")]),t._v(" "),_("td",[t._v("点击排序图标时触发，可将排序函数绑定到该事件上")])])])])],1)},[],!1,null,null,null);v.default=a.exports}}]);