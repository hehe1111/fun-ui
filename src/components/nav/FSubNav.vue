<template>
  <div
    class="f-sub-nav-container"
    :class="{ vertical }"
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
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        class="f-sub-nav"
        v-show="isSubNavVisible"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import FNavItem from './FNavItem.vue';
import clickOutside, {
  removeClickOutsideListener,
} from '../../directives/click-outside.js';

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
    trigger: {
      from: 'trigger',
      default: 'hover',
    },
  },
  data() {
    return {
      isSubNavVisible: false,
      timerId: null,
      subNavHeight: 0,
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
  mounted() {
    this.updateRootTitleNavItems();
  },
  beforeDestroy() {
    removeClickOutsideListener();
  },
  methods: {
    updateRootTitleNavItems() {
      const { getTitleNavItems } = this.root;
      getTitleNavItems &&
        typeof getTitleNavItems === 'function' &&
        getTitleNavItems(this);
    },
    toggle($event) {
      if (this.vertical) this.isSubNavVisible ? this.close() : this.open();
      if (this.trigger === 'click') {
        this.$emit('click', $event);
        this.isSubNavVisible ? this.close() : this.open();
      }
    },
    open() {
      this.timerId && window.clearTimeout(this.timerId);
      this.isSubNavVisible = true;
    },
    close() {
      this.isSubNavVisible = false;
    },
    closeAfterDelay() {
      this.timerId = setTimeout(() => this.close(), 300);
    },
    closeIfNotVertical() {
      !this.vertical && this.close();
    },
    onMouseEnter($event) {
      if (this.vertical || this.trigger === 'click') return;
      this.$emit('mouseenter', $event);
      this.open();
    },
    onMouseLeave($event) {
      if (this.vertical || this.trigger === 'click') return;
      this.$emit('mouseleave', $event);
      this.closeAfterDelay();
    },
    updateRootNamePath() {
      this.root.namePath.unshift(this.name);
      const fn = this.$parent.updateRootNamePath;
      fn && typeof fn === 'function' && fn();
    },
    // 过渡 JS 钩子函数
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      this.subNavHeight = el.getBoundingClientRect().height;
      el.style.height = 0;
      el.getBoundingClientRect(); // 强制浏览器渲染上一次操作的结果
      el.style.height = `${this.subNavHeight}px`;
      el.style.opacity = 1;
      // 等待过渡完成
      el.addEventListener('transitionend', () => done());
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    leave(el, done) {
      el.style.height = `${this.subNavHeight}px`;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.style.opacity = 0;
      el.addEventListener('transitionend', () => done());
    },
    afterLeave(el) {
      el.style.height = 'auto';
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
    transition: all 0.1s linear;
    z-index: 2;

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
      overflow: hidden;
    }
  }
}

/* 选中项高亮下划线样式 */
// 横向时，顶层栏选中项「加」高亮下划线
.f-sub-nav-container {
  > .f-sub-nav-title-container > .f-nav-item.active::after {
    content: '';
    @extend .selectedItemBlueBorderBottom;
  }

  .f-sub-nav-container .f-nav-item.active::after {
    display: none;
  }
}
</style>
