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
        <div class="icon-container">
          <f-icon name="right" :class="addDownClass" />
        </div>
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
import FIcon from '../FIcon.vue';
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
  inject: {
    root: {
      from: 'root',
      default: () => ({}),
    },
  },
  data() {
    return {
      isSubNavVisible: false,
      timerId: null,
    };
  },
  computed: {
    addDownClass() {
      return {
        down: this.isSubNavVisible,
      };
    },
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
    updateRootNamePath() {
      this.root.namePath.unshift(this.name);
      const fn = this.$parent.updateRootNamePath;
      fn && typeof fn === 'function' && fn();
    },
  },
  components: { FNavItem, FIcon },
  directives: { clickOutside },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-sub-nav-container {
  position: relative;

  > .f-sub-nav-title-container > .f-nav-item > .icon-container > .icon {
    display: none;
  }

  > .f-sub-nav {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    box-shadow: 0 0 3px 0 $boxShadowColor;
    background-color: #fff;

    // 多层嵌套的 sub-nav 的 icon 的指向
    .f-sub-nav-container
      > .f-sub-nav-title-container
      > .f-nav-item
      > .icon-container {
      margin-left: auto;

      > .icon {
        display: inline-flex;
        transition: transform $duration;
        margin-left: 1em;

        &.down {
          transform: rotateZ(90deg);
        }
      }
    }

    // 多层嵌套的 sub-nav 位置
    .f-sub-nav {
      top: 0;
      left: 100%;
      margin-left: 4px;
    }

    // 多层嵌套的 sub-nav 里的 nav-item 被选中时不需要下划线
    .f-nav-item {
      justify-content: flex-start;

      &.active {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
