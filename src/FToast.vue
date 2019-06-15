<template>
  <div class="toast">
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
      default: 300,
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
  },
  mounted() {
    setTimeout(() => {
      this.close();
    }, this.autoCloseDelay * 1000);
    this.$nextTick(() => {
      this.$refs.line.style.height = `${
        this.$refs.slotContainer.getBoundingClientRect().height
      }px`;
    });
  },
  methods: {
    close() {
      this.$el.remove();
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

@mixin verticalPadding {
  padding: 0.6 * $padding 0;
}

.toast {
  max-width: 320px;
  font-size: $fontSize;
  line-height: 1.6;
  padding-left: $padding;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
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
