(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{315:function(a,t,e){},648:function(a,t,e){"use strict";var n=e(315);e.n(n).a},728:function(a,t,e){"use strict";e.r(t);var n=e(354),b=e(355),m=e(356),i=e(357),d=e(358),s={name:"demo-tab-2",components:{FTab:n.a,FTabNav:b.a,FTabNavItem:m.a,FTabBody:i.a,FTabBodyItem:d.a},data:function(){return{selectedTab:"1",html:'\n        <f-tab :selected.sync="selectedTab" vertical>\n          <f-tab-nav>\n            <f-tab-nav-item name="1">1</f-tab-nav-item>\n            <f-tab-nav-item name="2" disabled>2</f-tab-nav-item>\n            <f-tab-nav-item name="3">3</f-tab-nav-item>\n          </f-tab-nav>\n          <f-tab-body>\n            <f-tab-body-item name="1">0001</f-tab-body-item>\n            <f-tab-body-item name="2">0002</f-tab-body-item>\n            <f-tab-body-item name="3">0003</f-tab-body-item>\n          </f-tab-body>\n        </f-tab>\n      ',javascript:"\n        data() {\n          return {\n            selectedTab: '1',\n          }\n        },\n      "}}},f=(e(648),e(1)),v=Object(f.a)(s,function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"demo-tab-2 extra-margin"},[e("f-tab",{attrs:{selected:a.selectedTab,vertical:""},on:{"update:selected":function(t){a.selectedTab=t}}},[e("f-tab-nav",[e("f-tab-nav-item",{attrs:{name:"1"}},[a._v("1")]),a._v(" "),e("f-tab-nav-item",{attrs:{name:"2",disabled:""}},[a._v("2")]),a._v(" "),e("f-tab-nav-item",{attrs:{name:"3"}},[a._v("3")])],1),a._v(" "),e("f-tab-body",[e("f-tab-body-item",{attrs:{name:"1"}},[a._v("0001")]),a._v(" "),e("f-tab-body-item",{attrs:{name:"2"}},[a._v("0002")]),a._v(" "),e("f-tab-body-item",{attrs:{name:"3"}},[a._v("0003")])],1)],1),a._v(" "),e("code-box",{attrs:{code:{html:a.html,javascript:a.javascript}}})],1)},[],!1,null,"07201641",null);t.default=v.exports}}]);