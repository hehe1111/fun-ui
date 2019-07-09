<template>
  <div
    class="f-sub-nav-container"
    :class="verticalClass"
    v-click-outside="closeIfNotVertical"
  >
    <div
      class="f-sub-nav-title-container"
      @click="toggle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <f-nav-item :name="name">
        <slot name="title" />
        <div class="icon-container">
          <f-icon name="up" v-if="vertical" class="icon" :class="rotateClass" />
          <f-icon name="right" v-else class="icon" :class="rotateClass" />
        </div>
      </f-nav-item>
    </div>

    <!-- 用 v-show 以便从一开始就能获取到所有后代子组件 -->
    <div
      class="f-sub-nav"
      v-show="isSubNavVisible"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
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
    vertical: {
      from: 'vertical',
      default: false,
    },
  },
  data() {
    return {
      isSubNavVisible: false,
      timerId: null,
    };
  },
  computed: {
    rotateClass() {
      return this.vertical
        ? { rotate180deg: this.isSubNavVisible }
        : { rotate90deg: this.isSubNavVisible };
    },
    verticalClass() {
      return {
        vertical: this.vertical,
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
    closeIfNotVertical() {
      !this.vertical && this.close();
    },
    onMouseEnter() {
      !this.vertical && this.open();
    },
    onMouseLeave() {
      !this.vertical && this.closeAfterDelay();
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

// icon 通用样式
.icon-container {
  margin-left: auto;

  > .icon {
    display: inline-flex;
    transition: transform $duration;
    margin-left: 1em;

    &.rotate90deg {
      transform: rotateZ(90deg);
    }

    &.rotate180deg {
      transform: rotateZ(180deg);
    }
  }
}

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

    // 多层嵌套的 sub-nav 的 icon
    .f-sub-nav-container
      > .f-sub-nav-title-container
      > .f-nav-item
      > .icon-container
      > .icon {
      display: inline-flex;
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

  // 纵向样式
  &.vertical {
    > .f-sub-nav-title-container > .f-nav-item > .icon-container > .icon {
      display: inline-flex;
    }

    > .f-sub-nav {
      position: static;
      box-shadow: none;
      padding-left: 1em;
    }
  }
}
</style>
