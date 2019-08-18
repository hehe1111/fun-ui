// import first time for install function
import * as Components from './components/index.js';
// import second time for loading on demand
import {
  FButton,
  FButtonGroup,
  FCarousel,
  FCarouselItem,
  FCascader,
  FCol,
  FCollapse,
  FCollapseItem,
  FContent,
  FDatePicker,
  FFooter,
  FHeader,
  FIcon,
  FInput,
  FLayout,
  FNav,
  FNavItem,
  FPagination,
  FPopover,
  FRow,
  FScrollablePicker,
  FScrollHorizontal,
  FScrollVertical,
  FSidebar,
  FSticky,
  FSubNav,
  FTab,
  FTabBody,
  FTabBodyItem,
  FTable,
  FTableColumn,
  FTabNav,
  FTabNavItem,
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
  FCol,
  FCollapse,
  FCollapseItem,
  FContent,
  FDatePicker,
  FFooter,
  FHeader,
  FIcon,
  FInput,
  FLayout,
  FNav,
  FNavItem,
  FPagination,
  FPopover,
  FRow,
  FScrollablePicker,
  FScrollHorizontal,
  FScrollVertical,
  FSidebar,
  FSticky,
  FSubNav,
  FTab,
  FTabBody,
  FTabBodyItem,
  FTable,
  FTableColumn,
  FTabNav,
  FTabNavItem,
  FTransition,
  FUpload,
  FToast,
  clickOutside,
  removeClickOutsideListener,
  hideScrollbar,
};
