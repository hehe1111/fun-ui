<template>
  <div class="toast">
    <div class="slot-container">
      <slot></slot>
    </div>
    <div class="line"></div>
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
  },
  mounted() {
    setTimeout(() => {
      this.close();
    }, this.autoCloseDelay * 1000);
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

@mixin verticalPadding {
  padding: 0.6 * $padding 0;
}

.toast {
  font-size: $fontSize;
  line-height: 1.6;
  padding: 0 1 * $padding;
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
}
.line {
  height: 100%;
  border-left: 1px solid #ccc;
  margin: 0 16px;
}
.close-button-text {
  @include verticalPadding;
  flex-shrink: 0;
}
</style>
