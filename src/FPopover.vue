<template>
  <div class="popover" ref="popover">
    <div class="content-container" :class="classes" v-if="visiable" ref="contentContainer">
      <slot name="content"></slot>
    </div>
    <div class="button-container" ref="buttonContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUIPopover',
  data() {
    return {
      visiable: false,
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
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onClick);
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open);
      this.$refs.popover.addEventListener('mouseleave', this.close);
    }
  },
  destroyed() {
    if (this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.onClick);
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open);
      this.$refs.popover.removeEventListener('mouseleave', this.close);
    }
  },
  computed: {
    classes() {
      return {
        [`position-${this.position}`]: true,
      };
    },
  },
  methods: {
    relocatePopoverContent() {
      const { contentContainer, buttonContainer } = this.$refs;
      document.body.appendChild(contentContainer);
      const {
        width,
        height,
        top,
        left,
      } = buttonContainer.getBoundingClientRect();
      const locationParams = {
        top: { top, left },
        bottom: { top: top + height, left },
        left: { top: top + 0.5 * height, left },
        right: { top: top + 0.5 * height, left: left + width },
      };
      const { style } = contentContainer;
      style.top = `${locationParams[this.position].top + window.scrollY}px`;
      style.left = `${locationParams[this.position].left + window.scrollX}px`;
    },
    open() {
      this.visiable = true;
      this.$nextTick(() => {
        this.relocatePopoverContent();
        document.addEventListener('click', this.onClickDocument);
      });
    },
    close() {
      this.visiable = false;
      document.removeEventListener('click', this.onClickDocument);
    },
    onClickDocument(event) {
      // 点击 popover 的按钮时，点击会冒泡到 document 上，此时应该阻止该点击事件
      if (this.$refs.popover.contains(event.target)) return;

      // 点击 popover 的内容部分时，内容部分不消失
      if (this.visiable && this.$refs.contentContainer.contains(event.target)) {
        return;
      }
      this.close();
    },
    onClick() {
      this.visiable ? this.close() : this.open();
    },
  },
};
</script>

<style lang="scss" scoped>
$borderColor: #333;
$borderRadius: 4px;

.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-container {
  max-width: 20em;
  border: 1px solid $borderColor;
  border-radius: $borderRadius;
  padding: 0.5em 1em;
  position: absolute;
  word-break: break-all;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  background-color: #fff;

  &::before,
  &::after {
    content: '';
    border: 10px solid transparent;
    position: absolute;
  }

  /* transform: translate(X, Y); 相对于 content-container 自身 */
  /* top bottom left right: 百分比 相对于 content-container */
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 10px;
      top: 100%;
      border-top-color: $borderColor;
      border-bottom: none; /* 防止闪烁 */
    }
    &::after {
      margin-top: -1px;
      border-top-color: #fff;
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 10px;
      bottom: 100%;
      border-bottom-color: $borderColor;
      border-top: none; /* 防止闪烁 */
    }
    &::after {
      margin-bottom: -1px;
      border-bottom-color: #fff;
    }
  }
  &.position-left {
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
  &.position-right {
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
