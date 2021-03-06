<template>
  <div :class="n2c()" ref="popoverRef">
    <f-transition>
      <div
        :class="contentContainerClasses"
        v-if="visible"
        ref="contentContainerRef"
        :style="contentContainerStyle"
      >
        <!-- for smoother transition -->
        <div :style="contentStyle">
          <!-- slot-scope 把组件内部的东西暴露给插槽，从而可以在父组件作用域中调用 -->
          <slot name="content" :close="close" />
        </div>
      </div>
    </f-transition>
    <div ref="triggerAreaRef" :style="triggerStyle">
      <slot />
    </div>
  </div>
</template>

<script>
import FTransition from './FTransition.vue';
import { optionsName2ClassPrefix, oneOf } from '../assets/utils.js';

export default {
  name: 'FunUIPopover',
  components: { FTransition },
  data() {
    return {
      visible: false,
    };
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0;
      },
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0;
      },
    },
    triggerStyle: {
      type: Object,
    },
    contentContainerStyle: {
      type: Object,
      default: () => {
        return { maxWidth: '20em' };
      },
    },
    contentStyle: {
      type: Object,
      default: () => {
        return { padding: '0.5em 1em' };
      },
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    contentContainerClasses() {
      return [
        this.n2c('content-container'),
        { [this.n2c(`position-${this.position}`)]: true },
      ];
    },
  },
  mounted() {
    this.addTriggerMouseListener();
  },
  methods: {
    onClickTrigger() {
      this.visible ? this.close() : this.open();
    },
    open() {
      clearTimeout(this.timer);
      this.visible = true;
      this.$nextTick(() => {
        this.relocateContent();
        this._handleContentHoverListener('addEventListener');
        document.addEventListener('click', this.onClickDocument);
      });
    },
    close() {
      // remove listener before set this.visible to false
      this._handleContentHoverListener('removeEventListener');
      this.visible = false;
      document.removeEventListener('click', this.onClickDocument);
    },
    closeAfterDelay() {
      this.timer = setTimeout(() => this.close(), 200);
    },
    _checkMethod(method) {
      if (!oneOf(method, ['addEventListener', 'removeEventListener'])) {
        throw new Error('Invalid param.');
      }
    },
    _handleTriggerMouseListener(method) {
      this._checkMethod(method);
      const { popoverRef } = this.$refs;
      if (!popoverRef) return;
      if (this.trigger === 'click') {
        popoverRef[method]('click', this.onClickTrigger);
      } else {
        popoverRef[method]('mouseenter', this.open);
        popoverRef[method]('mouseleave', this.closeAfterDelay);
      }
    },
    addTriggerMouseListener() {
      this._handleTriggerMouseListener('addEventListener');

      // https://cn.vuejs.org/v2/guide/components-edge-cases.html#程序化的事件侦听器
      this.$once('hook:beforeDestroy', () => {
        this._handleTriggerMouseListener('removeEventListener');
        this.$refs.contentContainerRef &&
          this.$refs.contentContainerRef.remove();
      });
    },
    enterContent() {
      clearTimeout(this.timer);
    },
    _handleContentHoverListener(method) {
      this._checkMethod(method);
      if (this.trigger === 'hover') {
        const { contentContainerRef } = this.$refs;
        if (!contentContainerRef) return;
        contentContainerRef[method]('mouseenter', this.enterContent);
        contentContainerRef[method]('mouseleave', this.closeAfterDelay);
      }
    },
    relocateContent() {
      const { contentContainerRef, triggerAreaRef } = this.$refs;
      if (!contentContainerRef || !triggerAreaRef) return;
      document.body.appendChild(contentContainerRef);
      const {
        width,
        height,
        top,
        left,
      } = triggerAreaRef.getBoundingClientRect();
      const locationParams = {
        top: { top, left },
        bottom: { top: top + height, left },
        left: { top: top + 0.5 * height, left },
        right: { top: top + 0.5 * height, left: left + width },
      };
      const { style } = contentContainerRef;
      style.top = `${locationParams[this.position].top + window.scrollY}px`;
      style.left = `${locationParams[this.position].left + window.scrollX}px`;
    },
    onClickDocument(event) {
      const { popoverRef, contentContainerRef } = this.$refs;
      // stop click event bubble up to document when click trigger area
      if (popoverRef && popoverRef.contains(event.target)) return;

      // when click content-container, it should remain visible
      if (
        this.visible &&
        contentContainerRef &&
        contentContainerRef.contains(event.target)
      ) {
        return;
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  &-content-container {
    @extend .flex-center;
    line-height: 1.4;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    margin-left: 4px;
    position: absolute;
    word-break: break-all;
    // box-shadow: 0 0 3px $boxShadowColor;
    filter: drop-shadow(0 0 3px $boxShadowColor);
    background-color: #fff;

    &::before,
    &::after {
      content: '';
      border: 10px solid transparent;
      position: absolute;
    }
  }

  /* transform: translate(X, Y); 相对于 content-container 自身 */
  /* top bottom left right: 百分比 相对于 content-container */
  &-position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 1em;
      top: 100%;
      border-top-color: $borderColor;
      border-bottom: none; /* 防止闪烁 */
    }
    &::after {
      margin-top: -1px;
      border-top-color: #fff;
    }
  }
  &-position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 1em;
      bottom: 100%;
      border-bottom-color: $borderColor;
      border-top: none; /* 防止闪烁 */
    }
    &::after {
      margin-bottom: -1px;
      border-bottom-color: #fff;
    }
  }
  &-position-left {
    transform: translate(-100%, -50%);
    margin-left: -10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
      left: 100%;
      border-left-color: $borderColor;
      border-right: none; /* 防止闪烁 */
    }
    &::after {
      margin-left: -1px;
      border-left-color: #fff;
    }
  }
  &-position-right {
    transform: translateY(-50%);
    margin-left: 10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
      right: 100%;
      border-right-color: $borderColor;
      border-left: none; /* 防止闪烁 */
    }
    &::after {
      margin-right: -1px;
      border-right-color: #fff;
    }
  }
}
</style>
