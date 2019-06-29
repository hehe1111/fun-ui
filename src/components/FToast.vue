<template>
  <div class="toast-container" :class="classes">
    <div class="toast">
      <div class="slot-container" ref="slotContainer">
        <div v-if="!enableHTML">{{ message }}</div>
        <div v-else v-html="message"></div>
      </div>
      <div class="line" ref="line"></div>
      <span
        class="close-button-text"
        v-if="closeButton"
        @click="onClickClose"
        >{{ closeButton.text }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUIToast',
  props: {
    message: {
      type: String,
    },
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
        if (this.$refs.line && this.$refs.slotContainer) {
          this.$refs.line.style.height = `${
            this.$refs.slotContainer.getBoundingClientRect().height
          }px`;
        }
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
@import '../assets/_var.scss';

$padding: 1em;
$left: 16px;

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

.toast-container {
  // 外层做定位居中
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.position-top {
    top: 0;
    .toast {
      // 内层做动画
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $duration;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
    .toast {
      animation: fade-in $duration;
    }
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $duration;
    }
  }
}

.toast {
  max-width: 320px;
  font-size: $fontSize;
  line-height: 1.6;
  padding-left: $padding;
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 $boxShadowColor;
  background-color: $toastBg;
  color: #fff;
  display: flex;
  align-items: center;
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