// import first time for install function
import * as Components from './components/index.js';
// import second time for loading on demand
import {
  FButton,
  FButtonGroup,
  FCarousel,
  FCarouselItem,
  FCascader,
  FCollapse,
  FCollapseItem,
  FCol,
  FRow,
  FLayout,
  FHeader,
  FContent,
  FSidebar,
  FFooter,
  FNav,
  FSubNav,
  FNavItem,
  FPagination,
  FScrollVertical,
  FScrollHorizontal,
  FTab,
  FTabBody,
  FTabBodyItem,
  FTabNav,
  FTabNavItem,
  FTable,
  FTableColumn,
  FDatePicker,
  FIcon,
  FInput,
  FPopover,
  FScrollablePicker,
  FSticky,
  FTransition,
  FUpload,
} from './components/index.js';
// import plugins
import { FToast } from './plugins/index.js';
// import directives
import {
  clickOutside,
  removeClickOutsideListener,
  hideScrollbar,
} from './directives/index.js';

const install = Vue => {
  Vue.use(FToast);
  Object.keys(Components).map(k => Vue.component(k, Components[k]));
};

export default { install };
export {
  FButton,
  FButtonGroup,
  FCarousel,
  FCarouselItem,
  FCascader,
  FCollapse,
  FCollapseItem,
  FCol,
  FRow,
  FLayout,
  FHeader,
  FContent,
  FSidebar,
  FFooter,
  FNav,
  FSubNav,
  FNavItem,
  FPagination,
  FScrollVertical,
  FScrollHorizontal,
  FTab,
  FTabBody,
  FTabBodyItem,
  FTabNav,
  FTabNavItem,
  FTable,
  FTableColumn,
  FDatePicker,
  FIcon,
  FInput,
  FPopover,
  FScrollablePicker,
  FSticky,
  FTransition,
  FUpload,
  FToast,
  clickOutside,
  removeClickOutsideListener,
  hideScrollbar,
};
