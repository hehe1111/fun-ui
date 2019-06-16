<template>
  <div class="toast" :class="classes">
    <div class="slot-container" ref="slotContainer">
      <slot v-if="!enableHTML"></slot>
      <div v-else v-html="$slots.default"></div>
    </div>
    <div class="line" ref="line"></div>
    <span class="close-button-text" v-if="closeButton" @click="onClickClose">{{ closeButton.text }}</span>
  </div>
</template>

<script>
export default {
  name: 'FunUIToast',
  props: {
    autoCloseDelay: {
      type: Number,
      default: 3,
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: '关闭',
          callback: () => {},
        };
      },
    },
    enableHTML: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'middle', 'bottom'].indexOf(value) >= 0;
      },
    },
  },
  computed: {
    classes() {
      return {
        [`position-${this.position}`]: true,
      };
    },
  },
  mounted() {
    this.getLineHeight();
    this.handleAutoClose();
  },
  methods: {
    handleAutoClose() {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    },
    getLineHeight() {
      this.$nextTick(() => {
        this.$refs.line.style.height = `${
          this.$refs.slotContainer.getBoundingClientRect().height
        }px`;
      });
    },
    close() {
      this.$el.remove();
      this.$emit('close');
      this.$destroy();
    },
    onClickClose() {
      this.close();
      this.closeButton &&
        typeof this.closeButton.callback === 'function' &&
        this.closeButton.callback();
    },
  },
};
</script>

<style lang="scss" scoped>
$fontSize: 16px;
$toastBg: rgba(0, 0, 0, 0.75);
$padding: 1em;
$left: 16px;
$animationDuration: 0.4s;
@mixin verticalPadding {
  padding: 0.6 * $padding 0;
}

@keyframes slide-down {
  // 必须写百分号
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.toast {
  max-width: 320px;
  font-size: $fontSize;
  line-height: 1.6;
  padding-left: $padding;
  position: fixed;
  left: 50%;
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: $toastBg;
  color: #fff;
  display: flex;
  align-items: center;

  &.position-top {
    top: 0;
    transform: translateX(-50%);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    animation: slide-down $animationDuration;
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
    animation: fade-in $animationDuration;
  }
  &.position-bottom {
    bottom: 0;
    transform: translateX(-50%);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    animation: slide-up $animationDuration;
  }
}
.slot-container {
  @include verticalPadding;
  word-break: break-all;
  > div {
    word-break: break-all;
  }
}
.line {
  height: 100%;
  border-left: 1px solid #ccc;
  margin-left: $left;
}
.close-button-text {
  @include verticalPadding;
  flex-shrink: 0;
  padding-left: $left;
  padding-right: $padding;
  align-self: stretch;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
