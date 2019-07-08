<template>
  <div class="f-sub-nav-container" v-click-outside="close">
    <div
      class="f-sub-nav-title-container"
      @click="toggle"
      @mouseenter="open"
      @mouseleave="closeAfterDelay"
    >
      <f-nav-item :name="name">
        <slot name="title" />
      </f-nav-item>
    </div>
    <!-- 用 v-show 以便从一开始就能获取到所有后代子组件 -->
    <div
      class="f-sub-nav"
      v-show="isSubNavVisible"
      @mouseenter="open"
      @mouseleave="closeAfterDelay"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import FNavItem from './FNavItem.vue';
import clickOutside from '../../directives/click-outside.js';

export default {
  name: 'FunUISubNav',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      isSubNavVisible: false,
      timerId: null,
    };
  },
  methods: {
    toggle($event) {
      this.isSubNavVisible ? this.close() : this.open();
    },
    open() {
      this.timerId && window.clearTimeout(this.timerId);
      this.isSubNavVisible = true;
    },
    close() {
      this.isSubNavVisible = false;
    },
    closeAfterDelay() {
      this.timerId = setTimeout(() => {
        this.close();
      }, 300);
    },
  },
  components: { FNavItem },
  directives: { clickOutside },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-sub-nav-container {
  position: relative;

  > .f-sub-nav {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    box-shadow: 0 0 3px 0 $boxShadowColor;
    background-color: #fff;

    // 多层嵌套 sub-nav
    .f-sub-nav {
      top: 0;
      left: 100%;
      margin-left: 4px;
    }

    .f-nav-item {
      &.active {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
