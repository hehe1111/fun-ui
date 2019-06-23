import Vue from 'vue';
import FButton from './FButton.vue';
import FIcon from './FIcon.vue';
import FButtonGroup from './FButtonGroup.vue';
import FInput from './FInput.vue';
import FRow from './FRow.vue';
import FCol from './FCol.vue';
import FLayout from './FLayout.vue';
import FHeader from './FHeader.vue';
import FSidebar from './FSidebar.vue';
import FContent from './FContent.vue';
import FFooter from './FFooter.vue';
import Plugin from './plugin';
import FTab from './FTab.vue';
import FTabNav from './FTabNav.vue';
import FTabNavItem from './FTabNavItem.vue';
import FTabBody from './FTabBody.vue';
import FTabBodyItem from './FTabBodyItem.vue';
import FPopover from './FPopover.vue';
import FCollapse from './FCollapse.vue';
import FCollapseItem from './FCollapseItem.vue';

// Plugin.install(Vue)
Vue.use(Plugin);

// 全局注册
// Vue.component('FButton', FButton)
// Vue.component('FIcon', FIcon)
// Vue.component('FButtonGroup', FButtonGroup)
window.vmm = new Vue({
  el: '#app',
  // 局部注册
  data: {
    openedItemArray: ['c3', 'c2'],
  },
  components: {
    FButton,
    FIcon,
    FButtonGroup,
    FInput,
    FRow,
    FCol,
    FLayout,
    FHeader,
    FSidebar,
    FContent,
    FFooter,
    FTab,
    FTabNav,
    FTabNavItem,
    FTabBody,
    FTabBodyItem,
    FPopover,
    FCollapse,
    FCollapseItem,
  },
});
