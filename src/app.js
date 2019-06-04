import Vue from "vue";
import FButton from "./FButton.vue";
import FIcon from "./FIcon.vue";
import FButtonGroup from "./FButtonGroup.vue";
import FInput from "./FInput.vue";
import FRow from "./FRow.vue";
import FCol from "./FCol.vue";

// 全局注册
// Vue.component('FButton', FButton)
// Vue.component('FIcon', FIcon)
// Vue.component('FButtonGroup', FButtonGroup)

window.vmm = new Vue({
  el: "#app",
  data: {
    message: "数据双向绑定",
    textWillBeCleared: "点击右侧图标清空输入内容",
  },
  // 局部注册
  components: {
    FButton,
    FIcon,
    FButtonGroup,
    FInput,
    FRow,
    FCol,
  },
  methods: {
    changeHandler(event) {
      console.log("xxx", event);
    },
    clearText(event) {
      this.textWillBeCleared = "";
    },
  },
});
